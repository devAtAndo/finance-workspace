import { createLocalJWKSet, jwtVerify, type JSONWebKeySet } from 'jose';
import { UnauthorizedError } from './errors.js';
import type { CfAccessClaims } from './types.js';

export type JwksFetcher = (teamDomain: string) => Promise<JSONWebKeySet>;

export interface VerifyOpts {
  teamDomain: string;
  audience: string;
  jwksFetcher?: JwksFetcher;
  clock?: () => number;
}

const jwksCache = new Map<string, Promise<JSONWebKeySet>>();

export function _resetJwksCacheForTests(): void {
  jwksCache.clear();
}

const defaultJwksFetcher: JwksFetcher = async (teamDomain) => {
  const url = `https://${teamDomain}/cdn-cgi/access/certs`;
  const res = await fetch(url);
  if (!res.ok) throw new UnauthorizedError(`JWKS fetch failed: ${res.status}`);
  return (await res.json()) as JSONWebKeySet;
};

async function getJwks(teamDomain: string, fetcher: JwksFetcher): Promise<JSONWebKeySet> {
  const cached = jwksCache.get(teamDomain);
  if (cached) return cached;
  const p = fetcher(teamDomain).catch((err) => {
    jwksCache.delete(teamDomain);
    throw err;
  });
  jwksCache.set(teamDomain, p);
  return p;
}

export async function verifyCfAccessJwt(
  token: string | null | undefined,
  opts: VerifyOpts,
): Promise<CfAccessClaims> {
  if (!token) throw new UnauthorizedError('missing cf-access-jwt-assertion');

  const fetcher = opts.jwksFetcher ?? defaultJwksFetcher;
  let jwks: JSONWebKeySet;
  try {
    jwks = await getJwks(opts.teamDomain, fetcher);
  } catch (err) {
    throw new UnauthorizedError('unable to load JWKS', err);
  }

  const keySet = createLocalJWKSet(jwks);
  const now = opts.clock ? Math.floor(opts.clock() / 1000) : undefined;

  try {
    const { payload } = await jwtVerify(token, keySet, {
      issuer: `https://${opts.teamDomain}`,
      audience: opts.audience,
      ...(now !== undefined ? { currentDate: new Date(now * 1000) } : {}),
    });
    if (typeof payload.email !== 'string' || payload.email.length === 0) {
      throw new UnauthorizedError('token missing email claim');
    }
    return payload as unknown as CfAccessClaims;
  } catch (err) {
    if (err instanceof UnauthorizedError) throw err;
    throw new UnauthorizedError('invalid cf-access-jwt-assertion', err);
  }
}
