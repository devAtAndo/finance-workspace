# @ando/rider-payments

`rider-payments.andofoods.co` — reconciliation of Ando rider payouts against payments recorded in the customer and rider production databases. Mid-migration from Supabase Auth to shared `@ando/auth` + Cloudflare Access.

See [`SPEC.md`](./SPEC.md) for the migration contract, [`AGENTS.md`](./AGENTS.md) for Next.js 16 specifics, [`CLAUDE.md`](./CLAUDE.md) for invariants, and [`HANDOFF.md`](./HANDOFF.md) for current session state.

## Stack

- Next.js 16.2 (App Router, **Proxy** not Middleware — see AGENTS.md)
- React 19
- Supabase Postgres (`rider_payments` schema) for reconciliation state
- Direct `pg` pools into Ando's production DBs for data ingestion
- Cloudflare Access + `@ando/auth` (V2 auth path)
- Supabase Auth magic-link OTP (legacy — dual-run until the 2-week bake completes)

## Run locally

```bash
cp .env.example .env.local                      # NEXT_PUBLIC_SUPABASE_*, ANDO_RIDER_DATABASE_URL, etc.
pnpm --filter @ando/rider-payments dev          # http://localhost:3002
```

Local SSO harness with Caddy from the monorepo root — `caddy run --config ../../Caddyfile` → `https://rider-payments.localtest.me`.

## The dual-run flag

`RIDER_CF_ACCESS` governs which auth stack gates the app:

| Flag                  | Auth path                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| unset / `0` / `false` | **Legacy Supabase Auth** — `/login`, `/auth/callback`, `signInWithOtp`; proxy refreshes session. |
| `1` / `true` / `yes`  | **CF Access + `@ando/auth`** — proxy gates every non-public route; `/auth/callback` returns 410. |

Default: unset. Production flips only after prod-smoke tests.

## Test

```bash
pnpm --filter @ando/rider-payments test         # 18 Vitest cases
pnpm --filter @ando/rider-payments test:golden  # the existing tsx reconcile fixture
pnpm --filter @ando/rider-payments typecheck
pnpm --filter @ando/rider-payments lint
pnpm --filter @ando/rider-payments build
```

## Auth entry points

| File                             | Purpose                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/lib/authDispatcher.ts`      | `getAuthMode()` reads `RIDER_CF_ACCESS`                                                           |
| `src/lib/api-auth.ts`            | `getCaller(req?)` / `requireAuth(req?)` — one call site for all API routes; dispatches internally |
| `src/proxy.ts`                   | Legacy Supabase proxy or CF Access proxy depending on flag                                        |
| `src/app/auth/callback/route.ts` | Supabase magic-link callback; 410 in V2 mode                                                      |
| `src/app/no-access/page.tsx`     | 403 page rendered by the CF Access rewrite                                                        |

## Routes

- `/` — dashboard (gated).
- `/reconciliation`, `/reconciliation/new`, `/reconciliation/[id]` — reconciliation workflow.
- `/login` — Supabase magic-link form (legacy; unreachable in V2 mode).
- `/auth/callback` — Supabase callback (legacy; 410 in V2 mode).
- `/no-access` — rendered on forbidden rewrite in V2 mode.
- `/api/health` — public health check.
- `/api/reconciliation/*` — internal APIs gated via `requireAuth`.

## Environment

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — Supabase data layer (required in both modes; auth + data, even when only data in V2).
- `ANDO_RIDER_DATABASE_URL`, `ANDO_CUSTOMER_DATABASE_URL`, `ANDO_DB_SSL` — direct reads for ingestion (optional; features degrade gracefully).
- `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD_RIDER_PAYMENTS`, `IAM_DATABASE_URL` — required when `RIDER_CF_ACCESS=true`.
- `RIDER_CF_ACCESS` — the flag.

## Migration status

Phase 3 MVP: dispatcher + proxy dual-run + `/auth/callback` 410 guard + `api-auth.ts` refactor are live.

Phase 3.x follow-ups:

- RLS policy rewrite (replace `auth.uid()` with a header-derived claim so authenticated Supabase reads can function in V2 mode without service-role everywhere).
- Remove `/login` UI and Supabase magic-link code after the 2-week bake.
- Delete the legacy `/Users/asifkhan/claude-ak/coding-projects/rider-payments` sibling folder once the monorepo copy is proven in production.
