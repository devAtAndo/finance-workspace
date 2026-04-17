import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const RESET_KEYS = ['NODE_ENV', 'WORKSPACE_ENABLED', 'PETTY_CASH_AUTH_V2', 'RIDER_CF_ACCESS'];
const original = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  for (const k of RESET_KEYS) delete process.env[k];
});

afterEach(() => {
  for (const k of RESET_KEYS) delete process.env[k];
  Object.assign(process.env, original);
});

describe('@ando/config/flags', () => {
  it('defaults all flags to false in production', async () => {
    process.env.NODE_ENV = 'production';
    const { flags } = await import('../src/flags.js');
    expect(flags).toEqual({
      WORKSPACE_ENABLED: false,
      PETTY_CASH_AUTH_V2: false,
      RIDER_CF_ACCESS: false,
    });
  });

  it('defaults WORKSPACE_ENABLED to true in development', async () => {
    process.env.NODE_ENV = 'development';
    const { flags } = await import('../src/flags.js');
    expect(flags.WORKSPACE_ENABLED).toBe(true);
  });

  it.each([
    ['1', true],
    ['true', true],
    ['TRUE', true],
    ['yes', true],
    ['0', false],
    ['false', false],
    ['no', false],
    ['', false],
  ])('parses PETTY_CASH_AUTH_V2=%s as %s', async (raw, expected) => {
    process.env.NODE_ENV = 'production';
    process.env.PETTY_CASH_AUTH_V2 = raw;
    const { flags } = await import('../src/flags.js');
    expect(flags.PETTY_CASH_AUTH_V2).toBe(expected);
  });

  it('is frozen', async () => {
    process.env.NODE_ENV = 'production';
    const { flags } = await import('../src/flags.js');
    expect(Object.isFrozen(flags)).toBe(true);
  });
});
