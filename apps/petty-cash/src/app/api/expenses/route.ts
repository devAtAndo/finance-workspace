import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { saveReceipt } from '@/lib/uploads';
import { checkThresholdAndNotify } from '@/lib/threshold';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user || user.role !== 'BRANCH_USER' || !user.branchId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const amount = Number(form.get('amount'));
  const description = String(form.get('description') || '').trim();
  const ocrAmountRaw = form.get('ocrAmount');
  const ocrText = form.get('ocrText') ? String(form.get('ocrText')) : null;
  const file = form.get('receipt') as File | null;

  if (!amount || amount <= 0 || !description) {
    return NextResponse.json({ error: 'Amount and description required' }, { status: 400 });
  }

  const branch = await prisma.branch.findUnique({ where: { id: user.branchId } });
  if (!branch) return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
  if (amount > branch.currentBalance) {
    return NextResponse.json({ error: 'Amount exceeds current balance' }, { status: 400 });
  }

  let receiptUrl: string | null = null;
  if (file && file.size > 0) receiptUrl = await saveReceipt(file);

  const [expense] = await prisma.$transaction([
    prisma.expense.create({
      data: {
        branchId: branch.id,
        userId: user.id,
        amount,
        description,
        receiptUrl,
        ocrAmount: ocrAmountRaw ? Number(ocrAmountRaw) : null,
        ocrText,
      },
    }),
    prisma.branch.update({
      where: { id: branch.id },
      data: { currentBalance: { decrement: amount } },
    }),
  ]);

  await checkThresholdAndNotify(branch.id);

  return NextResponse.json({ expense });
}
