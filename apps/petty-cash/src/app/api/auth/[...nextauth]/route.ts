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

// NextAuth's handler needs both (req, ctx) — the ctx carries the `[...nextauth]`
// catchall param. Forwarding both is required; otherwise NextAuth throws
// `Cannot destructure property 'nextauth' of 'e2.query' as it is undefined`.
type RouteContext = { params: { nextauth: string[] } };

export async function GET(req: Request, ctx: RouteContext): Promise<Response> {
  if (getAuthMode() === 'cfaccess') return gone();
  return (handler as unknown as (r: Request, c: RouteContext) => Promise<Response>)(req, ctx);
}

export async function POST(req: Request, ctx: RouteContext): Promise<Response> {
  if (getAuthMode() === 'cfaccess') return gone();
  return (handler as unknown as (r: Request, c: RouteContext) => Promise<Response>)(req, ctx);
}
