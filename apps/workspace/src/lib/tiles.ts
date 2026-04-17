import type { AppDescriptor, AppSlug } from '@ando/config/apps';

export interface AccessGrant {
  appSlug: AppSlug;
  role: string;
}

export function buildTiles(
  registry: ReadonlyArray<AppDescriptor>,
  access: ReadonlyArray<AccessGrant>,
): AppDescriptor[] {
  const granted = new Set(access.map((a) => a.appSlug));
  return registry.filter((app) => app.slug !== 'workspace' && granted.has(app.slug));
}
