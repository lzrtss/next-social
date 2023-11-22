import { SignUp } from '@clerk/nextjs';

import { Container } from '@/components/server';

export default function Page() {
  return (
    <Container className="flex justify-center items-center">
      <SignUp />
    </Container>
  );
}
