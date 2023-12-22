import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Container, PostCard } from '@/components/server';
import { fetchPostById, getUser } from '@/actions';
import { AddCommentForm } from '@/components/client';
import { IPost } from '@/types/post.interface';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const user = await currentUser();

  if (!params.id || !user) {
    return null;
  }

  const post = await fetchPostById(params.id);

  const userInfo = await getUser(user.id);

  if (!userInfo.onboarded) {
    redirect('/onboarding');
  }

  return (
    <main className="h-full bg-neutral-800">
      <Container>
        <section className="relative">
          <div className="mb-10">
            <PostCard
              id={post._id}
              author={post.author}
              currentUserId={user?.id}
              community={post.community}
              comments={post.children}
              content={post.text}
              createdAt={post.createdAt}
              parentId={post.parentId}
            />
          </div>

          <div className="mb-10">
            <AddCommentForm
              postId={post.id}
              userId={JSON.stringify(userInfo._id)}
              userImageUrl={userInfo.image}
            />
          </div>

          <div className="flex flex-col gap-10">
            {post.children.map((comment: IPost) => (
              <PostCard
                key={comment._id}
                id={comment._id}
                author={comment.author}
                currentUserId={user?.id}
                community={comment.community}
                comments={comment.children}
                content={comment.text}
                createdAt={comment.createdAt}
                parentId={comment.parentId}
                isComment
              />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
