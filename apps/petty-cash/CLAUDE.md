# CLAUDE.md — apps/petty-cash

Guidance for sessions touching the Petty Cash app during the dual-run migration.

## Orientation

- Next.js 14.2 app at `petty-cash.andofoods.co`.
- In the middle of migrating from NextAuth (credentials + bcrypt) to `@ando/auth` + Cloudflare Access.
- **Two auth paths coexist behind `PETTY_CASH_AUTH_V2`.** Do not remove the legacy path until HANDOFF.md marks the dual-run complete.

## The flag is sacred

`PETTY_CASH_AUTH_V2`:

- unset / `false` — NextAuth gates everything at page level (status quo).
- `true` — `middleware.ts` gates every route via CF Access + `iam.app_access`; NextAuth route returns 410.

Rule: **never split-brain mid-request.** Read the flag once via `getAuthMode()` and stick with that decision for the whole request.

## Entry points

| Concern                           | File                                      |
| --------------------------------- | ----------------------------------------- |
| Auth-mode dispatch                | `src/lib/authDispatcher.ts`               |
| Principal resolution (both modes) | `src/lib/getPrincipal.ts`                 |
| Admin role check                  | `src/lib/admin.ts`                        |
| Legacy NextAuth config            | `src/lib/auth.ts` (untouched)             |
| Legacy NextAuth route + V2 guard  | `src/app/api/auth/[...nextauth]/route.ts` |
| Route gate (V2 mode)              | `middleware.ts`                           |
| NoAccess page                     | `src/app/no-access/page.tsx`              |
| Prisma schema                     | `prisma/schema.prisma`                    |
| Seed script                       | `prisma/seed.ts`                          |

## Invariants (do not break)

1. **NextAuth must keep working byte-for-byte when the flag is off.** Any change that alters legacy behavior is a regression.
2. **V2-specific imports must be lazy / dynamic** — callers in legacy mode must never pay the cost of loading `@ando/auth`, `@ando/db`, or `@ando/config/env`. See the `await import(...)` pattern in `getPrincipal.ts` and `middleware.ts`.
3. **When the flag is on, `/api/auth/[...nextauth]/*` must return 410.** No new NextAuth sessions may be created during the cutover.
4. **`requireAdmin` returns `LocalPrincipal | null`** with `userId` (not `id`). When converting a new call site, audit for `.id` → `.userId`.
5. **Do not drop `User.password`** until the dual-run has baked for 2 weeks. Leaving the column means rollback is still possible.
6. **Every new call-site migration must ship its own changeset** — piecemeal so rollback is surgical.

## Common gotchas

- **`postcss.config.cjs`** (not `.js`) because the app declares `"type": "module"`. The older `.js` form breaks under ESM.
- **`noUncheckedIndexedAccess` is OFF** in the app tsconfig — the existing code wasn't written against it. Don't tighten without a dedicated refactor PR.
- **`next lint` is disabled.** We use `eslint src middleware.ts` across the monorepo for consistency.
- **Prisma generate runs as part of `build`** (`prisma generate && next build`) — do not remove it or CI will fail.
- **Inter-app imports use extension-less paths** (`./prisma`, not `./prisma.js`). Only the compiled shared packages (`packages/*/dist`) use `.js`.
- **Request type:** middleware receives `NextRequest`, but `getPrincipal` accepts the standard `Request` (Fetch API). Don't leak `NextRequest` into `getPrincipal`.

## Useful commands

```bash
pnpm --filter @ando/petty-cash dev          # localhost:3001
pnpm --filter @ando/petty-cash test
pnpm --filter @ando/petty-cash typecheck
pnpm --filter @ando/petty-cash lint
pnpm --filter @ando/petty-cash build        # runs prisma generate
pnpm --filter @ando/petty-cash db:push      # sync Prisma schema
```

## What _not_ to do

- Don't delete `src/lib/auth.ts` or the NextAuth provider config during the dual-run.
- Don't add a new `getServerSession(authOptions)` call — route it through `getPrincipal` instead.
- Don't bypass `middleware.ts` by changing its `matcher` without adding a test.
- Don't import from `@ando/auth` / `@ando/db` / `@ando/config/env` at the top level of any file that runs in legacy mode — keep them lazy.
