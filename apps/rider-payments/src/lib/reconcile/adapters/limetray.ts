// Limetray POS CSV export -> dispatched_orders[] AND payment_records[].
//
// Limetray is our in-store POS. Each branch exports a CSV with at minimum:
//   - Order ID (the canonical 5-char id)
//   - MPESA code (typed in by the cashier at checkout)
//   - Amount
//
// Because Limetray captures BOTH the dispatched order AND the rider/customer
// payment on the same row, we emit into both tables: a dispatched_orders
// entry (platform='limetray') and a payment_records entry (source='limetray')
// when an MPESA code is present.
import 'server-only';

import Papa from 'papaparse';
import { normalizeMpesaCode, parseAmount, parsePaymentType, shortOrderId } from '../normalize';
import type { DispatchedOrderInsert, PaymentRecordInsert } from '../types';

export interface LimetrayIngestResult {
  dispatched: DispatchedOrderInsert[];
  payments: PaymentRecordInsert[];
  parseErrors: string[];
  rawRowCount: number;
}

// Header name candidates (Limetray CSV column labels vary by export view).
const ORDER_ID_HEADERS = ['Order ID', 'OrderID', 'Order Number', 'Receipt Number', 'Reference'];
const MPESA_HEADERS = [
  'MPESA Code',
  'MPesa Code',
  'Mpesa Code',
  'Transaction Code',
  'Txn Code',
  'Payment Reference',
];
const AMOUNT_HEADERS = ['Amount', 'Total', 'Order Value', 'Grand Total'];
const PAYMENT_TYPE_HEADERS = ['Payment Type', 'Payment Method', 'Mode'];
const BRANCH_HEADERS = ['Branch', 'Store', 'Outlet', 'Kitchen'];
const DATE_HEADERS = ['Order Date', 'Date', 'Created At', 'Invoice Date'];

function pickHeader(headers: string[], candidates: string[]): string | undefined {
  const set = new Set(headers.map((h) => h.toLowerCase()));
  for (const c of candidates) {
    if (set.has(c.toLowerCase())) {
      return headers.find((h) => h.toLowerCase() === c.toLowerCase());
    }
  }
  return undefined;
}

export function ingestLimetrayCsv(
  runId: string,
  csvText: string,
  options?: { defaultBranch?: string },
): LimetrayIngestResult {
  const errors: string[] = [];
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });

  if (parsed.errors.length > 0) {
    for (const err of parsed.errors.slice(0, 10)) {
      errors.push(`Row ${err.row ?? '?'}: ${err.message}`);
    }
  }

  const headers = parsed.meta.fields?.map((h) => h.trim()) ?? [];
  const orderIdCol = pickHeader(headers, ORDER_ID_HEADERS);
  const mpesaCol = pickHeader(headers, MPESA_HEADERS);
  const amountCol = pickHeader(headers, AMOUNT_HEADERS);
  const paymentTypeCol = pickHeader(headers, PAYMENT_TYPE_HEADERS);
  const branchCol = pickHeader(headers, BRANCH_HEADERS);
  const dateCol = pickHeader(headers, DATE_HEADERS);

  if (!orderIdCol) errors.push('Limetray CSV missing an Order ID column.');
  if (!amountCol) errors.push('Limetray CSV missing an Amount column.');

  const dispatched: DispatchedOrderInsert[] = [];
  const payments: PaymentRecordInsert[] = [];

  for (const r of parsed.data) {
    const orderId = orderIdCol ? shortOrderId(r[orderIdCol]) : '';
    if (!orderId) continue;

    const amount = amountCol ? parseAmount(r[amountCol]) : null;
    const paymentType = paymentTypeCol ? parsePaymentType(r[paymentTypeCol]) : 'unknown';
    const branch = branchCol
      ? (r[branchCol] ?? options?.defaultBranch ?? null)
      : (options?.defaultBranch ?? null);
    const date = dateCol ? parseDate(r[dateCol]) : null;
    const mpesa = mpesaCol ? normalizeMpesaCode(r[mpesaCol]) : null;

    dispatched.push({
      run_id: runId,
      platform: 'limetray',
      order_id: orderId,
      external_order_id: orderIdCol ? (r[orderIdCol] ?? null) : null,
      branch,
      dispatched_at: date,
      payment_type: paymentType,
      expected_amount: amount,
      mpesa_code_on_dispatch: mpesa,
      rider_name: null,
      rider_username: null,
      raw: r as unknown,
    });

    if (mpesa) {
      payments.push({
        run_id: runId,
        source: 'limetray',
        order_id: orderId,
        mpesa_code: mpesa,
        reference: null,
        amount,
        paid_at: date,
        status: 'completed',
        phone: null,
        raw: r as unknown,
      });
    }
  }

  return {
    dispatched,
    payments,
    parseErrors: errors,
    rawRowCount: parsed.data.length,
  };
}

function parseDate(raw: unknown): string | null {
  if (!raw) return null;
  const n = Date.parse(String(raw));
  return Number.isNaN(n) ? null : new Date(n).toISOString();
}
