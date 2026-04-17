import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const original = { ...process.env };

const fakeGetUser = vi.fn();
vi.mock('@/lib/supabase/server', () => ({
  getSupabaseServerClient: async () => ({
    auth: { getUser: fakeGetUser },
  }),
}));

beforeEach(() => {
  fakeGetUser.mockReset();
  delete process.env.RIDER_CF_ACCESS;
});

afterEach(() => {
  for (const k of Object.keys(process.env)) delete process.env[k];
  Object.assign(process.env, original);
  vi.resetModules();
});

describe('getCaller — supabase (legacy) mode', () => {
  it('returns userId + email when Supabase has an authenticated user', async () => {
    fakeGetUser.mockResolvedValue({ data: { user: { id: 's-1', email: 'asif@andofoods.co' } } });
    const { getCaller } = await import('../src/lib/api-auth.js');
    const caller = await getCaller();
    expect(caller).toEqual({ userId: 's-1', email: 'asif@andofoods.co' });
  });

  it('returns null when Supabase has no user', async () => {
    fakeGetUser.mockResolvedValue({ data: { user: null } });
    const { getCaller } = await import('../src/lib/api-auth.js');
    expect(await getCaller()).toBeNull();
  });

  it('returns null when user has no email', async () => {
    fakeGetUser.mockResolvedValue({ data: { user: { id: 's-2', email: null } } });
    const { getCaller } = await import('../src/lib/api-auth.js');
    expect(await getCaller()).toBeNull();
  });
});

describe('getCaller — cfaccess (V2) mode', () => {
  it('returns principal from x-ando-principal header', async () => {
    process.env.RIDER_CF_ACCESS = 'true';
    const req = new Request('https://rider-payments.andofoods.co/', {
      headers: {
        'x-ando-principal': JSON.stringify({
          userId: 'iam-u-9',
          email: 'asif@andofoods.co',
          role: 'FINANCE',
        }),
      },
    });
    const { getCaller } = await import('../src/lib/api-auth.js');
    const caller = await getCaller(req);
    expect(caller).toEqual({ userId: 'iam-u-9', email: 'asif@andofoods.co' });
    expect(fakeGetUser).not.toHaveBeenCalled();
  });

  it('returns null when x-ando-principal header is missing', async () => {
    process.env.RIDER_CF_ACCESS = 'true';
    const req = new Request('https://rider-payments.andofoods.co/');
    const { getCaller } = await import('../src/lib/api-auth.js');
    expect(await getCaller(req)).toBeNull();
  });
});

describe('requireAuth', () => {
  it('returns a 401 Response when there is no caller', async () => {
    fakeGetUser.mockResolvedValue({ data: { user: null } });
    const { requireAuth } = await import('../src/lib/api-auth.js');
    const res = await requireAuth();
    expect(res).not.toBeNull();
    expect(res!.status).toBe(401);
  });

  it('returns null when authenticated', async () => {
    fakeGetUser.mockResolvedValue({ data: { user: { id: 's-1', email: 'asif@andofoods.co' } } });
    const { requireAuth } = await import('../src/lib/api-auth.js');
    expect(await requireAuth()).toBeNull();
  });
});
