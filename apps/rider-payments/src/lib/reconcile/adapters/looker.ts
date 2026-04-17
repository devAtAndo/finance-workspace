// Looker Studio export -> dispatched_orders[] rows.
//
// The Looker "auditing" CSV is the canonical list of dispatched orders. We
// reuse the existing csv-parser and map each row to the normalized shape.
import 'server-only';

import type { AuditingRow } from '@/lib/types';
import { parseAuditingCsv } from '@/lib/csv-parser';
import { parseAmount, parseLookerTimestamp, parsePaymentType, shortOrderId } from '../normalize';
import type { DispatchedOrderInsert } from '../types';

export interface LookerIngestResult {
  rows: DispatchedOrderInsert[];
  parseErrors: string[];
  rawRowCount: number;
}

export function ingestLookerCsv(runId: string, csvText: string): LookerIngestResult {
  const parsed = parseAuditingCsv(csvText);
  const rows: DispatchedOrderInsert[] = parsed.rows.map((r) => toDispatched(runId, r));
  return { rows, parseErrors: parsed.errors, rawRowCount: parsed.rows.length };
}

function toDispatched(runId: string, row: AuditingRow): DispatchedOrderInsert {
  const orderId = shortOrderId(row.order_id);
  // Looker's `payment_status` is literal "UNPAID" / "PAID" / special tags.
  // Special tags (Pick-up, Replacements, etc.) are not cash vs paid — treat
  // as 'unknown' and rely on the match stage to handle them separately.
  const status = String(row.payment_status ?? '')
    .trim()
    .toLowerCase();
  const isSpecial =
    status === 'pick-up' ||
    status === 'staff drop-off' ||
    status === 'replacements' ||
    status === 'central stores dispatch';
  const paymentType = isSpecial ? 'unknown' : parsePaymentType(row.payment_status);

  // order_amount on Looker is the *cash due*. 0 when the order was paid online.
  const expected = paymentType === 'cash' ? parseAmount(row.order_amount) : 0;

  return {
    run_id: runId,
    platform: 'ando',
    order_id: orderId,
    external_order_id: String(row.order_id ?? '') || null,
    branch: row.kitchen_name ?? null,
    dispatched_at: parseLookerTimestamp(row.order_accepted_time),
    payment_type: paymentType,
    expected_amount: expected,
    mpesa_code_on_dispatch: null,
    rider_name: row.rider_name ?? null,
    rider_username: row.rider_username ?? null,
    raw: row as unknown,
  };
}
