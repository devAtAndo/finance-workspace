# @ando/config

All notable changes to this package are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- Initial zod-validated `env`, frozen `apps` registry with `workspace` / `petty-cash` / `rider-payments`, `flags` parser for `WORKSPACE_ENABLED` / `PETTY_CASH_AUTH_V2` / `RIDER_CF_ACCESS`, and `ConfigError` / `UnknownAppError`.
- Vitest unit tests for all three entry points.

## [0.1.0] — 2026-04-17

Initial skeleton.
