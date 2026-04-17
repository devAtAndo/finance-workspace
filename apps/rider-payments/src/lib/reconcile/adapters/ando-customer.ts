// Ando customer-app DB -> payment_records[].
//
// Pulls online payments captured by the customer app (what finance calls
// "customer settlements" on rider.andofoods.co — Paystack, card, MPESA STK).
// These are the payments that never hit KopoKopo or Pesapal directly because
// the customer paid through our checkout.
import 'server-only';

import { queryAndoCustomer } from '@/lib/db/external-pg';
import { normalizeMpesaCode, shortOrderId } from '../normalize';
import type { PaymentRecordInsert } from '../types';

export interface AndoCustomerIngestResult {
  rows: PaymentRecordInsert[];
  rawRowCount: number;
}

export async function ingestAndoCustomerPayments(
  runId: string,
  from: Date,
  to: Date,
): Promise<AndoCustomerIngestResult> {
  // The customer DB tracks its own order table; we take the order number off
  // order_order to make matching symmetric with the other adapters.
  const sql = `
    select
      p.id                as payment_id,
      p.customer_email    as customer_email,
      p.amount            as amount,
      p.status            as status,
      p.reference         as reference,
      p.payment_provider  as payment_provider,
      p.phone_number      as phone_number,
      p.created_at        as paid_at,
      o.number            as order_number
    from payments_payment p
    left join order_order o on o.id = p.order_id
    where p.created_at >= $1 and p.created_at < $2
      and lower(p.status) in ('completed','success','paid','succeeded')
    order by p.created_at asc
  `;
  const { rows } = await queryAndoCustomer<{
    payment_id: string | number;
    customer_email: string | null;
    amount: string | number;
    status: string | null;
    reference: string | null;
    payment_provider: string | null;
    phone_number: string | null;
    paid_at: Date | string;
    order_number: string | null;
  }>(sql, [from.toISOString(), to.toISOString()]);

  const out: PaymentRecordInsert[] = rows.map((r) => {
    const ref = r.reference?.trim() ?? null;
    const mpesa = ref && /^[A-Za-z0-9]{10}$/.test(ref) ? normalizeMpesaCode(ref) : null;
    return {
      run_id: runId,
      source: 'ando_customer_settlement',
      order_id: shortOrderId(r.order_number) || null,
      mpesa_code: mpesa,
      reference: ref,
      amount: numericAmount(r.amount),
      paid_at: toIso(r.paid_at),
      status: r.status,
      phone: r.phone_number,
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
