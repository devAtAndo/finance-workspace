# HANDOFF.md — apps/workspace

Living log for this app. Updated at the end of every session.

---

## 2026-04-17 — Phase 1 MVP

### Shipped

- Next.js 14.2 scaffold: `package.json`, `tsconfig.json`, `next.config.js`, `next-env.d.ts`, `eslint.config.js`, `vitest.config.ts`, `SPEC.md`.
- `src/lib/tiles.ts`, `src/lib/loginUrl.ts`, `src/lib/auth.ts`.
- `middleware.ts` — flag-gated, iam-tolerant, principal-propagating.
- Pages: `/` launcher (TileGrid), `/no-access` (NoAccess component).
- Dev-only `/api/test/grant` route for Playwright seeding.
- Tests: 15 passing Vitest cases covering tiles (4), loginUrl (3), middleware (3), grant route (5).
- `README.md`, `CHANGELOG.md`, `CLAUDE.md`, this `HANDOFF.md`.

### In-progress

_(none)_

### Next

- Wire `e2e/` Playwright scenarios against a running dev server with `WORKSPACE_TEST_JWKS_JSON` set (currently skipped).
- **Phase 2:** migrate Petty Cash onto `packages/auth` behind `PETTY_CASH_AUTH_V2`; `git mv` into `apps/petty-cash/`.

### Open questions

- Hosting target: Vercel? Same project for all three apps or three projects? Affects env-var wiring + preview deploys.
- `/admin` path — separate Access application for tighter session duration, or in-app role gate? Decide before Phase 4.

### Flags touched

- `WORKSPACE_ENABLED` is now consumed by `middleware.ts`. Default (dev=true, prod=false) — production deploys must explicitly set `WORKSPACE_ENABLED=true` to enable the app.

### Notes

- The middleware matcher excludes `api/test/*` so Playwright seeding doesn't self-gate. `api/test/grant` is 404 in production regardless.
