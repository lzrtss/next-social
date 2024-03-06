import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Pagination } from '@/components/client';
import { Container, PostCard } from '@/components/server';
import { getAllPosts, getAllUserLikes, getUserById } from '@/actions';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUserById(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  const { posts, isNext } = await getAllPosts(
    searchParams.page ? Number(searchParams.page) : 1,
    20,
  );

  const likedPosts = await getAllUserLikes(user.id);

  return (
    <main className="h-full">
      <Container>
        <h1 className="mt-2 mb-6 text-4xl">Recent posts</h1>

        <section className="flex flex-col gap-6">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  isLiked={likedPosts.includes(post._id.toString())}
                  isAuthor={post.author.id === user.id}
                  author={post.author}
                  currentUserId={userInfo._id}
                  content={post.text}
                  createdAt={post.createdAt}
                  parentId={post.parentId}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-neutral-50">No posts to show</p>
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
