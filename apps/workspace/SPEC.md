# apps/workspace — Spec / PRP

## Intent

The entry point to Ando Finance for every signed-in user. A single page under `workspace.andofoods.co` that:

1. Requires a valid Cloudflare Access JWT (MFA + `@andofoods.co` enforced at the edge).
2. Resolves the signed-in user via `@ando/auth` + `@ando/db`.
3. Renders a tile grid of every app the user has `iam.app_access` for, linking to the app's subdomain.
4. Shows a graceful empty state when the user has no grants yet.

This is the MVP. Admin UI (grant / revoke / disable / audit view) lands in Phase 4 under `/admin` with additional edge policy.

## Public surface

### Route `/`

- GET → renders `TileGrid` from `@ando/ui` with apps the user has access to.
- If auth fails: middleware redirects (401) or renders `/no-access` (403).

### Route `/no-access`

- Static 403 page rendered by the `NoAccess` component.

### Dev-only route `POST /api/test/grant`

- Enabled **only** when `NODE_ENV !== 'production'`.
- Accepts `{ email, appSlug, role }` — upserts user, inserts `iam.app_access`, appends `audit_log`.
- Exists so Playwright can seed grants in CI/local dev without going through admin UI (which doesn't exist yet).
- Returns 404 in production.

## Auth flow

- Next.js `middleware.ts` runs on every request except Next internals (`_next/*`, static assets, `/no-access`).
- Middleware calls `evaluateAccess` from `@ando/auth/middleware` with `appSlug='workspace'`.
- On `ok: false` and status 401 → `NextResponse.redirect` to the CF Access login URL computed from `CF_ACCESS_TEAM_DOMAIN`.
- On `ok: false` and status 403 → rewrite to `/no-access`.
- On `ok: true` → attach a `x-ando-principal` header (stringified JSON `{userId, email, role}`) so the page can read it server-side without re-verifying.

## Dev / test auth

- In `NODE_ENV !== 'production'`, the JWKS fetcher is swapped for one that reads from `WORKSPACE_TEST_JWKS_JSON` env var (set by the Playwright harness before starting the dev server).
- In production, the default fetcher hits `https://<CF_ACCESS_TEAM_DOMAIN>/cdn-cgi/access/certs`.
- The switch happens once in `src/lib/auth.ts` — every consumer goes through it.

## Feature flag

- `WORKSPACE_ENABLED` must be `true` to serve content. When `false`, middleware returns a `503` with a maintenance message. Exists so the app can be deployed and Cloudflare Access provisioned before the backing `iam` tables are ready.

## Tile selection

- `buildTiles(allApps, accessList)` returns apps from `@ando/config.apps` (minus `workspace` itself) filtered by the `appSlug`s present in the user's `listAppAccess` result.
- Pure function; unit-tested in isolation. No DB or network in the test.

## Invariants

- No auth logic written directly in the app — all goes through `@ando/auth`.
- Middleware must never call `iam` methods directly; it calls `evaluateAccess` which receives the `iam` port as a dep.
- The dev grant route is 404 in prod — this is enforced by the route handler, not just config. Test covers it.
- All pages must be server-rendered (no `'use client'` at the top level) so the principal header is read without hydration mismatch.

## Failure modes

- `iam` DB down → middleware returns 503 "workspace admin temporarily unavailable". The app tile grid cannot render without app_access reads. (Defensible: this is the launcher, not the apps themselves, which keep working.)
- Malformed JWT → 401 → redirect to CF login.
- Valid JWT, no grants → tile grid empty state ("You don't have access to any finance apps yet. Contact an administrator.").
