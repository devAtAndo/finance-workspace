import {
  evaluateAccess,
  verifyCfAccessJwt,
  type IamPort,
  type JwksFetcher,
  type MiddlewareRedirect,
  type MiddlewareResult,
} from '@ando/auth';
import { buildLoginUrl } from './loginUrl';

export interface WorkspaceAuthOpts {
  teamDomain: string;
  audience: string;
  iam: IamPort;
  jwksFetcher?: JwksFetcher;
}

export async function evaluateWorkspaceAccess(
  req: Request,
  opts: WorkspaceAuthOpts,
): Promise<MiddlewareResult | MiddlewareRedirect> {
  return evaluateAccess(req, {
    appSlug: 'workspace',
    iam: opts.iam,
    verify: (token) =>
      verifyCfAccessJwt(token, {
        teamDomain: opts.teamDomain,
        audience: opts.audience,
        jwksFetcher: opts.jwksFetcher,
      }),
    loginRedirect: (r) => buildLoginUrl(opts.teamDomain, r.url),
    forbiddenRedirect: (r) => new URL('/no-access', r.url).toString(),
  });
}

function parseTestJwks(): JwksFetcher | undefined {
  const raw = process.env.WORKSPACE_TEST_JWKS_JSON;
  if (!raw) return undefined;
  const jwks = JSON.parse(raw);
  return async () => jwks;
}

export function getJwksFetcher(): JwksFetcher | undefined {
  if (process.env.NODE_ENV === 'production') return undefined;
  return parseTestJwks();
}
