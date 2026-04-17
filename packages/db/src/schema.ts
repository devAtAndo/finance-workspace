import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';
import type { AppSlug, Role } from '@ando/auth';

export interface IamUsersTable {
  id: Generated<string>;
  email: string;
  created_at: ColumnType<Date, Date | string | undefined, never>;
  disabled_at: ColumnType<Date | null, Date | string | null | undefined, Date | string | null>;
}

export interface IamAppAccessTable {
  user_id: string;
  app_slug: AppSlug;
  role: Role;
  granted_by: string | null;
  granted_at: ColumnType<Date, Date | string | undefined, never>;
}

export interface IamAuditLogTable {
  id: Generated<number>;
  actor_id: string | null;
  action: string;
  target: unknown;
  at: ColumnType<Date, Date | string | undefined, never>;
}

export interface Database {
  'iam.users': IamUsersTable;
  'iam.app_access': IamAppAccessTable;
  'iam.audit_log': IamAuditLogTable;
}

export type IamUserRow = Selectable<IamUsersTable>;
export type IamUserInsert = Insertable<IamUsersTable>;
export type IamUserUpdate = Updateable<IamUsersTable>;

export type IamAppAccessRow = Selectable<IamAppAccessTable>;
