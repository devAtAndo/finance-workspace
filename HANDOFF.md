# HANDOFF.md

Living session log. Updated at the end of every work session. Top entry is current.

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
