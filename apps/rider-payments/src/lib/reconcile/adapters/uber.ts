// Uber backend CSV export -> dispatched_orders[].
//
// The Uber export can appear in two shapes depending on which screen you
// downloaded it from:
//   1. Order list (trimmed) — OrderDate, Hour, OrderID, Alternate_Id,
//      Restaurant, Location, Platform, TotalSales.
//   2. Finance/Payouts (full) — adds "Payment Type", "Cash Collected",
//      "Subtotal", etc.
//
// We handle both. When the payment-type column is present we use it to
// split cash vs paid; when absent we mark every row as 'unknown' (the
// matching pipeline will then cross-reference with Looker's cash flag).
import 'server-only';

import Papa from 'papaparse';
import { parseAmount, parsePaymentType, shortOrderId } from '../normalize';
import type { DispatchedOrderInsert } from '../types';

export interface UberIngestResult {
  rows: DispatchedOrderInsert[];
  parseErrors: string[];
  rawRowCount: number;
  /** Count of rows filtered out because they looked like non-orders. */
  skipped: number;
}

const CASH_COL_CANDIDATES = ['Payment Type', 'PaymentType', 'Payment Method'];
const AMOUNT_COL_CANDIDATES = ['Cash Collected', 'CashCollected', 'Amount Due', 'TotalSales'];
const DATE_COL_CANDIDATES = ['OrderDate', 'Order Date', 'Date'];

export function ingestUberCsv(runId: string, csvText: string): UberIngestResult {
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
  if (!headers.includes('OrderID') && !headers.includes('Alternate_Id')) {
    errors.push('Uber CSV missing OrderID / Alternate_Id columns.');
  }

  const paymentTypeCol = CASH_COL_CANDIDATES.find((c) => headers.includes(c));
  const amountCol = AMOUNT_COL_CANDIDATES.find((c) => headers.includes(c));
  const dateCol = DATE_COL_CANDIDATES.find((c) => headers.includes(c));

  let skipped = 0;
  const rows: DispatchedOrderInsert[] = [];
  for (const r of parsed.data) {
    const orderId = shortOrderId(r.OrderID ?? r.Alternate_Id ?? '');
    if (!orderId) {
      skipped += 1;
      continue;
    }
    rows.push({
      run_id: runId,
      platform: 'uber',
      order_id: orderId,
      external_order_id: r.Alternate_Id ?? r.OrderID ?? null,
      branch: r.Location ?? r.Restaurant ?? null,
      dispatched_at: dateCol ? parseDateCell(r[dateCol]) : null,
      payment_type: paymentTypeCol ? parsePaymentType(r[paymentTypeCol]) : 'unknown',
      expected_amount: amountCol ? parseAmount(r[amountCol]) : null,
      mpesa_code_on_dispatch: null,
      rider_name: null,
      rider_username: null,
      raw: r as unknown,
    });
  }

  return { rows, parseErrors: errors, rawRowCount: parsed.data.length, skipped };
}

function parseDateCell(raw: unknown): string | null {
  if (!raw) return null;
  const n = Date.parse(String(raw));
  return Number.isNaN(n) ? null : new Date(n).toISOString();
}
