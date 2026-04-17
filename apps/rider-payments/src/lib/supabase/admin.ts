// Supabase service-role client. Use ONLY in trusted server-side contexts
// (workbook generation, file uploads to Storage). Bypasses RLS.
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient<any, 'rider_payments', any> | null = null;

export function getSupabaseAdminClient(): SupabaseClient<any, 'rider_payments', any> {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY',
    );
  }
  cached = createClient<any, 'rider_payments', any>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    db: { schema: 'rider_payments' },
  });
  return cached;
}
