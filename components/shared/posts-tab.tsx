import { getAllUserPosts } from '@/actions';
import { redirect } from 'next/navigation';
import { PostCard } from '../server';

interface PostsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

export default async function PostsTab({
  currentUserId,
  accountId,
  accountType,
}: PostsTabProps) {
  let postsData = await getAllUserPosts(accountId);

  if (!postsData) {
    redirect('/');
  }

  return (
    <section className="mt-8 flex flex-col gap-10">
      {postsData.posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          author={
            accountType === 'User'
              ? {
                  id: postsData.id,
                  image: postsData.image,
                  name: postsData.name,
                }
              : {
                  id: post.author.id,
                  image: post.author.image,
                  name: post.author.name,
                }
          }
          currentUserId={currentUserId}
          comments={post.children}
          content={post.text}
          createdAt={post.createdAt}
          parentId={post.parentId}
        />
      ))}
    </section>
  );
}
