# CLAUDE.md — Ando Finance Workspace (monorepo root)

Guidance for future Claude sessions (and humans) working in this repo.

## Orientation

- **One login across all finance apps.** Cloudflare Access at the edge (Email OTP, `@andofoods.co` only) + `iam` Postgres for RBAC.
- **Apps stay independent** — separate subdomains, separate deploys, separate bundles.
- **Shared layers** live in `packages/*` and are consumed via `workspace:*` protocol.
- **The auth hot path never touches the database for verification.** `@ando/auth.verifyCfAccessJwt` is pure JWKS-based. DB is touched only to resolve email → `iam.users.id` and load `iam.app_access`.

## Entry points by concern

| Concern                     | File                                                                                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Access JWT shape | `packages/auth/src/types.ts`, `packages/auth/SPEC.md`                                                                                              |
| JWT verification            | `packages/auth/src/verifyCfAccessJwt.ts`                                                                                                           |
| Per-app middleware          | `packages/auth/src/middleware.ts`                                                                                                                  |
| Env / flags / app registry  | `packages/config/src/{env,apps,flags}.ts`                                                                                                          |
| iam schema (authoritative)  | `infra/migrations/0001_iam_schema.sql`                                                                                                             |
| iam data access             | `packages/db/src/iam.ts`                                                                                                                           |
| Local subdomain dev         | `Caddyfile`                                                                                                                                        |
| E2E auth scenarios          | `e2e/tests/auth.spec.ts`                                                                                                                           |
| Cloudflare Access infra     | `infra/cloudflare/main.tf`                                                                                                                         |
| Workspace launcher          | `apps/workspace/src/middleware.ts`, `apps/workspace/src/app/page.tsx`                                                                              |
| Petty Cash dual-run         | `apps/petty-cash/src/lib/authDispatcher.ts`, `apps/petty-cash/src/lib/getPrincipal.ts`, `apps/petty-cash/src/middleware.ts`                        |
| Petty Cash live URL         | https://ando-petty-cash.philip-ndegwa.workers.dev (Phase 4.2; Neon Postgres, NextAuth legacy mode)                                                 |
| Petty Cash neon facade      | `apps/petty-cash/src/lib/prisma.ts` — hand-written, replaces Prisma Client because the library engine's `fs.readdir` startup call fails on Workers |
| Rider Payments dual-run     | `apps/rider-payments/src/lib/authDispatcher.ts`, `apps/rider-payments/src/lib/api-auth.ts`, `apps/rider-payments/src/proxy.ts`                     |
| Cloudflare hosting runbook  | `docs/hosting-cloudflare.md`                                                                                                                       |

## Invariants (do not break)

1. **Every route handler in every app must call `requireAppAccess` (or go through `evaluateAccess`).** No exceptions. Public marketing surfaces would live on a separate zone.
2. **`packages/auth` never reads `process.env`.** Callers pass `teamDomain` / `audience` explicitly.
3. **Every state-changing iam write appends to `audit_log` in the same transaction.** See `packages/db/src/iam.ts`.
4. **Per-app `aud` claim is distinct.** Losing this breaks the cross-app replay protection.
5. **Errors are class-based** (`UnauthorizedError`, `ForbiddenError`). Callers map them to HTTP — never string-match.
6. **Changesets required** when `packages/**` or `apps/**` changes. CI enforces.
7. **Strict TDD.** Red test first, always. Coverage thresholds on `@ando/auth` in `packages/auth/vitest.config.ts`.

## Cloudflare Workers runtime gotchas (hard-earned — see Phase 4.2 HANDOFF)

- **Prisma library engine does `fs.readdir` at startup** → unenv rejects it. Don't import `@prisma/client` in any Worker hot path. Use neon-backed facades or raw SQL via `@neondatabase/serverless`.
- **Raw `pg` TCP pools hang on Workers** → use `@neondatabase/serverless` (HTTP/WebSocket). Applies to any direct Postgres access.
- **NextAuth's default JWT encoder uses `crypto.createCipheriv`** → unenv doesn't implement it. Override `jwt.encode` / `jwt.decode` with HS256 via `jose` (Web Crypto).
- **Next 14 middleware must live at `src/middleware.ts`** when using the src/ directory layout. At project root it's silently ignored.
- **`[...nextauth]` catchall** needs both `req` and `ctx` forwarded to the handler — otherwise "Cannot destructure property 'nextauth' of 'e2.query'".
- **`nodejs_compat` + `compatibility_date >= 2024-09-23`** enables the newer Node API surface, but many modules are still stubs (unenv). Test the specific APIs your deps use.
- **`wrangler.toml [vars]`** must include placeholders for every env var your app's config module parses at startup — otherwise the Worker crashes before middleware runs.

## Common gotchas

- **Cookie domain:** Cloudflare owns `CF_Authorization` on `.andofoods.co`. Apps must not set conflicting session cookies on the same domain.
- **Dev JWKS:** Playwright's `cfAccessHarness` signs JWTs with a local keypair. Apps' dev middleware must point `@ando/auth` at the test JWKS — never mix real and test keys.
- **Supabase Free pause:** `iam` lives on Supabase Free. If it pauses, apps still gate correctly (edge), but admin UI degrades. Keep admin code tolerant of DB errors.
- **Next.js version skew:** Petty Cash is on 14, Rider Payments on 16. The shared packages must not import Next.js types — use Fetch API types (`Request` / `Response`) exclusively.

## Useful commands

```bash
pnpm test                                # all packages
pnpm --filter @ando/auth test            # just auth
pnpm --filter @ando/auth test:coverage   # auth coverage
pnpm typecheck                            # monorepo-wide
pnpm changeset                            # before merging package changes
```

## What _not_ to do

- Don't collapse the apps into a single Next.js app.
- Don't reintroduce per-app logins; a "one more exception" undoes the whole platform.
- Don't hand-roll JWT parsing — use `jose`.
- Don't call `iam` methods outside `packages/db` or an admin API that wraps them.
- Don't create a user row outside `upsertUserByEmail` — duplicates break JIT provisioning.
