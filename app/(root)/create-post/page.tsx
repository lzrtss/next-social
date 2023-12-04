import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { CreatePostForm } from '@/components/client';
import { Container } from '@/components/server';
import { getUser } from '@/actions';

async function Page() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUser(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  return (
    <main className="h-full bg-neutral-800">
      <Container>
        <h1 className="mt-2 text-4xl">Create Post</h1>
        <CreatePostForm
          userId={userInfo._id.toString()}
          btnLabel="Create"
          className="my-8"
        />
      </Container>
    </main>
  );
}

export default Page;
