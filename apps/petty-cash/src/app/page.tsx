import { redirect } from 'next/navigation';
import { requirePrincipalOrRedirect } from '@/lib/requirePrincipalOrRedirect';

export default async function Home() {
  const { role } = await requirePrincipalOrRedirect();
  if (role === 'ADMIN') redirect('/admin');
  redirect(role === 'FINANCE' ? '/finance' : '/branch');
}
