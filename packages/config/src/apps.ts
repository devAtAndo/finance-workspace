import { UnknownAppError } from './errors.js';

export type AppSlug = 'workspace' | 'petty-cash' | 'rider-payments';

export interface AppDescriptor {
  readonly slug: AppSlug;
  readonly displayName: string;
  readonly subdomain: string;
  readonly tileDescription: string;
  readonly cfAccessAudEnvKey: string;
}

const registry: readonly AppDescriptor[] = Object.freeze([
  Object.freeze({
    slug: 'workspace',
    displayName: 'Workspace',
    subdomain: 'workspace.andofoods.co',
    tileDescription: 'Launcher, profile, and admin for Ando Finance.',
    cfAccessAudEnvKey: 'CF_ACCESS_AUD_WORKSPACE',
  }),
  Object.freeze({
    slug: 'petty-cash',
    displayName: 'Petty Cash',
    subdomain: 'petty-cash.andofoods.co',
    tileDescription: 'Record, approve, and reconcile branch petty-cash spend.',
    cfAccessAudEnvKey: 'CF_ACCESS_AUD_PETTY_CASH',
  }),
  Object.freeze({
    slug: 'rider-payments',
    displayName: 'Rider Payments',
    subdomain: 'rider-payments.andofoods.co',
    tileDescription: 'Reconcile rider payouts against Ando production data.',
    cfAccessAudEnvKey: 'CF_ACCESS_AUD_RIDER_PAYMENTS',
  }),
] as const);

export const apps = registry;

export function getApp(slug: AppSlug): AppDescriptor {
  const found = apps.find((a) => a.slug === slug);
  if (!found) throw new UnknownAppError(slug);
  return found;
}
