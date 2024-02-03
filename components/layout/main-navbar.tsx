import Image from 'next/image';
import { SignedIn } from '@clerk/nextjs';

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
    <aside className="py-8 fixed bottom-0 w-full z-10 custom-scrollbar md:sticky md:left-0 md:top-0 md:w-fit md:flex-col md:overflow-auto">
      <nav>
        <ul className="w-full flex flex-1 flex-row justify-between md:justify-start md:gap-4 md:flex-col">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                href={link.route}
                className="px-6 py-4 flex justify-start gap-3"
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
    </aside>
  );
}
