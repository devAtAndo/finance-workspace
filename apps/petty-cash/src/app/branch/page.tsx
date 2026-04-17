import { redirect } from 'next/navigation';
import { requirePrincipalOrRedirect } from '@/lib/requirePrincipalOrRedirect';
import Header from '@/components/Header';
import BranchDashboard from './BranchDashboard';

export default async function BranchPage() {
  const { role } = await requirePrincipalOrRedirect();
  if (role !== 'BRANCH_USER') redirect('/finance');
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <BranchDashboard />
      </main>
    </>
  );
}
