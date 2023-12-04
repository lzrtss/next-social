import Link from 'next/link';

import { Container } from '@/components/server';

export default function Footer() {
  return (
    <footer className="hidden md:block w-full border-t border-t-neutral-700 bg-neutral-800 z-20">
      <Container className="max-w-7xl flex justify-center items-center gap-1">
        <p className="text-sm text-neutral-400">
          Copyright &copy; {new Date().getFullYear()}{' '}
          <Link
            href="/"
            className="hover:text-amber-600 hover:underline underline-offset-2"
          >
            Posts
          </Link>
          . All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
