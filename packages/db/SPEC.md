# @ando/db — Spec / PRP

## Intent

Typed data access for the shared `iam` Postgres schema. Implements `IamPort` from `@ando/auth` so apps can plug the real DB in without app-level SQL.

## Public API

### `db`

A singleton Kysely instance bound to `env.IAM_DATABASE_URL`. Lazy — built on first use so importing this module at edge runtime is cheap.

### `iam` — the `IamPort` impl

```ts
export const iam: IamPort & {
  grantAccess(args: { userId: string; appSlug: AppSlug; role: Role; grantedBy: string }): Promise<void>;
  revokeAccess(args: { userId: string; appSlug: AppSlug }): Promise<void>;
  disableUser(userId: string): Promise<void>;
  listAppAccess(userId: string): Promise<Array<{ appSlug: AppSlug; role: Role }>>;
  appendAuditLog(args: { actorId: string | null; action: string; target: unknown }): Promise<void>;
};
```

### `Database` type

The Kysely `Database` interface reflecting the `iam` schema exactly.

## Invariants

- All writes that change access state must append an `audit_log` row in the same transaction.
- `upsertUserByEmail` is idempotent: concurrent calls with the same email must yield one user row.
- Email storage is case-insensitive (`citext` column).
- No raw SQL strings outside this package — apps use only the exported helpers.

## Testing

Unit tests use an in-memory fake of `IamPort` from `@ando/auth/testing`. Integration tests (Phase 2+) run against a disposable Postgres via testcontainers.
