import { SignJWT, exportJWK, generateKeyPair, type JSONWebKeySet, type KeyLike } from 'jose';
import type { AppSlug, IamPort, IamUser, Role } from './types.js';

const KID = 'test-kid';

export interface TestKeypair {
  privateKey: KeyLike;
  jwks: JSONWebKeySet;
}

export async function createTestKeypair(): Promise<TestKeypair> {
  const { privateKey, publicKey } = await generateKeyPair('RS256', { extractable: true });
  const publicJwk = await exportJWK(publicKey);
  const jwks: JSONWebKeySet = {
    keys: [{ ...publicJwk, kid: KID, alg: 'RS256', use: 'sig' }],
  };
  return { privateKey, jwks };
}

export interface SignArgs {
  privateKey: KeyLike;
  teamDomain: string;
  audience: string | string[];
  email: string;
  sub?: string;
  expSeconds?: number;
}

export async function signTestCfAccessJwt(args: SignArgs): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  const expOffset = args.expSeconds ?? 3600;
  return new SignJWT({
    email: args.email,
  })
    .setProtectedHeader({ alg: 'RS256', kid: KID })
    .setIssuer(`https://${args.teamDomain}`)
    .setAudience(args.audience)
    .setSubject(args.sub ?? 'test-sub')
    .setIssuedAt(nowSec)
    .setExpirationTime(nowSec + expOffset)
    .sign(args.privateKey);
}

type WithEmail = { email: string };

interface InMemoryIamExtra {
  users: Map<string, IamUser & WithEmail>;
  access: Map<string, { role: Role }>;
  grantByEmail?: (email: string, slug: AppSlug, role: Role) => Promise<void>;
}

export type InMemoryIam = IamPort & InMemoryIamExtra;

let idCounter = 0;
function newId(): string {
  idCounter += 1;
  return `user_${idCounter}_${Date.now()}`;
}

export function makeInMemoryIam(overrides: Partial<IamPort> = {}): InMemoryIam {
  const users = new Map<string, IamUser & WithEmail>();
  const access = new Map<string, { role: Role }>();

  const port: IamPort = {
    async upsertUserByEmail(email: string) {
      for (const u of users.values()) {
        if (u.email === email) return { id: u.id, email: u.email, disabledAt: u.disabledAt };
      }
      const id = newId();
      const user: IamUser & WithEmail = { id, email, disabledAt: null };
      users.set(id, user);
      return { id, email, disabledAt: null };
    },
    async getAppAccess(userId: string, appSlug: AppSlug) {
      return access.get(`${userId}:${appSlug}`) ?? null;
    },
    ...overrides,
  };

  return Object.assign(port, { users, access });
}
