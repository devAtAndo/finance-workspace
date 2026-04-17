import './globals.css';
import type { Metadata } from 'next';
import SessionProviderWrapper from '@/components/SessionProvider';

export const metadata: Metadata = {
  title: 'Petty Cash',
  description: 'Branch petty cash management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
