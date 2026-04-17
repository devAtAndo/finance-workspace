import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (admin.userId === params.id) {
    return NextResponse.json({ error: 'You cannot delete yourself' }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (target.role === 'ADMIN') {
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the only remaining admin' },
        { status: 400 },
      );
    }
  }

  // Check for foreign-key references — if the user has expenses or requests, block deletion
  const [expenseCount, submittedCount, reviewedCount] = await Promise.all([
    prisma.expense.count({ where: { userId: target.id } }),
    prisma.reimbursementRequest.count({ where: { submittedById: target.id } }),
    prisma.reimbursementRequest.count({ where: { reviewedById: target.id } }),
  ]);
  if (expenseCount + submittedCount + reviewedCount > 0) {
    return NextResponse.json(
      { error: 'User has activity history — disable instead of delete (not yet supported)' },
      { status: 400 },
    );
  }

  await prisma.user.delete({ where: { id: target.id } });
  return NextResponse.json({ ok: true });
}
