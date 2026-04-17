import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const handler = vi.fn(async (_req: Request) => new Response('ok', { status: 200 }));

vi.mock('next-auth', () => ({
  default: () => handler,
}));

vi.mock('../src/lib/auth', () => ({
  authOptions: {},
}));

const original = process.env.PETTY_CASH_AUTH_V2;

beforeEach(() => {
  handler.mockClear();
  delete process.env.PETTY_CASH_AUTH_V2;
});

afterEach(() => {
  (process.env as Record<string, string | undefined>).PETTY_CASH_AUTH_V2 = original;
  vi.resetModules();
});

describe('NextAuth V2 guard on /api/auth/[...nextauth]', () => {
  it('delegates to NextAuth when flag is off', async () => {
    const { GET, POST } = await import('../src/app/api/auth/[...nextauth]/route.js');
    const req = new Request('http://localhost/api/auth/session');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(handler).toHaveBeenCalled();
    const res2 = await POST(req);
    expect(res2.status).toBe(200);
  });

  it('returns 410 Gone when flag is on', async () => {
    process.env.PETTY_CASH_AUTH_V2 = 'true';
    const { GET, POST } = await import('../src/app/api/auth/[...nextauth]/route.js');
    const req = new Request('http://localhost/api/auth/callback/credentials', { method: 'POST' });
    const res = await POST(req);
    expect(res.status).toBe(410);
    const res2 = await GET(req);
    expect(res2.status).toBe(410);
    expect(handler).not.toHaveBeenCalled();
  });
});
