import { dark } from '@clerk/themes';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsPlacement: 'bottom',
          logoImageUrl: '/logo-outlined.png',
        },
      }}
    >
      <ClerkLoading>
        <p>Loading...</p>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
}
