import { redirect } from 'next/navigation';
import { requirePrincipalOrRedirect } from '@/lib/requirePrincipalOrRedirect';
import Header from '@/components/Header';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const principal = await requirePrincipalOrRedirect();
  if (principal.role !== 'ADMIN') {
    redirect(principal.role === 'FINANCE' ? '/finance' : '/branch');
  }
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <AdminDashboard />
      </main>
    </>
  );
}
