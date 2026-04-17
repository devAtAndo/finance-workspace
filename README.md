# Ando Finance Workspace

Unified SSO platform for Ando's finance apps. Every app lives on its own subdomain behind Cloudflare Access; every app consumes `@ando/auth` for identity and `@ando/db` for shared RBAC.

## Why this exists

Before: Petty Cash had its own NextAuth password login; Rider Payments had its own Supabase magic-link login. Two user tables, two audit trails, no unified access control, duplicate onboarding every time a new finance app shipped.

After: one login (Cloudflare Access Email OTP for `@andofoods.co` only), one `iam` store, one launcher at `workspace.andofoods.co`. Apps stay independent — they deploy and scale separately — but share the identity fabric.

## Architecture at a glance

```
    Internet ──► Cloudflare Access (Email OTP, @andofoods.co only)
                         │ injects cf-access-jwt-assertion
    ┌───────────────────┬┴──────────────────────┐
    ▼                   ▼                       ▼
  workspace.*       petty-cash.*           rider-payments.*
  (launcher+admin)  (Next.js 14)           (Next.js 16)
         │                 │                     │
         └────── all consume @ando/auth ─────────┘
                            │
                   iam schema (Postgres)
                   users • app_access • audit_log
```

## Repo layout

```
apps/                # Next.js apps (scaffolded in Phases 1–3)
packages/
  auth/              # Cloudflare Access JWT verify + requireAppAccess
  config/            # zod env, app registry, flags
  db/                # Kysely iam schema client
  ui/                # AppShell, TileGrid, NoAccess
  eslint-config/     # flat ESLint presets
  tsconfig/          # shared TS configs
infra/
  cloudflare/        # Terraform for Access applications
  migrations/        # iam schema SQL
e2e/                 # Playwright suite with CF Access JWT harness
```

## Getting started

```bash
# 1. Install
pnpm install

# 2. Configure
cp .env.example .env.local
# fill in CF_ACCESS_AUD_* (from `terraform output access_audiences`) and IAM_DATABASE_URL

# 3. Apply the iam schema
psql "$IAM_DATABASE_URL" -f infra/migrations/0001_iam_schema.sql

# 4. Test everything
pnpm test        # Vitest across all packages
pnpm typecheck
pnpm lint
pnpm build

# 5. Local SSO dev (once apps are scaffolded in Phase 1+)
brew install caddy && caddy trust
caddy run --config Caddyfile     # proxies *.localtest.me with a local CA
pnpm dev                          # turbo launches all apps in parallel
```

## Engineering discipline

Every change observes the same loop — no exceptions:

1. **Spec first** — write or update `SPEC.md` for the package you're touching.
2. **Failing test first** — strict TDD. No auth/middleware/logic lands without a red test first.
3. **Implement to green**.
4. **Update docs in the same PR** — `README.md`, `CLAUDE.md`, `HANDOFF.md` as relevant. `CHANGELOG.md` is driven by `pnpm changeset`.
5. **Conventional Commits** — enforced by commitlint + husky.
6. **Changeset required** — CI blocks PRs that touch `packages/**` or `apps/**` without one.

See [CHANGELOG.md](./CHANGELOG.md) for the monorepo-level history and [HANDOFF.md](./HANDOFF.md) for current session state.

## Phased rollout (see `~/.claude/plans/i-have-two-finance-delightful-boot.md`)

- **Phase 0** ✅ — Monorepo + shared packages scaffolded.
- **Phase 1** ✅ — Workspace launcher MVP at `apps/workspace/`.
- **Phase 2** ✅ — Petty Cash at `apps/petty-cash/` with dual-run behind `PETTY_CASH_AUTH_V2`; every server-side call site migrated (Phases 2.1 + 2.2). Client `Header.tsx` (2.3) and `User.password` Prisma drop (2.4) still pending.
- **Phase 3** ✅ (MVP) — Rider Payments at `apps/rider-payments/` with dual-run behind `RIDER_CF_ACCESS`. RLS rewrite (3.1) follows.
- **Phase 4** — Admin UI + audit log viewer.
- **Phase 5** — Hardening (passkeys via CF, log streaming, SAML path).

## Security posture

- Edge authentication — unauthenticated requests never reach app code.
- Email OTP restricted to `@andofoods.co`; MFA-by-passkey coming in Phase 5.
- `iam` Postgres is never in the auth hot path — if it pauses, apps still gate correctly; only the admin UI degrades.
- Per-app `aud` claim prevents cross-app token replay.
- Every access mutation writes to `iam.audit_log` in the same transaction.

## License

UNLICENSED — internal Ando project.
