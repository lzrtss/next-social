import { currentUser } from '@clerk/nextjs';

import { UserProfile } from '@/components/client';
import { Container } from '@/components/server';

export default async function Onboarding() {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    image: userInfo?.image || user?.imageUrl,
    name: userInfo?.name || user?.firstName || '',
    username: userInfo?.username || user?.username,
    bio: userInfo?.bio || '',
  };

  return (
    <main>
      <Container className="max-w-2xl">
        <h1 className="my-8 text-3xl md:text-4xl">Onboarding</h1>
        <p className="mb-8">
          Fill out your profile to continue using{' '}
          <span className="font-medium text-sky-500">Thoughts</span>
        </p>

        <section className="p-8 bg-neutral-700 rounded-lg">
          <UserProfile user={userData} btnLabel="Continue" />
        </section>
      </Container>
    </main>
  );
}
