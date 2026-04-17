# @ando/workspace

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Phase 4.1 — Cloudflare Workers deploy target (2026-04-17)

- `wrangler.toml` with `workspace.andofoods.co` custom-domain routing + `HYPERDRIVE_IAM` binding placeholder.
- `open-next.config.ts` using `@opennextjs/cloudflare`'s `defineCloudflareConfig`.
- `src/lib/cf.ts` — lazy `getHyperdriveIam()` helper that resolves to `undefined` under Node local dev.
- `middleware.ts` now primes `@ando/db` with the Hyperdrive binding when running on Workers; local dev and Vitest unchanged.
- `cf:build` / `cf:preview` / `cf:deploy` / `cf:dryrun` scripts.

### Added

- Next.js 14.2 app scaffolded at `workspace.andofoods.co`.
- `src/lib/tiles.ts` — pure `buildTiles(registry, access)` for launcher tile selection (covered by 4 unit tests: stable ordering, exclude `workspace`, empty-state, stale-slug tolerance).
- `src/lib/loginUrl.ts` — CF Access login URL builder with open-redirect guard (`http(s)` only, rejects protocol-relative).
- `src/lib/auth.ts` — app-scoped wrapper around `evaluateAccess` with dev-time test-JWKS switch via `WORKSPACE_TEST_JWKS_JSON`.
- `middleware.ts` — gates all routes except `_next`, `favicon`, `no-access`, `api/test/*`; honors `WORKSPACE_ENABLED` flag; returns 503 when `iam` is unavailable.
- `src/app/layout.tsx`, `src/app/page.tsx` (launcher with `AppShell` + `TileGrid`), `src/app/no-access/page.tsx`.
- `src/app/api/test/grant/route.ts` — dev-only seeding route for Playwright, returns 404 in production (5 tests covering env gate, validation, happy path).
- Vitest suite: 15 passing tests.

## [0.1.0] — 2026-04-17

Initial skeleton.
