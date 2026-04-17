import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const redirect = vi.fn<(url: string) => never>(() => {
  throw new Error('__REDIRECT__');
});
vi.mock('next/navigation', () => ({ redirect }));

const fakeGetPrincipal = vi.fn();
vi.mock('../src/lib/getPrincipal', () => ({
  getPrincipal: fakeGetPrincipal,
}));

beforeEach(() => {
  redirect.mockClear();
  fakeGetPrincipal.mockReset();
});

afterEach(() => {
  vi.resetModules();
});

describe('requirePrincipalOrRedirect', () => {
  it('returns the principal when authenticated', async () => {
    fakeGetPrincipal.mockResolvedValue({
      userId: 'u-1',
      email: 'asif@andofoods.co',
      role: 'ADMIN',
      branchId: null,
    });
    const { requirePrincipalOrRedirect } = await import('../src/lib/requirePrincipalOrRedirect');
    const p = await requirePrincipalOrRedirect();
    expect(p.email).toBe('asif@andofoods.co');
    expect(redirect).not.toHaveBeenCalled();
  });

  it('redirects to /login when no principal', async () => {
    fakeGetPrincipal.mockResolvedValue(null);
    const { requirePrincipalOrRedirect } = await import('../src/lib/requirePrincipalOrRedirect');
    await expect(requirePrincipalOrRedirect()).rejects.toThrow('__REDIRECT__');
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('redirects to a custom target when provided', async () => {
    fakeGetPrincipal.mockResolvedValue(null);
    const { requirePrincipalOrRedirect } = await import('../src/lib/requirePrincipalOrRedirect');
    await expect(requirePrincipalOrRedirect({ redirectTo: '/custom' })).rejects.toThrow(
      '__REDIRECT__',
    );
    expect(redirect).toHaveBeenCalledWith('/custom');
  });
});
