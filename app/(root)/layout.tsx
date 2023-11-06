import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/providers';
import {
  Container,
  Footer,
  Header,
  LeftSidebar,
  RightSidebar,
} from '@/components';
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
          <Container className="min-h-screen flex justify-between pt-28 pb-10 max-md:pb-32">
            <LeftSidebar />
            <main className="flex flex-1 w-full max-w-4xl bg-neutral-800">
              {children}
            </main>
            <RightSidebar />
          </Container>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
