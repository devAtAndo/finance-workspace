import { ForbiddenError, UnauthorizedError } from './errors.js';
import type { VerifyOpts } from './verifyCfAccessJwt.js';
import type { AppSlug, CfAccessClaims, IamPort, Principal } from './types.js';

export interface RequireDeps {
  iam: IamPort;
  verify?: (token: string | null | undefined, opts?: Partial<VerifyOpts>) => Promise<CfAccessClaims>;
  now?: () => Date;
}

function readHeaderCaseInsensitive(req: Request, name: string): string | null {
  // Headers is already case-insensitive per spec, but belt + suspenders.
  const direct = req.headers.get(name);
  if (direct !== null) return direct;
  for (const [k, v] of req.headers) {
    if (k.toLowerCase() === name.toLowerCase()) return v;
  }
  return null;
}

export async function requireAppAccess(
  req: Request,
  appSlug: AppSlug,
  deps: RequireDeps,
): Promise<Principal> {
  const token = readHeaderCaseInsensitive(req, 'cf-access-jwt-assertion');
  if (!token) throw new UnauthorizedError('missing cf-access-jwt-assertion header');

  const verify = deps.verify;
  if (!verify) {
    throw new UnauthorizedError(
      'requireAppAccess requires deps.verify to be provided — call configureAuth() at the app edge',
    );
  }

  const claims = await verify(token);
  const user = await deps.iam.upsertUserByEmail(claims.email);
  if (user.disabledAt) throw new ForbiddenError('user is disabled');

  const access = await deps.iam.getAppAccess(user.id, appSlug);
  if (!access) throw new ForbiddenError(`no access to ${appSlug}`);

  return {
    userId: user.id,
    email: claims.email,
    appSlug,
    role: access.role,
  };
}
