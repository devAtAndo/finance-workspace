# @ando/db

All notable changes are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- `getDb(opts)` now accepts a `hyperdrive` binding (`{ connectionString }`) alongside the existing `connectionString` and env-var fallback. Cloudflare Workers consumers pass the Hyperdrive binding on every request; Node consumers can ignore it. Precedence: `hyperdrive` > `connectionString` > `IAM_DATABASE_URL`. 5 new Vitest cases cover the resolution order and failure mode.
- `_resetDbForTests()` exported for consumer-app test isolation.

### Phase 0 baseline

- Kysely `Database` type for `iam.users`, `iam.app_access`, `iam.audit_log`.
- `iam` repo implementing `IamPort` from `@ando/auth`: `upsertUserByEmail`, `getAppAccess`, `grantAccess`, `revokeAccess`, `disableUser`, `listAppAccess`, `appendAuditLog`. All state-changing writes append to `audit_log` in the same transaction.
- Lazy `getDb()` with pg pool.

## [0.1.0] — 2026-04-17

Initial skeleton.
