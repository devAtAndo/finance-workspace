import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import FinanceDashboard from './FinanceDashboard';

export default async function FinancePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!session) redirect('/login');
  if (user.role !== 'FINANCE' && user.role !== 'ADMIN') redirect('/branch');
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <FinanceDashboard />
      </main>
    </>
  );
}
