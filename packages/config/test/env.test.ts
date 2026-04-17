import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const REQUIRED = {
  NODE_ENV: 'test',
  CF_ACCESS_TEAM_DOMAIN: 'ando.cloudflareaccess.com',
  CF_ACCESS_AUD_WORKSPACE: 'aud-workspace',
  CF_ACCESS_AUD_PETTY_CASH: 'aud-petty',
  CF_ACCESS_AUD_RIDER_PAYMENTS: 'aud-rider',
  IAM_DATABASE_URL: 'postgres://u:p@localhost:5432/iam',
};

const original = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  for (const k of Object.keys(REQUIRED)) delete process.env[k];
});

afterEach(() => {
  for (const k of Object.keys(REQUIRED)) delete process.env[k];
  Object.assign(process.env, original);
});

describe('@ando/config/env', () => {
  it('parses a fully-populated environment into a frozen object', async () => {
    Object.assign(process.env, REQUIRED);
    const { env } = await import('../src/env.js');
    expect(env.CF_ACCESS_TEAM_DOMAIN).toBe('ando.cloudflareaccess.com');
    expect(env.IAM_DATABASE_URL).toBe('postgres://u:p@localhost:5432/iam');
    expect(Object.isFrozen(env)).toBe(true);
  });

  it('throws a ConfigError naming the missing var when one is absent', async () => {
    Object.assign(process.env, REQUIRED);
    delete process.env.CF_ACCESS_AUD_PETTY_CASH;
    await expect(() => import('../src/env.js')).rejects.toThrow(/CF_ACCESS_AUD_PETTY_CASH/);
  });

  it('rejects a team domain that includes a scheme', async () => {
    Object.assign(process.env, REQUIRED);
    process.env.CF_ACCESS_TEAM_DOMAIN = 'https://ando.cloudflareaccess.com';
    await expect(() => import('../src/env.js')).rejects.toThrow(/CF_ACCESS_TEAM_DOMAIN/);
  });

  it('rejects a team domain with a trailing slash', async () => {
    Object.assign(process.env, REQUIRED);
    process.env.CF_ACCESS_TEAM_DOMAIN = 'ando.cloudflareaccess.com/';
    await expect(() => import('../src/env.js')).rejects.toThrow(/CF_ACCESS_TEAM_DOMAIN/);
  });
});
