import { prisma } from './prisma';
import { sendEmail } from './email';
import { formatKsh } from './money';
import { getFinanceEmails } from './notifications';

/**
 * Call after any balance-reducing action. Emails finance if usage has just
 * crossed the threshold (and hasn't been re-notified since last replenishment).
 */
export async function checkThresholdAndNotify(branchId: string) {
  const branch = await prisma.branch.findUnique({ where: { id: branchId } });
  if (!branch) return;

  const used = branch.floatLimit - branch.currentBalance;
  const usedPct = (used / branch.floatLimit) * 100;
  const crossed = usedPct >= branch.thresholdPct;
  const alreadyNotified = branch.notifiedAtBalance !== null;
  if (!crossed || alreadyNotified) return;

  const financeEmails = await getFinanceEmails();
  if (financeEmails.length === 0) return;
  await sendEmail({
    to: financeEmails.join(', '),
    subject: `[Petty Cash] ${branch.name} has hit ${branch.thresholdPct}% usage`,
    html: `
      <p>Branch <strong>${branch.name}</strong> has used <strong>${formatKsh(used)}</strong>
      of its <strong>${formatKsh(branch.floatLimit)}</strong> float
      (${Math.round(usedPct)}%).</p>
      <p>Current balance: <strong>${formatKsh(branch.currentBalance)}</strong>.</p>
      <p>A reimbursement request is expected shortly. You'll receive another email when receipts are submitted.</p>
    `,
  });

  await prisma.branch.update({
    where: { id: branchId },
    data: { notifiedAtBalance: branch.currentBalance },
  });
}
