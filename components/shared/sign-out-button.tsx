'use client';

import Image from 'next/image';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface SignOutBtnProps extends React.ComponentProps<typeof SignOutButton> {
  height?: number;
  width?: number;
}

export function SignOutBtn({
  height = 24,
  width = 24,
  ...props
}: SignOutBtnProps) {
  const router = useRouter();

  const handleSignOut = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex cursor-pointer">
      <SignOutButton signOutCallback={handleSignOut} {...props}>
        <div className="px-6 py-4 flex flex-1 justify-start gap-3">
          <Image
            src="/assets/logout.svg"
            alt="Sign out"
            height={height}
            width={width}
          />
          <p className="max-lg:hidden">Sign out</p>
        </div>
      </SignOutButton>
    </div>
  );
}
