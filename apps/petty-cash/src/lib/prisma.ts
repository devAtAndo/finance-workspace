// Neon-backed facade mimicking the subset of the Prisma Client API that this
// app actually uses. Bypasses Prisma entirely because Prisma's library-engine
// startup does an fs.readdir which Cloudflare Workers' unenv shim rejects.
//
// This file is intentionally hand-written and narrow — add methods as new
// call sites appear. All queries go through @neondatabase/serverless (HTTP,
// Workers-native).

import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

type Role = 'ADMIN' | 'FINANCE' | 'BRANCH_USER';
type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

let _sql: NeonQueryFunction<false, false> | null = null;
function sql(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is required');
  _sql = neon(url);
  return _sql;
}

interface BranchRow {
  id: string;
  name: string;
  floatLimit: number;
  currentBalance: number;
  thresholdPct: number;
  notifiedAtBalance: number | null;
}

interface UserRow {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  branchId: string | null;
  createdAt: Date;
}

interface ExpenseRow {
  id: string;
  branchId: string;
  userId: string;
  amount: number;
  description: string;
  receiptUrl: string | null;
  ocrAmount: number | null;
  ocrText: string | null;
  requestId: string | null;
  createdAt: Date;
}

interface RequestRow {
  id: string;
  branchId: string;
  submittedById: string;
  totalAmount: number;
  status: RequestStatus;
  notes: string | null;
  reviewedById: string | null;
  submittedAt: Date;
  reviewedAt: Date | null;
}

function cuid(): string {
  // Collision-safe-enough id for a 20-user internal app. Not a true cuid but
  // the schema just needs a unique string default.
  return (
    'c' +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 6)
  );
}

async function one<T>(rows: unknown[]): Promise<T | null> {
  return (rows[0] as T) ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma: any = {
  // ───────── branch ─────────
  branch: {
    async findUnique(args: { where: { id?: string; name?: string } }): Promise<BranchRow | null> {
      const s = sql();
      if (args.where.id) {
        const rows = await s`select * from "Branch" where id = ${args.where.id} limit 1`;
        return one<BranchRow>(rows as unknown[]);
      }
      const rows = await s`select * from "Branch" where name = ${args.where.name!} limit 1`;
      return one<BranchRow>(rows as unknown[]);
    },

    async findMany(
      _args: { orderBy?: { name?: 'asc' | 'desc' }; include?: unknown } = {},
    ): Promise<Array<BranchRow & { _count: { users: number } }>> {
      const s = sql();
      const rows = (await s`
        select b.*, (select count(*)::int from "User" u where u."branchId" = b.id) as "_userCount"
        from "Branch" b
        order by b.name asc
      `) as Array<BranchRow & { _userCount: number }>;
      return rows.map((r) => ({
        ...r,
        _count: { users: r._userCount },
      }));
    },

    async create(args: {
      data: { name: string; floatLimit: number; currentBalance?: number; thresholdPct: number };
    }): Promise<BranchRow> {
      const s = sql();
      const id = cuid();
      const bal = args.data.currentBalance ?? args.data.floatLimit;
      const rows = (await s`
        insert into "Branch" (id, name, "floatLimit", "currentBalance", "thresholdPct")
        values (${id}, ${args.data.name}, ${args.data.floatLimit}, ${bal}, ${args.data.thresholdPct})
        returning *
      `) as BranchRow[];
      return rows[0];
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async update(args: { where: { id: string }; data: any }): Promise<BranchRow> {
      const s = sql();
      // Only handling the shapes we actually use.
      const cb = args.data.currentBalance;
      if (typeof cb === 'object' && cb?.decrement !== undefined) {
        const rows = (await s`
          update "Branch"
          set "currentBalance" = "currentBalance" - ${cb.decrement}
          where id = ${args.where.id}
          returning *
        `) as BranchRow[];
        return rows[0];
      }
      if (typeof cb === 'number') {
        const nb = args.data.notifiedAtBalance ?? null;
        const rows = (await s`
          update "Branch"
          set "currentBalance" = ${cb}, "notifiedAtBalance" = ${nb}
          where id = ${args.where.id}
          returning *
        `) as BranchRow[];
        return rows[0];
      }
      if (args.data.notifiedAtBalance !== undefined) {
        const rows = (await s`
          update "Branch"
          set "notifiedAtBalance" = ${args.data.notifiedAtBalance}
          where id = ${args.where.id}
          returning *
        `) as BranchRow[];
        return rows[0];
      }
      throw new Error('prisma facade: unsupported branch.update shape');
    },
  },

  // ───────── user ─────────
  user: {
    async findUnique(args: { where: { id?: string; email?: string } }): Promise<UserRow | null> {
      const s = sql();
      if (args.where.id) {
        const rows = await s`select * from "User" where id = ${args.where.id} limit 1`;
        return one<UserRow>(rows as unknown[]);
      }
      const rows = await s`select * from "User" where email = ${args.where.email!} limit 1`;
      return one<UserRow>(rows as unknown[]);
    },

    async findMany(
      _args: { include?: unknown; orderBy?: unknown } = {},
    ): Promise<Array<UserRow & { branch: BranchRow | null }>> {
      const s = sql();
      const rows = (await s`
        select u.*,
          b.id as "b_id", b.name as "b_name", b."floatLimit" as "b_floatLimit",
          b."currentBalance" as "b_currentBalance", b."thresholdPct" as "b_thresholdPct",
          b."notifiedAtBalance" as "b_notifiedAtBalance"
        from "User" u
        left join "Branch" b on b.id = u."branchId"
        order by u."createdAt" asc
      `) as Array<UserRow & Record<string, unknown>>;
      return rows.map((r) => {
        const branch: BranchRow | null = r.b_id
          ? {
              id: r.b_id as string,
              name: r.b_name as string,
              floatLimit: r.b_floatLimit as number,
              currentBalance: r.b_currentBalance as number,
              thresholdPct: r.b_thresholdPct as number,
              notifiedAtBalance: r.b_notifiedAtBalance as number | null,
            }
          : null;
        const {
          b_id,
          b_name,
          b_floatLimit,
          b_currentBalance,
          b_thresholdPct,
          b_notifiedAtBalance,
          ...rest
        } = r;
        void b_id;
        void b_name;
        void b_floatLimit;
        void b_currentBalance;
        void b_thresholdPct;
        void b_notifiedAtBalance;
        return { ...(rest as UserRow), branch };
      });
    },

    async create(args: {
      data: { email: string; name: string; password: string; role: Role; branchId?: string | null };
    }): Promise<UserRow> {
      const s = sql();
      const id = cuid();
      const rows = (await s`
        insert into "User" (id, email, name, password, role, "branchId")
        values (${id}, ${args.data.email}, ${args.data.name}, ${args.data.password}, ${args.data.role}, ${args.data.branchId ?? null})
        returning *
      `) as UserRow[];
      return rows[0];
    },

    async delete(args: { where: { id: string } }): Promise<UserRow> {
      const s = sql();
      const rows =
        (await s`delete from "User" where id = ${args.where.id} returning *`) as UserRow[];
      return rows[0];
    },

    async count(args: { where?: { role?: Role } } = {}): Promise<number> {
      const s = sql();
      if (args.where?.role) {
        const rows = await s`select count(*)::int as c from "User" where role = ${args.where.role}`;
        return (rows[0] as { c: number }).c;
      }
      const rows = await s`select count(*)::int as c from "User"`;
      return (rows[0] as { c: number }).c;
    },
  },

  // ───────── expense ─────────
  expense: {
    async findMany(args: {
      where: { branchId?: string; requestId?: string | null };
      orderBy?: unknown;
    }): Promise<ExpenseRow[]> {
      const s = sql();
      if (args.where.requestId === null) {
        return (await s`
          select * from "Expense" where "branchId" = ${args.where.branchId!} and "requestId" is null
          order by "createdAt" desc
        `) as ExpenseRow[];
      }
      if (args.where.branchId) {
        return (await s`
          select * from "Expense" where "branchId" = ${args.where.branchId}
          order by "createdAt" desc
        `) as ExpenseRow[];
      }
      return (await s`select * from "Expense" order by "createdAt" desc`) as ExpenseRow[];
    },

    async create(args: {
      data: {
        branchId: string;
        userId: string;
        amount: number;
        description: string;
        receiptUrl: string | null;
        ocrAmount: number | null;
        ocrText: string | null;
      };
    }): Promise<ExpenseRow> {
      const s = sql();
      const id = cuid();
      const rows = (await s`
        insert into "Expense" (id, "branchId", "userId", amount, description, "receiptUrl", "ocrAmount", "ocrText")
        values (${id}, ${args.data.branchId}, ${args.data.userId}, ${args.data.amount}, ${args.data.description}, ${args.data.receiptUrl}, ${args.data.ocrAmount}, ${args.data.ocrText})
        returning *
      `) as ExpenseRow[];
      return rows[0];
    },

    async count(args: { where: { userId?: string; branchId?: string } }): Promise<number> {
      const s = sql();
      if (args.where.userId) {
        const rows =
          await s`select count(*)::int as c from "Expense" where "userId" = ${args.where.userId}`;
        return (rows[0] as { c: number }).c;
      }
      const rows =
        await s`select count(*)::int as c from "Expense" where "branchId" = ${args.where.branchId!}`;
      return (rows[0] as { c: number }).c;
    },

    async updateMany(args: {
      where: { id?: { in: string[] }; requestId?: string };
      data: { requestId?: string | null };
    }): Promise<{ count: number }> {
      const s = sql();
      if (args.where.id?.in) {
        const ids = args.where.id.in;
        const rows = await s`
          update "Expense" set "requestId" = ${args.data.requestId ?? null}
          where id = any(${ids})
        `;
        return { count: (rows as unknown[]).length };
      }
      if (args.where.requestId) {
        await s`
          update "Expense" set "requestId" = ${args.data.requestId ?? null}
          where "requestId" = ${args.where.requestId}
        `;
        return { count: 0 };
      }
      throw new Error('prisma facade: unsupported expense.updateMany shape');
    },
  },

  // ───────── reimbursementRequest ─────────
  reimbursementRequest: {
    async findMany(_args: { where?: unknown; orderBy?: unknown; include?: unknown } = {}): Promise<
      Array<
        RequestRow & {
          branch: BranchRow;
          submittedBy: { name: string; email: string };
          expenses: ExpenseRow[];
        }
      >
    > {
      const s = sql();
      const rows = (await s`
        select r.*,
          row_to_json(b.*) as branch,
          json_build_object('name', u.name, 'email', u.email) as "submittedBy",
          coalesce((select json_agg(e.*) from "Expense" e where e."requestId" = r.id), '[]'::json) as expenses
        from "ReimbursementRequest" r
        join "Branch" b on b.id = r."branchId"
        join "User" u on u.id = r."submittedById"
        order by r."submittedAt" desc
      `) as unknown[];
      return rows as Array<
        RequestRow & {
          branch: BranchRow;
          submittedBy: { name: string; email: string };
          expenses: ExpenseRow[];
        }
      >;
    },

    async findFirst(args: {
      where: { branchId: string; status: RequestStatus };
      orderBy?: unknown;
      include?: unknown;
    }): Promise<(RequestRow & { expenses: ExpenseRow[] }) | null> {
      const s = sql();
      const rows = (await s`
        select r.*,
          coalesce((select json_agg(e.*) from "Expense" e where e."requestId" = r.id), '[]'::json) as expenses
        from "ReimbursementRequest" r
        where r."branchId" = ${args.where.branchId} and r.status = ${args.where.status}
        order by r."submittedAt" desc limit 1
      `) as unknown[];
      return (rows[0] as (RequestRow & { expenses: ExpenseRow[] }) | undefined) ?? null;
    },

    async findUnique(args: { where: { id: string }; include?: unknown }): Promise<
      | (RequestRow & {
          branch: BranchRow;
          submittedBy: UserRow;
          expenses: ExpenseRow[];
        })
      | null
    > {
      const s = sql();
      const rows = (await s`
        select r.*,
          row_to_json(b.*) as branch,
          row_to_json(u.*) as "submittedBy",
          coalesce((select json_agg(e.*) from "Expense" e where e."requestId" = r.id), '[]'::json) as expenses
        from "ReimbursementRequest" r
        join "Branch" b on b.id = r."branchId"
        join "User" u on u.id = r."submittedById"
        where r.id = ${args.where.id} limit 1
      `) as unknown[];
      return (rows[0] as never) ?? null;
    },

    async count(args: {
      where: { submittedById?: string; reviewedById?: string };
    }): Promise<number> {
      const s = sql();
      if (args.where.submittedById) {
        const rows =
          await s`select count(*)::int as c from "ReimbursementRequest" where "submittedById" = ${args.where.submittedById}`;
        return (rows[0] as { c: number }).c;
      }
      if (args.where.reviewedById) {
        const rows =
          await s`select count(*)::int as c from "ReimbursementRequest" where "reviewedById" = ${args.where.reviewedById}`;
        return (rows[0] as { c: number }).c;
      }
      const rows = await s`select count(*)::int as c from "ReimbursementRequest"`;
      return (rows[0] as { c: number }).c;
    },

    async create(args: {
      data: { branchId: string; submittedById: string; totalAmount: number };
    }): Promise<RequestRow> {
      const s = sql();
      const id = cuid();
      const rows = (await s`
        insert into "ReimbursementRequest" (id, "branchId", "submittedById", "totalAmount", status)
        values (${id}, ${args.data.branchId}, ${args.data.submittedById}, ${args.data.totalAmount}, 'PENDING')
        returning *
      `) as RequestRow[];
      return rows[0];
    },

    async update(args: {
      where: { id: string };
      data: {
        status?: RequestStatus;
        notes?: string | null;
        reviewedAt?: Date;
        reviewedById?: string;
      };
    }): Promise<RequestRow> {
      const s = sql();
      const rows = (await s`
        update "ReimbursementRequest"
        set status = coalesce(${args.data.status ?? null}, status),
            notes = coalesce(${args.data.notes ?? null}, notes),
            "reviewedAt" = coalesce(${args.data.reviewedAt ?? null}, "reviewedAt"),
            "reviewedById" = coalesce(${args.data.reviewedById ?? null}, "reviewedById")
        where id = ${args.where.id}
        returning *
      `) as RequestRow[];
      return rows[0];
    },
  },

  // ───────── transaction (simplified — executes sequentially, not atomic) ─────────
  //
  // Neon's serverless HTTP driver supports transactions via `sql.transaction`
  // but the callback pattern expected by our existing code is complex. For the
  // 20-user internal demo, sequential-but-not-atomic is acceptable. If we need
  // true atomicity, swap to `sql.transaction([...])` with built statements.
  async $transaction<T>(
    arg: ((tx: typeof prisma) => Promise<T>) | Promise<unknown>[],
  ): Promise<T | unknown[]> {
    if (typeof arg === 'function') return arg(prisma);
    return Promise.all(arg);
  },
};
