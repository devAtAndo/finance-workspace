import { beforeEach, describe, expect, it } from 'vitest';
import { verifyCfAccessJwt, _resetJwksCacheForTests } from '../src/verifyCfAccessJwt.js';
import { UnauthorizedError } from '../src/errors.js';
import { createTestKeypair, signTestCfAccessJwt } from '../src/testing.js';

beforeEach(() => {
  _resetJwksCacheForTests();
});

const TEAM = 'ando.cloudflareaccess.com';
const AUD = 'aud-petty-cash-123';

async function harness() {
  const { privateKey, jwks } = await createTestKeypair();
  const jwksFetcher = async () => jwks;
  return { privateKey, jwksFetcher };
}

describe('verifyCfAccessJwt', () => {
  it('accepts a valid token and returns the claims', async () => {
    const { privateKey, jwksFetcher } = await harness();
    const token = await signTestCfAccessJwt({
      privateKey,
      teamDomain: TEAM,
      audience: AUD,
      email: 'asif@andofoods.co',
    });
    const claims = await verifyCfAccessJwt(token, {
      teamDomain: TEAM,
      audience: AUD,
      jwksFetcher,
    });
    expect(claims.email).toBe('asif@andofoods.co');
    expect(claims.iss).toBe(`https://${TEAM}`);
  });

  it('rejects when token is null', async () => {
    const { jwksFetcher } = await harness();
    await expect(
      verifyCfAccessJwt(null, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('rejects when token is an empty string', async () => {
    const { jwksFetcher } = await harness();
    await expect(
      verifyCfAccessJwt('', { teamDomain: TEAM, audience: AUD, jwksFetcher }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('rejects a malformed token', async () => {
    const { jwksFetcher } = await harness();
    await expect(
      verifyCfAccessJwt('not-a-jwt', {
        teamDomain: TEAM,
        audience: AUD,
        jwksFetcher,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('rejects a token with wrong audience (prevents cross-app replay)', async () => {
    const { privateKey, jwksFetcher } = await harness();
    const token = await signTestCfAccessJwt({
      privateKey,
      teamDomain: TEAM,
      audience: 'aud-workspace-999',
      email: 'asif@andofoods.co',
    });
    await expect(
      verifyCfAccessJwt(token, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('rejects a token with wrong issuer', async () => {
    const { privateKey, jwksFetcher } = await harness();
    const token = await signTestCfAccessJwt({
      privateKey,
      teamDomain: 'evil.cloudflareaccess.com',
      audience: AUD,
      email: 'asif@andofoods.co',
    });
    await expect(
      verifyCfAccessJwt(token, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('rejects an expired token', async () => {
    const { privateKey, jwksFetcher } = await harness();
    const token = await signTestCfAccessJwt({
      privateKey,
      teamDomain: TEAM,
      audience: AUD,
      email: 'asif@andofoods.co',
      expSeconds: -60, // expired a minute ago
    });
    await expect(
      verifyCfAccessJwt(token, { teamDomain: TEAM, audience: AUD, jwksFetcher }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
