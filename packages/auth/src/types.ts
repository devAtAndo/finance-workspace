export type AppSlug = 'workspace' | 'petty-cash' | 'rider-payments';

export type Role = 'ADMIN' | 'FINANCE' | 'BRANCH_USER' | 'VIEWER';

export interface CfAccessClaims {
  email: string;
  sub: string;
  aud: string | string[];
  iss: string;
  exp: number;
  iat: number;
  nbf?: number;
}

export interface IamUser {
  id: string;
  email: string;
  disabledAt: Date | null;
}

export interface IamPort {
  upsertUserByEmail(email: string): Promise<IamUser>;
  getAppAccess(userId: string, appSlug: AppSlug): Promise<{ role: Role } | null>;
}

export interface Principal {
  userId: string;
  email: string;
  appSlug: AppSlug;
  role: Role;
}
