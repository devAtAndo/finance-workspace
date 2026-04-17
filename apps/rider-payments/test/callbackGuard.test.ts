import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const fakeExchangeCodeForSession = vi.fn();
vi.mock('@/lib/supabase/server', () => ({
  getSupabaseServerClient: async () => ({
    auth: { exchangeCodeForSession: fakeExchangeCodeForSession },
  }),
}));

const original = process.env.RIDER_CF_ACCESS;

beforeEach(() => {
  fakeExchangeCodeForSession.mockReset();
  delete process.env.RIDER_CF_ACCESS;
});

afterEach(() => {
  (process.env as Record<string, string | undefined>).RIDER_CF_ACCESS = original;
  vi.resetModules();
});

describe('GET /auth/callback V2 guard', () => {
  it('returns 410 Gone when RIDER_CF_ACCESS is on', async () => {
    process.env.RIDER_CF_ACCESS = 'true';
    const { GET } = await import('../src/app/auth/callback/route.js');
    const res = await GET(new Request('https://rider-payments.andofoods.co/auth/callback?code=x'));
    expect(res.status).toBe(410);
    expect(fakeExchangeCodeForSession).not.toHaveBeenCalled();
  });
});
