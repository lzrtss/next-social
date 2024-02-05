import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Container, PostCard } from '@/components/server';
import { CreateCommentForm } from '@/components/client';
import { getPostById, getUserById } from '@/actions';
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

  const userInfo = await getUserById(user.id);

  if (!userInfo.onboarded) {
    redirect('/onboarding');
  }

  const post = await getPostById(params.id);

  return (
    <main className="h-full">
      <Container>
        <section className="relative">
          <div className="mb-10">
            <PostCard
              id={JSON.stringify(post._id)}
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
            <CreateCommentForm
              postId={post.id}
              currentUserId={JSON.stringify(userInfo._id)}
              currentUserImageUrl={userInfo.image}
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
