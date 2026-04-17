'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'sent' }
  | { status: 'error'; message: string };

// Only Ando Foods team members should sign in. Defense in depth:
//   1. This form — UX rejection before hitting Supabase.
//   2. Supabase dashboard → Auth → "Allowed email domains".
//   3. RLS on rider_payments tables.
const ALLOWED_EMAIL_DOMAINS = ['andofoods.co'];

function isAllowedEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@')[1];
  return Boolean(domain) && ALLOWED_EMAIL_DOMAINS.includes(domain);
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>({ status: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    if (!isAllowedEmail(email)) {
      setState({
        status: 'error',
        message: `Sign-in is limited to ${ALLOWED_EMAIL_DOMAINS.map((d) => `@${d}`).join(', ')} emails.`,
      });
      return;
    }
    setState({ status: 'sending' });
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setState({ status: 'sent' });
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="rounded-md border border-border bg-muted/40 p-4 text-sm">
        Check <strong>{email}</strong> for a sign-in link.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm font-medium">
        Email
        <input
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@andofoods.co"
          className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </label>
      <button
        type="submit"
        disabled={state.status === 'sending'}
        className="w-full rounded-md bg-primary text-primary-foreground text-sm font-medium py-2 hover:opacity-90 disabled:opacity-50"
      >
        {state.status === 'sending' ? 'Sending…' : 'Send magic link'}
      </button>
      {state.status === 'error' && <div className="text-sm text-danger">{state.message}</div>}
    </form>
  );
}
