import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LocalPrincipal } from '../src/lib/getPrincipal.js';

const original = { ...process.env };

const fakePrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
};

vi.mock('../src/lib/prisma', () => ({
  prisma: fakePrisma,
}));

const fakeGetServerSession = vi.fn();
vi.mock('next-auth', () => ({
  getServerSession: (...args: unknown[]) => fakeGetServerSession(...args),
}));

vi.mock('../src/lib/auth', () => ({ authOptions: {} }));

beforeEach(() => {
  fakePrisma.user.findUnique.mockReset();
  fakePrisma.user.create.mockReset();
  fakeGetServerSession.mockReset();
  delete process.env.PETTY_CASH_AUTH_V2;
});

afterEach(() => {
  for (const k of Object.keys(process.env)) delete process.env[k];
  Object.assign(process.env, original);
  vi.resetModules();
});

describe('getPrincipal — legacy (NextAuth) mode', () => {
  it('maps a NextAuth session into a LocalPrincipal', async () => {
    fakeGetServerSession.mockResolvedValue({
      user: { id: 'u-1', email: 'asif@andofoods.co', role: 'ADMIN', branchId: 'b-1' },
    });
    const { getPrincipal } = await import('../src/lib/getPrincipal.js');
    const principal: LocalPrincipal | null = await getPrincipal();
    expect(principal).toEqual({
      userId: 'u-1',
      email: 'asif@andofoods.co',
      role: 'ADMIN',
      branchId: 'b-1',
    });
  });

  it('returns null when NextAuth has no session', async () => {
    fakeGetServerSession.mockResolvedValue(null);
    const { getPrincipal } = await import('../src/lib/getPrincipal.js');
    expect(await getPrincipal()).toBeNull();
  });
});

describe('getPrincipal — cfaccess mode (flag on)', () => {
  it('reads x-ando-principal header and joins branchId from Prisma', async () => {
    process.env.PETTY_CASH_AUTH_V2 = 'true';
    fakePrisma.user.findUnique.mockResolvedValue({
      id: 'u-local-1',
      email: 'asif@andofoods.co',
      branchId: 'b-42',
      role: 'FINANCE',
    });

    const req = new Request('https://petty-cash.andofoods.co/branch', {
      headers: {
        'x-ando-principal': JSON.stringify({
          userId: 'iam-user-1',
          email: 'asif@andofoods.co',
          role: 'FINANCE',
        }),
      },
    });
    const { getPrincipal } = await import('../src/lib/getPrincipal.js');
    const p = await getPrincipal({ req });
    expect(p).toEqual({
      userId: 'u-local-1',
      email: 'asif@andofoods.co',
      role: 'FINANCE',
      branchId: 'b-42',
    });
    expect(fakeGetServerSession).not.toHaveBeenCalled();
  });

  it('JIT-creates the local user when absent', async () => {
    process.env.PETTY_CASH_AUTH_V2 = 'true';
    fakePrisma.user.findUnique.mockResolvedValue(null);
    fakePrisma.user.create.mockResolvedValue({
      id: 'u-new-1',
      email: 'new@andofoods.co',
      branchId: null,
      role: 'BRANCH_USER',
    });

    const req = new Request('https://petty-cash.andofoods.co/', {
      headers: {
        'x-ando-principal': JSON.stringify({
          userId: 'iam-user-9',
          email: 'new@andofoods.co',
          role: 'BRANCH_USER',
        }),
      },
    });
    const { getPrincipal } = await import('../src/lib/getPrincipal.js');
    const p = await getPrincipal({ req });
    expect(p?.userId).toBe('u-new-1');
    expect(fakePrisma.user.create).toHaveBeenCalledOnce();
  });

  it('returns null when the x-ando-principal header is missing in cfaccess mode', async () => {
    process.env.PETTY_CASH_AUTH_V2 = 'true';
    const req = new Request('https://petty-cash.andofoods.co/');
    const { getPrincipal } = await import('../src/lib/getPrincipal.js');
    expect(await getPrincipal({ req })).toBeNull();
  });
});

describe('requirePrincipal', () => {
  it('throws when no principal can be resolved', async () => {
    fakeGetServerSession.mockResolvedValue(null);
    const { requirePrincipal } = await import('../src/lib/getPrincipal.js');
    await expect(requirePrincipal()).rejects.toThrow(/unauthenticated/i);
  });
});
