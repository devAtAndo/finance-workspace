// POST /api/reconciliation — create a new reconciliation run.
// GET  /api/reconciliation — list recent runs.
import { z } from 'zod';
import { getCaller, requireAuth, safeErrorMessage } from '@/lib/api-auth';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { createRun } from '@/lib/reconcile/run';
import { formatPeriodLabel } from '@/lib/utils';

export const runtime = 'nodejs';

const CreateSchema = z.object({
  periodStart: z.string().min(1),
  periodEnd: z.string().min(1),
  periodLabel: z.string().optional(),
});

export async function POST(request: Request) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;
  const caller = (await getCaller())!;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input.' },
      { status: 400 },
    );
  }

  try {
    const start = parsed.data.periodStart;
    const end = parsed.data.periodEnd;
    const label = parsed.data.periodLabel ?? formatPeriodLabel(start, end);
    const run = await createRun({
      periodStart: start,
      periodEnd: end,
      periodLabel: label,
      createdBy: caller.userId,
      createdByEmail: caller.email,
    });
    return Response.json({ ok: true, run }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return Response.json(
      { error: safeErrorMessage(msg, 'Failed to create run.') },
      { status: 500 },
    );
  }
}

export async function GET() {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('reconciliation_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ ok: true, runs: data ?? [] });
}
