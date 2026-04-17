---
'@ando/petty-cash': minor
---

Phase 2.1 + 2.2: migrate every server-side `getServerSession(authOptions)` call site onto `getPrincipal()`.

All 4 API routes (`/api/branch/state`, `/api/expenses`, `/api/requests` GET+POST, `/api/requests/[id]/review`) and all 4 server pages (`/`, `/admin`, `/branch`, `/finance`) now resolve the signed-in user through the unified dispatcher. Behavior is identical when `PETTY_CASH_AUTH_V2` is off (still NextAuth under the hood); when on, the same code paths consume the `x-ando-principal` header populated by `middleware.ts`.

Adds `src/lib/requirePrincipalOrRedirect` (3 Vitest cases) as the thin page-level wrapper that redirects to `/login` when there is no principal. Pages now share one helper instead of each calling `getServerSession` + `redirect` directly.

No changes to the auth dispatcher itself, no flag-flip side effects, no schema changes. NextAuth remains the active path in production until the flag is flipped. Only remaining legacy auth reference in app code is the client-side `Header.tsx useSession`, which stays in Phase 2.3.
