import Image from 'next/image';
import { SignedIn } from '@clerk/nextjs';

import { Container } from '@/components/server';
import { SignOutBtn, NavLink } from '@/components/client';

interface MenuItem {
  imgURL: string;
  route: string;
  label: string;
}

interface MainNavbarProps {
  links: MenuItem[];
}

export default function MainNavbar({ links }: MainNavbarProps) {
  return (
    <aside className="fixed bottom-0 w-full z-10 custom-scrollbar bg-neutral-800 border-t border-t-neutral-700 md:sticky md:left-0 md:top-0 md:min-h-screen md:w-fit md:flex-col md:overflow-auto md:border-t-0 md:border-r md:border-r-neutral-700">
      <Container>
        <nav>
          <ul className="w-full flex flex-1 flex-row justify-between md:justify-start md:gap-4 md:flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  href={link.route}
                  className="p-4 flex justify-start gap-2 rounded-md"
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <p className="hidden lg:block">{link.label}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block md:mt-4">
          <SignedIn>
            <SignOutBtn />
          </SignedIn>
        </div>
      </Container>
    </aside>
  );
}
