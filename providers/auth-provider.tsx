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
          logoImageUrl: '/logo-light.svg',
        },
        variables: {
          colorPrimary: '#f8a055',
          colorTextSecondary: '#ccc',
          colorBackground: '#333',
          colorInputBackground: '#444',
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
