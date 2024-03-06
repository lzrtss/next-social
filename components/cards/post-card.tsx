import Image from 'next/image';
import Link from 'next/link';

import SocialActions from './social-actions';
import { DeleteBtn } from '../client';
import { getAllPostCommentsById } from '@/actions';
import { formatDate } from '@/lib/utils';
import { IAuthor } from '@/types/post.interface';

interface PostCardProps {
  id: string;
  parentId: string | null;
  author: IAuthor;
  currentUserId: string;
  content: string;
  createdAt: string;
  className?: string;
  isComment?: boolean;
  isLiked: boolean;
  isAuthor: boolean;
}

export default async function PostCard({
  id,
  parentId,
  author,
  currentUserId,
  content,
  createdAt,
  className,
  isComment,
  isLiked,
  isAuthor,
}: PostCardProps) {
  const postComments = await getAllPostCommentsById(id);
  const numberOfComments = postComments.length;

  return (
    <article
      className={`flex justify-between items-center gap-2 ${
        isComment ? 'w-[95%] ml-auto' : 'w-full'
      }`}
    >
      <Link
        href={`/post/${parentId}`}
        className={isComment ? 'block' : 'hidden'}
      >
        <Image
          src="/assets/arrow-left-up.svg"
          width={36}
          height={36}
          alt="Arrow down and right"
        />
      </Link>

      <div
        className={`w-full p-6 flex flex-col rounded-xl bg-neutral-750 ${className}`}
      >
        <div className="flex justify-between items-start">
          <div className="w-full flex flex-row flex-1 gap-3">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-12 w-12"
              >
                <Image
                  src={author.image}
                  fill
                  sizes="48px"
                  alt="Profile image"
                  className="cursor-pointer rounded-full"
                />
              </Link>

              <div className="mt-2 w-[1px] grow rounded-full bg-neutral-600" />
            </div>

            <div className="w-full flex flex-col">
              <div className="flex justify-between">
                <Link href={`/profile/${author.id}`} className="w-fit">
                  <h2 className="cursor-pointer font-semibold italic text-neutral-400 hover:underline hover:underline-offset-2">
                    {author.name}
                  </h2>
                </Link>

                {isAuthor ? (
                  <DeleteBtn
                    postId={JSON.stringify(id)}
                    parentId={parentId}
                    isComment={isComment}
                  />
                ) : null}
              </div>

              <p className="mt-2">{content}</p>

              <div className="mt-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <SocialActions
                    currentUserId={JSON.stringify(currentUserId)}
                    postId={JSON.stringify(id)}
                    numberOfComments={numberOfComments}
                    isLiked={isLiked}
                  />
                  <p className="max-md:hidden text-xs text-neutral-400 italic">
                    {isComment ? 'Commented on' : 'Posted on'}{' '}
                    {formatDate(createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
