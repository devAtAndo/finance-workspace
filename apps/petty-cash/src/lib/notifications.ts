import { prisma } from './prisma';

export async function getFinanceEmails(): Promise<string[]> {
  const users = await prisma.user.findMany({
    where: { role: 'FINANCE' },
    select: { email: true },
  });
  return users.map((u) => u.email);
}
