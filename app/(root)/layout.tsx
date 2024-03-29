import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import {
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
      <body className={`${inter.className} bg-neutral-750`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 w-full flex justify-between items-stretch max-w-7xl mx-auto">
              <MainNavbar links={mainNavbarLinks} />
              <div className="flex-1 overflow-y-auto p-4 rounded-lg max-md:mb-20 bg-neutral-800">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
