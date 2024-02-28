import { SignIn } from '@clerk/nextjs';

import { Container } from '@/components/server';

export default function Page() {
  return (
    <Container className="h-screen flex justify-center items-center">
      <SignIn />
    </Container>
  );
}
