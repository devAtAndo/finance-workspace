# Ando Finance Workspace — monorepo

Monorepo-level changelog. Per-package changelogs live in `packages/*/CHANGELOG.md` and `apps/*/CHANGELOG.md` and are driven by `pnpm changeset`.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

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
