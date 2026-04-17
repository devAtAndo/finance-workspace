import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@ando/db', () => ({
  iam: {
    upsertUserByEmail: vi.fn(async (email: string) => ({
      id: `u-${email}`,
      email,
      disabledAt: null,
    })),
    grantAccess: vi.fn(async () => {}),
    listAppAccess: vi.fn(async () => []),
  },
}));

const original = process.env.NODE_ENV;

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  (process.env as Record<string, string | undefined>).NODE_ENV = original;
});

async function call(body: Record<string, unknown>): Promise<Response> {
  const { POST } = await import('../src/app/api/test/grant/route.js');
  const req = new Request('https://workspace.andofoods.co/api/test/grant', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return POST(req);
}

describe('POST /api/test/grant (dev-only)', () => {
  it('returns 404 in production', async () => {
    (process.env as Record<string, string>).NODE_ENV = 'production';
    const res = await call({ email: 'a@andofoods.co', appSlug: 'petty-cash', role: 'FINANCE' });
    expect(res.status).toBe(404);
  });

  it('rejects missing fields', async () => {
    (process.env as Record<string, string>).NODE_ENV = 'development';
    const res = await call({ email: 'a@andofoods.co' });
    expect(res.status).toBe(400);
  });

  it('rejects unknown appSlug', async () => {
    (process.env as Record<string, string>).NODE_ENV = 'development';
    const res = await call({ email: 'a@andofoods.co', appSlug: 'ghost', role: 'FINANCE' });
    expect(res.status).toBe(400);
  });

  it('rejects unknown role', async () => {
    (process.env as Record<string, string>).NODE_ENV = 'development';
    const res = await call({ email: 'a@andofoods.co', appSlug: 'petty-cash', role: 'DESPOT' });
    expect(res.status).toBe(400);
  });

  it('upserts the user and grants access for valid input', async () => {
    (process.env as Record<string, string>).NODE_ENV = 'development';
    const res = await call({ email: 'a@andofoods.co', appSlug: 'petty-cash', role: 'FINANCE' });
    expect(res.status).toBe(200);
    const json = (await res.json()) as { userId: string };
    expect(json.userId).toBe('u-a@andofoods.co');
  });
});
