// Supabase email magic-link callback.
// Exchanges ?code=... for a session and redirects into the app.
// Returns 410 when RIDER_CF_ACCESS is on — Cloudflare Access owns identity
// in that mode and Supabase magic-links are rejected outright.

import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getAuthMode } from '@/lib/authDispatcher';

export async function GET(request: Request): Promise<Response> {
  if (getAuthMode() === 'cfaccess') {
    return new Response(
      'Supabase Auth is disabled — Ando Finance uses Cloudflare Access SSO. Visit https://workspace.andofoods.co to sign in.',
      { status: 410, headers: { 'content-type': 'text/plain; charset=utf-8' } },
    );
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
