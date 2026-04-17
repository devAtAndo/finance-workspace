// Shared route-guard helpers for /api/* routes.
//
// The proxy already redirects unauthenticated requests to /login (legacy) or
// workspace.andofoods.co (V2), but API routes still need their own check —
// the proxy only gates page navigation.
import 'server-only';
import { getAuthMode } from './authDispatcher';

export interface CallerInfo {
  userId: string;
  email: string;
}

interface CfHeaderPrincipal {
  userId: string;
  email: string;
}

function readCfHeader(req: Request): CfHeaderPrincipal | null {
  const raw = req.headers.get('x-ando-principal');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CfHeaderPrincipal;
    if (!parsed.userId || !parsed.email) return null;
    return { userId: parsed.userId, email: parsed.email };
  } catch {
    return null;
  }
}

async function getCallerSupabase(): Promise<CallerInfo | null> {
  const { getSupabaseServerClient } = await import('@/lib/supabase/server');
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  return { userId: user.id, email: user.email };
}

/**
 * Returns caller info if authenticated, or null if not.
 * All Ando finance team members are trusted — no role check needed beyond the
 * `@andofoods.co` restriction enforced upstream (CF Access policy in V2 mode,
 * Supabase domain whitelist in legacy mode).
 */
export async function getCaller(req?: Request): Promise<CallerInfo | null> {
  if (getAuthMode() === 'cfaccess') {
    if (!req) return null;
    return readCfHeader(req);
  }
  return getCallerSupabase();
}

/**
 * Returns null if the caller is authenticated, or a 401 Response otherwise.
 * Pass the incoming `Request` when running in V2 mode so the principal header
 * can be read.
 *   const unauthorized = await requireAuth(req);
 *   if (unauthorized) return unauthorized;
 */
export async function requireAuth(req?: Request): Promise<Response | null> {
  const caller = await getCaller(req);
  if (caller) return null;
  return Response.json({ error: 'Unauthorized — login required.' }, { status: 401 });
}

/**
 * Return a user-safe error message. Raw Postgres/Supabase messages may leak
 * table or constraint names — prefer a generic message for 500s.
 */
export function safeErrorMessage(raw: string, fallback = 'Internal error') {
  if (!raw || raw.length > 500) return fallback;
  return raw;
}
