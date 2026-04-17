# @ando/petty-cash

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Phase 4.2 — Live on Cloudflare Workers (2026-04-17)

**🚀 Deployed at https://ando-petty-cash.philip-ndegwa.workers.dev**

Backed by Neon Free Postgres (`ap-southeast-1`), legacy NextAuth mode (`PETTY_CASH_AUTH_V2=false`). Login + admin + branch CRUD verified end-to-end.

#### Added

- `wrangler.toml` — `workers_dev=true` for `ando-petty-cash.<subdomain>.workers.dev`, `nodejs_compat` flag, `compatibility_date=2025-09-01`.
- `open-next.config.ts` via `@opennextjs/cloudflare` v1.
- `cf:build` + `cf:deploy` scripts. `cf:build` first runs `turbo run build --filter=@ando/petty-cash^...` so shared `@ando/*` packages compile before OpenNext bundles Next.
- `@neondatabase/serverless` — HTTP/WebSocket Postgres driver (Workers-native).
- `jose` — HS256 signing for NextAuth JWTs (Web Crypto, replaces the default JWE encoder which hits `crypto.createCipheriv`).

#### Changed

- **`src/lib/auth.ts`** —
  - NextAuth's default JWT encoder replaced with `SignJWT` (HS256) via `jose`. Sessions are signed, not encrypted. Fine for an internal tool.
  - `authorize()` now calls `@neondatabase/serverless` directly for the email lookup — bypasses Prisma entirely so the library-engine startup (`fs.readdir`) never reaches the Worker.
- **`src/lib/prisma.ts`** — full rewrite. Now a hand-written neon-backed facade that mimics the narrow subset of Prisma Client API used by this app:
  - `branch.{findUnique, findMany (+ user _count), create, update (incl. currentBalance decrement)}`
  - `user.{findUnique, findMany (with branch join), create, delete, count}`
  - `expense.{findMany, create, count, updateMany (id.in or requestId)}`
  - `reimbursementRequest.{findMany, findFirst, findUnique, count, create, update}` with the specific `include` shapes used.
  - `$transaction(callback)` — sequential, not atomic. Acceptable for 20-user scale; harden later via `sql.transaction([...])`.
- **`src/lib/notifications.ts`** — rewritten inline with `neon` SQL (uses `select: { email: true }` projection the facade doesn't cover).
- **`src/lib/email.ts`** — nodemailer is lazy-loaded only in local Node dev; production Worker path logs `[email:stub]` JSON to `wrangler tail`.
- **`src/app/api/auth/[...nextauth]/route.ts`** — GET/POST wrappers now forward both `req` and `ctx` to the NextAuth handler (required for the catchall param).
- **`src/middleware.ts`** — moved from project root (Next 14 with `src/` layout requires it here).
- **`prisma/schema.prisma`** — `previewFeatures = ["driverAdapters"]` removed; the facade bypasses Prisma runtime entirely (Prisma 6 still does the fs.readdir).
- **`package.json`** — `@prisma/adapter-pg` / `pg` → `@neondatabase/serverless`; added `jose`. Dev-deps: `@opennextjs/cloudflare`, `wrangler`.

#### Known gaps (non-blocking at 20-user scale)

- Emails are log-only on Workers. Follow-up: swap to CF Email Workers or Resend.
- No custom domain (still `*.workers.dev`). DNS + `[[routes]]` in wrangler.toml will move it to `petty-cash.andofoods.co`.
- Transactions are sequential rather than atomic. Fine for the current load.
- Seed passwords are `password123` — **change admin password immediately on first login**.

### Added

- Moved into the `workspace-monorepo/apps/petty-cash` Turborepo app.
- Workspace dependencies on `@ando/auth`, `@ando/config`, `@ando/db`, `@ando/ui`, `@ando/tsconfig`, `@ando/eslint-config`.
- `src/lib/authDispatcher.ts` — `getAuthMode()` reads `PETTY_CASH_AUTH_V2` (true/1/yes → `cfaccess`, else `nextauth`).
- `src/lib/getPrincipal.ts` — unified `getPrincipal()` / `requirePrincipal()` that returns a `LocalPrincipal` regardless of auth mode. JIT-provisions local Prisma `User` rows in V2 mode.
- `middleware.ts` — no-op when flag off; full `@ando/auth.evaluateAccess(appSlug='petty-cash')` gate when on, with `x-ando-principal` propagation.
- `src/app/no-access/page.tsx` — rendered via middleware rewrite when a user has no `petty-cash` grant.
- Vitest harness with 19 passing cases: `getAuthMode` parsing (11), `getPrincipal` legacy + V2 + JIT + missing header (6), NextAuth route 410 guard (2).

### Changed

- `src/lib/admin.ts` — `requireAdmin()` is now built on `getPrincipal()` rather than calling `getServerSession(authOptions)` directly. Returns `LocalPrincipal | null` instead of the opaque session user. Callers referencing `admin.id` must now use `admin.userId`.
- `src/app/api/auth/[...nextauth]/route.ts` — wraps the `NextAuth(authOptions)` handler in a V2 guard that returns `410 Gone` when the flag is on.
- `src/app/api/admin/users/[id]/route.ts` — updated to read `admin.userId` after `requireAdmin` refactor.
- `postcss.config.js` → `postcss.config.cjs` — package now declares `"type": "module"`, so the CommonJS config must use `.cjs`.

### Phase 2.1 + 2.2 (same day)

- `src/lib/requirePrincipalOrRedirect.ts` — thin page-level helper that redirects to `/login` when no principal; covered by 3 Vitest cases.
- Migrated every remaining server-side `getServerSession(authOptions)` call:
  - API routes: `/api/branch/state`, `/api/expenses`, `/api/requests` (GET + POST), `/api/requests/[id]/review`.
  - Pages: `/`, `/admin`, `/branch`, `/finance`.
- The only legacy-auth reference left in app code is client-side `Header.tsx useSession`, scheduled for Phase 2.3.

### Deferred

- `User.password` column removal — still postponed to a standalone Prisma migration after the 2-week V2 dual-run proves stable. Keeps NextAuth rollback viable.
- `Header.tsx` migration — Phase 2.3, pending a decision on client-side principal source in V2 mode.

## [0.1.0] — 2026-04-17

Initial monorepo import.
