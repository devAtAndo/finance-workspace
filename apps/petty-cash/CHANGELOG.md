# @ando/petty-cash

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- Moved into the `workspace-monorepo/apps/petty-cash` Turborepo app.
- Workspace dependencies on `@ando/auth`, `@ando/config`, `@ando/db`, `@ando/ui`, `@ando/tsconfig`, `@ando/eslint-config`.
- `src/lib/authDispatcher.ts` — `getAuthMode()` reads `PETTY_CASH_AUTH_V2` (true/1/yes → `cfaccess`, else `nextauth`).
- `src/lib/getPrincipal.ts` — unified `getPrincipal()` / `requirePrincipal()` that returns a `LocalPrincipal` regardless of auth mode. JIT-provisions local Prisma `User` rows in V2 mode.
- `middleware.ts` — no-op when flag off; full `@ando/auth.evaluateAccess(appSlug='petty-cash')` gate when on, with `x-ando-principal` propagation.
- `src/app/no-access/page.tsx` — rendered via middleware rewrite when a user has no `petty-cash` grant.
- Vitest harness with 19 passing cases: `getAuthMode` parsing (11), `getPrincipal` legacy + V2 + JIT + missing header (6), NextAuth route 410 guard (2).

### Changed

- `src/lib/admin.ts` — `requireAdmin()` is now built on `getPrincipal()` rather than calling `getServerSession(authOptions)` directly. Returns `LocalPrincipal | null` instead of the opaque session user. Callers referencing `admin.id` must now use `admin.userId`.
- `src/app/api/auth/[...nextauth]/route.ts` — wraps the `NextAuth(authOptions)` handler in a V2 guard that returns `410 Gone` when the flag is on.
- `src/app/api/admin/users/[id]/route.ts` — updated to read `admin.userId` after `requireAdmin` refactor.
- `postcss.config.js` → `postcss.config.cjs` — package now declares `"type": "module"`, so the CommonJS config must use `.cjs`.

### Deferred

- `User.password` column removal — postponed to a standalone Prisma migration after the 2-week V2 dual-run proves stable. Keeps NextAuth rollback viable.
- Per-route migrations of remaining `getServerSession(authOptions)` call sites — each will land as its own PR + changeset in Phase 2.x.

## [0.1.0] — 2026-04-17

Initial monorepo import.
