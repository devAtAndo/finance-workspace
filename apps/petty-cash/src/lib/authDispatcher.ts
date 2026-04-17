export type AuthMode = 'nextauth' | 'cfaccess';

export function getAuthMode(): AuthMode {
  const raw = process.env.PETTY_CASH_AUTH_V2?.trim().toLowerCase() ?? '';
  if (raw === '1' || raw === 'true' || raw === 'yes') return 'cfaccess';
  return 'nextauth';
}
