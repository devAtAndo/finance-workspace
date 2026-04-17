import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const branch = await prisma.branch.upsert({
    where: { name: 'Nairobi CBD' },
    update: {},
    create: {
      name: 'Nairobi CBD',
      floatLimit: 5000,
      currentBalance: 5000,
      thresholdPct: 80,
    },
  });

  await prisma.user.upsert({
    where: { email: 'branch@example.com' },
    update: {},
    create: {
      email: 'branch@example.com',
      name: 'Branch User',
      password: passwordHash,
      role: 'BRANCH_USER',
      branchId: branch.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'finance@example.com' },
    update: {},
    create: {
      email: 'finance@example.com',
      name: 'Finance Reviewer',
      password: passwordHash,
      role: 'FINANCE',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Seeded:');
  console.log('  Branch:  Nairobi CBD (float Ksh 5,000)');
  console.log('  Login:   admin@example.com   / password123  (admin)');
  console.log('  Login:   finance@example.com / password123  (finance)');
  console.log('  Login:   branch@example.com  / password123  (branch)');
}

main().finally(() => prisma.$disconnect());
