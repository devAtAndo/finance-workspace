import { neon } from '@neondatabase/serverless';

export async function getFinanceEmails(): Promise<string[]> {
  const url = process.env.DATABASE_URL;
  if (!url) return [];
  const sql = neon(url);
  const rows = (await sql`select email from "User" where role = 'FINANCE'`) as Array<{
    email: string;
  }>;
  return rows.map((r) => r.email);
}
