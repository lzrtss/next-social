import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { UserProfileForm } from '@/components/client';
import { Container } from '@/components/server';
import { getUserById } from '@/actions';

export default async function Onboarding() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await getUserById(user?.id);
  if (userInfo?.onboarded) {
    redirect('/');
  }

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    image: userInfo ? userInfo?.image : user?.imageUrl,
    name: userInfo ? userInfo?.name : user?.firstName || '',
    username: userInfo ? userInfo?.username : user?.username,
    bio: userInfo ? userInfo?.bio : '',
  };

  return (
    <main>
      <Container className="max-w-2xl">
        <h1 className="mt-2 mb-8 text-4xl">Onboarding</h1>
        <p className="mb-8">
          Fill out your profile to continue using{' '}
          <span className="font-medium">Posts</span>
        </p>

        <section className="p-8 rounded-lg border border-neutral-700">
          <UserProfileForm user={userData} btnLabel="Save" />
        </section>
      </Container>
    </main>
  );
}
