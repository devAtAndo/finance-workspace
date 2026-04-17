# HANDOFF.md

Living session log. Updated at the end of every work session. Top entry is current.

---

## 2026-04-17 — Phase 4.2: Petty Cash live on Cloudflare Workers 🚀

### Shipped

- **Live URL:** https://ando-petty-cash.philip-ndegwa.workers.dev
- **Data:** Neon Free Postgres (`ap-southeast-1`), Prisma schema applied, admin/finance/branch users seeded.
- **Auth:** Legacy NextAuth mode (`PETTY_CASH_AUTH_V2=false`). `admin@example.com` / `password123`.
- **Verified:** login redirects to `/admin`, branch CRUD works end-to-end.

### Key fixes (in cutover order)

1. **Middleware wrong location** — moved `middleware.ts` into `src/` (Next 14 with src-layout requires it there).
2. **NextAuth catchall** — GET/POST wrappers must forward `(req, ctx)`, not just `req`. Otherwise: "Cannot destructure property 'nextauth' of 'e2.query'".
3. **`pg` TCP hangs on Workers** — swapped to `@neondatabase/serverless` (HTTP/WebSocket).
4. **Prisma library engine `fs.readdir`** — unenv doesn't implement it. Replaced Prisma client with a hand-written neon-backed facade covering the app's narrow usage. Prisma 6's driver-adapter mode still hits this.
5. **NextAuth `crypto.createCipheriv` (JWE)** — replaced the default JWT encoder with HS256 signing via `jose` (Web Crypto).
6. **Workers env schema** — `[vars]` in `wrangler.toml` includes placeholders for `@ando/config/env` so the module loads cleanly. Real values are `wrangler secret put` entries for `DATABASE_URL`, `NEXTAUTH_SECRET`.

### Known gaps (non-blocking for 20 users)

- Emails log-only (no CF Email Workers / Resend yet).
- No custom domain.
- Transactions sequential, not atomic.
- Default passwords are `password123`.

### Next

- **Change admin password** immediately via the admin UI or re-seed with random values.
- Monitor for any other endpoint hitting an unimplemented facade method — add as needed.
- Follow-up phases: Email delivery, custom domain, rider-payments on Cloudflare, unified SSO infrastructure.

---

## 2026-04-17 — Phase 4.1: Workspace on Cloudflare Workers (scaffold)

### Shipped

- `@ando/db.getDb()` takes a `{ hyperdrive }` binding option. Precedence: hyperdrive > connectionString > `IAM_DATABASE_URL`. 5 Vitest cases added; monorepo total now **97**.
- `@ando/db` public surface exports `GetDbOpts`, `HyperdriveLike`, `_resetDbForTests`.
- `apps/workspace`:
  - `wrangler.toml` — routes `workspace.andofoods.co` as a custom domain, declares `HYPERDRIVE_IAM` binding + `nodejs_compat` flag.
  - `open-next.config.ts` via `@opennextjs/cloudflare`.
  - `src/lib/cf.ts` — lazy `getHyperdriveIam()` (Node-safe no-op).
  - `middleware.ts` primes `@ando/db` with the binding when present.
  - `cf:build` / `cf:preview` / `cf:deploy` / `cf:dryrun` scripts.
  - Dev-deps: `@opennextjs/cloudflare`, `wrangler`.
- Root-level `docs/hosting-cloudflare.md` — full deploy runbook.

### What this does _not_ prove

- I did not run `opennextjs-cloudflare build` or `wrangler deploy --dry-run` — both require real env vars / CF account auth and would add noise to the commit. The code is type-clean and the plumbing matches OpenNext's documented shape. First real deploy will surface any gaps; runbook has a Troubleshooting section.
- `HYPERDRIVE_IAM` binding id in `wrangler.toml` is a placeholder (`__HYPERDRIVE_ID__`). Must be replaced before `wrangler deploy` — see runbook step 3.

### Validated

- `pnpm typecheck / lint / test / build` all green on Node.
- Monorepo Vitest count: **97** (was 92).

### Next

- **Phase 4.2:** Petty Cash on Cloudflare. Bigger lift — needs Prisma driver adapter (`@prisma/adapter-pg` + `previewFeatures = ["driverAdapters"]`) and a swap of `nodemailer` to Cloudflare Email Workers via a new `packages/email`. Tesseract.js stays client-side.
- **Phase 4.3:** Rider Payments on Cloudflare. Verify `@opennextjs/cloudflare` supports Next.js 16.2 (this is the risky one; may need Next 15 downgrade or wait for OpenNext 2.x).
- **Phase 4.4:** Hyperdrive Terraform + DNS automation — eliminate the manual-dashboard step 3 in the runbook.

### Flags touched

- None. `WORKSPACE_ENABLED` already in `wrangler.toml [vars]` defaulting to `"true"` in production (override per env if needed).

### Open questions

- Custom sender for CF Email Workers (`noreply@andofoods.co`)? Decision needed before Phase 4.2 email swap.
- Incremental cache: `dummy` (in-memory) today. Upgrade to KV once a namespace is provisioned.

---

## 2026-04-17 — Phase 3 MVP: Rider Payments dual-run

### Shipped

- `apps/rider-payments/` (Next.js 16.2, React 19) imported non-destructively from the legacy sibling repo. Original retains uncommitted state.
- Rewired onto `@ando/auth` / `@ando/config` / `@ando/db` / `@ando/ui` / `@ando/tsconfig` / `@ando/eslint-config` via workspace protocol.
- `src/lib/authDispatcher.ts` — reads `RIDER_CF_ACCESS`.
- `src/proxy.ts` — Next 16 proxy (not middleware) dispatches between legacy Supabase gate and CF Access gate with lazy V2 imports, 503 on iam outage, `x-ando-principal` propagation.
- `src/lib/api-auth.ts` — single dispatch point for every API route; `getCaller(req)` / `requireAuth(req)` now accept the Request and branch internally.
- `src/app/auth/callback/route.ts` — 410 Gone in V2 mode.
- `src/app/no-access/page.tsx` — 403 rewrite target.
- `test/_shim-server-only.ts` + Vitest alias so we can import `server-only` modules in tests.
- Root `pnpm.overrides` forces `@types/react ^19.0.0` / `@types/react-dom ^19.0.0` monorepo-wide to defuse cross-major hoisting conflicts (rider is on React 19; workspace + petty-cash on React 18 runtime but 19 types are forward-compatible for standard usage).
- Explicit `ReactNode` return annotations on workspace's server pages (belt-and-suspenders against TS2742).
- 18 new Vitest cases: authDispatcher (10), getCaller supabase/cfaccess (7), callback 410 guard (1).
- Per-app docs: `SPEC.md`, `README.md`, `CLAUDE.md`, `HANDOFF.md`, `CHANGELOG.md`.
- Changeset `.changeset/phase-3-rider-payments-dual-run.md`.

### TDD catches this session

- `server-only` imports broke Vitest — added shim + alias.
- React 19 vs 18 type hoisting → TS2742 across multiple apps. Fixed via `pnpm.overrides`.
- Rider-payments' original lint script pointed at top-level `proxy.ts` (file lives at `src/proxy.ts` in Next 16). Script fixed.

### Validated

- `pnpm typecheck / lint / test / build` all green across **12 tasks**.
- Full Vitest count: **92** — 21 config + 13 auth + 2 db + 1 ui + 15 workspace + 22 petty-cash + 18 rider-payments.
- Rider-payments Next 16 build compiles 13 routes + proxy cleanly.

### In-progress

_(Phase 3 MVP complete.)_

### Next

- **Phase 3.1:** rewrite RLS policies so authenticated Supabase writes in V2 mode don't have to funnel through the service-role admin client.
- **Phase 3.2:** after 2-week dual-run bake, delete `/login` UI + magic-link code + the legacy sibling folder `/Users/asifkhan/claude-ak/coding-projects/rider-payments`.
- **Phase 2.3:** Petty Cash `Header.tsx` client-side principal source.
- **Phase 2.4:** Drop `User.password` in petty-cash after its own 2-week bake.
- **Phase 4:** Workspace admin UI for grant/revoke/audit.
- **Phase 5:** Passkeys via CF Access, log sink, SAML path.

### Flags touched

- `RIDER_CF_ACCESS` — wired into `apps/rider-payments/src/lib/authDispatcher.ts`, `apps/rider-payments/src/proxy.ts`, `apps/rider-payments/src/lib/api-auth.ts`, `apps/rider-payments/src/app/auth/callback/route.ts`. Default off.

---

## 2026-04-17 — Phase 2.1 + 2.2: Petty Cash server-side migrations

### Shipped

- `apps/petty-cash/src/lib/requirePrincipalOrRedirect.ts` — thin page-level wrapper. 3 Vitest cases.
- Every server-side `getServerSession(authOptions)` call in `apps/petty-cash` replaced with `getPrincipal()` / `requirePrincipalOrRedirect()`:
  - API routes: `/api/branch/state`, `/api/expenses`, `/api/requests` (GET + POST), `/api/requests/[id]/review` — 4 files.
  - Server pages: `/`, `/admin`, `/branch`, `/finance` — 4 files.
  - Renamed `req` → `created` in the requests POST transaction to unshadow the Fetch `Request` param.
- Changeset `.changeset/phase-2-1-route-migrations.md` (petty-cash minor).

### Validated

- `pnpm typecheck / lint / test / build` all green.
- Vitest monorepo count: **74** (21 config + 13 auth + 2 db + 1 ui + 15 workspace + 22 petty-cash).

### In-progress

_(complete)_

### Next

- **Phase 2.3:** `apps/petty-cash/src/components/Header.tsx` client `useSession` — decision required on client-side principal source in V2 mode (cookie vs `/api/me` vs server-prop).
- **Phase 2.4:** Prisma migration dropping `User.password` after 2-week dual-run bake.
- **Phase 3:** Rider Payments migration behind `RIDER_CF_ACCESS`.

### Flags touched

- None. `PETTY_CASH_AUTH_V2` default off; no behavior change in production.

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
