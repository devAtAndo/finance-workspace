// Read-only Postgres clients for Ando's rider-app and customer-app production
// databases. These are SEPARATE from Supabase — we connect directly over the
// pg wire protocol using credentials provided in env vars.
//
// Usage:
//   const { rows } = await queryAndoRider("select 1 as x");
//
// Env vars expected (see .env.example):
//   ANDO_RIDER_DATABASE_URL    — full postgres:// connection string (read-only user preferred)
//   ANDO_CUSTOMER_DATABASE_URL — ditto for the customer-app DB
//   ANDO_DB_SSL                — "require" (default) | "no-verify" | "disable"
//
// We cache a single Pool per process. Pools are small (max 2) because these
// queries are run only during reconciliation ingestion, not on every request.

import 'server-only';
import { Pool, type QueryResult, type QueryResultRow } from 'pg';

type DbKey = 'rider' | 'customer';

const ENV_URLS: Record<DbKey, string> = {
  rider: 'ANDO_RIDER_DATABASE_URL',
  customer: 'ANDO_CUSTOMER_DATABASE_URL',
};

const pools: Partial<Record<DbKey, Pool>> = {};

type SslOption = false | { rejectUnauthorized: boolean } | undefined;

function sslOption(): SslOption {
  const mode = (process.env.ANDO_DB_SSL ?? 'require').toLowerCase();
  if (mode === 'disable') return false;
  if (mode === 'no-verify') return { rejectUnauthorized: false };
  // Default: require SSL but accept the server cert (most managed PGs rotate
  // certs — verifying here would add an operational burden for no real win
  // given the app runs inside a trusted network / Vercel).
  return { rejectUnauthorized: false };
}

function getPool(key: DbKey): Pool {
  const cached = pools[key];
  if (cached) return cached;
  const envKey = ENV_URLS[key];
  const url = process.env[envKey];
  if (!url) {
    throw new Error(
      `Missing env var ${envKey}. See .env.example for how to configure the external Ando DB connection.`,
    );
  }
  const pool = new Pool({
    connectionString: url,
    ssl: sslOption(),
    max: 2,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    application_name: 'rider-payments-reconciliation',
  });
  // Prevent an unhandled 'error' event from crashing the server — these will
  // be propagated to the query caller via the Promise rejection.
  pool.on('error', (err) => {
    console.warn(`[${key} pg pool]`, err.message);
  });
  pools[key] = pool;
  return pool;
}

export async function queryAndoRider<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  return getPool('rider').query<T>(sql, [...params]);
}

export async function queryAndoCustomer<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  return getPool('customer').query<T>(sql, [...params]);
}

/** Call during process shutdown (optional — Next serverless will GC). */
export async function closeExternalPools(): Promise<void> {
  await Promise.all(
    (Object.keys(pools) as DbKey[]).map(async (k) => {
      const p = pools[k];
      if (p) await p.end();
      delete pools[k];
    }),
  );
}

export function isExternalDbConfigured(key: DbKey): boolean {
  return Boolean(process.env[ENV_URLS[key]]);
}
