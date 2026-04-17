# @ando/e2e

Playwright suite exercising SSO across `workspace / petty-cash / rider-payments` under a simulated Cloudflare Access edge.

## Local setup

1. Install and trust Caddy: `brew install caddy && caddy trust`.
2. Boot the three apps on ports 3000 / 3001 / 3002 (see root `README.md`).
3. `caddy run --config ../Caddyfile` (from the monorepo root).
4. `pnpm --filter @ando/e2e test`.

## How CF Access is simulated

`tests/cfAccessHarness.ts` signs test JWTs with a local keypair. Each app, in its dev-mode middleware, verifies via `@ando/auth` pointed at the test JWKS. The prod path (real Cloudflare JWKS) is untouched.

## Scenarios

Authored in `tests/auth.spec.ts`:

1. Unauthenticated → redirect to workspace login.
2. Valid JWT + `iam.app_access` grant → app loads.
3. Valid JWT without grant → 403 NoAccess page.
4. JWT for app A replayed against app B → 401 (aud mismatch).

All are `.skip` until Phase 1 wires the first app to the harness.
