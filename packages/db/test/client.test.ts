import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const poolCtor = vi.fn((_opts: { connectionString: string; max: number }) => ({
  query: vi.fn(),
  end: vi.fn(async () => {}),
}));

vi.mock('pg', () => ({
  default: { Pool: poolCtor },
}));

const original = { ...process.env };

beforeEach(() => {
  poolCtor.mockClear();
  for (const k of ['IAM_DATABASE_URL']) delete process.env[k];
});

afterEach(() => {
  for (const k of Object.keys(process.env)) delete process.env[k];
  Object.assign(process.env, original);
  vi.resetModules();
});

describe('@ando/db getDb', () => {
  it('throws when neither a connection string, binding, nor env var is provided', async () => {
    const { getDb, _resetDbForTests } = await import('../src/client.js');
    _resetDbForTests();
    expect(() => getDb()).toThrow(/IAM_DATABASE_URL/);
  });

  it('accepts an explicit connection string', async () => {
    const { getDb, _resetDbForTests } = await import('../src/client.js');
    _resetDbForTests();
    getDb({ connectionString: 'postgres://u:p@host/db' });
    expect(poolCtor).toHaveBeenCalledOnce();
    expect(poolCtor.mock.calls[0]![0]!.connectionString).toBe('postgres://u:p@host/db');
  });

  it('reads from IAM_DATABASE_URL env when nothing passed', async () => {
    process.env.IAM_DATABASE_URL = 'postgres://e:e@env-host/db';
    const { getDb, _resetDbForTests } = await import('../src/client.js');
    _resetDbForTests();
    getDb();
    expect(poolCtor.mock.calls[0]![0]!.connectionString).toBe('postgres://e:e@env-host/db');
  });

  it('accepts a Cloudflare Hyperdrive binding (object with connectionString)', async () => {
    const binding = { connectionString: 'postgres://h:h@hyperdrive/db' };
    const { getDb, _resetDbForTests } = await import('../src/client.js');
    _resetDbForTests();
    getDb({ hyperdrive: binding });
    expect(poolCtor.mock.calls[0]![0]!.connectionString).toBe('postgres://h:h@hyperdrive/db');
  });

  it('prefers hyperdrive binding over explicit connection string when both are passed', async () => {
    const { getDb, _resetDbForTests } = await import('../src/client.js');
    _resetDbForTests();
    getDb({
      connectionString: 'postgres://str/db',
      hyperdrive: { connectionString: 'postgres://hyp/db' },
    });
    expect(poolCtor.mock.calls[0]![0]!.connectionString).toBe('postgres://hyp/db');
  });
});
