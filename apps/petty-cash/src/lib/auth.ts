import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { SignJWT, jwtVerify } from 'jose';

// Neon's serverless driver uses HTTP, which works on Cloudflare Workers out
// of the box. Raw pg + TCP does not. One direct query here avoids pulling
// Prisma into the auth path (Prisma's library engine does a startup
// fs.readdir that Workers' unenv shim rejects).
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is required');
  return neon(url);
}

interface AuthUserRow {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'ADMIN' | 'FINANCE' | 'BRANCH_USER';
  branchId: string | null;
}

async function findUserByEmail(email: string): Promise<AuthUserRow | null> {
  const sql = getSql();
  const rows = (await sql`
    select id, email, name, password, role, "branchId"
    from "User"
    where email = ${email}
    limit 1
  `) as AuthUserRow[];
  return rows[0] ?? null;
}

// NextAuth's default JWT encoder uses node:crypto's createCipheriv (JWE
// encryption), which Cloudflare Workers' unenv shim doesn't implement.
// Swap to HS256 signing via `jose` (uses Web Crypto, Workers-native). Session
// tokens are signed, not encrypted — fine for an internal tool.
const getSecretKey = () => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('NEXTAUTH_SECRET is required');
  return new TextEncoder().encode(secret);
};

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  jwt: {
    async encode({ token }) {
      return await new SignJWT((token ?? {}) as Record<string, unknown>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getSecretKey());
    },
    async decode({ token }) {
      if (!token) return null;
      try {
        const { payload } = await jwtVerify(token, getSecretKey());
        return payload as Record<string, unknown>;
      } catch {
        return null;
      }
    },
  },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'Email + Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email.toLowerCase());
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          branchId: user.branchId,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.branchId = (user as any).branchId;
        token.uid = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.uid;
        (session.user as any).role = token.role;
        (session.user as any).branchId = token.branchId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
