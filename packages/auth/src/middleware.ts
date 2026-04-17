import { ForbiddenError, UnauthorizedError } from './errors.js';
import { requireAppAccess, type RequireDeps } from './requireAppAccess.js';
import type { AppSlug, Principal } from './types.js';

export interface MiddlewareResult {
  ok: true;
  principal: Principal;
}

export interface MiddlewareRedirect {
  ok: false;
  status: 401 | 403;
  location?: string;
  reason: string;
}

export interface MiddlewareOpts extends RequireDeps {
  appSlug: AppSlug;
  loginRedirect: (req: Request) => string;
  forbiddenRedirect?: (req: Request) => string;
}

export async function evaluateAccess(
  req: Request,
  opts: MiddlewareOpts,
): Promise<MiddlewareResult | MiddlewareRedirect> {
  try {
    const principal = await requireAppAccess(req, opts.appSlug, opts);
    return { ok: true, principal };
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return {
        ok: false,
        status: 401,
        location: opts.loginRedirect(req),
        reason: err.message,
      };
    }
    if (err instanceof ForbiddenError) {
      const location = opts.forbiddenRedirect?.(req);
      return { ok: false, status: 403, ...(location ? { location } : {}), reason: err.message };
    }
    throw err;
  }
}
