import Link from 'next/link';
import {
  OrganizationSwitcher,
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

import { Container, Logo } from '@/components/server';
import { SignOutBtn } from '@/components/client';

export default function Header() {
  return (
    <header className="w-full bg-neutral-750">
      <Container className="max-w-7xl">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <SignedIn>
              <UserButton />
              <SignOutBtn />
            </SignedIn>

            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </nav>
      </Container>
    </header>
  );
}
