import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

/**
 * Bulk create users from CSV text.
 *
 * Required header row:  email,name,role,branch,password
 *   - role:     BRANCH_USER | FINANCE | ADMIN (case-insensitive)
 *   - branch:   branch name (required for BRANCH_USER, empty otherwise)
 *   - password: plain text initial password (>= 8 chars)
 *
 * Returns per-row { ok | error } so the admin can fix and re-upload the failures.
 */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { csv } = await req.json();
  if (typeof csv !== 'string' || !csv.trim()) {
    return NextResponse.json({ error: 'csv text is required' }, { status: 400 });
  }

  const rows = parseCsv(csv);
  if (rows.length < 2)
    return NextResponse.json({ error: 'CSV must have a header + 1 row' }, { status: 400 });
  const [header, ...body] = rows;
  const expected = ['email', 'name', 'role', 'branch', 'password'];
  const normHeader = header.map((h) => h.trim().toLowerCase());
  if (expected.some((e, i) => normHeader[i] !== e)) {
    return NextResponse.json(
      { error: `Header must be exactly: ${expected.join(',')}` },
      { status: 400 },
    );
  }

  const branches = await prisma.branch.findMany();
  const branchByName = new Map(branches.map((b) => [b.name.toLowerCase(), b]));

  const results: { row: number; email: string; ok: boolean; error?: string }[] = [];

  for (let i = 0; i < body.length; i++) {
    const line = body[i];
    const rowNumber = i + 2; // 1-indexed + header
    const [emailRaw, nameRaw, roleRaw, branchRaw, passwordRaw] = line;
    const email = (emailRaw || '').trim().toLowerCase();
    const name = (nameRaw || '').trim();
    const role = (roleRaw || '').trim().toUpperCase();
    const branchName = (branchRaw || '').trim();
    const password = (passwordRaw || '').trim();

    const push = (error?: string) => results.push({ row: rowNumber, email, ok: !error, error });

    if (!email || !name || !role || !password) {
      push('Missing required field');
      continue;
    }
    if (!['BRANCH_USER', 'FINANCE', 'ADMIN'].includes(role)) {
      push(`Invalid role "${role}"`);
      continue;
    }
    if (password.length < 8) {
      push('Password must be at least 8 characters');
      continue;
    }

    let branchId: string | null = null;
    if (role === 'BRANCH_USER') {
      if (!branchName) {
        push('Branch users must have a branch');
        continue;
      }
      const branch = branchByName.get(branchName.toLowerCase());
      if (!branch) {
        push(`Unknown branch "${branchName}"`);
        continue;
      }
      branchId = branch.id;
    }

    try {
      await prisma.user.create({
        data: {
          email,
          name,
          role: role as any,
          password: await bcrypt.hash(password, 10),
          branchId,
        },
      });
      push();
    } catch (err: any) {
      if (err?.code === 'P2002') push('Email already exists');
      else push(err?.message || 'Failed');
    }
  }

  const created = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);
  return NextResponse.json({ created, failed });
}

// Minimal CSV parser: handles quoted fields and embedded commas/quotes.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field);
        field = '';
        if (row.some((f) => f.length > 0)) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
