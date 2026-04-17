import { getAuthMode } from './authDispatcher';

export type PettyCashRole = 'ADMIN' | 'FINANCE' | 'BRANCH_USER';

export interface LocalPrincipal {
  userId: string;
  email: string;
  role: PettyCashRole;
  branchId: string | null;
}

export interface GetPrincipalOpts {
  req?: Request;
}

interface CfHeaderPrincipal {
  userId: string;
  email: string;
  role: PettyCashRole;
}

function readCfHeader(req: Request): CfHeaderPrincipal | null {
  const raw = req.headers.get('x-ando-principal');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CfHeaderPrincipal;
    if (!parsed.email || !parsed.userId || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function getPrincipalLegacy(): Promise<LocalPrincipal | null> {
  const { getServerSession } = await import('next-auth');
  const { authOptions } = await import('./auth');
  const session = await getServerSession(authOptions);
  const user = session?.user as
    | { id?: string; email?: string; role?: PettyCashRole; branchId?: string | null }
    | undefined;
  if (!user?.id || !user.email || !user.role) return null;
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
    branchId: user.branchId ?? null,
  };
}

async function getPrincipalCfAccess(req: Request | undefined): Promise<LocalPrincipal | null> {
  if (!req) return null;
  const header = readCfHeader(req);
  if (!header) return null;

  const { prisma } = await import('./prisma');
  const existing = await prisma.user.findUnique({ where: { email: header.email } });
  if (existing) {
    return {
      userId: existing.id,
      email: existing.email,
      role: existing.role as PettyCashRole,
      branchId: existing.branchId ?? null,
    };
  }

  const created = await prisma.user.create({
    data: {
      email: header.email,
      name: header.email.split('@')[0],
      password: '',
      role: header.role,
    },
  });
  return {
    userId: created.id,
    email: created.email,
    role: created.role as PettyCashRole,
    branchId: created.branchId ?? null,
  };
}

export async function getPrincipal(opts: GetPrincipalOpts = {}): Promise<LocalPrincipal | null> {
  return getAuthMode() === 'cfaccess' ? getPrincipalCfAccess(opts.req) : getPrincipalLegacy();
}

export async function requirePrincipal(opts: GetPrincipalOpts = {}): Promise<LocalPrincipal> {
  const p = await getPrincipal(opts);
  if (!p) throw new Error('unauthenticated');
  return p;
}
