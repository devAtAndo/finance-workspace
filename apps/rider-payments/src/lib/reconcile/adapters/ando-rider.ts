// Ando rider-app DB -> payment_records[].
//
// Pulls cash-collection events captured by the rider app (what finance calls
// "rider settlements" on rider.andofoods.co). Each customerpayment row is a
// rider booking that an order was paid for — usually in cash, sometimes via
// a rider-side MPESA terminal.
//
// Canonical order_id is derived from order_order.number (the short string
// customers quote), normalised to match what the other adapters produce.
import 'server-only';

import { queryAndoRider } from '@/lib/db/external-pg';
import { normalizeMpesaCode, shortOrderId } from '../normalize';
import type { PaymentRecordInsert } from '../types';

export interface AndoRiderIngestResult {
  rows: PaymentRecordInsert[];
  rawRowCount: number;
}

/**
 * Pull completed rider-app payments between two timestamps.
 *
 * Dates are inclusive on start, exclusive on end (follows the half-open
 * interval convention we use throughout the pipeline).
 */
export async function ingestAndoRiderSettlements(
  runId: string,
  from: Date,
  to: Date,
): Promise<AndoRiderIngestResult> {
  const sql = `
    select
      cp.id           as payment_id,
      cp.amount       as amount,
      cp.payment_method as payment_method,
      cp.reference_id as reference_id,
      cp.status       as status,
      cp.timestamp    as paid_at,
      o.number        as order_number
    from payments_customerpayment cp
    left join order_order o on o.id = cp.order_id
    where cp.timestamp >= $1 and cp.timestamp < $2
      and lower(cp.status) in ('completed','success','paid')
    order by cp.timestamp asc
  `;
  const { rows } = await queryAndoRider<{
    payment_id: string | number;
    amount: string | number;
    payment_method: string | null;
    reference_id: string | null;
    status: string | null;
    paid_at: Date | string;
    order_number: string | null;
  }>(sql, [from.toISOString(), to.toISOString()]);

  const out: PaymentRecordInsert[] = rows.map((r) => {
    // Reference_id can hold an MPESA code (when payment_method is MPESA) or a
    // KopoKopo / Paystack reference. Heuristic: 10-char alphanumeric -> MPESA.
    const ref = r.reference_id?.trim() ?? null;
    const mpesa = ref && /^[A-Za-z0-9]{10}$/.test(ref) ? normalizeMpesaCode(ref) : null;
    return {
      run_id: runId,
      source: 'ando_rider_settlement',
      order_id: shortOrderId(r.order_number) || null,
      mpesa_code: mpesa,
      reference: ref,
      amount: numericAmount(r.amount),
      paid_at: toIso(r.paid_at),
      status: r.status,
      phone: null,
      raw: r as unknown,
    };
  });

  return { rows: out, rawRowCount: rows.length };
}

function numericAmount(v: string | number | null): number | null {
  if (v === null || v === undefined) return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

function toIso(v: Date | string | null): string | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
