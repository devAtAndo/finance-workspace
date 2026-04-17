# infra/cloudflare

Terraform for the Cloudflare Zero Trust Access applications in front of each Ando finance subdomain.

## What this provisions

- One `cloudflare_access_identity_provider` — Email OTP, scoped to Ando's account.
- One `cloudflare_access_application` per app: `workspace.andofoods.co`, `petty-cash.andofoods.co`, `rider-payments.andofoods.co`.
- One `cloudflare_access_policy` per app enforcing `@andofoods.co` emails only.

## Variables

- `cloudflare_api_token` (sensitive) — Zero Trust Access admin token.
- `account_id` — Cloudflare account ID.
- `zone_id` — zone ID for `andofoods.co`.
- `enforce` — `false` (default) = logging-only shadow mode; `true` = policy enforced. **Always start with `false` on a new app, observe 24h, then flip.**

## Apply

```bash
cd infra/cloudflare
terraform init
terraform plan -out=plan.out
terraform apply plan.out
```

## Outputs

```bash
terraform output access_audiences
```

Feed the resulting AUD tags into the relevant env vars:

- `workspace` → `CF_ACCESS_AUD_WORKSPACE`
- `petty-cash` → `CF_ACCESS_AUD_PETTY_CASH`
- `rider-payments` → `CF_ACCESS_AUD_RIDER_PAYMENTS`

## State

No remote state is configured yet. Before anyone else applies, wire Terraform Cloud (or S3+DynamoDB) — a `terraform.tfstate` on one laptop is not a shared source of truth.

## Rollback

To disable auth on a single app (break-glass):

```bash
terraform apply -var='enforce=false' -target='cloudflare_access_policy.andofoods_only["petty-cash"]'
```

This flips the policy to `non_identity` (anyone gets through) while keeping the Access application present so the `aud` stays stable.
