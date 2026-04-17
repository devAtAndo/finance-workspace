import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: 'BRANCH_USER' | 'FINANCE' | 'ADMIN';
      branchId: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid?: string;
    role?: 'BRANCH_USER' | 'FINANCE' | 'ADMIN';
    branchId?: string | null;
  }
}
