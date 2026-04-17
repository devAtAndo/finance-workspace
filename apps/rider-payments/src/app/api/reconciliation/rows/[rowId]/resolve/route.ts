// POST /api/reconciliation/rows/[rowId]/resolve
// Mark a reconciliation row as resolved, with an optional note.
import { z } from 'zod';
import { getCaller, requireAuth, safeErrorMessage } from '@/lib/api-auth';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const BodySchema = z.object({
  resolved: z.boolean(),
  note: z.string().max(2000).optional(),
});

export async function POST(request: Request, { params }: { params: Promise<{ rowId: string }> }) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;
  const caller = (await getCaller())!;
  const { rowId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid body.' }, { status: 400 });
  }

  try {
    const admin = getSupabaseAdminClient();
    const { error } = await admin
      .from('reconciliation_rows')
      .update({
        resolved: parsed.data.resolved,
        resolved_by: parsed.data.resolved ? caller.email : null,
        resolved_at: parsed.data.resolved ? new Date().toISOString() : null,
        exception_notes: parsed.data.note ?? null,
      })
      .eq('id', rowId);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return Response.json(
      { error: safeErrorMessage(msg, 'Failed to update row.') },
      { status: 500 },
    );
  }
}
