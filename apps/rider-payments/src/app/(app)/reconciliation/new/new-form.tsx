'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatPeriodLabel } from '@/lib/utils';

type Step = 'idle' | 'creating' | 'ingesting' | 'matching' | 'done' | 'error';

export function NewReconciliationForm() {
  const router = useRouter();
  const [periodStart, setPeriodStart] = useState(defaultDate(-1));
  const [periodEnd, setPeriodEnd] = useState(defaultDate(-1));
  const [looker, setLooker] = useState<File | null>(null);
  const [uber, setUber] = useState<File | null>(null);
  const [glovo, setGlovo] = useState<File | null>(null);
  const [limetray, setLimetray] = useState<File | null>(null);
  const [limetrayBranch, setLimetrayBranch] = useState('');
  const [skipAndoRider, setSkipAndoRider] = useState(false);
  const [skipAndoCustomer, setSkipAndoCustomer] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      // 1. Create the run.
      setStep('creating');
      const label = formatPeriodLabel(periodStart, periodEnd);
      const createRes = await fetch('/api/reconciliation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          periodStart,
          periodEnd,
          periodLabel: label,
        }),
      });
      if (!createRes.ok) throw new Error(await errText(createRes));
      const created = (await createRes.json()) as { run: { id: string } };
      const runId = created.run.id;

      // 2. Ingest sources.
      setStep('ingesting');
      const form = new FormData();
      form.set('from', dayStartIso(periodStart));
      form.set('to', dayEndIso(periodEnd));
      if (looker) form.set('looker', looker);
      if (uber) form.set('uber', uber);
      if (glovo) form.set('glovo', glovo);
      if (limetray) {
        form.set('limetray', limetray);
        if (limetrayBranch) form.set('limetrayBranch', limetrayBranch);
      }
      if (skipAndoRider) form.set('skipAndoRider', '1');
      if (skipAndoCustomer) form.set('skipAndoCustomer', '1');
      const ingestRes = await fetch(`/api/reconciliation/${runId}/ingest`, {
        method: 'POST',
        body: form,
      });
      if (!ingestRes.ok) throw new Error(await errText(ingestRes));

      // 3. Run match.
      setStep('matching');
      const matchRes = await fetch(`/api/reconciliation/${runId}/match`, {
        method: 'POST',
      });
      if (!matchRes.ok) throw new Error(await errText(matchRes));

      setStep('done');
      router.push(`/reconciliation/${runId}`);
    } catch (err) {
      setStep('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  const busy = step === 'creating' || step === 'ingesting' || step === 'matching';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <section className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="block font-medium">Period start</span>
          <input
            type="date"
            required
            value={periodStart}
            onChange={(e) => setPeriodStart(e.target.value)}
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="block font-medium">Period end</span>
          <input
            type="date"
            required
            value={periodEnd}
            onChange={(e) => setPeriodEnd(e.target.value)}
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </label>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium">CSV uploads</h2>
        <FileField
          label="Looker Studio — dispatched orders"
          help="Auditing export. Required for the matching to have a dispatch side."
          onFile={setLooker}
        />
        <FileField
          label="Uber — order list"
          help="Optional. Used to detect orders that exist on Uber but not in Ando dispatch."
          onFile={setUber}
        />
        <FileField
          label="Glovo — order report"
          help="Optional. Parsed as-is; Glovo orders are kept in a separate namespace."
          onFile={setGlovo}
        />
        <FileField
          label="Limetray POS"
          help="Optional. One CSV per branch — set the branch name below so orphan Order IDs can be tagged."
          onFile={setLimetray}
        />
        {limetray ? (
          <label className="block text-sm">
            <span className="block font-medium">Limetray branch</span>
            <input
              type="text"
              placeholder="e.g. NSK NRB"
              value={limetrayBranch}
              onChange={(e) => setLimetrayBranch(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
        ) : null}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Direct DB pulls</h2>
        <p className="text-xs text-muted-foreground">
          The app pulls rider-side and customer-side payments from rider.andofoods.co Postgres
          directly — no export needed.
        </p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={skipAndoRider}
            onChange={(e) => setSkipAndoRider(e.target.checked)}
          />
          Skip Ando rider settlements
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={skipAndoCustomer}
            onChange={(e) => setSkipAndoCustomer(e.target.checked)}
          />
          Skip Ando customer payments
        </label>
      </section>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
        >
          {busy ? labelForStep(step) : 'Create & run'}
        </button>
        <ProgressBreadcrumb step={step} />
      </div>

      {error ? <div className="text-sm text-danger">{error}</div> : null}
    </form>
  );
}

function FileField({
  label,
  help,
  onFile,
}: {
  label: string;
  help: string;
  onFile: (f: File | null) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="block font-medium">{label}</span>
      <span className="block text-xs text-muted-foreground mb-1">{help}</span>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        className="block w-full text-xs text-muted-foreground
          file:mr-3 file:rounded-md file:border-0 file:bg-muted
          file:px-3 file:py-1.5 file:text-xs file:font-medium
          file:text-foreground hover:file:bg-muted/80"
      />
    </label>
  );
}

function ProgressBreadcrumb({ step }: { step: Step }) {
  const order: Step[] = ['creating', 'ingesting', 'matching', 'done'];
  return (
    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
      {order.map((s, i) => (
        <span key={s} className="flex items-center gap-1.5">
          <span
            className={
              step === s
                ? 'font-medium text-foreground'
                : order.indexOf(step) > i
                  ? 'text-success'
                  : ''
            }
          >
            {labelForStep(s)}
          </span>
          {i < order.length - 1 ? <span>›</span> : null}
        </span>
      ))}
    </div>
  );
}

function labelForStep(step: Step): string {
  switch (step) {
    case 'creating':
      return 'Creating';
    case 'ingesting':
      return 'Ingesting';
    case 'matching':
      return 'Matching';
    case 'done':
      return 'Done';
    case 'error':
      return 'Error';
    default:
      return 'Create & run';
  }
}

async function errText(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: string };
    return j.error ?? `${res.status} ${res.statusText}`;
  } catch {
    return `${res.status} ${res.statusText}`;
  }
}

function defaultDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function dayStartIso(ymd: string): string {
  return new Date(`${ymd}T00:00:00Z`).toISOString();
}

function dayEndIso(ymd: string): string {
  // Exclusive upper bound — start of the NEXT day.
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString();
}
