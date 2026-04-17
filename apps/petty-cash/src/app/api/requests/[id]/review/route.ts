import { NextResponse } from 'next/server';
import { getPrincipal } from '@/lib/getPrincipal';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { formatKsh } from '@/lib/money';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const principal = await getPrincipal({ req });
  if (!principal || (principal.role !== 'FINANCE' && principal.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { action, notes } = await req.json();
  if (!['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  const request = await prisma.reimbursementRequest.findUnique({
    where: { id: params.id },
    include: { branch: true, submittedBy: true, expenses: true },
  });
  if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (request.status !== 'PENDING') {
    return NextResponse.json({ error: 'Already reviewed' }, { status: 400 });
  }

  const status = action === 'approve' ? 'APPROVED' : 'REJECTED';

  await prisma.$transaction(async (tx) => {
    await tx.reimbursementRequest.update({
      where: { id: request.id },
      data: {
        status,
        notes: notes || null,
        reviewedAt: new Date(),
        reviewedById: principal.userId,
      },
    });
    if (status === 'APPROVED') {
      // Replenish branch back to float and reset notification guard
      await tx.branch.update({
        where: { id: request.branchId },
        data: {
          currentBalance: request.branch.floatLimit,
          notifiedAtBalance: null,
        },
      });
    } else {
      // Rejected: detach expenses so branch can re-submit after fixes
      await tx.expense.updateMany({
        where: { requestId: request.id },
        data: { requestId: null },
      });
    }
  });

  await sendEmail({
    to: request.submittedBy.email,
    subject: `[Petty Cash] Request ${status.toLowerCase()} — ${formatKsh(request.totalAmount)}`,
    html: `
      <p>Your reimbursement request of <strong>${formatKsh(request.totalAmount)}</strong>
      for <strong>${request.branch.name}</strong> has been <strong>${status.toLowerCase()}</strong>.</p>
      ${notes ? `<p>Notes: ${notes}</p>` : ''}
      ${status === 'APPROVED' ? `<p>The branch float has been replenished.</p>` : ''}
    `,
  });

  return NextResponse.json({ ok: true });
}
