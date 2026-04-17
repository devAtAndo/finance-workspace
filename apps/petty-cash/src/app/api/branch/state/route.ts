import { NextResponse } from 'next/server';
import { getPrincipal } from '@/lib/getPrincipal';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const principal = await getPrincipal({ req });
  if (!principal?.branchId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const branch = await prisma.branch.findUnique({ where: { id: principal.branchId } });
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
