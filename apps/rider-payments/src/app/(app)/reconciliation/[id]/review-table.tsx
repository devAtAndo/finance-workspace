'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  MATCH_STATUS_LABELS,
  type MatchStatus,
  type ReconciliationRow,
} from '@/lib/reconcile/types';
import { formatMoney } from '@/lib/utils';

export function ReviewTable({ rows }: { rows: ReconciliationRow[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
          <th className="py-2 pr-3">Order</th>
          <th className="py-2 pr-3">Branch</th>
          <th className="py-2 pr-3">Payment</th>
          <th className="py-2 pr-3 text-right">Expected</th>
          <th className="py-2 pr-3 text-right">Got</th>
          <th className="py-2 pr-3">Source</th>
          <th className="py-2 pr-3">Status</th>
          <th className="py-2 pr-3"></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  );
}

function Row({ row }: { row: ReconciliationRow }) {
  const [note, setNote] = useState(row.exception_notes ?? '');
  const [resolved, setResolved] = useState(row.resolved);
  const [pending, start] = useTransition();
  const router = useRouter();

  async function toggleResolved() {
    const next = !resolved;
    setResolved(next);
    start(async () => {
      const res = await fetch(`/api/reconciliation/rows/${row.id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolved: next, note: note || undefined }),
      });
      if (!res.ok) {
        // Revert on failure.
        setResolved(!next);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <tr
      className={
        row.resolved
          ? 'opacity-60 border-b border-border last:border-0'
          : 'border-b border-border last:border-0'
      }
    >
      <td className="py-2 pr-3 font-mono tabular-nums text-xs">
        {row.order_id}
        {row.rider_name ? (
          <div className="text-[10px] text-muted-foreground">{row.rider_name}</div>
        ) : null}
      </td>
      <td className="py-2 pr-3 text-xs">{row.branch ?? '—'}</td>
      <td className="py-2 pr-3 text-xs capitalize">{row.payment_type}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{formatMoney(row.expected_amount)}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{formatMoney(row.matched_amount)}</td>
      <td className="py-2 pr-3 text-xs">
        {row.matched_source ? (
          <>
            <div>{row.matched_source}</div>
            {row.matched_mpesa_code ? (
              <div className="font-mono text-[10px] text-muted-foreground">
                {row.matched_mpesa_code}
              </div>
            ) : null}
          </>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
      <td className="py-2 pr-3">
        <StatusBadge status={row.match_status} />
        {row.exception_notes && !resolved ? (
          <div className="text-[10px] text-muted-foreground mt-0.5 max-w-[240px]">
            {row.exception_notes}
          </div>
        ) : null}
      </td>
      <td className="py-2 pr-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="text-xs rounded border border-border bg-background px-2 py-1 w-28"
          />
          <button
            type="button"
            disabled={pending}
            onClick={toggleResolved}
            className={
              resolved
                ? 'text-xs rounded border border-border px-2 py-1 hover:bg-muted'
                : 'text-xs rounded border border-primary bg-primary text-primary-foreground px-2 py-1 hover:opacity-90 disabled:opacity-50'
            }
          >
            {resolved ? 'Reopen' : 'Resolve'}
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: MatchStatus }) {
  const tone: Record<MatchStatus, string> = {
    matched: 'bg-success/10 text-success border-success/30',
    amount_mismatch: 'bg-warning/10 text-warning border-warning/30',
    missing_payment: 'bg-danger/10 text-danger border-danger/30',
    no_dispatch: 'bg-danger/10 text-danger border-danger/30',
    cancelled: 'bg-muted text-muted-foreground border-border',
    mislabeled_cash: 'bg-warning/10 text-warning border-warning/30',
    mislabeled_paid: 'bg-warning/10 text-warning border-warning/30',
    pesapal_pending: 'bg-accent/10 text-accent border-accent/30',
    orphan_payment: 'bg-danger/10 text-danger border-danger/30',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${tone[status]}`}
    >
      {MATCH_STATUS_LABELS[status]}
    </span>
  );
}
