// POST /api/reconciliation/[id]/ingest
//
// Accepts multipart/form-data with optional CSV parts for each CSV source
// (looker, uber, glovo, limetray) PLUS date bounds used to query the Ando
// rider-app and customer-app DBs directly.
//
// Clears prior ingestion for the run and re-inserts everything, so the
// endpoint is idempotent — finance can re-upload a fixed CSV and re-run.

import { z } from 'zod';
import { requireAuth, safeErrorMessage } from '@/lib/api-auth';
import { ingestLookerCsv } from '@/lib/reconcile/adapters/looker';
import { ingestUberCsv } from '@/lib/reconcile/adapters/uber';
import { ingestGlovoCsv } from '@/lib/reconcile/adapters/glovo';
import { ingestLimetrayCsv } from '@/lib/reconcile/adapters/limetray';
import { ingestAndoRiderSettlements } from '@/lib/reconcile/adapters/ando-rider';
import { ingestAndoCustomerPayments } from '@/lib/reconcile/adapters/ando-customer';
import { isExternalDbConfigured } from '@/lib/db/external-pg';
import {
  deleteRunChildren,
  insertDispatchedOrders,
  insertPaymentRecords,
  updateRunStatus,
} from '@/lib/reconcile/run';
import type { DispatchedOrderInsert, PaymentRecordInsert } from '@/lib/reconcile/types';

export const runtime = 'nodejs';
export const maxDuration = 60;

const BoundsSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const { id: runId } = await params;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'Expected multipart/form-data.' }, { status: 400 });
  }

  const boundsRaw = {
    from: form.get('from')?.toString() ?? '',
    to: form.get('to')?.toString() ?? '',
  };
  const bounds = BoundsSchema.safeParse(boundsRaw);
  if (!bounds.success) {
    return Response.json(
      { error: 'Missing `from` / `to` date bounds for DB ingestion.' },
      { status: 400 },
    );
  }

  const looker = form.get('looker');
  const uber = form.get('uber');
  const glovo = form.get('glovo');
  const limetray = form.get('limetray');
  const skipAndoRider = form.get('skipAndoRider') === '1';
  const skipAndoCustomer = form.get('skipAndoCustomer') === '1';

  const parseErrors: Record<string, string[]> = {};
  const allDispatched: DispatchedOrderInsert[] = [];
  const allPayments: PaymentRecordInsert[] = [];
  const stats: Record<string, number> = {};

  try {
    if (looker instanceof File) {
      const text = await looker.text();
      const r = ingestLookerCsv(runId, text);
      allDispatched.push(...r.rows);
      parseErrors.looker = r.parseErrors;
      stats.looker = r.rows.length;
    }
    if (uber instanceof File) {
      const text = await uber.text();
      const r = ingestUberCsv(runId, text);
      allDispatched.push(...r.rows);
      parseErrors.uber = r.parseErrors;
      stats.uber = r.rows.length;
    }
    if (glovo instanceof File) {
      const text = await glovo.text();
      const r = ingestGlovoCsv(runId, text);
      allDispatched.push(...r.rows);
      parseErrors.glovo = r.parseErrors;
      stats.glovo = r.rows.length;
    }
    if (limetray instanceof File) {
      const text = await limetray.text();
      const branch = form.get('limetrayBranch')?.toString();
      const r = ingestLimetrayCsv(runId, text, {
        defaultBranch: branch || undefined,
      });
      allDispatched.push(...r.dispatched);
      allPayments.push(...r.payments);
      parseErrors.limetray = r.parseErrors;
      stats.limetray_dispatched = r.dispatched.length;
      stats.limetray_payments = r.payments.length;
    }

    // Direct DB pulls.
    const from = new Date(bounds.data.from);
    const to = new Date(bounds.data.to);
    if (!skipAndoRider && isExternalDbConfigured('rider')) {
      const r = await ingestAndoRiderSettlements(runId, from, to);
      allPayments.push(...r.rows);
      stats.ando_rider = r.rows.length;
    }
    if (!skipAndoCustomer && isExternalDbConfigured('customer')) {
      const r = await ingestAndoCustomerPayments(runId, from, to);
      allPayments.push(...r.rows);
      stats.ando_customer = r.rows.length;
    }

    // Clear previous ingestion for this run and reinsert.
    await deleteRunChildren(runId);
    await insertDispatchedOrders(allDispatched);
    await insertPaymentRecords(allPayments);
    await updateRunStatus(runId, 'ingested');

    return Response.json({ ok: true, stats, parseErrors });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    await updateRunStatus(runId, 'error', {
      error_message: safeErrorMessage(msg, 'Ingestion failed.'),
    });
    return Response.json({ error: safeErrorMessage(msg, 'Ingestion failed.') }, { status: 500 });
  }
}
