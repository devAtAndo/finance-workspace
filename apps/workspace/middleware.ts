import { NextResponse, type NextRequest } from 'next/server';
import { evaluateWorkspaceAccess, getJwksFetcher } from '@/lib/auth';
import { env } from '@ando/config/env';
import { flags } from '@ando/config/flags';
import { iam } from '@ando/db';

export const config = {
  matcher: ['/((?!_next/|favicon|no-access|api/test/).*)'],
};

export async function middleware(req: NextRequest) {
  if (!flags.WORKSPACE_ENABLED) {
    return new NextResponse('workspace is disabled', { status: 503 });
  }

  let result;
  try {
    result = await evaluateWorkspaceAccess(req, {
      teamDomain: env.CF_ACCESS_TEAM_DOMAIN,
      audience: env.CF_ACCESS_AUD_WORKSPACE,
      iam,
      jwksFetcher: getJwksFetcher(),
    });
  } catch {
    return new NextResponse('workspace admin temporarily unavailable', { status: 503 });
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
