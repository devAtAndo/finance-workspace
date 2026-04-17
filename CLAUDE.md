# CLAUDE.md — Ando Finance Workspace (monorepo root)

Guidance for future Claude sessions (and humans) working in this repo.

## Orientation

- **One login across all finance apps.** Cloudflare Access at the edge (Email OTP, `@andofoods.co` only) + `iam` Postgres for RBAC.
- **Apps stay independent** — separate subdomains, separate deploys, separate bundles.
- **Shared layers** live in `packages/*` and are consumed via `workspace:*` protocol.
- **The auth hot path never touches the database for verification.** `@ando/auth.verifyCfAccessJwt` is pure JWKS-based. DB is touched only to resolve email → `iam.users.id` and load `iam.app_access`.

## Entry points by concern

| Concern                         | File                                                           |
| ------------------------------- | -------------------------------------------------------------- |
| Cloudflare Access JWT shape     | `packages/auth/src/types.ts`, `packages/auth/SPEC.md`          |
| JWT verification                | `packages/auth/src/verifyCfAccessJwt.ts`                        |
| Per-app middleware              | `packages/auth/src/middleware.ts`                               |
| Env / flags / app registry      | `packages/config/src/{env,apps,flags}.ts`                       |
| iam schema (authoritative)      | `infra/migrations/0001_iam_schema.sql`                          |
| iam data access                 | `packages/db/src/iam.ts`                                        |
| Local subdomain dev             | `Caddyfile`                                                     |
| E2E auth scenarios              | `e2e/tests/auth.spec.ts`                                        |
| Cloudflare Access infra         | `infra/cloudflare/main.tf`                                      |

## Invariants (do not break)

1. **Every route handler in every app must call `requireAppAccess` (or go through `evaluateAccess`).** No exceptions. Public marketing surfaces would live on a separate zone.
2. **`packages/auth` never reads `process.env`.** Callers pass `teamDomain` / `audience` explicitly.
3. **Every state-changing iam write appends to `audit_log` in the same transaction.** See `packages/db/src/iam.ts`.
4. **Per-app `aud` claim is distinct.** Losing this breaks the cross-app replay protection.
5. **Errors are class-based** (`UnauthorizedError`, `ForbiddenError`). Callers map them to HTTP — never string-match.
6. **Changesets required** when `packages/**` or `apps/**` changes. CI enforces.
7. **Strict TDD.** Red test first, always. Coverage thresholds on `@ando/auth` in `packages/auth/vitest.config.ts`.

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

## What *not* to do

- Don't collapse the apps into a single Next.js app.
- Don't reintroduce per-app logins; a "one more exception" undoes the whole platform.
- Don't hand-roll JWT parsing — use `jose`.
- Don't call `iam` methods outside `packages/db` or an admin API that wraps them.
- Don't create a user row outside `upsertUserByEmail` — duplicates break JIT provisioning.
