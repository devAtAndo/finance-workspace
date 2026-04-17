import { Sidebar } from '@/components/sidebar';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { isConfigured } from '@/lib/utils';
import { Suspense } from 'react';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let email: string | null = null;

  if (isConfigured()) {
    const supabase = await getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  }

  return (
    <div className="flex h-full min-h-screen">
      <Suspense fallback={<div className="w-56 border-r border-border" />}>
        <Sidebar userEmail={email} />
      </Suspense>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-auto">
          <div className="px-8 py-6 max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
