# @ando/rider-payments

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- Moved into `workspace-monorepo/apps/rider-payments` (copied from the legacy sibling repo; original retains uncommitted state as a safety net).
- Workspace dependencies on `@ando/auth`, `@ando/config`, `@ando/db`, `@ando/ui`, `@ando/tsconfig`, `@ando/eslint-config`.
- `src/lib/authDispatcher.ts` — `getAuthMode()` reads `RIDER_CF_ACCESS`.
- Vitest harness with 18 passing cases: `getAuthMode` parsing (10), `getCaller` supabase/cfaccess branches including missing header / no email / authenticated (7), `/auth/callback` 410 guard (1).
- `src/app/no-access/page.tsx` — 403 rewrite target for V2 mode.
- `test/_shim-server-only.ts` — Vitest alias for the `server-only` package so tests can import `src/lib/api-auth.ts` safely.

### Changed

- `src/proxy.ts` — now dispatches between the original Supabase-session gate and a new Cloudflare Access gate based on `RIDER_CF_ACCESS`. V2 branch lazy-imports `@ando/auth` / `@ando/config/env` / `@ando/db` so legacy mode pays no cost.
- `src/lib/api-auth.ts` — `getCaller` and `requireAuth` now accept an optional `Request` and dispatch via the flag: in V2 mode they read `x-ando-principal` populated by the proxy; in legacy mode they delegate to `supabase.auth.getUser()` exactly as before.
- `src/app/auth/callback/route.ts` — returns `410 Gone` when `RIDER_CF_ACCESS=true` so stale Supabase sessions cannot be minted during cutover.

### Deferred

- RLS policy rewrite — Phase 3.x. Until then, authenticated Supabase writes in V2 mode must go through the service-role admin client (already used for Storage + ingestion).
- Removal of the `/login` UI and `signInWithOtp` flow — after the 2-week dual-run bake.
- `Header.tsx`-style client-side principal source — not applicable here; no `useSession` in rider-payments client code.

## [0.1.0] — 2026-04-17

Initial monorepo import.
