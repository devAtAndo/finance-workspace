import { redirect } from 'next/navigation';
import { getPrincipal, type LocalPrincipal } from './getPrincipal';

export interface RequireOrRedirectOpts {
  redirectTo?: string;
  req?: Request;
}

export async function requirePrincipalOrRedirect(
  opts: RequireOrRedirectOpts = {},
): Promise<LocalPrincipal> {
  const p = await getPrincipal(opts.req ? { req: opts.req } : {});
  if (!p) redirect(opts.redirectTo ?? '/login');
  return p;
}
