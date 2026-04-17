'use client';
import { useEffect, useState } from 'react';
import { formatKsh } from '@/lib/money';

type Expense = {
  id: string;
  amount: number;
  description: string;
  receiptUrl: string | null;
  ocrAmount: number | null;
};

type Request = {
  id: string;
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  branch: { name: string; floatLimit: number };
  submittedBy: { name: string; email: string };
  expenses: Expense[];
};

export default function FinanceDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pending' | 'history'>('pending');

  async function load() {
    setLoading(true);
    const res = await fetch('/api/requests');
    const data = await res.json();
    setRequests(data.requests || []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const pending = requests.filter((r) => r.status === 'PENDING');
  const history = requests.filter((r) => r.status !== 'PENDING');
  const list = tab === 'pending' ? pending : history;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Reimbursement queue</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Review branch receipts and approve replenishments.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <TabBtn active={tab === 'pending'} onClick={() => setTab('pending')}>
          Pending · {pending.length}
        </TabBtn>
        <TabBtn active={tab === 'history'} onClick={() => setTab('history')}>
          History · {history.length}
        </TabBtn>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 shadow-sm">
          {tab === 'pending' ? 'No requests waiting for review.' : 'No reviewed requests yet.'}
        </div>
      ) : (
        list.map((r) => <RequestCard key={r.id} r={r} onChanged={load} />)
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-sm rounded-md font-medium transition-colors ${
        active
          ? 'bg-slate-900 text-white'
          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: Request['status'] }) {
  const styles = {
    PENDING: 'bg-amber-50 text-amber-800 border border-amber-200',
    APPROVED: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    REJECTED: 'bg-ando-red/10 text-ando-red border border-ando-red/20',
  }[status];
  return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles}`}>{status}</span>;
}

function RequestCard({ r, onChanged }: { r: Request; onChanged: () => void }) {
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function review(action: 'approve' | 'reject') {
    setBusy(true);
    setError('');
    const res = await fetch(`/api/requests/${r.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, notes: notes.trim() || undefined }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return setError(j.error || 'Failed');
    }
    onChanged();
  }

  const mismatched = r.expenses.filter((e) => e.ocrAmount !== null && e.ocrAmount !== e.amount);

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-slate-900">{r.branch.name}</h3>
            <StatusPill status={r.status} />
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {r.submittedBy.name} ·{' '}
            {new Date(r.submittedAt).toLocaleString('en-KE', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
          <div className="text-xl font-semibold">{formatKsh(r.totalAmount)}</div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2 font-medium">Description</th>
              <th className="px-4 py-2 font-medium text-right">Claimed</th>
              <th className="px-4 py-2 font-medium text-right">OCR</th>
              <th className="px-4 py-2 font-medium">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {r.expenses.map((e) => {
              const mismatch = e.ocrAmount !== null && e.ocrAmount !== e.amount;
              return (
                <tr key={e.id}>
                  <td className="px-4 py-2.5">{e.description}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{formatKsh(e.amount)}</td>
                  <td
                    className={`px-4 py-2.5 text-right ${
                      mismatch ? 'text-amber-700 font-medium' : 'text-slate-600'
                    }`}
                  >
                    {e.ocrAmount !== null ? (
                      <>
                        {formatKsh(e.ocrAmount)}
                        {mismatch && <span className="ml-1">⚠</span>}
                      </>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    {e.receiptUrl ? (
                      <a
                        href={e.receiptUrl}
                        target="_blank"
                        className="text-ando-red hover:underline"
                        rel="noreferrer"
                      >
                        view
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {mismatched.length > 0 && r.status === 'PENDING' && (
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mt-3">
          {mismatched.length} expense(s) have OCR amounts that don&rsquo;t match claimed amounts.
          Verify before approving.
        </p>
      )}

      {r.status === 'PENDING' && (
        <div className="mt-5 space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Notes <span className="text-slate-400 font-normal">(required to reject)</span>
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ando-red/20 focus:border-ando-red"
              rows={2}
            />
          </label>
          {error && <p className="text-sm text-ando-red">{error}</p>}
          <div className="flex gap-2">
            <button
              disabled={busy}
              onClick={() => review('approve')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-60 transition-colors"
            >
              Approve &amp; replenish
            </button>
            <button
              disabled={busy || !notes.trim()}
              onClick={() => review('reject')}
              className="bg-white border border-ando-red text-ando-red hover:bg-ando-red hover:text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {r.status !== 'PENDING' && r.notes && (
        <p className="mt-3 text-sm text-slate-600 bg-slate-50 rounded-md px-3 py-2">
          <span className="font-medium">Notes:</span> {r.notes}
        </p>
      )}
    </section>
  );
}
