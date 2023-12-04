import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import {
  CommunitiesNavbar,
  Footer,
  Header,
  MainNavbar,
} from '@/components/server';
import { AuthProvider } from '@/providers';
import { mainNavbarLinks } from '@/constants';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Posts | Share your Posts easy!',
  description: 'The most popular social network app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <div className="max-w-7xl mx-auto flex justify-between">
            <MainNavbar links={mainNavbarLinks} />
            <div className="min-h-screen w-full flex-1 bg-neutral-800">
              {children}
            </div>
            <CommunitiesNavbar />
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
