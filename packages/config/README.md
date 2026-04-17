# @ando/config

Runtime configuration for Ando Finance Workspace: zod-validated env, the app registry, and feature flags.

See [`SPEC.md`](./SPEC.md) for the full contract.

## Install

Internal workspace dependency:

```json
{
  "dependencies": { "@ando/config": "workspace:*" }
}
```

## Entry points

| Import                    | What you get                        |
| ------------------------- | ----------------------------------- |
| `@ando/config`            | Everything re-exported              |
| `@ando/config/env`        | Parsed `env` + `Env` type           |
| `@ando/config/apps`       | `apps` registry + `getApp(slug)`    |
| `@ando/config/flags`      | Parsed `flags` + `Flags` type       |

## Env vars

Required:

- `CF_ACCESS_TEAM_DOMAIN` — e.g. `ando.cloudflareaccess.com`
- `CF_ACCESS_AUD_WORKSPACE`, `CF_ACCESS_AUD_PETTY_CASH`, `CF_ACCESS_AUD_RIDER_PAYMENTS`
- `IAM_DATABASE_URL`

Optional (flags):

- `WORKSPACE_ENABLED` — defaults true in dev, false in prod
- `PETTY_CASH_AUTH_V2` — defaults false
- `RIDER_CF_ACCESS` — defaults false

## Test

```bash
pnpm --filter @ando/config test
```

## Invariants

- `env`, `apps`, `flags` are frozen at import. Do not wrap them in new objects before export.
- `apps[*].slug` ↔ `CF_ACCESS_AUD_*` env key is 1:1. Enforced by tests.
- `getApp` throws on unknown slug — callers must not guard for `undefined`.
