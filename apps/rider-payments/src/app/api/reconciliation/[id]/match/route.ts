// POST /api/reconciliation/[id]/match
// Runs the matching pipeline against the ingested data and populates
// reconciliation_rows. Idempotent — deletes and rebuilds each time.
import { requireAuth, safeErrorMessage } from '@/lib/api-auth';
import { runMatch, updateRunStatus } from '@/lib/reconcile/run';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;
  const { id: runId } = await params;

  try {
    const summary = await runMatch(runId);
    return Response.json({ ok: true, summary });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    await updateRunStatus(runId, 'error', {
      error_message: safeErrorMessage(msg, 'Matching failed.'),
    });
    return Response.json({ error: safeErrorMessage(msg, 'Matching failed.') }, { status: 500 });
  }
}
