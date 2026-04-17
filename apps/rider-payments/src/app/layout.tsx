import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

// Satoshi (sans) is self-hosted from /public/fonts and declared in globals.css.
// Geist_Mono for tabular numbers in tables.
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ando Rider Payments',
  description: 'Automate rider payment processing for Ando',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
