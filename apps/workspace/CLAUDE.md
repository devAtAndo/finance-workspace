# CLAUDE.md — apps/workspace

Guidance for sessions touching the launcher app.

## Orientation

- Single-purpose Next.js 14 app at `workspace.andofoods.co`.
- The **launcher**: shows tiles for every finance app the signed-in user has access to.
- Future: admin UI for grant / revoke / disable / audit (Phase 4) under `/admin`.

## Entry points

| Concern                        | File                                          |
| ------------------------------ | --------------------------------------------- |
| Auth wrapper                   | `src/lib/auth.ts` — `evaluateWorkspaceAccess` |
| Login URL                      | `src/lib/loginUrl.ts`                         |
| Tile selection (pure)          | `src/lib/tiles.ts` — `buildTiles`             |
| Route gate                     | `middleware.ts`                               |
| Launcher page                  | `src/app/page.tsx`                            |
| NoAccess page                  | `src/app/no-access/page.tsx`                  |
| Dev grant seeder (404 in prod) | `src/app/api/test/grant/route.ts`             |

## Invariants (do not break)

1. **Every route except `_next`, `favicon`, `no-access`, `api/test/*` is gated by `middleware.ts`.** Adding a new public route means updating the `matcher` in `middleware.ts` **and** adding a test.
2. **Middleware must attach `x-ando-principal` on success** — pages read it without re-verifying.
3. **`/api/test/grant` returns 404 in production.** The check is inside the route handler; don't rely on env-based route pruning.
4. **`buildTiles` is pure and deterministic** — no DB, no fetch, no side effects. Covered by 4 tests.
5. **`loginUrl` rejects non-http(s) schemes and protocol-relative URLs.** Removing that check is an open redirect.
6. **`WORKSPACE_ENABLED=false` must gracefully 503.** Don't collapse the feature flag to a no-op.

## Common gotchas

- **`next lint` is disabled.** We use flat ESLint (`eslint src middleware.ts`) everywhere for consistency. Don't swap it back.
- **`transpilePackages`** in `next.config.js` must list every `@ando/*` package the app imports. Add new ones here.
- **`middleware.ts` runs on the edge runtime.** Only Fetch-API types are safe. Don't import Node-only modules.
- **JWKS in dev** is loaded from `WORKSPACE_TEST_JWKS_JSON`. The `e2e/` harness sets this before booting dev. Production uses the default fetcher that hits Cloudflare.

## Useful commands

```bash
pnpm --filter @ando/workspace dev        # localhost:3000
pnpm --filter @ando/workspace test
pnpm --filter @ando/workspace typecheck
pnpm --filter @ando/workspace build
```

## What _not_ to do

- Don't add client-side state for auth — the header is server-authoritative.
- Don't read `process.env` in components; route everything through `@ando/config`.
- Don't bypass `requireAppAccess` / `evaluateWorkspaceAccess` for any route.
