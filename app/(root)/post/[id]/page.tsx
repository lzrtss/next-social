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
          <div className="mb-8">
            <PostCard
              id={post._id}
              author={post.author}
              currentUserId={user?.id}
              content={post.text}
              createdAt={post.createdAt}
              parentId={post.parentId}
            />
          </div>

          <div className="flex flex-col items-end gap-8">
            {post.children.map((comment: IPost) => (
              <PostCard
                key={comment._id}
                id={comment._id}
                author={comment.author}
                currentUserId={user?.id}
                content={comment.text}
                createdAt={comment.createdAt}
                parentId={comment.parentId}
                isComment
              />
            ))}
          </div>

          <div className="mt-8">
            <CreateCommentForm
              btnLabel="Add comment"
              currentUserId={JSON.stringify(userInfo._id)}
              currentUserImageUrl={userInfo.image}
              postId={post.id}
            />
          </div>
        </section>
      </Container>
    </main>
  );
}
