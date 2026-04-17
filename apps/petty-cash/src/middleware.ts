import { NextResponse, type NextRequest } from 'next/server';
import { getAuthMode } from '@/lib/authDispatcher';

export const config = {
  matcher: ['/((?!_next/|favicon|public/|.*\\..*).*)'],
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
  if (getAuthMode() !== 'cfaccess') {
    // Legacy dual-run: NextAuth continues to gate at page level via getServerSession.
    return NextResponse.next();
  }

  // V2 path: lazy-import so NextAuth users don't pay the cost.
  const [{ evaluateAccess, verifyCfAccessJwt }, { env }, { iam }] = await Promise.all([
    import('@ando/auth'),
    import('@ando/config/env'),
    import('@ando/db'),
  ]);

  let result;
  try {
    result = await evaluateAccess(req, {
      appSlug: 'petty-cash',
      iam,
      verify: (token) =>
        verifyCfAccessJwt(token, {
          teamDomain: env.CF_ACCESS_TEAM_DOMAIN,
          audience: env.CF_ACCESS_AUD_PETTY_CASH,
        }),
      loginRedirect: (r) => `https://workspace.andofoods.co/?next=${encodeURIComponent(r.url)}`,
      forbiddenRedirect: (r) => new URL('/no-access', r.url).toString(),
    });
  } catch {
    return new NextResponse('petty-cash is temporarily unavailable', { status: 503 });
  }

  if (result.ok) {
    const res = NextResponse.next();
    res.headers.set(
      'x-ando-principal',
      JSON.stringify({
        userId: result.principal.userId,
        email: result.principal.email,
        role: result.principal.role,
      }),
    );
    return res;
  }
  if (result.status === 401 && result.location) {
    return NextResponse.redirect(result.location);
  }
  if (result.status === 403) {
    const dest = result.location ?? new URL('/no-access', req.url).toString();
    return NextResponse.rewrite(dest);
  }
  return new NextResponse(result.reason, { status: result.status });
}
