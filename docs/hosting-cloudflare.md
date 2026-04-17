# Hosting on Cloudflare — runbook

All three Ando finance apps deploy as Cloudflare Workers via the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare). Cloudflare Access sits in front of each subdomain. Postgres is reached through Cloudflare Hyperdrive bindings. Petty Cash emails go through Cloudflare Email Workers.

This is a checklist. Work top to bottom the first time.

## 0. Prerequisites

- Cloudflare account with `andofoods.co` added as a Zone.
- `wrangler` CLI authenticated (`npx wrangler login`).
- One of `ANDO_CLOUDFLARE_ACCOUNT_ID` and `ANDO_CLOUDFLARE_ZONE_ID` captured (dashboard → Overview → API).
- Supabase account with one Free project created, named `andofoods-iam`.
- Terraform ≥ 1.6 installed.

## 1. Provision the `iam` Postgres

1. In the Supabase dashboard → project `andofoods-iam` → SQL Editor → paste the contents of `infra/migrations/0001_iam_schema.sql`. Run.
2. Capture the **Session pooler** connection string (Port 5432, not 6543 — Hyperdrive handles its own pooling). Example: `postgresql://postgres.xxxxx:PASSWORD@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`.
3. Keep this secret. You'll reference it in the Hyperdrive step.
4. Seed one admin grant so you can log in:

   ```sql
   insert into iam.users (email) values ('asif@andofoods.co') returning id;
   -- copy the returned id, then:
   insert into iam.app_access (user_id, app_slug, role)
     values ('<that-id>', 'workspace', 'ADMIN');
   ```

## 2. Provision Cloudflare Access

```bash
cd infra/cloudflare
terraform init
terraform plan -out=plan.out \
  -var 'cloudflare_api_token=***' \
  -var 'account_id=***' \
  -var 'zone_id=***' \
  -var 'enforce=false'          # start in shadow mode
terraform apply plan.out
```

Capture the outputs:

```bash
terraform output access_audiences
# → {
#     "workspace"       = "a1b2c3..."
#     "petty-cash"      = "d4e5f6..."
#     "rider-payments"  = "g7h8i9..."
#   }
```

These three strings become `CF_ACCESS_AUD_*` secrets below.

After 24h of clean logs in the Zero Trust dashboard, flip `enforce=true` and re-apply.

## 3. Provision Hyperdrive configs

One per Postgres the Workers need to reach. **Dashboard → Workers & Pages → Hyperdrive → Create a configuration.**

| Binding name               | Target                                      | Used by             |
| -------------------------- | ------------------------------------------- | ------------------- |
| `HYPERDRIVE_IAM`           | Supabase `andofoods-iam` session pooler URL | all three apps      |
| `HYPERDRIVE_PETTY_CASH`    | Petty Cash business Postgres                | petty-cash only     |
| `HYPERDRIVE_RIDER_SUPA`    | Rider Payments Supabase pooler URL          | rider-payments only |
| `HYPERDRIVE_ANDO_RIDER`    | `ANDO_RIDER_DATABASE_URL`                   | rider-payments only |
| `HYPERDRIVE_ANDO_CUSTOMER` | `ANDO_CUSTOMER_DATABASE_URL`                | rider-payments only |

Each create returns a **Hyperdrive config ID** (a UUID). Paste it into the matching `id = "..."` field in the app's `wrangler.toml`. Commit that change.

## 4. Cloudflare Email Workers (petty-cash only)

Cloudflare → Email → Email Routing → enable on `andofoods.co`.

Create a destination address `finance-reminders@andofoods.co` (or whichever you want the reimbursement emails to come from).

The petty-cash app sends via `packages/email`'s Cloudflare Email Workers adapter — see that package's README for binding setup.

## 5. Set Worker secrets

For each app:

```bash
cd apps/workspace
wrangler secret put CF_ACCESS_AUD_WORKSPACE
wrangler secret put CF_ACCESS_AUD_PETTY_CASH
wrangler secret put CF_ACCESS_AUD_RIDER_PAYMENTS

cd ../petty-cash
wrangler secret put CF_ACCESS_AUD_PETTY_CASH
wrangler secret put CF_ACCESS_AUD_WORKSPACE
wrangler secret put CF_ACCESS_AUD_RIDER_PAYMENTS
wrangler secret put NEXTAUTH_SECRET           # legacy; dual-run only
wrangler secret put DATABASE_URL              # Prisma fallback if Hyperdrive fails

cd ../rider-payments
wrangler secret put CF_ACCESS_AUD_RIDER_PAYMENTS
wrangler secret put CF_ACCESS_AUD_WORKSPACE
wrangler secret put CF_ACCESS_AUD_PETTY_CASH
wrangler secret put NEXT_PUBLIC_SUPABASE_URL
wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

Flag defaults (safe for first deploy):

- `WORKSPACE_ENABLED=true` (already in `wrangler.toml [vars]`).
- `PETTY_CASH_AUTH_V2=false` (legacy NextAuth still owns auth — flip later).
- `RIDER_CF_ACCESS=false` (legacy Supabase Auth still owns auth — flip later).

## 6. DNS / custom domain routing

The `[[routes]]` blocks in each `wrangler.toml` request custom-domain routing. First `wrangler deploy` per app:

- Pre-creates the Worker.
- Attempts to bind `workspace.andofoods.co` (etc.) as a custom domain.
- If the DNS record doesn't exist yet, Cloudflare creates one automatically (orange-cloud proxied).

Verify in Dashboard → DNS — you should see three AAAA/CNAME records, one per app, all orange-cloud.

## 7. Deploy

```bash
# From monorepo root — builds include `prisma generate` etc.

# Safest order: workspace (brand new, no users yet) → petty-cash → rider-payments.
pnpm --filter @ando/workspace cf:build
pnpm --filter @ando/workspace cf:deploy

pnpm --filter @ando/petty-cash cf:build
pnpm --filter @ando/petty-cash cf:deploy

pnpm --filter @ando/rider-payments cf:build
pnpm --filter @ando/rider-payments cf:deploy
```

Hit `https://workspace.andofoods.co` — Cloudflare Access should show its Email OTP prompt. Enter your `@andofoods.co` address, paste the code, land on the launcher. You should see zero tiles at first (admin UI ships Phase 4; until then, seed `iam.app_access` directly in Supabase).

## 8. Flip the dual-run flags (after 24h of clean logs)

```bash
cd apps/petty-cash && wrangler secret put PETTY_CASH_AUTH_V2          # value: true
cd ../rider-payments && wrangler secret put RIDER_CF_ACCESS           # value: true

# Observe the Workers → Logs stream for 48h. If a branch user fails to sign in,
# flip the flag back (same command, value: false) and file a Phase 2.x or
# Phase 3.x ticket with the repro.
```

## 9. Post-cutover cleanup (after 2 weeks)

- Remove NextAuth + Supabase magic-link code in a follow-up PR (each with its own changeset).
- Delete the legacy sibling folders `/coding-projects/petty-cash` and `/coding-projects/rider-payments`.
- Drop `User.password` in a petty-cash Prisma migration.

## Troubleshooting

- **`opennextjs-cloudflare build` fails with "Cannot find module '@ando/...'":** the monorepo `transpilePackages` list in `next.config.(js|ts)` is missing a `@ando/*` dep. Add it.
- **Worker throws `connectionString is required` at runtime:** Hyperdrive binding not yet attached — double-check the `id` in `wrangler.toml` matches the Hyperdrive config id in the CF dashboard.
- **CF Access login works but the launcher shows 403:** the signed-in email has no `iam.app_access(app_slug='workspace')` row. Add one in Supabase or via the admin UI (Phase 4).
- **Prisma on Workers errors `PrismaClientInitializationError: Environment variable not found: DATABASE_URL`:** driver adapter isn't wired up correctly. See `apps/petty-cash/CLAUDE.md` for the driver-adapter pattern.
- **`wrangler deploy` fails with "custom domain not available":** DNS record for the subdomain is set to DNS-only (grey cloud) instead of proxied (orange cloud). Flip to proxied.

## Why this shape

- **One Worker per app.** Independent deploys, independent blast radius, lines up with `@opennextjs/cloudflare`'s per-app model.
- **Hyperdrive everywhere.** Workers can't open raw TCP to Postgres; Hyperdrive is the managed answer and its edge caching improves p99 on reads.
- **Email Workers over Resend.** Free, native, no extra vendor to audit. DX is rougher but petty-cash emails are simple transactional templates.
- **`iam` on Supabase Free.** Auth is at the edge (CF Access), so Supabase pausing only degrades the admin UI — not the gate.
