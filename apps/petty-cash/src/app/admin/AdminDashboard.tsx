'use client';
import { useEffect, useState } from 'react';
import { formatKsh } from '@/lib/money';

type Role = 'BRANCH_USER' | 'FINANCE' | 'ADMIN';

type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  branch: { id: string; name: string } | null;
};

type Branch = {
  id: string;
  name: string;
  floatLimit: number;
  currentBalance: number;
  thresholdPct: number;
  _count?: { users: number };
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<'users' | 'branches'>('users');
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Admin</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage branches and users. Finance users receive threshold and reimbursement emails.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <TabBtn active={tab === 'users'} onClick={() => setTab('users')}>
          Users
        </TabBtn>
        <TabBtn active={tab === 'branches'} onClick={() => setTab('branches')}>
          Branches
        </TabBtn>
      </div>
      {tab === 'users' ? <UsersTab /> : <BranchesTab />}
    </div>
  );
}

function TabBtn({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-sm rounded-md font-medium transition-colors ${
        active
          ? 'bg-slate-900 text-white'
          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------- Branches ------------------- */

function BranchesTab() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [name, setName] = useState('');
  const [floatLimit, setFloatLimit] = useState('5000');
  const [thresholdPct, setThresholdPct] = useState('80');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch('/api/admin/branches');
    const data = await res.json();
    setBranches(data.branches || []);
  }
  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const res = await fetch('/api/admin/branches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        floatLimit: Number(floatLimit),
        thresholdPct: Number(thresholdPct),
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return setError(j.error || 'Failed');
    }
    setName('');
    setFloatLimit('5000');
    setThresholdPct('80');
    load();
  }

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900">Add branch</h3>
        <form onSubmit={add} className="mt-4 grid grid-cols-4 gap-3 items-end">
          <label className="col-span-2 block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Float limit (Ksh)</span>
            <input
              type="number"
              min="1"
              value={floatLimit}
              onChange={(e) => setFloatLimit(e.target.value)}
              className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Threshold (%)</span>
            <input
              type="number"
              min="1"
              max="100"
              value={thresholdPct}
              onChange={(e) => setThresholdPct(e.target.value)}
              className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2"
            />
          </label>
          {error && <p className="col-span-4 text-sm text-ando-red">{error}</p>}
          <div className="col-span-4">
            <button
              disabled={busy}
              className="bg-ando-red hover:bg-ando-red-hover text-white px-4 py-2 rounded-md font-medium disabled:opacity-60"
            >
              {busy ? 'Adding...' : 'Add branch'}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900">Branches</h3>
        {branches.length === 0 ? (
          <p className="text-sm text-slate-500 mt-3">No branches yet.</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium text-right">Float</th>
                  <th className="px-4 py-2 font-medium text-right">Balance</th>
                  <th className="px-4 py-2 font-medium text-right">Threshold</th>
                  <th className="px-4 py-2 font-medium text-right">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-2.5 font-medium">{b.name}</td>
                    <td className="px-4 py-2.5 text-right">{formatKsh(b.floatLimit)}</td>
                    <td className="px-4 py-2.5 text-right">{formatKsh(b.currentBalance)}</td>
                    <td className="px-4 py-2.5 text-right">{b.thresholdPct}%</td>
                    <td className="px-4 py-2.5 text-right">{b._count?.users ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------- Users ------------------- */

const CSV_TEMPLATE = `email,name,role,branch,password
jane@ando.africa,Jane Doe,FINANCE,,ChangeMe123
john@ando.africa,John Branch,BRANCH_USER,Nairobi CBD,ChangeMe123`;

function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filter, setFilter] = useState<'ALL' | Role>('ALL');

  async function load() {
    const [u, b] = await Promise.all([
      fetch('/api/admin/users').then((r) => r.json()),
      fetch('/api/admin/branches').then((r) => r.json()),
    ]);
    setUsers(u.users || []);
    setBranches(b.branches || []);
  }
  useEffect(() => {
    load();
  }, []);

  const visible = filter === 'ALL' ? users : users.filter((u) => u.role === filter);
  const counts = {
    ALL: users.length,
    ADMIN: users.filter((u) => u.role === 'ADMIN').length,
    FINANCE: users.filter((u) => u.role === 'FINANCE').length,
    BRANCH_USER: users.filter((u) => u.role === 'BRANCH_USER').length,
  };

  return (
    <div className="space-y-5">
      <AddUserForm branches={branches} onCreated={load} />
      <BulkUploadForm onDone={load} />

      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-semibold text-slate-900">Users</h3>
          <div className="flex gap-1 text-xs">
            {(['ALL', 'ADMIN', 'FINANCE', 'BRANCH_USER'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-2.5 py-1 rounded-md ${filter === r ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {r === 'ALL'
                  ? 'All'
                  : r === 'BRANCH_USER'
                    ? 'Branch'
                    : r === 'FINANCE'
                      ? 'Finance'
                      : 'Admin'}{' '}
                · {counts[r]}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="text-sm text-slate-500 mt-3">No users.</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Role</th>
                  <th className="px-4 py-2 font-medium">Branch</th>
                  <th className="px-4 py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((u) => (
                  <UserRow key={u.id} u={u} onDeleted={load} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function UserRow({ u, onDeleted }: { u: User; onDeleted: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function del() {
    if (!confirm(`Delete ${u.email}?`)) return;
    setBusy(true);
    setError('');
    const res = await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return setError(j.error || 'Failed');
    }
    onDeleted();
  }
  return (
    <tr>
      <td className="px-4 py-2.5 font-medium">{u.name}</td>
      <td className="px-4 py-2.5 text-slate-600">{u.email}</td>
      <td className="px-4 py-2.5">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            u.role === 'ADMIN'
              ? 'bg-slate-900 text-white'
              : u.role === 'FINANCE'
                ? 'bg-ando-red/10 text-ando-red'
                : 'bg-slate-100 text-slate-700'
          }`}
        >
          {u.role === 'BRANCH_USER' ? 'Branch' : u.role === 'FINANCE' ? 'Finance' : 'Admin'}
        </span>
      </td>
      <td className="px-4 py-2.5 text-slate-600">{u.branch?.name ?? '—'}</td>
      <td className="px-4 py-2.5 text-right">
        <button
          disabled={busy}
          onClick={del}
          className="text-ando-red hover:underline text-sm disabled:opacity-50"
        >
          Delete
        </button>
        {error && <div className="text-xs text-ando-red mt-1">{error}</div>}
      </td>
    </tr>
  );
}

function AddUserForm({ branches, onCreated }: { branches: Branch[]; onCreated: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('BRANCH_USER');
  const [branchId, setBranchId] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setOk(false);
    setBusy(true);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        role,
        password,
        branchId: role === 'BRANCH_USER' ? branchId : null,
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return setError(j.error || 'Failed');
    }
    setOk(true);
    setEmail('');
    setName('');
    setPassword('');
    setBranchId('');
    onCreated();
  }

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900">Add user</h3>
      <form onSubmit={submit} className="mt-4 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 bg-white"
          >
            <option value="BRANCH_USER">Branch</option>
            <option value="FINANCE">Finance</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Branch{role === 'BRANCH_USER' ? '' : ' (n/a)'}
          </span>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            disabled={role !== 'BRANCH_USER'}
            className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 bg-white disabled:bg-slate-100 disabled:text-slate-400"
            required={role === 'BRANCH_USER'}
          >
            <option value="">Select branch...</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Initial password <span className="text-slate-400 font-normal">(min 8 chars)</span>
          </span>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 border border-slate-300 rounded-md px-3 py-2 font-mono"
            required
            minLength={8}
          />
        </label>
        {error && <p className="col-span-2 text-sm text-ando-red">{error}</p>}
        {ok && <p className="col-span-2 text-sm text-emerald-700">User created.</p>}
        <div className="col-span-2">
          <button
            disabled={busy}
            className="bg-ando-red hover:bg-ando-red-hover text-white px-4 py-2 rounded-md font-medium disabled:opacity-60"
          >
            {busy ? 'Adding...' : 'Add user'}
          </button>
        </div>
      </form>
    </section>
  );
}

function BulkUploadForm({ onDone }: { onDone: () => void }) {
  const [csv, setCsv] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    created: number;
    failed: { row: number; email: string; error?: string }[];
  } | null>(null);
  const [error, setError] = useState('');

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsv(await file.text());
  }

  async function submit() {
    if (!csv.trim()) return setError('Paste or upload a CSV first');
    setError('');
    setResult(null);
    setBusy(true);
    const res = await fetch('/api/admin/users/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csv }),
    });
    setBusy(false);
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Failed');
    setResult(data);
    onDone();
  }

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">Bulk upload (CSV)</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Header must be{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">
              email,name,role,branch,password
            </code>
            . Branches must already exist.
          </p>
        </div>
        <button
          onClick={() => setCsv(CSV_TEMPLATE)}
          className="text-sm text-ando-red hover:underline"
          type="button"
        >
          Insert example
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={onFile}
          className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
        />
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={6}
          placeholder="Paste CSV here or choose a file..."
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-mono"
        />

        {error && <p className="text-sm text-ando-red">{error}</p>}

        {result && (
          <div className="rounded-lg border border-slate-200 p-3 text-sm">
            <div className="font-medium text-emerald-700">{result.created} created</div>
            {result.failed.length > 0 && (
              <div className="mt-2">
                <div className="font-medium text-ando-red">{result.failed.length} failed</div>
                <ul className="mt-1 space-y-0.5 text-slate-700">
                  {result.failed.map((f, i) => (
                    <li key={i}>
                      Row {f.row} ({f.email || '—'}):{' '}
                      <span className="text-ando-red">{f.error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          disabled={busy || !csv.trim()}
          onClick={submit}
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md font-medium disabled:opacity-60"
        >
          {busy ? 'Uploading...' : 'Upload users'}
        </button>
      </div>
    </section>
  );
}
