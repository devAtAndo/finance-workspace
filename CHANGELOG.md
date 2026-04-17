# Ando Finance Workspace — monorepo

Monorepo-level changelog. Per-package changelogs live in `packages/*/CHANGELOG.md` and `apps/*/CHANGELOG.md` and are driven by `pnpm changeset`.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- **Phase 4.2 — Petty Cash live on Cloudflare Workers** (2026-04-17):
  - 🚀 Live at https://ando-petty-cash.philip-ndegwa.workers.dev — login + admin + branch CRUD all functional.
  - Swapped from a raw-`pg` approach to `@neondatabase/serverless` (HTTP/WebSocket driver) after discovering TCP pools don't work in the Workers runtime.
  - Replaced Prisma client with a hand-written neon-backed facade at `apps/petty-cash/src/lib/prisma.ts` covering the narrow subset the app uses (branch/user/expense/reimbursementRequest + $transaction). Prisma's library engine does an `fs.readdir` at startup that Workers' unenv shim rejects; facade avoids engine entirely.
  - Replaced NextAuth's default JWT encoder with HS256 signing via `jose` (Web Crypto). NextAuth v4's default uses `crypto.createCipheriv` which unenv doesn't implement.
  - Auth path (`src/lib/auth.ts`) uses `@neondatabase/serverless` directly for the single user-by-email lookup.
  - Added Next 14 `[...nextauth]` catchall route wrapper that forwards both `req` and `ctx` to the handler (NextAuth crashes without the route context).
  - `nodemailer` wrapped so it only lazy-loads in local Node dev; production Worker path logs `[email:stub]` JSON to `wrangler tail`. Follow-up: CF Email Workers or Resend.
  - Provisioned Neon Free Postgres (`ap-southeast-1`), applied Prisma schema, seeded admin/finance/branch users.
  - Deploy: `pnpm --filter @ando/petty-cash cf:build && pnpm --filter @ando/petty-cash cf:deploy` against Philip's Cloudflare account (`e0d49a41...`).

- **Phase 4.1 — Workspace Cloudflare Workers deploy scaffold** (2026-04-17):
  - `@ando/db.getDb()` now accepts a Cloudflare Hyperdrive binding (5 new Vitest cases); old `connectionString` / env-var paths unchanged.
  - `apps/workspace`: `wrangler.toml`, `open-next.config.ts`, `src/lib/cf.ts`, `cf:*` scripts; middleware primes `@ando/db` with the Hyperdrive binding under Workers (Node local dev unchanged).
  - `docs/hosting-cloudflare.md` — top-to-bottom deploy runbook (Supabase `andofoods-iam` project → Terraform apply → Hyperdrive configs → Worker secrets → DNS → dual-run flag flips → post-bake cleanup).
  - Monorepo Vitest count: **97**.
  - Phase 4.2 (petty-cash Prisma driver adapter + Email Workers) and 4.3 (rider-payments Next 16 verification) follow as independent PRs.

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
