import { getPrincipal, type LocalPrincipal } from './getPrincipal';

export async function requireAdmin(req?: Request): Promise<LocalPrincipal | null> {
  const principal = await getPrincipal(req ? { req } : {});
  if (!principal || principal.role !== 'ADMIN') return null;
  return principal;
}
