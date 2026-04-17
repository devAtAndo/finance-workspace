// Server-side helpers that wrap the whole reconciliation flow: create a run,
// ingest sources into Supabase, execute the matching pipeline, persist rows.
import 'server-only';

import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { matchDispatchedAgainstPayments, type MatchSummary } from './match';
import type {
  DispatchedOrder,
  DispatchedOrderInsert,
  PaymentRecord,
  PaymentRecordInsert,
  ReconciliationRow,
  ReconciliationRowInsert,
  ReconciliationStatus,
} from './types';

export interface CreateRunInput {
  periodStart: string;
  periodEnd: string;
  periodLabel: string;
  createdBy: string;
  createdByEmail: string;
}

export async function createRun(input: CreateRunInput) {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from('reconciliation_runs')
    .insert({
      period_start: input.periodStart,
      period_end: input.periodEnd,
      period_label: input.periodLabel,
      created_by: input.createdBy,
      created_by_email: input.createdByEmail,
      status: 'draft' as ReconciliationStatus,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function updateRunStatus(
  runId: string,
  status: ReconciliationStatus,
  patch: Partial<{
    dispatched_total: number;
    matched_count: number;
    exception_count: number;
    error_message: string | null;
    exported_sheet_url: string | null;
  }> = {},
) {
  const admin = getSupabaseAdminClient();
  const { error } = await admin
    .from('reconciliation_runs')
    .update({ status, ...patch })
    .eq('id', runId);
  if (error) throw error;
}

export async function insertDispatchedOrders(
  rows: DispatchedOrderInsert[],
): Promise<DispatchedOrder[]> {
  if (rows.length === 0) return [];
  const admin = getSupabaseAdminClient();
  // Batch in chunks of 500 — Supabase rejects very large single inserts.
  const out: DispatchedOrder[] = [];
  for (const chunk of chunked(rows, 500)) {
    const { data, error } = await admin.from('dispatched_orders').insert(chunk).select('*');
    if (error) throw error;
    out.push(...((data ?? []) as unknown as DispatchedOrder[]));
  }
  return out;
}

export async function insertPaymentRecords(rows: PaymentRecordInsert[]): Promise<PaymentRecord[]> {
  if (rows.length === 0) return [];
  const admin = getSupabaseAdminClient();
  const out: PaymentRecord[] = [];
  for (const chunk of chunked(rows, 500)) {
    const { data, error } = await admin.from('payment_records').insert(chunk).select('*');
    if (error) throw error;
    out.push(...((data ?? []) as unknown as PaymentRecord[]));
  }
  return out;
}

export async function insertReconciliationRows(rows: ReconciliationRowInsert[]): Promise<void> {
  if (rows.length === 0) return;
  const admin = getSupabaseAdminClient();
  for (const chunk of chunked(rows, 500)) {
    const { error } = await admin.from('reconciliation_rows').insert(chunk);
    if (error) throw error;
  }
}

export async function deleteRunChildren(runId: string): Promise<void> {
  // Cascade on reconciliation_runs handles dispatched_orders/payment_records,
  // but reconciliation_rows depends on payment id FKs being valid — rebuild
  // from scratch by clearing first.
  const admin = getSupabaseAdminClient();
  await admin.from('reconciliation_rows').delete().eq('run_id', runId);
  await admin.from('payment_records').delete().eq('run_id', runId);
  await admin.from('dispatched_orders').delete().eq('run_id', runId);
}

/**
 * End-to-end: given already-inserted dispatched_orders and payment_records
 * for a run, compute reconciliation_rows, persist them, and update the run
 * status to 'matched'.
 */
export async function runMatch(runId: string): Promise<MatchSummary> {
  const admin = getSupabaseAdminClient();
  const { data: dispatched, error: dErr } = await admin
    .from('dispatched_orders')
    .select('*')
    .eq('run_id', runId);
  if (dErr) throw dErr;
  const { data: payments, error: pErr } = await admin
    .from('payment_records')
    .select('*')
    .eq('run_id', runId);
  if (pErr) throw pErr;

  const dispatchedRows = (dispatched ?? []) as unknown as DispatchedOrder[];
  const paymentRows = (payments ?? []) as unknown as PaymentRecord[];

  const andoDispatched = dispatchedRows.filter((d) => d.platform === 'ando');
  const platformDispatched = dispatchedRows.filter((d) => d.platform !== 'ando');

  const { rows, summary } = matchDispatchedAgainstPayments({
    runId,
    andoDispatched,
    platformDispatched,
    payments: paymentRows,
    idMap: {
      dispatchedId: (o) => (o as DispatchedOrder).id ?? null,
      paymentId: (p) => (p as PaymentRecord).id ?? null,
    },
  });

  // Replace existing rows to support re-runs.
  await admin.from('reconciliation_rows').delete().eq('run_id', runId);
  await insertReconciliationRows(rows);

  await updateRunStatus(runId, 'matched', {
    dispatched_total: summary.total,
    matched_count: summary.matched,
    exception_count: summary.exceptions,
  });

  return summary;
}

export async function listReconciliationRows(runId: string): Promise<ReconciliationRow[]> {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin.from('reconciliation_rows').select('*').eq('run_id', runId);
  if (error) throw error;
  return (data ?? []) as unknown as ReconciliationRow[];
}

function* chunked<T>(arr: readonly T[], size: number): Generator<T[]> {
  for (let i = 0; i < arr.length; i += size) yield arr.slice(i, i + size);
}
