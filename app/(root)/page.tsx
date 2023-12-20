import { currentUser } from '@clerk/nextjs';

import { Container, PostCard } from '@/components/server';
import { fetchPosts } from '@/actions';

export default async function Home() {
  const user = await currentUser();
  const { posts, isNext } = await fetchPosts(1, 30);

  return (
    <main className="h-full bg-neutral-800">
      <Container>
        <h1 className="mt-2 mb-8 text-4xl">Home</h1>

        <section className="flex flex-col gap-10">
          {posts.length === 0 ? (
            <p className="text-center text-neutral-50">No posts to show...</p>
          ) : (
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
          )}
        </section>
      </Container>
    </main>
  );
}
