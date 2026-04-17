// Golden-case test for the matching pipeline.
// Run with: npx tsx test-fixtures/reconcile-golden.test.ts
//
// Hand-crafts dispatched_orders and payment_records that together exercise
// every MatchStatus we care about, then asserts the pipeline tags each one
// correctly. This is the safety net for the whole automation.

import assert from 'node:assert/strict';
import { matchDispatchedAgainstPayments } from '../src/lib/reconcile/match';
import type { DispatchedOrderInsert, PaymentRecordInsert } from '../src/lib/reconcile/types';

const RUN = 'test-run';

function d(partial: Partial<DispatchedOrderInsert>): DispatchedOrderInsert {
  return {
    run_id: RUN,
    platform: 'ando',
    order_id: 'XXXXX',
    external_order_id: null,
    branch: 'NSK NRB',
    dispatched_at: null,
    payment_type: 'cash',
    expected_amount: null,
    mpesa_code_on_dispatch: null,
    rider_name: null,
    rider_username: null,
    raw: null,
    ...partial,
  };
}

function p(partial: Partial<PaymentRecordInsert>): PaymentRecordInsert {
  return {
    run_id: RUN,
    source: 'kopokopo',
    order_id: null,
    mpesa_code: null,
    reference: null,
    amount: null,
    paid_at: null,
    status: 'completed',
    phone: null,
    raw: null,
    ...partial,
  };
}

const ando: DispatchedOrderInsert[] = [
  // 1. Clean cash match via order_id.
  d({ order_id: 'A0001', payment_type: 'cash', expected_amount: 1000 }),
  // 2. Amount mismatch — payment exists but it's 800 not 1000.
  d({ order_id: 'A0002', payment_type: 'cash', expected_amount: 1000 }),
  // 3. Missing cash payment — no payment_records entry at all.
  d({ order_id: 'A0003', payment_type: 'cash', expected_amount: 1500 }),
  // 4. Mislabeled cash — order was marked cash but paid online via Paystack.
  d({ order_id: 'A0004', payment_type: 'cash', expected_amount: 2000 }),
  // 5. Mislabeled paid — order marked paid but a cash receipt showed up.
  d({ order_id: 'A0005', payment_type: 'paid', expected_amount: 0 }),
  // 6. Cancelled dispatch (raw.status='CANCELLED') — should be ignored.
  d({
    order_id: 'A0006',
    payment_type: 'cash',
    expected_amount: 500,
    raw: { status: 'CANCELLED' },
  }),
  // 7. Match via MPESA code on dispatch (rider entered it at POS).
  d({
    order_id: 'A0007',
    payment_type: 'cash',
    expected_amount: 1200,
    mpesa_code_on_dispatch: 'SFB5C2A8QN',
  }),
];

const uberDispatched: DispatchedOrderInsert[] = [
  // 8. Order present on Uber but missing from Ando -> no_dispatch.
  d({ order_id: 'U0008', platform: 'uber', payment_type: 'cash', expected_amount: 900 }),
];

const payments: PaymentRecordInsert[] = [
  // matches A0001 cleanly
  p({ source: 'ando_rider_settlement', order_id: 'A0001', amount: 1000, reference: 'CASH-A0001' }),
  // matches A0002 but amount differs
  p({ source: 'ando_rider_settlement', order_id: 'A0002', amount: 800 }),
  // A0003 deliberately has no payment
  // A0004 shows up as Paystack (mislabeled cash)
  p({ source: 'paystack', order_id: 'A0004', amount: 2000, reference: 'psk_abc' }),
  // A0005 has a cash payment (mislabeled paid)
  p({ source: 'ando_rider_settlement', order_id: 'A0005', amount: 500 }),
  // A0007 matched via MPESA code rather than order_id
  p({ source: 'kopokopo', mpesa_code: 'SFB5C2A8QN', amount: 1200, reference: 'K-xyz' }),
  // orphan payment: no matching dispatch anywhere
  p({ source: 'kopokopo', mpesa_code: 'ORPHAN0001', amount: 700, reference: 'K-orphan' }),
];

const { rows, summary } = matchDispatchedAgainstPayments({
  runId: RUN,
  andoDispatched: ando,
  platformDispatched: uberDispatched,
  payments,
});

const byOrder = new Map(rows.map((r) => [r.order_id, r]));

assert.equal(byOrder.get('A0001')?.match_status, 'matched', 'A0001 matched');
assert.equal(byOrder.get('A0002')?.match_status, 'amount_mismatch', 'A0002 amount mismatch');
assert.equal(byOrder.get('A0003')?.match_status, 'missing_payment', 'A0003 missing');
assert.equal(byOrder.get('A0004')?.match_status, 'mislabeled_cash', 'A0004 mislabeled cash');
assert.equal(byOrder.get('A0005')?.match_status, 'mislabeled_paid', 'A0005 mislabeled paid');
assert.equal(byOrder.get('A0006')?.match_status, 'cancelled', 'A0006 cancelled');
assert.equal(byOrder.get('A0007')?.match_status, 'matched', 'A0007 matched via mpesa');
assert.equal(byOrder.get('U0008')?.match_status, 'no_dispatch', 'U0008 no ando dispatch');

// Orphan payment should appear as its own row using its MPESA code as identifier.
const orphan = rows.find((r) => r.match_status === 'orphan_payment');
assert.ok(orphan, 'orphan payment row produced');
assert.equal(orphan!.matched_mpesa_code, 'ORPHAN0001');

assert.equal(summary.total, rows.length);
assert.equal(summary.matched, 2);
assert.ok(summary.exceptions > 0);

console.log(
  `OK — ${rows.length} rows; matched=${summary.matched}, exceptions=${summary.exceptions}`,
);
for (const r of rows) {
  console.log(
    `  ${r.order_id.padEnd(8)} ${r.match_status.padEnd(18)} ${r.matched_source ?? '—'} ${r.exception_notes ?? ''}`,
  );
}
