'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

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

  const isActive = pathname.includes(href) || pathname === href;

  return (
    <Link
      href={href}
      {...props}
      className={`${isActive ? 'bg-sky-500' : ''} ${className}`}
    >
      {children}
    </Link>
  );
}
