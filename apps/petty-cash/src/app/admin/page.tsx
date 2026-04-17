import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!session) redirect('/login');
  if (user.role !== 'ADMIN') {
    redirect(user.role === 'FINANCE' ? '/finance' : '/branch');
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
