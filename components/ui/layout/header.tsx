import Link from 'next/link';
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';

import { Container, Logo } from '@/components';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-neutral-800 z-10">
      <Container>
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationSwitcherTrigger: 'py-2 px-4',
                },
              }}
            />

            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </div>
        </nav>
      </Container>
    </header>
  );
}
