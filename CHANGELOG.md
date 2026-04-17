# Ando Finance Workspace — monorepo

Monorepo-level changelog. Per-package changelogs live in `packages/*/CHANGELOG.md` and `apps/*/CHANGELOG.md` and are driven by `pnpm changeset`.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- **Phase 3 — Rider Payments dual-run** (2026-04-17):
  - Imported `rider-payments` as `apps/rider-payments/` (Next.js 16.2, React 19, Supabase Postgres + direct pg pools).
  - `RIDER_CF_ACCESS` dispatcher; `src/proxy.ts` now branches between the legacy Supabase-session gate and a new `evaluateAccess(appSlug='rider-payments')` gate with lazy V2 imports.
  - `src/lib/api-auth.ts` refactored as single dispatch point — `getCaller(req)` / `requireAuth(req)` covers every API route without per-route changes.
  - `/auth/callback` returns 410 in V2 mode.
  - 18 new Vitest cases. Added a `test/_shim-server-only.ts` alias so Vitest can import server-only modules.
  - Root `pnpm.overrides` pin `@types/react` and `@types/react-dom` to `^19.0.0` to prevent cross-version hoisting conflicts between apps on React 18 (workspace, petty-cash) and React 19 (rider-payments).
  - Monorepo Vitest count: **92**.

- **Phase 2.1 + 2.2 — Petty Cash server-side call-site migration** (2026-04-17):
  - `src/lib/requirePrincipalOrRedirect.ts` thin page helper + 3 Vitest cases.
  - Every server-side `getServerSession(authOptions)` in petty-cash (4 API routes + 4 server pages) now resolves users via `getPrincipal`. Client-side `Header.tsx useSession` is the only remaining legacy reference; scheduled for Phase 2.3.
  - Monorepo Vitest count: 74.

- **Phase 2 — Petty Cash dual-run** (2026-04-17):
  - Imported petty-cash as `apps/petty-cash/` (Next.js 14.2, Prisma + Postgres).
  - `PETTY_CASH_AUTH_V2` dispatcher in `src/lib/authDispatcher.ts`; `getPrincipal` / `requirePrincipal` wraps both NextAuth and `@ando/auth` paths behind a single call site.
  - `middleware.ts` no-ops in legacy mode, gates via `evaluateAccess(appSlug='petty-cash')` in V2 mode.
  - `/api/auth/[...nextauth]/*` returns 410 in V2 mode.
  - `requireAdmin()` refactored onto `getPrincipal` as the first migrated call site.
  - 19 new Vitest cases; monorepo test count now 71.

- **Phase 1 — Workspace launcher MVP** (2026-04-17):
  - `apps/workspace` (Next.js 14.2) scaffolded at `workspace.andofoods.co`.
  - Flag-gated middleware (`WORKSPACE_ENABLED`) + `iam`-tolerant 503 path.
  - Launcher page renders `TileGrid` from `iam.listAppAccess`.
  - Dev-only `POST /api/test/grant` (404 in production) so Playwright can seed before the admin UI exists.
  - 15 new Vitest cases (tiles, login-url with open-redirect guards, middleware branches, grant-route validation).
  - `_resetJwksCacheForTests` promoted to `@ando/auth` public surface for consumer-app test isolation.

- **Phase 0 scaffold** (2026-04-17):
  - Turborepo + pnpm workspaces at `/workspace-monorepo`.
  - `@ando/tsconfig`, `@ando/eslint-config` shared tooling presets.
  - `@ando/config` — zod-validated env, frozen app registry, feature flags.
  - `@ando/auth` — Cloudflare Access JWT verification, `requireAppAccess`, `evaluateAccess` middleware, `@ando/auth/testing` helpers. TDD tests covering valid/invalid/expired/wrong-aud/wrong-iss and `requireAppAccess` happy path + forbidden + disabled + JIT-provisioning.
  - `@ando/db` — Kysely schema types and `iam` repo (upsert, grant, revoke, disable, audit).
  - `@ando/ui` — `AppShell`, `TileGrid`, `NoAccess` components.
  - `infra/cloudflare/` — Terraform for Email OTP IdP + one Access application per subdomain with `enforce` shadow-mode toggle.
  - `infra/migrations/0001_iam_schema.sql` — `iam.users`, `iam.app_access`, `iam.audit_log` with constraints and indexes.
  - `Caddyfile` for local `*.localtest.me` dev.
  - `e2e/` — Playwright config and spec scaffolded with `cfAccessHarness`; scenarios skipped until Phase 1.
  - CI workflow (typecheck, lint, test, build), commitlint + husky, Changesets, CODEOWNERS.

## [0.1.0] — 2026-04-17

Initial repository.
