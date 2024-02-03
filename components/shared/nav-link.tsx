'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function NavLink({
  children,
  className,
  href,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const { userId } = useAuth();

  const isActive =
    (pathname.includes(href) && href.length > 1) || pathname === href;

  return (
    <Link
      href={href === '/profile' ? `${href}/${userId}` : href}
      {...props}
      className={`${
        isActive ? ' rounded-tl-lg rounded-bl-lg bg-orange-400' : ''
      } ${className}`}
    >
      {children}
    </Link>
  );
}
