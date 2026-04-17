# apps/rider-payments — Spec / PRP

## Intent

Migrate Rider Payments from Supabase Auth (magic-link OTP) onto the shared `@ando/auth` + Cloudflare Access fabric — without breaking the current sign-in during a 2-week dual-run. The Supabase Postgres (schema `rider_payments`) and the external Ando production DB reads stay untouched; only the identity layer moves.

Controlled by one env flag: `RIDER_CF_ACCESS`.

## Two worlds, one dispatcher

- **V2 OFF (default):** `src/proxy.ts` refreshes the Supabase session cookie and gates everything except `/login` / `/auth/callback` / `/_next` / `/favicon.ico` / `/api/health`. Behavior is identical to today's production.
- **V2 ON:** `src/proxy.ts` calls `@ando/auth.evaluateAccess(appSlug='rider-payments')`. Unauthorized → redirect to `workspace.andofoods.co`. Authorized → `x-ando-principal` header attached. `/auth/callback` returns 410 (no more Supabase magic-link flows).

Rollback: `RIDER_CF_ACCESS=false`. Existing Supabase sessions remain valid; nothing in Supabase's schema changes.

## Public API inside the app

### `src/lib/authDispatcher.ts`

```ts
type Mode = 'supabase' | 'cfaccess';
function getAuthMode(): Mode; // reads RIDER_CF_ACCESS
```

### `src/lib/getPrincipal.ts` (extending the existing `CallerInfo` shape)

```ts
interface CallerInfo {
  userId: string;
  email: string;
}

function getCaller(req?: Request): Promise<CallerInfo | null>;
```

- Mode `supabase`: delegates to the existing `getSupabaseServerClient().auth.getUser()`.
- Mode `cfaccess`: parses `x-ando-principal` header (populated by `proxy.ts`) and returns `{ userId, email }` using the email as identifier (Supabase `auth.uid()` won't be available — see RLS section).

`requireAuth(req?)` wraps and returns `Response.json({...}, { status: 401 })` when `getCaller` returns null (unchanged signature, swapped internals).

### `src/proxy.ts`

- Reads the flag once per request.
- Supabase path (legacy) is unchanged.
- CF Access path lazy-imports `@ando/auth` / `@ando/config/env` / `@ando/db` and calls `evaluateAccess(appSlug='rider-payments')`.

### `src/app/auth/callback/route.ts`

Returns 410 Gone when `RIDER_CF_ACCESS=true`.

## RLS interaction

The current Supabase migration `supabase/migrations/001_init.sql` uses `auth.uid()` in `payment_runs` INSERT/UPDATE policies. When `RIDER_CF_ACCESS=true`, Supabase client requests made from Next server components and API routes will authenticate using the anon key (no Supabase session). These writes would be blocked by the existing RLS.

**Phase 3 MVP strategy:** All writes that previously went through the authenticated server client are routed through the **service-role admin client** (already used for Storage + reconciliation inserts). Service-role bypasses RLS; the app-layer `requireAuth()` remains authoritative. Reads stay on the anon client where that works.

**Phase 3.x follow-up:** rewrite RLS policies to read a custom claim injected via Supabase's "third-party auth" (JWT templating) that matches the CF Access sub. Not attempted in this PR to keep the first cutover small.

## Invariants

1. **Supabase Auth keeps working byte-for-byte when `RIDER_CF_ACCESS` is off.** The existing login flow, callback, and OTP form are untouched in that mode.
2. **V2-specific imports stay lazy / dynamic** so legacy mode never pays for `@ando/auth` + `@ando/db` loading.
3. **`/auth/callback` returns 410 in V2 mode.** No new Supabase sessions get minted during cutover.
4. **No RLS policy changes in this PR.** Deferred to Phase 3.x.
5. **External Postgres pools to `ANDO_RIDER_DATABASE_URL` and `ANDO_CUSTOMER_DATABASE_URL` are unchanged.**
6. **Next 16 proxy, not middleware.** Runtime stays nodejs.

## TDD focus

Unit tests (Vitest):

- `getAuthMode` — parses `true|1|yes` as `cfaccess`, else `supabase`.
- `getCaller`:
  - Supabase mode + mocked authenticated user → returns `{userId, email}`.
  - Supabase mode + null user → returns null.
  - CF Access mode + valid `x-ando-principal` header → returns principal from header.
  - CF Access mode + missing header → returns null.
- `/auth/callback` guard — 410 when V2, delegates when legacy.
- `requireAuth` — returns 401 Response when null caller; null otherwise.

Playwright scenarios reuse the CF Access harness already in `e2e/` (currently `.skip`-gated).

## Failure modes

- V2 on, `iam` DB down → proxy returns 503. Fallback: flip flag back.
- V2 on, `x-ando-principal` header missing (configuration bug) → `getCaller` returns null → `requireAuth` responds with 401.
- Legacy mode, Supabase down → existing error path unchanged.

## Out of scope for this PR

- RLS policy rewrite (Phase 3.x).
- Removing `/login` UI and `signInWithOtp()` code (kept through the dual-run).
- Removing `supabase.auth` imports entirely.
- Consolidating with petty-cash's `LocalPrincipal` shape. Rider's `CallerInfo` is intentionally simpler (no role/branch); unifying can happen later in a shared package.
