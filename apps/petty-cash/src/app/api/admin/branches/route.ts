import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const branches = await prisma.branch.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { users: true } } },
  });
  return NextResponse.json({ branches });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  const name = String(body.name || '').trim();
  const floatLimit = Number(body.floatLimit);
  const thresholdPct = body.thresholdPct ? Number(body.thresholdPct) : 80;

  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  if (!floatLimit || floatLimit <= 0) {
    return NextResponse.json({ error: 'Float limit must be positive' }, { status: 400 });
  }
  if (thresholdPct < 1 || thresholdPct > 100) {
    return NextResponse.json({ error: 'Threshold must be 1–100' }, { status: 400 });
  }

  const exists = await prisma.branch.findUnique({ where: { name } });
  if (exists) return NextResponse.json({ error: 'Branch name already exists' }, { status: 409 });

  const branch = await prisma.branch.create({
    data: { name, floatLimit, currentBalance: floatLimit, thresholdPct },
  });
  return NextResponse.json({ branch });
}
