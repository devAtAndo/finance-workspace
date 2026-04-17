---
'@ando/rider-payments': minor
---

Phase 3 MVP: Rider Payments joins the monorepo with dual-run auth behind `RIDER_CF_ACCESS`.

Rider Payments is imported into `apps/rider-payments/` and wired onto the shared packages. One env flag governs the whole app's auth path:

- Off (default) — Supabase magic-link OTP continues to work via `src/proxy.ts`. Production behavior is unchanged.
- On — Cloudflare Access + `@ando/auth` middleware gates every non-public route, attaches `x-ando-principal`, and the Supabase `/auth/callback` returns 410 so no stale sessions are minted during cutover.

Because Rider Payments already had a single server-side auth entry point in `src/lib/api-auth.ts`, the dispatch happens there: `getCaller(req)` + `requireAuth(req)` read the flag and branch internally. No per-route refactor needed for the API surface.

RLS rewrite, removal of the legacy `/login` flow, and deletion of the old sibling folder are follow-up PRs after the 2-week dual-run bake.

18 new Vitest cases. Monorepo Vitest count lands at 92.
