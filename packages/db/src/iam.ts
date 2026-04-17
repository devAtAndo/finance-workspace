import type { AppSlug, IamPort, IamUser, Role } from '@ando/auth';
import { getDb } from './client.js';

function toIamUser(row: {
  id: string;
  email: string;
  disabled_at: Date | null;
}): IamUser {
  return { id: row.id, email: row.email, disabledAt: row.disabled_at };
}

export interface IamRepo extends IamPort {
  grantAccess(args: {
    userId: string;
    appSlug: AppSlug;
    role: Role;
    grantedBy: string | null;
  }): Promise<void>;
  revokeAccess(args: { userId: string; appSlug: AppSlug }): Promise<void>;
  disableUser(userId: string): Promise<void>;
  listAppAccess(userId: string): Promise<Array<{ appSlug: AppSlug; role: Role }>>;
  appendAuditLog(args: {
    actorId: string | null;
    action: string;
    target: unknown;
  }): Promise<void>;
}

export const iam: IamRepo = {
  async upsertUserByEmail(email: string): Promise<IamUser> {
    const db = getDb();
    const row = await db
      .insertInto('iam.users')
      .values({ email })
      .onConflict((oc) => oc.column('email').doUpdateSet({ email: (eb) => eb.ref('excluded.email') }))
      .returning(['id', 'email', 'disabled_at'])
      .executeTakeFirstOrThrow();
    return toIamUser(row);
  },

  async getAppAccess(userId: string, appSlug: AppSlug) {
    const db = getDb();
    const row = await db
      .selectFrom('iam.app_access')
      .where('user_id', '=', userId)
      .where('app_slug', '=', appSlug)
      .select(['role'])
      .executeTakeFirst();
    return row ? { role: row.role } : null;
  },

  async grantAccess({ userId, appSlug, role, grantedBy }) {
    const db = getDb();
    await db.transaction().execute(async (trx) => {
      await trx
        .insertInto('iam.app_access')
        .values({ user_id: userId, app_slug: appSlug, role, granted_by: grantedBy })
        .onConflict((oc) =>
          oc.columns(['user_id', 'app_slug']).doUpdateSet({ role, granted_by: grantedBy }),
        )
        .execute();
      await trx
        .insertInto('iam.audit_log')
        .values({
          actor_id: grantedBy,
          action: 'app_access.grant',
          target: { userId, appSlug, role },
        })
        .execute();
    });
  },

  async revokeAccess({ userId, appSlug }) {
    const db = getDb();
    await db.transaction().execute(async (trx) => {
      await trx
        .deleteFrom('iam.app_access')
        .where('user_id', '=', userId)
        .where('app_slug', '=', appSlug)
        .execute();
      await trx
        .insertInto('iam.audit_log')
        .values({ actor_id: null, action: 'app_access.revoke', target: { userId, appSlug } })
        .execute();
    });
  },

  async disableUser(userId: string) {
    const db = getDb();
    await db.transaction().execute(async (trx) => {
      await trx
        .updateTable('iam.users')
        .set({ disabled_at: new Date() })
        .where('id', '=', userId)
        .execute();
      await trx
        .insertInto('iam.audit_log')
        .values({ actor_id: null, action: 'user.disable', target: { userId } })
        .execute();
    });
  },

  async listAppAccess(userId: string) {
    const db = getDb();
    const rows = await db
      .selectFrom('iam.app_access')
      .where('user_id', '=', userId)
      .select(['app_slug', 'role'])
      .execute();
    return rows.map((r) => ({ appSlug: r.app_slug, role: r.role }));
  },

  async appendAuditLog({ actorId, action, target }) {
    const db = getDb();
    await db
      .insertInto('iam.audit_log')
      .values({ actor_id: actorId, action, target })
      .execute();
  },
};
