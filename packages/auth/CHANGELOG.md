# @ando/auth

All notable changes are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- `verifyCfAccessJwt` — verifies Cloudflare Access JWTs against a JWKS; rejects missing/malformed/expired/wrong-aud/wrong-iss tokens.
- `requireAppAccess` — resolves a `Request` into a `Principal` via `cf-access-jwt-assertion` header, JIT-provisioning users and looking up `iam.app_access`.
- `evaluateAccess` — middleware-friendly wrapper returning `{ ok } | { ok: false, status, location }` for clean Next.js middleware integration.
- `@ando/auth/testing` — `createTestKeypair`, `signTestCfAccessJwt`, `makeInMemoryIam` for real-verification tests in apps.
- `UnauthorizedError` and `ForbiddenError` classes for HTTP mapping.

## [0.1.0] — 2026-04-17

Initial skeleton.
