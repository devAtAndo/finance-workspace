import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user || !user.branchId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const branch = await prisma.branch.findUnique({ where: { id: user.branchId } });
  if (!branch) return NextResponse.json({ error: 'Branch not found' }, { status: 404 });

  const pendingExpenses = await prisma.expense.findMany({
    where: { branchId: branch.id, requestId: null },
    orderBy: { createdAt: 'desc' },
  });
  const openRequest = await prisma.reimbursementRequest.findFirst({
    where: { branchId: branch.id, status: 'PENDING' },
    orderBy: { submittedAt: 'desc' },
    include: { expenses: true },
  });

  return NextResponse.json({ branch, pendingExpenses, openRequest });
}
