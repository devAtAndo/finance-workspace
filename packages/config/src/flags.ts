export interface Flags {
  readonly WORKSPACE_ENABLED: boolean;
  readonly PETTY_CASH_AUTH_V2: boolean;
  readonly RIDER_CF_ACCESS: boolean;
}

function parseBool(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined) return fallback;
  const v = raw.trim().toLowerCase();
  if (v === '1' || v === 'true' || v === 'yes') return true;
  return false;
}

function computeFlags(): Flags {
  const isDev = process.env.NODE_ENV === 'development';
  return Object.freeze({
    WORKSPACE_ENABLED: parseBool(process.env.WORKSPACE_ENABLED, isDev),
    PETTY_CASH_AUTH_V2: parseBool(process.env.PETTY_CASH_AUTH_V2, false),
    RIDER_CF_ACCESS: parseBool(process.env.RIDER_CF_ACCESS, false),
  });
}

export const flags: Flags = computeFlags();
