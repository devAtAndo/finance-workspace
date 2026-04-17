# apps/petty-cash — Spec / PRP

## Intent

Migrate the existing Petty Cash Next.js 14 app (NextAuth v4 + Prisma/Postgres + bcrypt credentials) onto the shared `@ando/auth` + `@ando/db` identity fabric behind Cloudflare Access — **without breaking current sign-in for a 2-week dual-run window**.

The switch is governed by one env flag: `PETTY_CASH_AUTH_V2`.

## Two worlds, one dispatcher

- **V2 OFF (default):** NextAuth keeps working exactly as before. No behavior change for users or code paths. This is prod on day 1.
- **V2 ON:** `middleware.ts` gates every app route via `@ando/auth.evaluateAccess(appSlug='petty-cash')`. The `/api/auth/[...nextauth]/*` endpoints stop accepting new sign-ins (return 410 Gone). Pages read the caller's principal from a request-scoped header (`x-ando-principal`) instead of `getServerSession`.

Rollback: `PETTY_CASH_AUTH_V2=false` reverts to NextAuth in-process. Existing NextAuth sessions stay valid.

## Public API inside the app

### `src/lib/authDispatcher.ts`

```ts
type Mode = 'nextauth' | 'cfaccess';
function getAuthMode(): Mode; // reads PETTY_CASH_AUTH_V2
```

Pure, no side effects; reads `process.env.PETTY_CASH_AUTH_V2` and nothing else.

### `src/lib/getPrincipal.ts`

```ts
interface LocalPrincipal {
  userId: string; // Prisma User.id
  email: string;
  role: 'ADMIN' | 'FINANCE' | 'BRANCH_USER';
  branchId: string | null;
}

function getPrincipal(opts?: { req?: Request }): Promise<LocalPrincipal | null>;
```

Single call site for every page / API route to read "who is this request":

- Mode `nextauth`: delegates to `getServerSession(authOptions)` and maps the NextAuth session to `LocalPrincipal`.
- Mode `cfaccess`: reads `x-ando-principal` (from middleware) for email/userId/role, then looks up `branchId` from Prisma `User` by email. If no local `User` row, **auto-provision** one (JIT) with role mapped from `iam.app_access`.

Callers that can't tolerate `null` use `requirePrincipal()` which throws.

### `middleware.ts`

- Mode `nextauth`: match nothing — NextAuth continues to gate at page level via `getServerSession`.
- Mode `cfaccess`: match everything except `_next/`, `favicon`, `api/auth/` (returns 410), and static assets. On unauthorized → redirect to `https://workspace.andofoods.co/login?next=<original>`. On forbidden → rewrite to `/no-access`.

## Route changes in this phase

For Phase 2 MVP we ship the **infrastructure** and convert **one** call site as a proof of concept:

1. `src/lib/admin.ts` — `requireAdmin()` is rewritten to use `getPrincipal()`. Every existing caller still works; the implementation swaps beneath them.
2. `src/middleware.ts` is new.
3. `src/app/api/auth/[...nextauth]/route.ts` gets a V2-guard wrapper that returns 410 when the flag is on.

The remaining call sites (~9 routes + the client `Header.tsx` `useSession` hook) continue to use `getServerSession` directly and are migrated incrementally in Phase 2.x follow-ups. Each such migration is a separate PR with its own changeset.

## Invariants

1. **NextAuth path must keep working byte-for-byte** while `PETTY_CASH_AUTH_V2=false`. Adding the dispatcher must not change any existing behavior.
2. **The flag is read once per request** (via `getAuthMode`). Never split-brain mid-request.
3. **No `iam` reads when flag is off** — Phase-2-new imports must be lazy / dynamic so NextAuth users don't incur DB calls to `iam`.
4. **JIT provisioning** in V2 mode uses the local `Prisma.User.email` → `User.id` as the canonical `userId`. Future Phase 5 migration will reconcile this with `iam.users.id`. For now, two IDs exist in parallel (local Prisma ID + iam.users ID). Dispatcher returns the local one.
5. **`/api/auth/[...nextauth]/*` must 410 in V2 mode** so nobody accidentally creates stale NextAuth sessions during dual-run.

## TDD focus

Unit tests (Vitest, no DB):

- `getAuthMode` — parses `true|1|yes` as V2 on; anything else as off.
- `getPrincipal`:
  - V2 mode + valid `x-ando-principal` header → returns `LocalPrincipal` with `branchId` from injected Prisma fake.
  - V2 mode + missing header → returns `null`.
  - Legacy mode + valid session → returns `LocalPrincipal` mapped from session.
  - Legacy mode + no session → returns `null`.
- `requirePrincipal` → throws when `getPrincipal` returns `null`.
- NextAuth route 410 guard — returns 410 when flag on, delegates otherwise.

Integration tests (Playwright) come online in the `e2e/` suite once the test JWKS is wired — already scaffolded in Phase 0.

## Prisma migration (deferred)

Dropping `User.password` happens in a separate migration after the 2-week dual-run proves the V2 path is stable. Until then, the column stays — removing it would break the NextAuth fallback. This is tracked in HANDOFF.

## Failure modes

- Flag on, iam DB down → 503 at middleware. App unusable but NextAuth isn't reactivated (no split-brain). Rollback: flip flag to false.
- Flag off, local DB down → existing NextAuth error path unchanged.
- Header `x-ando-principal` missing while flag on → middleware wasn't configured for that route. Refuse with 500 — indicates a bug, not an auth failure.
