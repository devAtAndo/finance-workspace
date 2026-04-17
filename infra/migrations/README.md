# iam migrations

Plain SQL files, applied in numeric order against `IAM_DATABASE_URL`.

## Apply

```bash
psql "$IAM_DATABASE_URL" -f 0001_iam_schema.sql
```

Or via Supabase's SQL editor — paste and run.

## Rollback

```bash
psql "$IAM_DATABASE_URL" -f 0001_iam_schema.down.sql
```

⚠️ Down migrations drop tables — never run in production without a backup.

## Conventions

- Filename: `NNNN_snake_case_description.sql` (paired with `.down.sql`).
- Idempotent by default (`create table if not exists`, etc.).
- No ORM — these are the source of truth; Kysely types in `@ando/db` must be kept in sync.
- Never edit a migration after it has been applied to any shared environment. Add a new migration instead.
