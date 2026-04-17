---
'@ando/petty-cash': minor
'@ando/auth': patch
'@ando/config': patch
'@ando/db': patch
---

Phase 2 MVP: Petty Cash joins the monorepo with dual-run auth behind `PETTY_CASH_AUTH_V2`.

Petty Cash source is imported into `apps/petty-cash/` and rewired to the shared packages. The app now carries two auth paths that dispatch on a single env flag:

- Legacy NextAuth (credentials + bcrypt) continues to work when `PETTY_CASH_AUTH_V2` is unset / false — current production behavior is unchanged.
- Cloudflare Access + `@ando/auth` middleware takes over when the flag is `true`, with JIT-provisioning of local Prisma `User` rows from the `x-ando-principal` header. `/api/auth/[...nextauth]/*` returns 410 in V2 mode to prevent stale session creation.

Ships the infrastructure and converts `requireAdmin()` as the proof-of-concept call site. Remaining `getServerSession` call sites migrate as independent follow-ups per Phase 2.x. `User.password` drop is deferred to a standalone Prisma migration after the 2-week dual-run bake.

19 new Vitest cases cover `getAuthMode` parsing (11), `getPrincipal` legacy + V2 happy path + JIT provisioning + missing header (6), and the NextAuth 410 guard (2). No test-skip, no mock-only coverage.
