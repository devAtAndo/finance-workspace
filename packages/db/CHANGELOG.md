# @ando/db

All notable changes are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- Kysely `Database` type for `iam.users`, `iam.app_access`, `iam.audit_log`.
- `iam` repo implementing `IamPort` from `@ando/auth`: `upsertUserByEmail`, `getAppAccess`, `grantAccess`, `revokeAccess`, `disableUser`, `listAppAccess`, `appendAuditLog`. All state-changing writes append to `audit_log` in the same transaction.
- Lazy `getDb()` with pg pool.

## [0.1.0] — 2026-04-17

Initial skeleton.
