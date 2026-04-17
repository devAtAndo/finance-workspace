# HANDOFF.md — apps/rider-payments

Living log for this app. Top entry is current.

---

## 2026-04-17 — Phase 3 MVP: dual-run scaffolding

### Shipped

- Imported source into `apps/rider-payments` from the legacy sibling repo (non-destructive copy; original at `/Users/asifkhan/claude-ak/coding-projects/rider-payments` retains its uncommitted working-tree state as a safety net).
- Rewired `package.json` to `@ando/rider-payments` with workspace deps on `@ando/auth` / `@ando/config` / `@ando/db` / `@ando/ui` / `@ando/tsconfig` / `@ando/eslint-config`.
- Shared TS via `@ando/tsconfig/nextjs.json`, flat ESLint via `@ando/eslint-config/next` (legacy-tolerant overrides documented).
- Vitest harness with 18 passing cases (authDispatcher 10, getCaller 7, callback guard 1).
- `src/lib/authDispatcher.ts` — `getAuthMode()` reads `RIDER_CF_ACCESS`.
- `src/lib/api-auth.ts` — `getCaller(req?)` / `requireAuth(req?)` dispatch internally. One change here covers every API route; no per-route refactor needed.
- `src/proxy.ts` — dispatches. Legacy path unchanged byte-for-byte. V2 path calls `evaluateAccess(appSlug='rider-payments')` with lazy imports, attaches `x-ando-principal`, returns 503 on iam outage.
- `src/app/auth/callback/route.ts` — returns `410 Gone` in V2 mode.
- `src/app/no-access/page.tsx` — 403 target using `@ando/ui.NoAccess`.
- `test/_shim-server-only.ts` + vitest alias — so tests can import `src/lib/api-auth.ts` without the Next.js `server-only` guard exploding.
- Per-app docs: `SPEC.md`, `README.md`, `CLAUDE.md`, `HANDOFF.md`, `CHANGELOG.md`.
- Changeset `.changeset/phase-3-rider-payments-dual-run.md` (rider-payments minor).

### TDD catches this session

- `server-only` import at the top of `api-auth.ts` broke Vitest. Added shim + alias.
- React 19 types hoisted over React 18 across apps → TS2742 ("cannot be named without a reference to .pnpm/@types+react@19…"). Fixed by forcing `@types/react ^19` for all apps via `pnpm.overrides`. Also added explicit `ReactNode` return annotations on workspace pages as belt-and-suspenders.
- Next 16 proxy matcher + nodejs-only runtime — no lint errors, but this is a live invariant documented in CLAUDE.md.

### Validated

- `pnpm typecheck / lint / test / build` all green.
- Full-monorepo Vitest count: **92** (21 config + 13 auth + 2 db + 1 ui + 15 workspace + 22 petty-cash + 18 rider-payments).
- Rider-payments build compiles 13 routes + proxy cleanly.

### In-progress

_(complete)_

### Next

- **Phase 3.1:** RLS policy rewrite in `supabase/migrations/` — replace `auth.uid()` with a header-derived claim so V2-mode authenticated writes can avoid the service-role admin client where appropriate.
- **Phase 3.2:** remove `/login` UI and `signInWithOtp` after the 2-week dual-run bake. Delete legacy rider-payments sibling folder.
- **Phase 4:** Workspace admin UI for grant/revoke + audit log viewer.
- **Phase 5:** passkeys via CF Access, Sentry + S3 audit log sink, SAML abstraction.

### Open questions

- Is there appetite for a shared `LocalPrincipal` shape across petty-cash + rider-payments + workspace? Currently each app has its own (rider: `{userId, email}`; petty-cash: `{userId, email, role, branchId}`; workspace: `{userId, email, role}`). Candidate for `@ando/auth` in a future refactor.
- `ANDO_DB_SSL` default remains `require` with cert-skip-verify. Acceptable for internal reads but should be audited.

### Flags touched

- `RIDER_CF_ACCESS` — now consumed in `src/lib/authDispatcher.ts`, `src/proxy.ts`, `src/lib/api-auth.ts`, `src/app/auth/callback/route.ts`. Default off.

### Notes

- The copy into the monorepo did not include `.git`, `node_modules`, `.next`, `tsconfig.tsbuildinfo`, or the root configs (`package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`). Those were replaced to avoid fighting npm-vs-pnpm conventions.
- The existing `test-fixtures/reconcile-golden.test.ts` is preserved and invokable via `pnpm --filter @ando/rider-payments test:golden`. Not part of the Vitest suite.
