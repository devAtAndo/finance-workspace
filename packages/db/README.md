# @ando/db

Typed Postgres access for the shared `iam` schema. Backs the `IamPort` interface from `@ando/auth`.

See [`SPEC.md`](./SPEC.md) for the full contract.

## Install

```json
{ "dependencies": { "@ando/db": "workspace:*" } }
```

## Usage

```ts
import { iam } from '@ando/db';
const user = await iam.upsertUserByEmail('asif@andofoods.co');
await iam.grantAccess({ userId: user.id, appSlug: 'petty-cash', role: 'FINANCE', grantedBy: null });
```

## Schema

- `iam.users(id, email citext unique, created_at, disabled_at)`
- `iam.app_access(user_id, app_slug, role, granted_by, granted_at)` — PK `(user_id, app_slug)`
- `iam.audit_log(id, actor_id, action, target jsonb, at)`

Migrations live in `infra/migrations/` at the monorepo root.

## Env

- `IAM_DATABASE_URL` — Postgres connection string.

## Invariants

- All access-state mutations append an `audit_log` row in the same transaction.
- `upsertUserByEmail` is idempotent on the `email` unique index.
- No raw SQL outside this package.

## Test

```bash
pnpm --filter @ando/db test
```

Integration tests against a real Postgres (testcontainers) are added in Phase 2.
