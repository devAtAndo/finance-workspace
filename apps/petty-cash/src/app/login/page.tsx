'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) return setError('Invalid email or password');
    router.push('/');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo width={120} />
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-5"
        >
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Petty Cash</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to continue.</p>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ando-red/20 focus:border-ando-red"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ando-red/20 focus:border-ando-red"
              />
            </label>
          </div>
          {error && <p className="text-sm text-ando-red">{error}</p>}
          <button
            disabled={loading}
            className="w-full bg-ando-red hover:bg-ando-red-hover text-white py-2.5 rounded-md font-medium disabled:opacity-60 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
