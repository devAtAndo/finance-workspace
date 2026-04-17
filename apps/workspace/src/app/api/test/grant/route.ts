import { NextResponse } from 'next/server';
import { iam } from '@ando/db';
import type { AppSlug, Role } from '@ando/auth';

const VALID_SLUGS = new Set<AppSlug>(['workspace', 'petty-cash', 'rider-payments']);
const VALID_ROLES = new Set<Role>(['ADMIN', 'FINANCE', 'BRANCH_USER', 'VIEWER']);

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('not found', { status: 404 });
  }

  const body = (await req.json()) as { email?: string; appSlug?: string; role?: string };
  if (!body.email || !body.appSlug || !body.role) {
    return NextResponse.json({ error: 'email, appSlug, role required' }, { status: 400 });
  }
  if (!VALID_SLUGS.has(body.appSlug as AppSlug)) {
    return NextResponse.json({ error: 'invalid appSlug' }, { status: 400 });
  }
  if (!VALID_ROLES.has(body.role as Role)) {
    return NextResponse.json({ error: 'invalid role' }, { status: 400 });
  }

  const user = await iam.upsertUserByEmail(body.email);
  await iam.grantAccess({
    userId: user.id,
    appSlug: body.appSlug as AppSlug,
    role: body.role as Role,
    grantedBy: null,
  });
  return NextResponse.json({ userId: user.id });
}
