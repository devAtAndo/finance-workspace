import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Card } from '@/components/card';
import { formatDate, formatDateTime, formatNumber } from '@/lib/utils';
import {
  MATCH_STATUS_LABELS,
  type MatchStatus,
  type ReconciliationRow,
  type ReconciliationRun,
} from '@/lib/reconcile/types';
import { ReviewTable } from './review-table';

export const dynamic = 'force-dynamic';

export default async function RunDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; resolved?: string }>;
}) {
  const { id } = await params;
  const filters = await searchParams;

  const supabase = await getSupabaseServerClient();
  const { data: run } = await supabase
    .from('reconciliation_runs')
    .select('*')
    .eq('id', id)
    .single();

  if (!run) notFound();
  const typedRun = run as unknown as ReconciliationRun;

  const { data: rowsData } = await supabase
    .from('reconciliation_rows')
    .select('*')
    .eq('run_id', id)
    .order('match_status', { ascending: true })
    .order('order_id', { ascending: true });

  const rows = (rowsData ?? []) as unknown as ReconciliationRow[];

  // Tally status counts for the chips (done client-side to preserve RLS).
  const counts = new Map<MatchStatus, number>();
  for (const r of rows) {
    counts.set(r.match_status, (counts.get(r.match_status) ?? 0) + 1);
  }
  const unresolvedCount = rows.filter(
    (r) => !r.resolved && r.match_status !== 'matched' && r.match_status !== 'cancelled',
  ).length;

  const statusFilter = filters.status as MatchStatus | undefined;
  const resolvedFilter = filters.resolved;
  const visible = rows.filter((r) => {
    if (statusFilter && r.match_status !== statusFilter) return false;
    if (resolvedFilter === '0' && r.resolved) return false;
    if (resolvedFilter === '1' && !r.resolved) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xs text-muted-foreground">
            <Link href="/reconciliation" className="hover:underline">
              Reconciliation runs
            </Link>{' '}
            ›
          </div>
          <h1 className="text-2xl font-semibold">{typedRun.period_label}</h1>
          <p className="text-sm text-muted-foreground">
            {formatDate(typedRun.period_start)} – {formatDate(typedRun.period_end)}
            {' · '}Created {formatDateTime(typedRun.created_at)} by {typedRun.created_by_email}
          </p>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium">Status: {typedRun.status}</div>
          {typedRun.error_message ? (
            <div className="text-danger text-xs">{typedRun.error_message}</div>
          ) : null}
        </div>
      </header>

      <section className="grid grid-cols-4 gap-3">
        <Stat label="Dispatched" value={formatNumber(typedRun.dispatched_total)} />
        <Stat label="Matched" value={formatNumber(typedRun.matched_count)} />
        <Stat label="Exceptions" value={formatNumber(typedRun.exception_count)} />
        <Stat label="Unresolved" value={formatNumber(unresolvedCount)} />
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <FilterChip
            href={`/reconciliation/${id}`}
            active={!statusFilter && !resolvedFilter}
            label={`All (${rows.length})`}
          />
          <FilterChip
            href={`/reconciliation/${id}?resolved=0`}
            active={resolvedFilter === '0' && !statusFilter}
            label={`Unresolved (${unresolvedCount})`}
          />
          <span className="text-muted-foreground">·</span>
          {(Object.keys(MATCH_STATUS_LABELS) as MatchStatus[]).map((s) => {
            const count = counts.get(s) ?? 0;
            if (count === 0) return null;
            const active = statusFilter === s;
            return (
              <FilterChip
                key={s}
                href={`/reconciliation/${id}?status=${s}`}
                active={active}
                label={`${MATCH_STATUS_LABELS[s]} (${count})`}
              />
            );
          })}
        </div>

        <Card>
          {visible.length === 0 ? (
            <div className="py-8 text-sm text-muted-foreground text-center">
              No rows match the current filters.
            </div>
          ) : (
            <ReviewTable rows={visible} />
          )}
        </Card>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={
        active
          ? 'rounded-full border border-primary bg-primary text-primary-foreground px-2.5 py-1'
          : 'rounded-full border border-border px-2.5 py-1 hover:bg-muted'
      }
    >
      {label}
    </Link>
  );
}
