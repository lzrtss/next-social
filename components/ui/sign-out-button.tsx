'use client';

import Image from 'next/image';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface SignOutBtnProps extends React.ComponentProps<typeof SignOutButton> {
  height?: number;
  width?: number;
}

export default function SignOutBtn({
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
        <div className="p-4 flex justify-start gap-2">
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
