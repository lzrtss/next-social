import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { ActivityCard, Container } from '@/components/server';
import { getUserActivity, getUserById } from '@/actions';

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUserById(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  const activity = await getUserActivity(userInfo._id);

  return (
    <main className="h-full">
      <Container>
        <h1 className="mt-2 mb-6 text-4xl">Recent activity</h1>

        <section className="flex flex-col gap-4">
          {activity.length > 0 ? (
            <>
              {activity.map((activity) => (
                <ActivityCard
                  key={activity._id}
                  createdAt={activity.createdAt}
                  imageUrl={activity.author.image}
                  name={activity.author.name}
                  parentId={activity.parentId}
                  userId={activity.author.id}
                  username={activity.author.username}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-neutral-50">No activity to show</p>
          )}
        </section>
      </Container>
    </main>
  );
}
