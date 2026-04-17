import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAuthMode } from '@/lib/authDispatcher';

const handler = NextAuth(authOptions);

function gone(): Response {
  return new Response(
    'NextAuth is disabled — Ando Finance uses Cloudflare Access SSO. Visit https://workspace.andofoods.co to sign in.',
    { status: 410, headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
}

export async function GET(req: Request): Promise<Response> {
  if (getAuthMode() === 'cfaccess') return gone();
  return handler(req);
}

export async function POST(req: Request): Promise<Response> {
  if (getAuthMode() === 'cfaccess') return gone();
  return handler(req);
}
