'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const { data } = useSession();
  const user = data?.user as any;
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo width={84} />
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-700">Petty Cash</span>
          {user?.role === 'ADMIN' && (
            <nav className="ml-6 flex items-center gap-4 text-sm text-slate-600">
              <Link href="/admin" className="hover:text-slate-900">
                Admin
              </Link>
              <Link href="/finance" className="hover:text-slate-900">
                Finance view
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-slate-600">{user.email}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  user.role === 'ADMIN'
                    ? 'bg-slate-900 text-white'
                    : user.role === 'FINANCE'
                      ? 'bg-ando-red/10 text-ando-red'
                      : 'bg-slate-100 text-slate-700'
                }`}
              >
                {user.role === 'ADMIN' ? 'Admin' : user.role === 'FINANCE' ? 'Finance' : 'Branch'}
              </span>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
