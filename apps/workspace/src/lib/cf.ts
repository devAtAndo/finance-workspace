import type { HyperdriveLike } from '@ando/db';

/**
 * Returns the Hyperdrive binding for the iam Postgres when running on
 * Cloudflare Workers, or `undefined` when running under Node (local dev,
 * `next dev`, Vitest, etc.) — in which case `@ando/db` falls back to
 * `process.env.IAM_DATABASE_URL`.
 *
 * Import must be lazy (inside a function) to avoid breaking Node builds:
 * `@opennextjs/cloudflare` pulls in Workers-runtime-only modules.
 */
export async function getHyperdriveIam(): Promise<HyperdriveLike | undefined> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    const binding = (ctx.env as { HYPERDRIVE_IAM?: HyperdriveLike }).HYPERDRIVE_IAM;
    return binding;
  } catch {
    return undefined;
  }
}
