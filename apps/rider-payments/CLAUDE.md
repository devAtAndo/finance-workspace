# CLAUDE.md — apps/rider-payments

Guidance for sessions touching Rider Payments during the dual-run migration.

Read **`AGENTS.md`** first — Next.js 16 has breaking changes from older majors; assumptions from Next 14 training data don't apply.

## Orientation

- Next.js **16.2** app at `rider-payments.andofoods.co`.
- In the middle of migrating from Supabase Auth (magic-link OTP) to `@ando/auth` + Cloudflare Access.
- **Two auth paths coexist behind `RIDER_CF_ACCESS`.** Keep the legacy path working until HANDOFF.md marks the dual-run complete.
- Uses Next 16's **Proxy** (not Middleware). Only `nodejs` runtime; `src/proxy.ts` is the gate.
- Supabase provides both **auth (legacy)** and **data (both modes)**. Keep the two concerns mentally separate.

## The flag is sacred

`RIDER_CF_ACCESS`:

- unset / `false` — Supabase proxy refreshes session, redirects unauthenticated users to `/login`.
- `true` — CF Access proxy gates every non-public route; `/auth/callback` returns 410; `x-ando-principal` header propagates the principal.

Rule: **read the flag once per request** via `getAuthMode()`, then stick with that decision.

## Entry points

| Concern                          | File                                         |
| -------------------------------- | -------------------------------------------- |
| Auth-mode dispatch               | `src/lib/authDispatcher.ts`                  |
| API route auth (single helper)   | `src/lib/api-auth.ts`                        |
| Route gate (proxy)               | `src/proxy.ts`                               |
| Legacy Supabase clients          | `src/lib/supabase/{server,browser,admin}.ts` |
| Magic-link callback (+ V2 guard) | `src/app/auth/callback/route.ts`             |
| External Ando DB pools           | `src/lib/db/external-pg.ts`                  |
| NoAccess page                    | `src/app/no-access/page.tsx`                 |
| Supabase migrations              | `supabase/migrations/001_init.sql`           |

## Invariants (do not break)

1. **Supabase Auth must keep working byte-for-byte when the flag is off.** `/login`, `/auth/callback`, proxy's legacy path, and Supabase RLS all unchanged in legacy mode.
2. **V2-specific imports must be lazy / dynamic** in `src/proxy.ts`. Do not hoist `@ando/auth` / `@ando/config/env` / `@ando/db` to the top of the file.
3. **Every API route must call `requireAuth(req)`** at the top. Pass the `Request` — it is required in V2 mode for the header read, and harmless in legacy mode.
4. **`/auth/callback` must return 410 in V2 mode.** Do not loosen this; stale Supabase sessions during cutover defeat the purpose.
5. **RLS policies depend on `auth.uid()`.** In V2 mode, authenticated Supabase writes go through the service-role admin client. Do not "fix" this with an ad-hoc RLS policy change — that's a dedicated Phase 3.x migration.
6. **Proxy runtime is nodejs-only.** Don't add edge runtime exports.

## Common gotchas

- **Next 16 Proxy ≠ Middleware.** File is `src/proxy.ts`, export is `proxy`, config shape is slightly different. See `node_modules/next/dist/docs/` (per AGENTS.md).
- **`server-only` in tests** is shimmed via `test/_shim-server-only.ts` + `vitest.config.ts` alias. Don't remove the shim — tests that import `api-auth.ts` will throw.
- **`cookies()` is async** in Next 16 (handled in existing Supabase server/browser clients).
- **External PG pools** (`ANDO_RIDER_DATABASE_URL`, `ANDO_CUSTOMER_DATABASE_URL`) are not cleaned up on serverless shutdown. Acceptable for now; revisit if moving off nodejs runtime.
- **Zod version:** pinned to 3.x in the monorepo package.json (original rider-payments had a 4.x typo); stick with 3.
- **React 19** types are forced across the monorepo via `pnpm.overrides` to avoid cross-version hoisting conflicts.

## Useful commands

```bash
pnpm --filter @ando/rider-payments dev          # localhost:3002
pnpm --filter @ando/rider-payments test         # Vitest unit suite
pnpm --filter @ando/rider-payments test:golden  # tsx reconciliation golden fixture
pnpm --filter @ando/rider-payments typecheck
pnpm --filter @ando/rider-payments lint
pnpm --filter @ando/rider-payments build
```

## What _not_ to do

- Don't remove Supabase client imports. They're the data layer in both modes and the auth layer in legacy mode.
- Don't add a new `getSupabaseServerClient().auth.getUser()` call outside `src/lib/api-auth.ts` — route new code through `getCaller(req)` instead.
- Don't change the proxy's public-path allowlist without updating a matching Playwright scenario.
- Don't touch `supabase/migrations/*` in this phase; RLS rewrite is its own PR.
