import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/providers';
import {
  Container,
  Footer,
  Header,
  MainNavbar,
  RightSidebar,
} from '@/components';
import { sidebarLinks } from '@/constants';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thoughts | Share your thoughts easy!',
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
            <MainNavbar links={sidebarLinks} />
            <div className="min-h-screen w-full flex-1 bg-neutral-800">
              {children}
            </div>
            <RightSidebar />
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
