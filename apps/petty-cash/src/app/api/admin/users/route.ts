import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const users = await prisma.user.findMany({
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      branch: { select: { id: true, name: true } },
    },
  });
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  const email = String(body.email || '')
    .trim()
    .toLowerCase();
  const name = String(body.name || '').trim();
  const role = body.role as 'BRANCH_USER' | 'FINANCE' | 'ADMIN';
  const password = String(body.password || '').trim();
  const branchId = body.branchId ? String(body.branchId) : null;

  if (!email || !name || !role || !password) {
    return NextResponse.json(
      { error: 'email, name, role, and password are required' },
      { status: 400 },
    );
  }
  if (!['BRANCH_USER', 'FINANCE', 'ADMIN'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }
  if (role === 'BRANCH_USER' && !branchId) {
    return NextResponse.json({ error: 'Branch users must have a branch' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      role,
      password: await bcrypt.hash(password, 10),
      branchId: role === 'BRANCH_USER' ? branchId : null,
    },
  });
  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
