# @ando/config — Spec / PRP

## Intent

Centralize all runtime configuration (env vars, app registry, feature flags) with zod validation. Fail fast and loudly when config is missing or malformed so every app in the monorepo shares one source of truth.

## Public API

### `env`

`env` is a frozen, zod-parsed object of required server-side env vars. Importing `@ando/config/env` in any environment (including edge runtime) must throw a descriptive error if a required var is missing or invalid.

Required vars:

- `NODE_ENV` — `'development' | 'test' | 'production'`.
- `CF_ACCESS_TEAM_DOMAIN` — e.g. `ando.cloudflareaccess.com` (no `https://`, no trailing slash).
- `CF_ACCESS_AUD_WORKSPACE`, `CF_ACCESS_AUD_PETTY_CASH`, `CF_ACCESS_AUD_RIDER_PAYMENTS` — per-Access-app `aud` claims (hex strings).
- `IAM_DATABASE_URL` — Postgres connection string for the `iam` schema store.

Optional flags (see `flags`).

### `apps`

`apps` is a readonly registry of every app in the monorepo:

```ts
type AppSlug = 'workspace' | 'petty-cash' | 'rider-payments';
interface AppDescriptor {
  slug: AppSlug;
  displayName: string;
  subdomain: string;       // e.g. 'petty-cash.andofoods.co'
  tileDescription: string; // shown on Workspace launcher
  cfAccessAudEnvKey: string; // env var name that holds the aud for this app
}
export const apps: readonly AppDescriptor[];
export function getApp(slug: AppSlug): AppDescriptor;
```

`getApp` must throw on unknown slug — never return `undefined`.

### `flags`

`flags` is a frozen object derived from env vars:

- `WORKSPACE_ENABLED` — default `false` in production, `true` in development.
- `PETTY_CASH_AUTH_V2` — default `false`.
- `RIDER_CF_ACCESS` — default `false`.

All booleans parse from `'1' | 'true' | 'yes'` (case-insensitive) as `true`, anything else as `false`.

## Invariants

- `env`, `apps`, and `flags` must be immutable after first import.
- Zod errors must name the offending var.
- `apps` slugs must match CF Access env keys one-to-one — a test enforces this.
- No runtime dependency on `process.env` outside this package.

## Failure modes

- Missing required env → throw `ConfigError` at module load with path to missing key.
- Unknown app slug in `getApp` → throw `UnknownAppError` with received slug.
