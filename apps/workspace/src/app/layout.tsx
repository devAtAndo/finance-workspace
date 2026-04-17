import type { ReactNode } from 'react';

export const metadata = {
  title: 'Ando Finance Workspace',
  description: 'Launcher and admin for Ando Finance apps.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', color: '#111' }}>
        {children}
      </body>
    </html>
  );
}
