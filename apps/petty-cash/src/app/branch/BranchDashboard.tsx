'use client';
import { useEffect, useState } from 'react';
import { formatKsh } from '@/lib/money';
import { runOcr } from '@/lib/ocr';

type Expense = {
  id: string;
  amount: number;
  description: string;
  receiptUrl: string | null;
  ocrAmount: number | null;
  createdAt: string;
};

type Branch = {
  id: string;
  name: string;
  floatLimit: number;
  currentBalance: number;
  thresholdPct: number;
};

export default function BranchDashboard() {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [pending, setPending] = useState<Expense[]>([]);
  const [openRequest, setOpenRequest] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [ocrBusy, setOcrBusy] = useState(false);
  const [ocrAmount, setOcrAmount] = useState<number | null>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    const res = await fetch('/api/branch/state');
    if (!res.ok) return;
    const data = await res.json();
    setBranch(data.branch);
    setPending(data.pendingExpenses);
    setOpenRequest(data.openRequest);
  }

  useEffect(() => {
    load();
  }, []);

  async function onReceiptChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setOcrAmount(null);
    setOcrText('');
    const file = e.target.files?.[0] || null;
    setReceipt(file);
    if (!file) return;
    setOcrBusy(true);
    try {
      const { amount: a, text } = await runOcr(file);
      setOcrAmount(a);
      setOcrText(text);
      if (a && !amount) setAmount(String(a));
    } catch (err) {
      console.error(err);
    } finally {
      setOcrBusy(false);
    }
  }

  async function submitExpense(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!amount || !description) return setError('Amount and description required');
    setSubmitting(true);
    const fd = new FormData();
    fd.append('amount', amount);
    fd.append('description', description);
    if (receipt) fd.append('receipt', receipt);
    if (ocrAmount !== null) fd.append('ocrAmount', String(ocrAmount));
    if (ocrText) fd.append('ocrText', ocrText);
    const res = await fetch('/api/expenses', { method: 'POST', body: fd });
    setSubmitting(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return setError(j.error || 'Failed to record expense');
    }
    setAmount('');
    setDescription('');
    setReceipt(null);
    setOcrAmount(null);
    setOcrText('');
    const el = document.getElementById('receipt-input') as HTMLInputElement | null;
    if (el) el.value = '';
    load();
  }

  async function submitRequest() {
    setError('');
    const res = await fetch('/api/requests', { method: 'POST' });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return setError(j.error || 'Failed to submit');
    }
    load();
  }

  if (!branch) return <p className="text-slate-500">Loading...</p>;

  const used = branch.floatLimit - branch.currentBalance;
  const usedPct = Math.round((used / branch.floatLimit) * 100);
  const overThreshold = usedPct >= branch.thresholdPct;
  const pendingTotal = pending.reduce((s, e) => s + e.amount, 0);
  const missingReceipts = pending.filter((e) => !e.receiptUrl).length;

  return (
    <div className="space-y-6">
      {/* Float overview */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{branch.name}</h2>
          <span className="text-xs text-slate-500 uppercase tracking-wide">
            {branch.thresholdPct}% threshold
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-5">
          <Stat label="Float limit" value={formatKsh(branch.floatLimit)} />
          <Stat
            label="Current balance"
            value={formatKsh(branch.currentBalance)}
            tone={overThreshold ? 'warn' : 'default'}
          />
          <Stat label="Used" value={`${formatKsh(used)} · ${usedPct}%`} />
        </div>

        <div className="mt-5">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                overThreshold ? 'bg-ando-red' : 'bg-emerald-500'
              }`}
              style={{ width: `${usedPct}%` }}
            />
          </div>
        </div>

        {overThreshold && !openRequest && (
          <div className="mt-4 p-3 bg-ando-red/5 border border-ando-red/20 text-ando-red text-sm rounded-lg">
            You&rsquo;ve used {usedPct}% of your float. Submit a reimbursement request below to
            replenish it.
          </div>
        )}
        {openRequest && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-lg">
            Request pending finance review — {formatKsh(openRequest.totalAmount)}
          </div>
        )}
      </section>

      {/* Record expense */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Record an expense</h3>
        <p className="text-sm text-slate-500 mt-1">
          Upload a receipt — we&rsquo;ll try to read the amount for you.
        </p>

        <form onSubmit={submitExpense} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Amount (Ksh)</span>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ando-red/20 focus:border-ando-red"
              />
              {ocrAmount !== null && (
                <span className="block mt-1 text-xs text-slate-500">
                  OCR detected {formatKsh(ocrAmount)} · edit if wrong
                </span>
              )}
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Description</span>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Office supplies"
                className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ando-red/20 focus:border-ando-red"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Receipt</span>
            <div className="mt-1 flex items-center gap-3">
              <input
                id="receipt-input"
                type="file"
                accept="image/*,application/pdf"
                onChange={onReceiptChange}
                className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
              />
              {ocrBusy && <span className="text-xs text-slate-500">Reading receipt...</span>}
            </div>
          </label>

          {error && <p className="text-sm text-ando-red">{error}</p>}

          <button
            disabled={submitting}
            className="bg-ando-red hover:bg-ando-red-hover text-white px-4 py-2 rounded-md font-medium disabled:opacity-60 transition-colors"
          >
            {submitting ? 'Saving...' : 'Record expense'}
          </button>
        </form>
      </section>

      {/* Pending expenses */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Pending expenses</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Not yet bundled into a reimbursement request.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
            <div className="text-lg font-semibold">{formatKsh(pendingTotal)}</div>
          </div>
        </div>

        {pending.length === 0 ? (
          <p className="text-sm text-slate-500 mt-4">No expenses yet.</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                  <th className="px-4 py-2 font-medium text-right">Amount</th>
                  <th className="px-4 py-2 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pending.map((e) => (
                  <tr key={e.id}>
                    <td className="px-4 py-2.5 text-slate-600">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2.5">{e.description}</td>
                    <td className="px-4 py-2.5 text-right font-medium">{formatKsh(e.amount)}</td>
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
                        <span className="text-ando-red">missing</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button
            onClick={submitRequest}
            disabled={pending.length === 0 || missingReceipts > 0 || !!openRequest}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
          >
            Submit reimbursement request
          </button>
          {missingReceipts > 0 && (
            <span className="text-sm text-ando-red">
              {missingReceipts} expense(s) missing receipts
            </span>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'warn' | 'default' }) {
  return (
    <div>
      <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
      <div
        className={`text-2xl font-semibold mt-1 ${
          tone === 'warn' ? 'text-ando-red' : 'text-slate-900'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
