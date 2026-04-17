import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { formatKsh } from '@/lib/money';
import { getFinanceEmails } from '@/lib/notifications';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const where = user.role === 'FINANCE' || user.role === 'ADMIN' ? {} : { branchId: user.branchId };
  const requests = await prisma.reimbursementRequest.findMany({
    where,
    orderBy: { submittedAt: 'desc' },
    include: {
      branch: true,
      submittedBy: { select: { name: true, email: true } },
      expenses: true,
    },
  });
  return NextResponse.json({ requests });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user || user.role !== 'BRANCH_USER' || !user.branchId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pendingExpenses = await prisma.expense.findMany({
    where: { branchId: user.branchId, requestId: null },
  });
  if (pendingExpenses.length === 0) {
    return NextResponse.json({ error: 'No expenses to reimburse' }, { status: 400 });
  }
  const missingReceipts = pendingExpenses.filter((e) => !e.receiptUrl);
  if (missingReceipts.length > 0) {
    return NextResponse.json(
      { error: `${missingReceipts.length} expense(s) missing receipts` },
      { status: 400 },
    );
  }

  const total = pendingExpenses.reduce((s, e) => s + e.amount, 0);
  const branch = await prisma.branch.findUnique({ where: { id: user.branchId } });

  const request = await prisma.$transaction(async (tx) => {
    const req = await tx.reimbursementRequest.create({
      data: {
        branchId: user.branchId,
        submittedById: user.id,
        totalAmount: total,
      },
    });
    await tx.expense.updateMany({
      where: { id: { in: pendingExpenses.map((e) => e.id) } },
      data: { requestId: req.id },
    });
    return req;
  });

  const financeEmails = await getFinanceEmails();
  if (financeEmails.length > 0)
    await sendEmail({
      to: financeEmails.join(', '),
      subject: `[Petty Cash] Reimbursement request from ${branch?.name} — ${formatKsh(total)}`,
      html: `
      <p>Branch <strong>${branch?.name}</strong> has submitted a reimbursement request.</p>
      <ul>
        <li>Total: <strong>${formatKsh(total)}</strong></li>
        <li>Receipts: ${pendingExpenses.length}</li>
      </ul>
      <p>Review it in the finance dashboard.</p>
    `,
    });

  return NextResponse.json({ request });
}
