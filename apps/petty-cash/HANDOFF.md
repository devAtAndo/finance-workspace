# HANDOFF.md — apps/petty-cash

Living log for this app. Top entry is current.

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
