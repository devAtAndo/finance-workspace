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

## Runtime: Cloudflare Workers (production)

- **Live URL:** https://ando-petty-cash.philip-ndegwa.workers.dev
- Deployed via `@opennextjs/cloudflare` + `wrangler deploy`. See the root [`docs/hosting-cloudflare.md`](../../docs/hosting-cloudflare.md).
- Postgres: **Neon serverless** (HTTP driver). Connection string set via `wrangler secret put DATABASE_URL`.
- Auth: **legacy NextAuth** with HS256 JWTs signed by `jose` (Web Crypto). Default JWE encoder doesn't work on Workers — see invariant #8.
- **There is no Prisma Client at runtime.** `src/lib/prisma.ts` is a hand-written neon-backed facade; adding a new Prisma call means extending the facade first.

## Invariants (do not break)

1. **NextAuth must keep working byte-for-byte when the flag is off.** Any change that alters legacy behavior is a regression.
2. **V2-specific imports must be lazy / dynamic** — callers in legacy mode must never pay the cost of loading `@ando/auth`, `@ando/db`, or `@ando/config/env`. See the `await import(...)` pattern in `getPrincipal.ts` and `middleware.ts`.
3. **When the flag is on, `/api/auth/[...nextauth]/*` must return 410.** No new NextAuth sessions may be created during the cutover.
4. **`requireAdmin` returns `LocalPrincipal | null`** with `userId` (not `id`). When converting a new call site, audit for `.id` → `.userId`.
5. **Do not drop `User.password`** until the dual-run has baked for 2 weeks. Leaving the column means rollback is still possible.
6. **Every new call-site migration must ship its own changeset** — piecemeal so rollback is surgical.
7. **`src/lib/prisma.ts` is a facade, not Prisma Client.** Covers a narrow surface (branch/user/expense/reimbursementRequest + `$transaction`). Adding a new Prisma call = extend the facade first. Don't import `@prisma/client` directly anywhere that runs on Workers — the library engine's startup `fs.readdir` crashes under unenv.
8. **NextAuth JWT encoder is HS256 via `jose`**, not the default JWE (which needs `crypto.createCipheriv`, unimplemented by unenv). If touching `auth.ts`, preserve the `jwt.encode` / `jwt.decode` overrides.
9. **Postgres access goes through `@neondatabase/serverless`**, not raw `pg`. Raw `pg` TCP pools hang on Workers.
10. **Middleware is at `src/middleware.ts`**, not the project root. Next 14 with `src/` layout silently ignores root-level middleware.

## Common gotchas

- **`postcss.config.cjs`** (not `.js`) because the app declares `"type": "module"`. The older `.js` form breaks under ESM.
- **`noUncheckedIndexedAccess` is OFF** in the app tsconfig — the existing code wasn't written against it. Don't tighten without a dedicated refactor PR.
- **`next lint` is disabled.** We use `eslint src` across the monorepo for consistency.
- **Prisma generate runs as part of `build`** (`prisma generate && next build`) — safe to keep; the generated client is not actually loaded at runtime (facade replaces it).
- **`cf:build` runs `turbo run build --filter=@ando/petty-cash^...` first** to compile shared `@ando/*` packages before OpenNext bundles. Without it Next webpack can't resolve the workspace symlinks.
- **Inter-app imports use extension-less paths** (`./prisma`, not `./prisma.js`). Only the compiled shared packages (`packages/*/dist`) use `.js`.
- **Request type:** middleware receives `NextRequest`, but `getPrincipal` accepts the standard `Request` (Fetch API). Don't leak `NextRequest` into `getPrincipal`.
- **`[...nextauth]/route.ts` must forward `(req, ctx)`** to the NextAuth handler, not just `req`. Otherwise it crashes on the catchall param destructure.
- **Env vars:** `@ando/config/env` validates at module load. `wrangler.toml [vars]` must include placeholders for every required var (`CF_ACCESS_AUD_*`, `IAM_DATABASE_URL`) or the Worker crashes before any handler runs.

## Useful commands

```bash
# Local dev
pnpm --filter @ando/petty-cash dev             # localhost:3001
pnpm --filter @ando/petty-cash test
pnpm --filter @ando/petty-cash typecheck
pnpm --filter @ando/petty-cash lint
pnpm --filter @ando/petty-cash build           # runs prisma generate
pnpm --filter @ando/petty-cash db:push         # sync Prisma schema

# Cloudflare Workers
pnpm --filter @ando/petty-cash cf:build        # turbo build deps + opennextjs-cloudflare build
CLOUDFLARE_ACCOUNT_ID=<id> pnpm --filter @ando/petty-cash exec wrangler deploy
CLOUDFLARE_ACCOUNT_ID=<id> pnpm --filter @ando/petty-cash exec wrangler tail ando-petty-cash
CLOUDFLARE_ACCOUNT_ID=<id> pnpm --filter @ando/petty-cash exec wrangler secret put DATABASE_URL
```

## What _not_ to do

- Don't delete `src/lib/auth.ts` or the NextAuth provider config during the dual-run.
- Don't add a new `getServerSession(authOptions)` call — route it through `getPrincipal` instead.
- Don't bypass `middleware.ts` by changing its `matcher` without adding a test.
- Don't import from `@ando/auth` / `@ando/db` / `@ando/config/env` at the top level of any file that runs in legacy mode — keep them lazy.
