// Glovo backend CSV export -> dispatched_orders[].
//
// The Glovo export has a two-row header (category band + column names) —
// the existing parseGlovoCsv handles that. We normalise Order IDs (some
// arrive in scientific notation) and keep the full raw row in jsonb.
//
// Glovo is always "online" from our POV — the cash was collected by Glovo
// and they settle us via payout. So payment_type defaults to 'paid' here;
// reconciliation against Glovo settlements is a Phase 2 concern.
import 'server-only';

import type { GlovoRawRow } from '@/lib/types';
import { parseGlovoCsv } from '@/lib/csv-parser';
import { normalizeOrderId, parseAmount, parsePaymentType } from '../normalize';
import type { DispatchedOrderInsert } from '../types';

export interface GlovoIngestResult {
  rows: DispatchedOrderInsert[];
  parseErrors: string[];
  rawRowCount: number;
}

export function ingestGlovoCsv(runId: string, csvText: string): GlovoIngestResult {
  const parsed = parseGlovoCsv(csvText);

  const orderIdHeader = parsed.headers.find(
    (h) => h.toLowerCase() === 'order id' || h.toLowerCase() === 'orderid',
  );
  const paymentTypeHeader = parsed.headers.find((h) => h.toLowerCase() === 'payment type');
  const restaurantHeader = parsed.headers.find((h) => h.toLowerCase() === 'restaurant name');
  const subtotalHeader = parsed.headers.find((h) => h.toLowerCase() === 'subtotal');
  const receivedHeader = parsed.headers.find((h) => h.toLowerCase() === 'order received at');

  const rows: DispatchedOrderInsert[] = [];
  for (const r of parsed.rows as Array<GlovoRawRow & Record<string, unknown>>) {
    if (!orderIdHeader) break;
    const orderId = normalizeOrderId(r[orderIdHeader]);
    if (!orderId) continue;
    // Glovo Payment Type values: "Online", "Cash".
    const paymentType = paymentTypeHeader ? parsePaymentType(r[paymentTypeHeader]) : 'paid';
    rows.push({
      run_id: runId,
      platform: 'glovo',
      order_id: orderId,
      external_order_id: orderId,
      branch: restaurantHeader ? ((r[restaurantHeader] as string) ?? null) : null,
      dispatched_at: null, // Glovo ships fractional-day floats; decode in Phase 2 if needed.
      payment_type: paymentType,
      expected_amount: subtotalHeader ? parseAmount(r[subtotalHeader]) : null,
      mpesa_code_on_dispatch: null,
      rider_name: null,
      rider_username: null,
      raw: {
        ...r,
        _received_col: receivedHeader ? r[receivedHeader] : null,
      } as unknown,
    });
  }
  return { rows, parseErrors: parsed.errors, rawRowCount: parsed.rows.length };
}
