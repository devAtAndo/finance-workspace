export { getDb, closeDb, _resetDbForTests, type GetDbOpts, type HyperdriveLike } from './client.js';
export { iam, type IamRepo } from './iam.js';
export type {
  Database,
  IamAppAccessRow,
  IamAppAccessTable,
  IamAuditLogTable,
  IamUserInsert,
  IamUserRow,
  IamUserUpdate,
  IamUsersTable,
} from './schema.js';
