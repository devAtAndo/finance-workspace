import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from './schema.js';

const { Pool } = pg;

let cached: Kysely<Database> | null = null;

export function getDb(connectionString?: string): Kysely<Database> {
  if (cached) return cached;
  const url = connectionString ?? process.env.IAM_DATABASE_URL;
  if (!url) {
    throw new Error('IAM_DATABASE_URL is required to construct @ando/db client');
  }
  cached = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: url, max: 5 }),
    }),
  });
  return cached;
}

export async function closeDb(): Promise<void> {
  if (!cached) return;
  await cached.destroy();
  cached = null;
}
