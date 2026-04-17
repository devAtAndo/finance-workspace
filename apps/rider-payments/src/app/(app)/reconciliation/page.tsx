import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Card } from '@/components/card';
import { formatDate, formatDateTime, formatNumber, isConfigured } from '@/lib/utils';
import type { ReconciliationRun } from '@/lib/reconcile/types';

export const dynamic = 'force-dynamic';

export default async function ReconciliationListPage() {
  if (!isConfigured()) {
    return (
      <div className="rounded-md border border-warning/30 bg-warning/10 p-4 text-sm">
        Supabase env vars not set. See <code>.env.example</code>.
      </div>
    );
  }

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('reconciliation_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const runs = (data ?? []) as unknown as ReconciliationRun[];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Reconciliation runs</h1>
          <p className="text-sm text-muted-foreground">
            Match dispatched orders against collected payments and flag exceptions.
          </p>
        </div>
        <Link
          href="/reconciliation/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:opacity-90"
        >
          <PlusCircle className="w-4 h-4" />
          New run
        </Link>
      </header>

      {error ? (
        <Card>
          <div className="text-sm text-danger">Failed to load runs: {error.message}</div>
        </Card>
      ) : runs.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <h2 className="text-lg font-medium">No reconciliation runs yet</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Create the first run to pull dispatch and payment data.
            </p>
            <Link
              href="/reconciliation/new"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:opacity-90"
            >
              <PlusCircle className="w-4 h-4" />
              New run
            </Link>
          </div>
        </Card>
      ) : (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-2 pr-4">Period</th>
                <th className="py-2 pr-4">Created</th>
                <th className="py-2 pr-4">By</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4 text-right">Dispatched</th>
                <th className="py-2 pr-4 text-right">Matched</th>
                <th className="py-2 pr-4 text-right">Exceptions</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/reconciliation/${run.id}`}
                      className="font-medium hover:underline"
                    >
                      {run.period_label}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(run.period_start)} – {formatDate(run.period_end)}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground text-xs">
                    {formatDateTime(run.created_at)}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground text-xs truncate max-w-[180px]">
                    {run.created_by_email}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={run.status} />
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {formatNumber(run.dispatched_total)}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {formatNumber(run.matched_count)}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {formatNumber(run.exception_count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground border-border',
    ingested: 'bg-warning/10 text-warning border-warning/30',
    matched: 'bg-success/10 text-success border-success/30',
    exported: 'bg-accent/10 text-accent border-accent/30',
    error: 'bg-danger/10 text-danger border-danger/30',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status] ?? ''}`}
    >
      {status}
    </span>
  );
}
