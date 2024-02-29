import { redirect } from 'next/navigation';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

import { Container, PostCard, ProfileInfo } from '@/components/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/client';
import { getUserById } from '@/actions';
import { profileTabs } from '@/constants';
import { IPost } from '@/types/post.interface';

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

        <div className="mt-6 h-[1px] w-full bg-neutral-750" />

        <Tabs defaultValue="posts" className="w-full mt-6">
          <TabsList className="mb-6 p-0 h-full flex flex-1 items-center rounded-lg overflow-hidden bg-neutral-750 text-neutral-100">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex gap-1 items-center flex-1 border-r last:border-0 border-neutral-700 cursor-auto data-[state=active]:bg-neutral-600 data-[state=active]:text-neutral-50"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />

                <p className="flex items-center gap-1 text-neutral-400 max-sm:hidden">
                  <span className="font-medium">{tab.label}:</span>
                  <span className="font-semibold text-neutral-300">
                    {userInfo[tab.value]?.length || 0}
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
              <section className="mt-6 flex flex-col gap-6">
                {userInfo[tab.value].map((post: IPost) => (
                  <PostCard
                    key={post._id}
                    id={post._id}
                    isComment={tab.value === 'comments'}
                    author={{
                      id: userInfo.id,
                      image: userInfo.image,
                      name: userInfo.name,
                    }}
                    currentUserId={user.id}
                    content={post.text}
                    createdAt={post.createdAt}
                    parentId={post.parentId}
                  />
                ))}
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </main>
  );
}
