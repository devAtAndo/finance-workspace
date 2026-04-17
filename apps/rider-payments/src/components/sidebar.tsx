'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileSpreadsheet, PlusCircle, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_VERSION } from '@/lib/version';

const NAV = [
  { href: '/', label: 'Payment runs', Icon: FileSpreadsheet },
  { href: '/new', label: 'New run', Icon: PlusCircle },
  { href: '/reconciliation', label: 'Reconciliation', Icon: Scale },
];

export function Sidebar({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-muted/40 flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <Link href="/" className="block">
          <Image
            src="/ando-logo-red.png"
            alt="Ando"
            width={120}
            height={37}
            priority
            className="h-8 w-auto"
          />
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
            Rider Payments
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1">
        {NAV.map(({ href, label, Icon }) => {
          const active =
            href === '/'
              ? pathname === '/' || pathname.startsWith('/runs')
              : pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        {userEmail ? <div className="truncate mb-1">{userEmail}</div> : null}
        <div className="flex items-center justify-between text-[10px] tabular-nums">
          <span className="uppercase tracking-wider">Rider Payments</span>
          <span>v{APP_VERSION}</span>
        </div>
      </div>
    </aside>
  );
}
