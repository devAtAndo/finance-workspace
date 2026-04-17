# HANDOFF.md

Living session log. Updated at the end of every work session. Top entry is current.

---

## 2026-04-17 — Phase 2 MVP: Petty Cash dual-run scaffolding

### Shipped

- Imported `petty-cash` as `apps/petty-cash/` (non-destructive — original sibling folder remains as a safety net).
- Rewired to the shared packages (`@ando/auth`, `@ando/config`, `@ando/db`, `@ando/ui`, `@ando/tsconfig`, `@ando/eslint-config`).
- `src/lib/authDispatcher.ts` — `getAuthMode()` reads `PETTY_CASH_AUTH_V2`.
- `src/lib/getPrincipal.ts` — unified `getPrincipal()` / `requirePrincipal()` with **lazy dynamic imports** so legacy mode never loads V2 deps and vice versa.
- `middleware.ts` — no-op in legacy mode; full CF Access gate in V2 mode with `x-ando-principal` propagation and 503 on iam outage.
- `/api/auth/[...nextauth]/route.ts` — delegates to NextAuth when legacy; returns **410 Gone** when V2 is on, so no new NextAuth sessions are created during cutover.
- `src/lib/admin.ts` — `requireAdmin()` rebuilt on `getPrincipal()`; return type now `LocalPrincipal | null` (`.userId` replacing `.id`). Updated `api/admin/users/[id]` accordingly.
- `src/app/no-access/page.tsx` for the middleware rewrite target.
- `postcss.config.cjs` (was `.js`) so ESM package works.
- Root `pnpm.onlyBuiltDependencies` permits Prisma / esbuild / tesseract postinstalls.
- Full per-app docs: `SPEC.md`, `README.md`, `CLAUDE.md`, `HANDOFF.md`, `CHANGELOG.md`.
- Changeset `.changeset/phase-2-petty-cash-dual-run.md` (petty-cash minor; auth/config/db patches).

### TDD catches this session

- Dynamic-import path-string mismatch between `vi.mock(...)` and runtime `import()` under Next's bundler resolution — fixed by removing `.js` extensions from app-internal imports and matching `vi.mock` paths.
- `requireAdmin` return-shape change surfaced the one `.id` → `.userId` call site at typecheck, not at runtime. Static types caught it.
- PostCSS config ESM breakage — caught by first Vitest run. `.js` → `.cjs`.

### Validated

- `pnpm typecheck` ✅
- `pnpm lint` ✅ (2 existing-code lint issues autofixed)
- `pnpm test` ✅ — 71 Vitest cases across 11 tasks (21 config + 13 auth + 2 db + 1 ui + 15 workspace + 19 petty-cash + 4 skipped Playwright).
- `pnpm build` ✅ — all 15 petty-cash routes compile; Prisma client generates during build.

### In-progress

_(Phase 2 MVP complete. Phase 2.x per-route migrations follow.)_

### Next

- **Phase 2.1:** migrate `api/requests/*` and `api/expenses` routes onto `getPrincipal`.
- **Phase 2.2:** migrate `/admin`, `/branch`, `/finance` server pages.
- **Phase 2.3:** migrate `Header.tsx` client `useSession` — need a decision on client-side principal source in V2 mode.
- **Phase 2.4:** Prisma migration dropping `User.password` after 2-week dual-run bake.
- **Phase 3:** Rider Payments migration behind `RIDER_CF_ACCESS`.

### Open questions

1. Hosting target — Vercel for all three? Same project or three?
2. `iam.audit_log` retention window.
3. Email sender for CF OTP — CF default or `noreply@andofoods.co`?
4. iam migration ownership — platform team vs per-app.
5. `/admin` route gating — separate CF Access app for 1h session duration, or role-only?
6. When do we delete the legacy `/Users/asifkhan/claude-ak/coding-projects/petty-cash` sibling folder? Proposed: after Phase 2.4 + 1-week soak.

### Flags touched

- `PETTY_CASH_AUTH_V2` — now wired into `apps/petty-cash/middleware.ts`, `apps/petty-cash/src/lib/authDispatcher.ts`, and `apps/petty-cash/src/app/api/auth/[...nextauth]/route.ts`. Default off.

---

## 2026-04-17 — Phase 1: Workspace launcher MVP

### Shipped

- `apps/workspace` (Next.js 14.2) scaffolded with Vitest + flat ESLint wired through `@ando/eslint-config/next`.
- `src/lib/tiles.ts`, `src/lib/loginUrl.ts`, `src/lib/auth.ts` — all covered by tests; no auth logic duplicated, everything routes through `@ando/auth`.
- `middleware.ts` — gates all routes except `_next/`, `favicon`, `no-access`, `api/test/*`; returns 503 when `WORKSPACE_ENABLED=false` or when `iam` is unavailable; attaches `x-ando-principal` on success.
- Pages: `/` launcher using `AppShell` + `TileGrid`, `/no-access` using `NoAccess`.
- `/api/test/grant` dev-only seeding route (hard 404 in production) so Playwright can populate `iam.app_access` before the admin UI exists.
- 15 new Vitest cases: tiles (4), loginUrl (3, includes open-redirect guards), middleware (3), grant route (5).
- `_resetJwksCacheForTests` promoted to `@ando/auth` public API so consumer apps can isolate JWKS cache between tests.
- Per-app docs: `SPEC.md`, `README.md`, `CLAUDE.md`, `HANDOFF.md`, `CHANGELOG.md`.
- Changeset `.changeset/phase-1-workspace-launcher.md` (workspace minor, auth patch).

### Validated

- `pnpm typecheck` ✅ (9/9)
- `pnpm lint` ✅ (10/10)
- `pnpm test` ✅ (10/10 tasks, 52 total Vitest + 4 skipped Playwright)
- `pnpm build` ✅ — `next build` produces `/`, `/no-access`, `/api/test/grant` routes cleanly.

### In-progress

_(none)_

### Next

- Wire Playwright scenarios against a running dev server (`WORKSPACE_TEST_JWKS_JSON` set by `cfAccessHarness`); currently all `.skip`.
- **Phase 2:** migrate Petty Cash onto `@ando/auth` behind `PETTY_CASH_AUTH_V2`; `git mv` it into `apps/petty-cash/`; drop `User.password` in a Prisma migration.

### Open questions

Same four as Phase 0 (hosting, audit retention, email sender, migration ownership). Add one:

- `/admin` route strategy: separate Cloudflare Access application with 1h session, or same app with in-code role gate?

### Flags touched

- `WORKSPACE_ENABLED` — now consumed by `apps/workspace/middleware.ts`. Default (dev=true, prod=false) means prod deploys must opt in explicitly.

---

## 2026-04-17 — Phase 0 scaffold

### Shipped

- Monorepo root (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.gitignore`, `.nvmrc`, `.npmrc`, `.env.example`).
- `@ando/tsconfig` — `base`, `node-lib`, `react-lib`, `nextjs` presets.
- `@ando/eslint-config` — flat configs: default, `react`, `next`.
- `@ando/config` — zod env schema, frozen app registry (`workspace`, `petty-cash`, `rider-payments`), feature-flag parser. Vitest tests for all three entry points (env, apps, flags).
- `@ando/auth` — `verifyCfAccessJwt` (valid/malformed/expired/wrong-aud/wrong-iss), `requireAppAccess` (happy path, unauthorized, forbidden, disabled, JIT), `evaluateAccess` middleware wrapper, `@ando/auth/testing` helpers (`createTestKeypair`, `signTestCfAccessJwt`, `makeInMemoryIam`). SPEC.md + README.md + CHANGELOG.md.
- `@ando/db` — Kysely `Database` type for `iam.*`, `iam` repo with transactional audit writes. SPEC.md + README.md + CHANGELOG.md.
- `@ando/ui` — `AppShell`, `TileGrid`, `NoAccess` components.
- `infra/migrations/0001_iam_schema.sql` (+ `.down.sql`) — `iam.users`, `iam.app_access`, `iam.audit_log`.
- `infra/cloudflare/main.tf` — Email OTP IdP + Access application per subdomain + `@andofoods.co` policy with `enforce` toggle for logging-only shadow mode.
- `Caddyfile` — local `*.localtest.me` TLS reverse proxy.
- `e2e/` — Playwright config, `cfAccessHarness.ts`, `auth.spec.ts` (skipped until Phase 1).
- `.github/workflows/ci.yml` — typecheck + lint + test + build; `changeset-required` gate; `commitlint` on PRs.
- `commitlint.config.cjs` with scoped allowlist; husky `commit-msg` + `pre-commit`.
- `.changeset/config.json`, CODEOWNERS.
- Root `README.md`, `CLAUDE.md`, `CHANGELOG.md`, this `HANDOFF.md`.

### In-progress

_(nothing — end of Phase 0)_

### Next

- `pnpm install` at the monorepo root to generate `pnpm-lock.yaml`.
- Run `pnpm test` to confirm `@ando/auth` and `@ando/config` tests go green.
- **Phase 1:** scaffold `apps/workspace` (Next.js 14, `@ando/auth` middleware, `TileGrid` launcher backed by `iam.listAppAccess`, `WORKSPACE_ENABLED` flag).
- Decide on hosting (Vercel vs alternative) before creating Terraform DNS records.

### Open questions

1. Hosting target per app (Vercel for all three? One elsewhere?). Drives DNS in Cloudflare.
2. `iam.audit_log` retention window — still TBD.
3. Email sender for CF OTP: default CF sender or configure `noreply@andofoods.co`?
4. Migration ownership: platform team vs per-app for `infra/migrations`.

### Flags touched

None yet. `WORKSPACE_ENABLED` / `PETTY_CASH_AUTH_V2` / `RIDER_CF_ACCESS` declared in `@ando/config/flags` and `turbo.json` `globalEnv`; not yet wired to any app.

### Notes

- Petty Cash stays at `/Users/asifkhan/claude-ak/coding-projects/petty-cash` (not a git repo).
- Rider Payments stays at `/Users/asifkhan/claude-ak/coding-projects/rider-payments` with uncommitted work on `main`. Per decision, that uncommitted state is preserved through the eventual `git mv` into `apps/rider-payments/` in Phase 3 — no pre-commit required.
