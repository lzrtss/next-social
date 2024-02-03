import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Pagination } from '@/components/client';
import { Container, PostCard } from '@/components/server';
import { fetchPosts, getUser } from '@/actions';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUser(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  const { posts, isNext } = await fetchPosts(
    searchParams.page ? Number(searchParams.page) : 1,
    20,
  );

  return (
    <main className="h-full bg-neutral-800">
      <Container>
        <h1 className="mt-2 mb-6 text-4xl">Posts</h1>

        <section className="flex flex-col gap-10">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  author={post.author}
                  currentUserId={user?.id}
                  community={post.community}
                  comments={post.children}
                  content={post.text}
                  createdAt={post.createdAt}
                  parentId={post.parentId}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-neutral-50">No posts to show...</p>
          )}
        </section>

        <Pagination
          pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
          path="/"
          isNext={isNext}
        />
      </Container>
    </main>
  );
}
