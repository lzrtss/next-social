import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';

import { Container, PostsTab, ProfileInfo } from '@/components/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/client';
import { getUserById, getAllUserComments, getAllUserPosts } from '@/actions';
import { profileTabs } from '@/constants';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUserById(params.id);
  const { posts } = await getAllUserPosts(params.id);

  const comments = await getAllUserComments(params.id);

  const userData = { posts, comments, likes: userInfo.likes };

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  return (
    <main className="h-full">
      <Container>
        <ProfileInfo
          accountId={userInfo.id}
          authUserId={user.id}
          name={userInfo.name}
          username={userInfo.username}
          imgUrl={userInfo.image}
          bio={userInfo.bio}
        />

        <div className="mt-6 h-[1px] w-full bg-neutral-700" />

        <Tabs defaultValue="posts" className="w-full mt-8">
          <TabsList className="mb-10 p-0 h-full flex flex-1 items-center rounded-lg overflow-hidden bg-neutral-700 text-neutral-100">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex gap-2 flex-1 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 border-x-[1px] border-neutral-600 cursor-auto"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />

                <p className="text-neutral-400 max-sm:hidden">
                  <span className="font-medium">{tab.label}</span>:{' '}
                  <span className="font-semibold text-neutral-300">
                    {userData?.[tab.value]?.length || 0}
                  </span>
                </p>
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-neutral-100"
            >
              <PostsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </main>
  );
}
