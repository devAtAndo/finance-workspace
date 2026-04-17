---
'@ando/workspace': minor
'@ando/auth': patch
---

Phase 1: Workspace launcher MVP.

Adds `apps/workspace` (Next.js 14.2) at `workspace.andofoods.co`:

- Middleware-gated on every route except `_next`, `favicon`, `no-access`, `api/test/*`.
- Launcher page renders `TileGrid` from the signed-in user's `iam.app_access` rows.
- `WORKSPACE_ENABLED` flag honored; returns 503 when `iam` is unavailable so the edge still behaves deterministically.
- Dev-only `POST /api/test/grant` route (404 in production) so Playwright can seed grants before the admin UI exists.
- 15 Vitest cases covering `buildTiles`, `buildLoginUrl` (including open-redirect guards), middleware branches, and grant-route validation.

Also promotes `_resetJwksCacheForTests` to the `@ando/auth` public surface so consumer apps can isolate the JWKS cache between tests.
