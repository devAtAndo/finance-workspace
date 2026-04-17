import type { ReactNode } from 'react';

export interface AppShellProps {
  appName: string;
  userEmail: string;
  children: ReactNode;
  homeHref?: string;
}

export function AppShell({ appName, userEmail, children, homeHref = 'https://workspace.andofoods.co' }: AppShellProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderBottom: '1px solid #e5e7eb',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <a href={homeHref} style={{ textDecoration: 'none', color: '#111', fontWeight: 600 }}>
          Ando Finance · {appName}
        </a>
        <span style={{ fontSize: 14, color: '#555' }}>{userEmail}</span>
      </header>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
