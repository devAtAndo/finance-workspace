import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from './schema.js';

const { Pool } = pg;

/**
 * A Cloudflare Hyperdrive binding. At runtime `env.MY_HYPERDRIVE` exposes a
 * `connectionString` (plus `host`, `port`, `user`, etc.). We only need the URL.
 */
export interface HyperdriveLike {
  readonly connectionString: string;
}

export interface GetDbOpts {
  /** Explicit Postgres connection string. */
  connectionString?: string;
  /** Cloudflare Hyperdrive binding. Takes precedence over `connectionString`. */
  hyperdrive?: HyperdriveLike;
  /** Max pool size. Defaults to 5. */
  max?: number;
}

let cached: Kysely<Database> | null = null;

function resolveUrl(opts: GetDbOpts | undefined): string {
  if (opts?.hyperdrive?.connectionString) return opts.hyperdrive.connectionString;
  if (opts?.connectionString) return opts.connectionString;
  const envUrl = process.env.IAM_DATABASE_URL;
  if (envUrl) return envUrl;
  throw new Error(
    'IAM_DATABASE_URL is required to construct @ando/db client (or pass { connectionString } / { hyperdrive })',
  );
}

export function getDb(opts?: GetDbOpts): Kysely<Database> {
  if (cached) return cached;
  const connectionString = resolveUrl(opts);
  cached = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString, max: opts?.max ?? 5 }),
    }),
  });
  return cached;
}

export async function closeDb(): Promise<void> {
  if (!cached) return;
  await cached.destroy();
  cached = null;
}

/** Test-only reset so each test gets a fresh cache. */
export function _resetDbForTests(): void {
  cached = null;
}
