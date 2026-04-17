import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import BranchDashboard from './BranchDashboard';

export default async function BranchPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!session) redirect('/login');
  if (user.role !== 'BRANCH_USER') redirect('/finance');
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <BranchDashboard />
      </main>
    </>
  );
}
