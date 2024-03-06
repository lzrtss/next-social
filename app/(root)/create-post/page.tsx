import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { CreatePostForm } from '@/components/client';
import { Container } from '@/components/server';
import { getUserById } from '@/actions';

async function Page() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUserById(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  return (
    <main className="h-full">
      <Container>
        <h1 className="mt-2 text-4xl">Create a post</h1>
        <CreatePostForm
          userId={userInfo._id.toString()}
          btnLabel="Publish"
          className="my-8"
        />
      </Container>
    </main>
  );
}

export default Page;
