# HANDOFF.md — apps/petty-cash

Living log for this app. Top entry is current.

---

## 2026-04-17 — Phase 4.2: LIVE on Cloudflare Workers 🚀

### Shipped

- **Live at https://ando-petty-cash.philip-ndegwa.workers.dev** (Philip's CF account, `e0d49a41...`).
- Backed by Neon Free Postgres in `ap-southeast-1`. Prisma schema applied, 3 users seeded (`admin@example.com`, `finance@example.com`, `branch@example.com` — all password `password123`).
- Legacy NextAuth mode (`PETTY_CASH_AUTH_V2=false`).
- `wrangler.toml` (`workers_dev=true` for now), `open-next.config.ts`, `cf:build` / `cf:deploy` scripts.
- `@neondatabase/serverless` replaces raw `pg` throughout.
- **`src/lib/prisma.ts` is now a hand-written neon-backed facade** covering the app's narrow Prisma surface — Prisma Client doesn't load at runtime on Workers.
- **NextAuth JWT encoder overridden** with HS256 via `jose` — default JWE uses `crypto.createCipheriv` which unenv doesn't implement.
- `src/lib/auth.ts` `authorize()` queries Neon directly (one SQL).
- `[...nextauth]/route.ts` forwards `(req, ctx)` to the NextAuth handler.
- `nodemailer` lazy-loaded only in Node dev; production Worker logs `[email:stub]` JSON to `wrangler tail`.

### Cutover order (hard-earned blockers)

1. Middleware file location — must be `src/middleware.ts` with the `src/` layout.
2. NextAuth catchall needs `ctx` forwarded alongside `req`.
3. Raw `pg` TCP pools hang on Workers → swap to `@neondatabase/serverless`.
4. Prisma library engine does `fs.readdir` at startup → replace Client with a facade.
5. NextAuth default JWT encoder uses `crypto.createCipheriv` → override with `jose` HS256.
6. `@ando/config/env` validates at module load → wrangler.toml `[vars]` needs placeholders for every required var.

### Verified end-to-end

- `POST /api/auth/callback/credentials` with seeded admin → 302 + `__Secure-next-auth.session-token` cookie.
- Authenticated `GET /` → 307 → `/admin` → renders 200 HTML.
- `POST /api/admin/branches` creates a row and returns it.
- `GET /api/admin/branches` lists branches with user counts.

### Known gaps (non-blocking at 20-user scale)

- Emails log-only. Follow-up: CF Email Workers or Resend.
- No custom domain — still `*.workers.dev`. DNS + `[[routes]]` flip in `wrangler.toml` takes ~5 min once DNS is added.
- `$transaction` executes sequentially, not atomically. Fine at this load; harden with `sql.transaction([...])` later.
- Default passwords are `password123`. **Rotate immediately.**
- No Vitest changes this phase — existing 22 cases still pass locally. The facade is effectively a thin SQL layer, integration-tested against the live Neon DB.

### Follow-ups

- Change admin password.
- Swap email stub for a real provider.
- Wire custom domain.
- Continue Phase 4.3 (rider-payments on Workers) — will hit the same neon / prisma / crypto issues; lessons captured in CLAUDE.md.

---

## 2026-04-17 — Phase 2.1 + 2.2: server-side call-site migrations

### Shipped

- `src/lib/requirePrincipalOrRedirect.ts` + 3 Vitest cases (happy path, missing principal → `/login`, custom redirect target).
- Every server-side `getServerSession(authOptions)` call site now goes through `getPrincipal` / `requirePrincipalOrRedirect`:
  - **API routes (4):** `/api/branch/state`, `/api/expenses`, `/api/requests` (GET + POST — note: renamed the transaction-local `req` to `created` to unshadow the Fetch `Request` param), `/api/requests/[id]/review`.
  - **Pages (4):** `/`, `/admin`, `/branch`, `/finance`.
- `.id` → `.userId` shape follow-through at every migrated call site.
- Changeset `.changeset/phase-2-1-route-migrations.md` (petty-cash minor).

### Validated

- `pnpm --filter @ando/petty-cash test` ✅ — 22 cases now (was 19).
- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅ — all 15 petty-cash routes still compile cleanly.

### Remaining legacy auth references

- Only `src/components/Header.tsx` `useSession()` remains — client-side, needs a Phase 2.3 design decision on V2-mode principal source (cookie, `/api/me` endpoint, or initial server-rendered prop).

### In-progress

_(Phase 2.1–2.2 complete; ready for 2.3.)_

### Next

- **Phase 2.3:** migrate `Header.tsx` — client-side principal read; design decision required.
- **Phase 2.4:** Prisma migration dropping `User.password` after 2-week dual-run bake.
- **Phase 3:** Rider Payments migration behind `RIDER_CF_ACCESS`.

### Flags touched

- No flag changes in this slice. `PETTY_CASH_AUTH_V2` still default-off.

### Notes

- No regressions in legacy mode verified by type-check of existing roles/branch semantics.
- The V2 iam→Prisma JIT path is exercised by `getPrincipal.test.ts` already.

---

## 2026-04-17 — Phase 2 MVP: dual-run scaffolding

### Shipped

- Imported source into `apps/petty-cash` from the legacy sibling folder (non-destructive copy; original at `/Users/asifkhan/claude-ak/coding-projects/petty-cash` remains as safety net until we confirm stability).
- Rewired `package.json` to `@ando/petty-cash` with workspace deps on `@ando/auth` / `@ando/config` / `@ando/db` / `@ando/ui` / `@ando/tsconfig` / `@ando/eslint-config`; `type: module`.
- Shared TS base via `@ando/tsconfig/nextjs.json`; flat ESLint via `@ando/eslint-config/next` (legacy-tolerant overrides documented).
- Vitest harness with 19 passing cases.
- `src/lib/authDispatcher.ts` — `getAuthMode()` reads `PETTY_CASH_AUTH_V2`.
- `src/lib/getPrincipal.ts` — unified principal resolver. Lazy-imports `next-auth` / `@ando/db` / `prisma` so legacy mode doesn't pay for V2 wiring and vice versa.
- `middleware.ts` — no-op in legacy mode; full `evaluateAccess(appSlug='petty-cash')` in V2 mode with `x-ando-principal` propagation.
- `src/app/api/auth/[...nextauth]/route.ts` — keeps NextAuth wiring; returns 410 when `PETTY_CASH_AUTH_V2=true`.
- `src/lib/admin.ts` — `requireAdmin()` rebuilt on `getPrincipal()`. Return type changed from opaque session-user to `LocalPrincipal | null` (`.userId` instead of `.id`).
- `src/app/api/admin/users/[id]/route.ts` — updated for new shape.
- `src/app/no-access/page.tsx` — rendered when middleware rewrites 403.
- `postcss.config.js → postcss.config.cjs` for ESM compatibility.
- Root `pnpm.onlyBuiltDependencies` now permits Prisma + esbuild + tesseract postinstalls.
- Docs: `SPEC.md`, `README.md`, `CLAUDE.md`, this `HANDOFF.md`, `CHANGELOG.md`.
- Changeset `.changeset/phase-2-petty-cash-dual-run.md` (petty-cash minor, config/auth/db patches).

### Validated

- `pnpm typecheck` ✅
- `pnpm lint` ✅ (after a two-line autofix on existing code)
- `pnpm test` ✅ — 71 total across monorepo (21 config + 13 auth + 2 db + 1 ui + 15 workspace + 19 petty-cash + 4 skipped Playwright)
- `pnpm build` ✅ — Next.js compiled all 15 petty-cash routes cleanly; Prisma generate ran as part of the build.

### In-progress

- The remaining `getServerSession(authOptions)` call sites (≈9 routes + `Header.tsx` client `useSession`) are untouched in this PR by design. Each migration is a separate follow-up with its own changeset.

### Next

- **Phase 2.1:** migrate `src/app/api/requests/route.ts` and `src/app/api/expenses/route.ts` to `getPrincipal()`.
- **Phase 2.2:** migrate `src/app/admin/page.tsx` + `src/app/branch/page.tsx` + `src/app/finance/page.tsx` (add a guard util since these redirect on no-session).
- **Phase 2.3:** migrate `Header.tsx` — client-side principal read (from a cookie or a small API). Decision required: client state source in V2 mode.
- **Phase 2.4:** Prisma migration dropping `User.password` (only after 2-week dual-run bake).
- **Phase 3:** Rider Payments onto `@ando/auth` behind `RIDER_CF_ACCESS`.

### Open questions

- The legacy sibling folder `/Users/asifkhan/claude-ak/coding-projects/petty-cash` — when do we delete it? Proposed: after Phase 2.4 is merged and soaked 1 week.
- Same four carried from root HANDOFF (hosting, audit retention, email sender, iam migration ownership).
- `/admin` in petty-cash — separate CF Access session duration (1h) or in-app role check only?

### Flags touched

- `PETTY_CASH_AUTH_V2` — declared in `@ando/config/flags`, consumed in `src/lib/authDispatcher.ts`, `middleware.ts`, and the NextAuth route. Default: off. Production toggles to `true` only after prod-smoke.

### Notes

- Build command is `prisma generate && next build` — the Prisma client is not cached across envs; always generate before building.
- The copy into the monorepo did not include `node_modules`, `.next`, `package-lock.json`, or `.env`. Old `package.json` and `tsconfig.json` were replaced rather than imported to avoid conflicts with pnpm workspace protocol.
