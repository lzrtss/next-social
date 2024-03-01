import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { UserProfileForm } from '@/components/client';
import { Container } from '@/components/server';
import { getUserById } from '@/actions';

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await getUserById(user?.id);
  // if (userInfo?.onboarded) {
  //   redirect('/');
  // }

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
        <h1 className="mt-2 mb-8 text-4xl">Edit profile</h1>

        <section className="p-8 rounded-lg border border-neutral-750">
          <UserProfileForm user={userData} btnLabel="Save" />
        </section>
      </Container>
    </main>
  );
}
