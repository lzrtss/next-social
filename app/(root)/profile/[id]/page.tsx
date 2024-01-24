import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';

import { Container, PostsTab, ProfileInfo } from '@/components/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/client';
import { getUser, getUserComments, getUserPosts } from '@/actions';
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

  const userInfo = await getUser(params.id);
  const { posts } = await getUserPosts(params.id);
  const { posts: comments } = await getUserComments(params.id);

  const userData = { comments, posts, likes: userInfo.likedPosts };

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  return (
    <main className="h-full bg-neutral-800">
      <Container>
        <section className="p-4 flex flex-col gap-10">
          <ProfileInfo
            accountId={userInfo.id}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
          />

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-10 p-0 h-full flex flex-1 items-center rounded-md overflow-hidden bg-neutral-700 text-neutral-100">
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

                  <p className="max-sm:hidden">{tab.label}</p>

                  <span className="block px-[8px] py-[2px] rounded-full bg-neutral-400 text-neutral-800">
                    {userData?.[tab.value]?.length || 0}
                  </span>
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
        </section>
      </Container>
    </main>
  );
}
