export type AuthMode = 'supabase' | 'cfaccess';

export function getAuthMode(): AuthMode {
  const raw = process.env.RIDER_CF_ACCESS?.trim().toLowerCase() ?? '';
  if (raw === '1' || raw === 'true' || raw === 'yes') return 'cfaccess';
  return 'supabase';
}
