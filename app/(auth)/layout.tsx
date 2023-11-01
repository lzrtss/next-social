import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/providers';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Posts | Sign in',
  description: 'Sign in to your account or create one',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex justify-center items-center`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
