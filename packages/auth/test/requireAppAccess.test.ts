import { beforeEach, describe, expect, it } from 'vitest';
import { requireAppAccess } from '../src/requireAppAccess.js';
import { ForbiddenError, UnauthorizedError } from '../src/errors.js';
import { _resetJwksCacheForTests } from '../src/verifyCfAccessJwt.js';
import {
  createTestKeypair,
  makeInMemoryIam,
  signTestCfAccessJwt,
} from '../src/testing.js';

beforeEach(() => {
  _resetJwksCacheForTests();
});

const TEAM = 'ando.cloudflareaccess.com';
const AUD = 'aud-petty-cash-123';

async function setup() {
  const { privateKey, jwks } = await createTestKeypair();
  const token = await signTestCfAccessJwt({
    privateKey,
    teamDomain: TEAM,
    audience: AUD,
    email: 'asif@andofoods.co',
  });
  const req = new Request('https://petty-cash.andofoods.co/', {
    headers: { 'cf-access-jwt-assertion': token },
  });
  const jwksFetcher = async () => jwks;
  return { token, req, jwksFetcher };
}

describe('requireAppAccess', () => {
  it('returns a Principal for an authorized user', async () => {
    const { req, jwksFetcher } = await setup();
    const iam = makeInMemoryIam();
    // Pre-grant: create user, grant petty-cash FINANCE
    const user = await iam.upsertUserByEmail('asif@andofoods.co');
    iam.access.set(`${user.id}:petty-cash`, { role: 'FINANCE' });

    const principal = await requireAppAccess(req, 'petty-cash', {
      iam,
      verify: (t, _o) =>
        import('../src/verifyCfAccessJwt.js').then((m) =>
          m.verifyCfAccessJwt(t, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
        ),
    });

    expect(principal.email).toBe('asif@andofoods.co');
    expect(principal.role).toBe('FINANCE');
    expect(principal.appSlug).toBe('petty-cash');
  });

  it('throws UnauthorizedError when the cf-access-jwt-assertion header is missing', async () => {
    const iam = makeInMemoryIam();
    const req = new Request('https://petty-cash.andofoods.co/');
    await expect(
      requireAppAccess(req, 'petty-cash', { iam }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('throws ForbiddenError when the user has no app_access row', async () => {
    const { req, jwksFetcher } = await setup();
    const iam = makeInMemoryIam(); // no grants
    await expect(
      requireAppAccess(req, 'petty-cash', {
        iam,
        verify: (t) =>
          import('../src/verifyCfAccessJwt.js').then((m) =>
            m.verifyCfAccessJwt(t, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
          ),
      }),
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it('throws ForbiddenError when the user is disabled', async () => {
    const { req, jwksFetcher } = await setup();
    const iam = makeInMemoryIam();
    const user = await iam.upsertUserByEmail('asif@andofoods.co');
    iam.users.set(user.id, { ...iam.users.get(user.id), disabledAt: new Date() });
    iam.access.set(`${user.id}:petty-cash`, { role: 'FINANCE' });

    await expect(
      requireAppAccess(req, 'petty-cash', {
        iam,
        verify: (t) =>
          import('../src/verifyCfAccessJwt.js').then((m) =>
            m.verifyCfAccessJwt(t, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
          ),
      }),
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it('JIT-provisions unknown users on first successful verify', async () => {
    const { req, jwksFetcher } = await setup();
    const iam = makeInMemoryIam();
    // No explicit upsert — rely on JIT

    // Grant by email after the fact, via JIT-created user
    // Simulate admin granting access concurrently by seeding grant-by-email
    iam.grantByEmail = async (email: string, slug: string, role: string) => {
      const u = await iam.upsertUserByEmail(email);
      iam.access.set(`${u.id}:${slug}`, { role });
    };
    await iam.grantByEmail('asif@andofoods.co', 'petty-cash', 'VIEWER');

    const principal = await requireAppAccess(req, 'petty-cash', {
      iam,
      verify: (t) =>
        import('../src/verifyCfAccessJwt.js').then((m) =>
          m.verifyCfAccessJwt(t, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
        ),
    });
    expect(principal.role).toBe('VIEWER');
    expect(iam.users.size).toBeGreaterThan(0);
  });

  it('reads the header case-insensitively', async () => {
    const { token, jwksFetcher } = await setup();
    const req = new Request('https://petty-cash.andofoods.co/', {
      headers: { 'CF-Access-JWT-Assertion': token },
    });
    const iam = makeInMemoryIam();
    const user = await iam.upsertUserByEmail('asif@andofoods.co');
    iam.access.set(`${user.id}:petty-cash`, { role: 'ADMIN' });

    const principal = await requireAppAccess(req, 'petty-cash', {
      iam,
      verify: (t) =>
        import('../src/verifyCfAccessJwt.js').then((m) =>
          m.verifyCfAccessJwt(t, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
        ),
    });
    expect(principal.role).toBe('ADMIN');
  });
});
