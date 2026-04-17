---
'@ando/workspace': minor
'@ando/db': minor
---

Phase 4.1: Workspace is deploy-ready on Cloudflare Workers via OpenNext.

`@ando/db.getDb()` now accepts either a connection string or a Cloudflare Hyperdrive binding (the runtime object exposing `.connectionString`), with the existing `IAM_DATABASE_URL` env-var fallback intact. 5 Vitest cases cover the precedence order (hyperdrive > connectionString > env var) and the thrown-when-nothing-provided branch.

`apps/workspace` now ships with `wrangler.toml`, `open-next.config.ts`, a `src/lib/cf.ts` helper that lazily reads the Hyperdrive binding via `@opennextjs/cloudflare`, and `cf:build` / `cf:preview` / `cf:deploy` / `cf:dryrun` scripts. The middleware primes `@ando/db` with the Hyperdrive binding on every request; under Node local dev the binding is undefined and everything falls back to `IAM_DATABASE_URL`.

`docs/hosting-cloudflare.md` is a top-to-bottom runbook covering provisioning the Supabase `andofoods-iam` project, applying the Cloudflare Access Terraform, creating Hyperdrive configs, setting Worker secrets, DNS wiring, and the dual-run flag flips.

Phase 4.2 (Petty Cash: Prisma driver adapter + Email Workers) and 4.3 (Rider Payments: Next 16 OpenNext verification) follow as independent PRs. Phase 4.4 adds Hyperdrive Terraform once the manual-dashboard dependency is gone.
