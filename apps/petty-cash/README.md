# @ando/petty-cash

`petty-cash.andofoods.co` — branch petty-cash tracking. Mid-migration from standalone NextAuth to the shared `@ando/auth` SSO fabric behind a feature flag.

See [`SPEC.md`](./SPEC.md) for the migration contract, [`CLAUDE.md`](./CLAUDE.md) for invariants, and [`HANDOFF.md`](./HANDOFF.md) for current session state.

## What it does

Branches spend against a recurring float (default KES 5,000). When usage hits 80% of the limit, finance gets an email. Branches upload receipts (with Tesseract.js OCR extracting the amount), submit reimbursement requests, and finance approves — replenishing the float.

## Stack

- Next.js 14.2 (App Router, TypeScript)
- Prisma + Postgres (business data — expenses, requests, branches, users)
- `@ando/auth` + `@ando/db` + Cloudflare Access (V2 auth path)
- NextAuth v4 (legacy auth path — dual-run, scheduled for removal after 2-week bake)
- Tesseract.js for receipt OCR
- Tailwind CSS

## Run locally

```bash
cp .env.example .env.local                     # fill DATABASE_URL, NEXTAUTH_SECRET, CF_ACCESS_*
pnpm --filter @ando/petty-cash db:push         # Prisma schema to local DB
pnpm --filter @ando/petty-cash db:seed         # seed admin + branches
pnpm --filter @ando/petty-cash dev             # http://localhost:3001

# Local SSO via Caddy + *.localtest.me (from monorepo root)
caddy run --config ../../Caddyfile             # https://petty-cash.localtest.me
```

## The dual-run flag

`PETTY_CASH_AUTH_V2` governs which auth stack gates the app:

| Flag value            | Auth path                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------- |
| unset / `0` / `false` | **Legacy NextAuth** — current prod behavior. `/api/auth/[...nextauth]` works.            |
| `1` / `true` / `yes`  | **CF Access + `@ando/auth`** — middleware gates every route; NextAuth route returns 410. |

Default: unset (NextAuth). Cutover plan: roll to one branch for 48h, then all branches, then remove legacy code after 2 weeks clean.

## Test

```bash
pnpm --filter @ando/petty-cash test            # 19 Vitest cases
pnpm --filter @ando/petty-cash typecheck
pnpm --filter @ando/petty-cash lint
pnpm --filter @ando/petty-cash build           # runs prisma generate first
```

## Auth entry points

| File                                      | Purpose                                         |
| ----------------------------------------- | ----------------------------------------------- |
| `src/lib/authDispatcher.ts`               | `getAuthMode()` reads `PETTY_CASH_AUTH_V2`      |
| `src/lib/getPrincipal.ts`                 | Unified `getPrincipal` / `requirePrincipal`     |
| `src/lib/admin.ts`                        | `requireAdmin` — now built on `getPrincipal`    |
| `middleware.ts`                           | Gate: no-op in legacy mode, full SSO in V2 mode |
| `src/app/api/auth/[...nextauth]/route.ts` | Delegates to NextAuth when legacy; 410 when V2  |

## Routes

- `/` — routes users by role (admin → `/admin`, finance → `/finance`, others → `/branch`).
- `/admin`, `/branch`, `/finance` — role-scoped dashboards.
- `/login` — NextAuth credentials form (legacy mode only).
- `/no-access` — rendered by middleware when the user has no `petty-cash` grant.
- `/api/admin/*`, `/api/branch/*`, `/api/expenses`, `/api/requests*` — internal APIs (role-gated via `requireAdmin` / `getPrincipal`).

## Environment

- `DATABASE_URL` — Petty Cash Postgres (business data).
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — required while the flag is off.
- `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD_PETTY_CASH`, `IAM_DATABASE_URL` — required while the flag is on.
- `PETTY_CASH_AUTH_V2` — the flag.
- `SMTP_*`, `FINANCE_EMAIL` — reimbursement notifications.

## Migration status

Phase 2 MVP: dispatcher + middleware + NextAuth 410 guard + `requireAdmin` refactor are live behind the flag.

Per-route migrations (replace `getServerSession(authOptions)` with `getPrincipal()`) land as follow-up PRs — each one independent, each with its own changeset.

`User.password` drop is deferred to a standalone Prisma migration after the 2-week dual-run bake.
