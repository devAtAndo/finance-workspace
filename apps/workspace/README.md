# @ando/workspace

`workspace.andofoods.co` — the Ando Finance launcher. Shows every finance app the signed-in user has access to. Future: admin UI for grant / revoke / audit.

See [`SPEC.md`](./SPEC.md) for the contract and [`CLAUDE.md`](./CLAUDE.md) for invariants.

## Run locally

```bash
# From the monorepo root
cp .env.example apps/workspace/.env.local   # fill in CF_ACCESS_AUD_WORKSPACE, IAM_DATABASE_URL

# Dev (apply the iam schema first)
psql "$IAM_DATABASE_URL" -f ../../infra/migrations/0001_iam_schema.sql
pnpm --filter @ando/workspace dev            # http://localhost:3000

# Subdomain dev with CF Access stub (see root README)
caddy run --config ../../Caddyfile           # https://workspace.localtest.me
```

### Using the test JWKS in dev

To exercise the real verification path locally without Cloudflare, set `WORKSPACE_TEST_JWKS_JSON` to a JSON string of a JWKS before starting dev. The `e2e/` suite does this automatically via `cfAccessHarness.ts`.

## Test

```bash
pnpm --filter @ando/workspace test
pnpm --filter @ando/workspace typecheck
```

## Routes

| Path              | Method | Auth                        | Purpose                       |
| ----------------- | ------ | --------------------------- | ----------------------------- |
| `/`               | GET    | CF Access + workspace grant | Launcher tile grid            |
| `/no-access`      | GET    | none (served on 403)        | NoAccess page                 |
| `/api/test/grant` | POST   | _dev only, 404 in prod_     | Seed `iam.app_access` for e2e |

## Auth flow

1. Cloudflare Access gates the domain — `@andofoods.co` only.
2. `middleware.ts` calls `evaluateWorkspaceAccess` → `@ando/auth.evaluateAccess`.
3. Unauthorized → redirect to CF Access login.
4. Authorized but no `workspace` grant → rewrite to `/no-access`.
5. Authorized → set `x-ando-principal` header and continue to the page.
6. Page reads the header, calls `iam.listAppAccess`, renders `<TileGrid />`.

## Feature flag

`WORKSPACE_ENABLED` must be truthy. If false, middleware returns 503. Lets us deploy ahead of the `iam` schema being ready.

## Environment

All env is validated by `@ando/config`. See root `.env.example`. Workspace-specific additions:

- `WORKSPACE_TEST_JWKS_JSON` (dev/test only) — inline JWKS for the test harness.
