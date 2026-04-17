// Next.js 16 proxy (replaces middleware).
// Dispatches between the legacy Supabase-session gate and the new
// Cloudflare Access + @ando/auth gate based on RIDER_CF_ACCESS.
// Runtime is forced to nodejs (the only runtime proxy supports in v16).

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getAuthMode } from '@/lib/authDispatcher';

const PUBLIC_PATHS = ['/login', '/auth/callback', '/_next', '/favicon.ico', '/api/health'];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

async function legacySupabaseProxy(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl;
  const response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) return response;

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        for (const { name, value, options } of cookiesToSet)
          response.cookies.set(name, value, options);
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublic(url.pathname)) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('next', url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

async function cfAccessProxy(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl;
  if (isPublic(url.pathname)) return NextResponse.next({ request });

  const [{ evaluateAccess, verifyCfAccessJwt }, { env }, { iam }] = await Promise.all([
    import('@ando/auth'),
    import('@ando/config/env'),
    import('@ando/db'),
  ]);

  let result;
  try {
    result = await evaluateAccess(request, {
      appSlug: 'rider-payments',
      iam,
      verify: (token) =>
        verifyCfAccessJwt(token, {
          teamDomain: env.CF_ACCESS_TEAM_DOMAIN,
          audience: env.CF_ACCESS_AUD_RIDER_PAYMENTS,
        }),
      loginRedirect: (r) => `https://workspace.andofoods.co/?next=${encodeURIComponent(r.url)}`,
      forbiddenRedirect: (r) => new URL('/no-access', r.url).toString(),
    });
  } catch {
    return new NextResponse('rider-payments is temporarily unavailable', { status: 503 });
  }

  if (result.ok) {
    const response = NextResponse.next({ request });
    response.headers.set(
      'x-ando-principal',
      JSON.stringify({
        userId: result.principal.userId,
        email: result.principal.email,
        role: result.principal.role,
      }),
    );
    return response;
  }
  if (result.status === 401 && result.location) {
    return NextResponse.redirect(result.location);
  }
  if (result.status === 403) {
    const dest = result.location ?? new URL('/no-access', request.url).toString();
    return NextResponse.rewrite(dest);
  }
  return new NextResponse(result.reason, { status: result.status });
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  return getAuthMode() === 'cfaccess' ? cfAccessProxy(request) : legacySupabaseProxy(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
};
