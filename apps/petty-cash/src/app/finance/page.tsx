import { redirect } from 'next/navigation';
import { requirePrincipalOrRedirect } from '@/lib/requirePrincipalOrRedirect';
import Header from '@/components/Header';
import FinanceDashboard from './FinanceDashboard';

export default async function FinancePage() {
  const { role } = await requirePrincipalOrRedirect();
  if (role !== 'FINANCE' && role !== 'ADMIN') redirect('/branch');
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <FinanceDashboard />
      </main>
    </>
  );
}
