import { beforeEach, describe, expect, it } from 'vitest';
import { evaluateWorkspaceAccess } from '../src/lib/auth.js';
import { createTestKeypair, makeInMemoryIam, signTestCfAccessJwt } from '@ando/auth/testing';
import { _resetJwksCacheForTests } from '@ando/auth';

const TEAM = 'ando.cloudflareaccess.com';
const AUD = 'test-aud-workspace';

beforeEach(() => {
  _resetJwksCacheForTests();
});

describe('workspace middleware evaluateWorkspaceAccess', () => {
  it('returns ok=true for a signed-in user with workspace access', async () => {
    const { privateKey, jwks } = await createTestKeypair();
    const token = await signTestCfAccessJwt({
      privateKey,
      teamDomain: TEAM,
      audience: AUD,
      email: 'asif@andofoods.co',
    });
    const iam = makeInMemoryIam();
    const user = await iam.upsertUserByEmail('asif@andofoods.co');
    iam.access.set(`${user.id}:workspace`, { role: 'ADMIN' });

    const req = new Request('https://workspace.andofoods.co/', {
      headers: { 'cf-access-jwt-assertion': token },
    });
    const result = await evaluateWorkspaceAccess(req, {
      teamDomain: TEAM,
      audience: AUD,
      iam,
      jwksFetcher: async () => jwks,
    });
    expect(result.ok).toBe(true);
  });

  it('returns 401 + login URL when no cf-access-jwt-assertion header is present', async () => {
    const iam = makeInMemoryIam();
    const req = new Request('https://workspace.andofoods.co/admin');
    const result = await evaluateWorkspaceAccess(req, {
      teamDomain: TEAM,
      audience: AUD,
      iam,
      jwksFetcher: async () => ({ keys: [] }),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(401);
      expect(result.location).toContain('/cdn-cgi/access/login/');
      expect(result.location).toContain(encodeURIComponent('https://workspace.andofoods.co/admin'));
    }
  });

  it('returns 403 when the signed-in user has no workspace grant', async () => {
    const { privateKey, jwks } = await createTestKeypair();
    const token = await signTestCfAccessJwt({
      privateKey,
      teamDomain: TEAM,
      audience: AUD,
      email: 'stranger@andofoods.co',
    });
    const iam = makeInMemoryIam();
    // No app_access granted
    const req = new Request('https://workspace.andofoods.co/', {
      headers: { 'cf-access-jwt-assertion': token },
    });
    const result = await evaluateWorkspaceAccess(req, {
      teamDomain: TEAM,
      audience: AUD,
      iam,
      jwksFetcher: async () => jwks,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(403);
  });
});
