// Matching pipeline: dispatched_orders + payment_records -> reconciliation_rows.
//
// This is the heart of the automation. The function is PURE (takes arrays,
// returns arrays) so it can be unit tested with a golden case without a DB.
//
// Match strategy (in order of preference):
//   1. order_id exact match.
//   2. MPESA confirmation code (on dispatched_orders.mpesa_code_on_dispatch)
//      to a payment_records.mpesa_code.
//   3. Payment `reference` equalling order_id (some legacy flows).
//
// Status assignment follows the human process in steps 16-22:
//   - order marked cash but a payment record exists with matching amount
//     -> matched (finance is happy)
//   - order marked cash, payment exists, amount differs -> amount_mismatch
//   - order marked cash, no payment at all -> missing_payment
//   - order marked paid but we found a cash payment -> mislabeled_paid
//   - order marked cash but no payment AND we found a Paystack / Pesapal hit
//     for the same order elsewhere -> mislabeled_cash
//   - order with dispatch status cancelled -> cancelled (no action)
//   - payment records that never matched a dispatch -> orphan_payment (one
//     synthetic row each so finance can follow up)

import { amountsMatch } from './normalize';
import type {
  DispatchedOrder,
  DispatchedOrderInsert,
  MatchStatus,
  PaymentRecord,
  PaymentRecordInsert,
  ReconciliationRowInsert,
} from './types';

export interface MatchInput {
  runId: string;
  // Dispatched orders from Looker/Ando (canonical dispatch side). Inserts or
  // full rows both work — we only read fields, not ids.
  andoDispatched: readonly (DispatchedOrder | DispatchedOrderInsert)[];
  // Dispatched orders from non-Ando platforms (Uber/Glovo/Limetray). Used
  // to detect orders present on a platform but missing from Ando dispatch.
  platformDispatched: readonly (DispatchedOrder | DispatchedOrderInsert)[];
  // Payment records from all sources.
  payments: readonly (PaymentRecord | PaymentRecordInsert)[];
  /**
   * Optional: DB id for each dispatched order / payment, keyed by a stable
   * key that the caller chooses (usually the generated uuid). Only used to
   * populate foreign keys on reconciliation_rows when we have them; matching
   * logic does not require ids.
   */
  idMap?: {
    dispatchedId?: (o: DispatchedOrder | DispatchedOrderInsert) => string | null;
    paymentId?: (p: PaymentRecord | PaymentRecordInsert) => string | null;
  };
}

export interface MatchSummary {
  totals: Record<MatchStatus, number>;
  total: number;
  matched: number;
  exceptions: number;
}

export interface MatchResult {
  rows: ReconciliationRowInsert[];
  summary: MatchSummary;
}

export function matchDispatchedAgainstPayments(input: MatchInput): MatchResult {
  const { runId, andoDispatched, platformDispatched, payments, idMap } = input;

  // Index payments for fast lookup.
  const paymentsByOrder = new Map<string, (PaymentRecord | PaymentRecordInsert)[]>();
  const paymentsByMpesa = new Map<string, PaymentRecord | PaymentRecordInsert>();
  const paymentsByReference = new Map<string, PaymentRecord | PaymentRecordInsert>();
  for (const p of payments) {
    if (p.order_id) {
      const list = paymentsByOrder.get(p.order_id) ?? [];
      list.push(p);
      paymentsByOrder.set(p.order_id, list);
    }
    if (p.mpesa_code) paymentsByMpesa.set(p.mpesa_code, p);
    if (p.reference) paymentsByReference.set(p.reference.toUpperCase(), p);
  }

  // Index non-ando dispatch by order_id (for dispatch-side flags).
  const platformByOrder = new Map<string, (DispatchedOrder | DispatchedOrderInsert)[]>();
  for (const d of platformDispatched) {
    const list = platformByOrder.get(d.order_id) ?? [];
    list.push(d);
    platformByOrder.set(d.order_id, list);
  }

  const consumedPayments = new Set<PaymentRecord | PaymentRecordInsert>();
  const rows: ReconciliationRowInsert[] = [];

  for (const ord of andoDispatched) {
    const row = buildRowForDispatched(
      runId,
      ord,
      paymentsByOrder,
      paymentsByMpesa,
      paymentsByReference,
      platformByOrder,
      consumedPayments,
      idMap,
    );
    rows.push(row);
  }

  // Orders present on Uber/Glovo/Limetray but NOT in Ando dispatch —
  // the "order not dispatched through our system" bucket (step 5 variant).
  const andoOrderIds = new Set(andoDispatched.map((o) => o.order_id));
  for (const d of platformDispatched) {
    if (andoOrderIds.has(d.order_id)) continue;
    const row: ReconciliationRowInsert = {
      run_id: runId,
      dispatched_order_id: idMap?.dispatchedId?.(d) ?? null,
      order_id: d.order_id,
      branch: d.branch ?? null,
      rider_name: d.rider_name ?? null,
      platform: d.platform,
      payment_type: d.payment_type,
      expected_amount: d.expected_amount ?? null,
      matched_payment_id: null,
      matched_source: null,
      matched_amount: null,
      matched_mpesa_code: null,
      match_status: 'no_dispatch',
      exception_notes: `Order found on ${d.platform.toUpperCase()} but not in Ando dispatch — check if punched wrongly or not dispatched.`,
    };
    rows.push(row);
  }

  // Orphan payments — payments that never matched any dispatched order.
  for (const p of payments) {
    if (consumedPayments.has(p)) continue;
    if (!p.order_id && !p.mpesa_code) continue; // drop entirely anonymous rows
    const row: ReconciliationRowInsert = {
      run_id: runId,
      dispatched_order_id: null,
      order_id: p.order_id ?? p.mpesa_code ?? p.reference ?? '',
      branch: null,
      rider_name: null,
      platform: null,
      payment_type: 'unknown',
      expected_amount: null,
      matched_payment_id: idMap?.paymentId?.(p) ?? null,
      matched_source: p.source,
      matched_amount: p.amount ?? null,
      matched_mpesa_code: p.mpesa_code ?? null,
      match_status: 'orphan_payment',
      exception_notes: `Payment from ${p.source} did not match any dispatched order. Check if code was entered against the wrong order.`,
    };
    rows.push(row);
  }

  const summary = summarize(rows);
  return { rows, summary };
}

function buildRowForDispatched(
  runId: string,
  ord: DispatchedOrder | DispatchedOrderInsert,
  paymentsByOrder: Map<string, (PaymentRecord | PaymentRecordInsert)[]>,
  paymentsByMpesa: Map<string, PaymentRecord | PaymentRecordInsert>,
  paymentsByReference: Map<string, PaymentRecord | PaymentRecordInsert>,
  _platformByOrder: Map<string, (DispatchedOrder | DispatchedOrderInsert)[]>,
  consumed: Set<PaymentRecord | PaymentRecordInsert>,
  idMap: MatchInput['idMap'],
): ReconciliationRowInsert {
  // Cancelled dispatch -> no payment expected.
  const rawStatus = String(
    (ord as DispatchedOrder).raw && typeof (ord as DispatchedOrder).raw === 'object'
      ? (((ord as DispatchedOrder).raw as Record<string, unknown>)?.status ?? '')
      : '',
  ).toUpperCase();
  if (rawStatus === 'CANCELLED' || rawStatus === 'CANCELED') {
    return baseRow(runId, ord, 'cancelled', null, null, idMap);
  }

  // 1. order_id match.
  const byOrder = paymentsByOrder.get(ord.order_id) ?? [];
  // 2. MPESA code match (dispatched row may have captured the rider's input).
  const byMpesa = ord.mpesa_code_on_dispatch
    ? paymentsByMpesa.get(ord.mpesa_code_on_dispatch)
    : undefined;
  // 3. Reference fallback.
  const byRef = paymentsByReference.get(ord.order_id.toUpperCase());

  const candidates: (PaymentRecord | PaymentRecordInsert)[] = [
    ...byOrder,
    ...(byMpesa ? [byMpesa] : []),
    ...(byRef ? [byRef] : []),
  ];

  if (candidates.length === 0) {
    // No payment found. If the order was marked paid, it's mislabeled cash
    // (finance expected no cash, and indeed there's no cash... but also no
    // online payment, so flag it for investigation).
    if (ord.payment_type === 'paid') {
      const row = baseRow(runId, ord, 'missing_payment', null, null, idMap);
      row.exception_notes = 'Marked paid but no matching online payment found.';
      return row;
    }
    // Cash order with no payment = classic follow-up case.
    return baseRow(runId, ord, 'missing_payment', null, null, idMap);
  }

  // Prefer a candidate whose amount matches the expected amount.
  const exact =
    candidates.find((c) => amountsMatch(ord.expected_amount ?? null, c.amount ?? null)) ??
    candidates[0];
  consumed.add(exact);

  const row = baseRow(runId, ord, 'matched', exact, exact.amount ?? null, idMap);

  // If the order was marked paid but we matched a cash/MPESA payment, flag.
  if (
    ord.payment_type === 'paid' &&
    (exact.source === 'ando_rider_settlement' ||
      exact.source === 'limetray' ||
      exact.source === 'kopokopo')
  ) {
    row.match_status = 'mislabeled_paid';
    row.exception_notes = 'Labelled paid on dispatch but paid in cash/MPESA.';
    return row;
  }

  // If the order was marked cash but matched an online payment, flag.
  if (
    ord.payment_type === 'cash' &&
    (exact.source === 'ando_customer_settlement' ||
      exact.source === 'paystack' ||
      exact.source === 'pesapal')
  ) {
    row.match_status = 'mislabeled_cash';
    row.exception_notes = 'Labelled cash on dispatch but paid online.';
    return row;
  }

  // Amount mismatch.
  if (!amountsMatch(ord.expected_amount ?? null, exact.amount ?? null)) {
    row.match_status = 'amount_mismatch';
    row.exception_notes = `Expected ${formatMoney(
      ord.expected_amount,
    )}, got ${formatMoney(exact.amount ?? null)}.`;
  }

  return row;
}

function baseRow(
  runId: string,
  ord: DispatchedOrder | DispatchedOrderInsert,
  status: MatchStatus,
  match: PaymentRecord | PaymentRecordInsert | null,
  matchedAmount: number | null,
  idMap: MatchInput['idMap'],
): ReconciliationRowInsert {
  return {
    run_id: runId,
    dispatched_order_id: idMap?.dispatchedId?.(ord) ?? null,
    order_id: ord.order_id,
    branch: ord.branch ?? null,
    rider_name: ord.rider_name ?? null,
    platform: ord.platform,
    payment_type: ord.payment_type,
    expected_amount: ord.expected_amount ?? null,
    matched_payment_id: match ? (idMap?.paymentId?.(match) ?? null) : null,
    matched_source: match?.source ?? null,
    matched_amount: matchedAmount,
    matched_mpesa_code: match?.mpesa_code ?? null,
    match_status: status,
    exception_notes: null,
  };
}

function formatMoney(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—';
  return `KES ${Math.round(n).toLocaleString('en-KE')}`;
}

function summarize(rows: readonly ReconciliationRowInsert[]): MatchSummary {
  const totals: Record<MatchStatus, number> = {
    matched: 0,
    amount_mismatch: 0,
    missing_payment: 0,
    no_dispatch: 0,
    cancelled: 0,
    mislabeled_cash: 0,
    mislabeled_paid: 0,
    pesapal_pending: 0,
    orphan_payment: 0,
  };
  for (const r of rows) totals[r.match_status] += 1;
  const total = rows.length;
  const matched = totals.matched;
  const exceptions = total - matched - totals.cancelled; // cancelled is not an exception, it's a no-op
  return { totals, total, matched, exceptions };
}
