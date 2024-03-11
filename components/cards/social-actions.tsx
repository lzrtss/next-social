'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { addLikeToPost, removeLikeFromPost } from '@/actions';

interface SocialActionsProps {
  currentUserId: string;
  postId: string;
  numberOfComments: number;
  className?: string;
  isLiked: boolean;
}

export default function SocialActions({
  currentUserId,
  postId,
  numberOfComments,
  className,
  isLiked,
}: SocialActionsProps) {
  const pathname = usePathname();

  const [liked, setLiked] = useState(isLiked);

  const handleAddLikeToPost = async () => {
    setLiked(true);

    await addLikeToPost({
      postId: JSON.parse(postId),
      userId: JSON.parse(currentUserId),
      path: pathname,
    });
  };

  const handleRemoveLikeFromPost = async () => {
    setLiked(false);

    await removeLikeFromPost({
      postId: JSON.parse(postId),
      userId: JSON.parse(currentUserId),
      path: pathname,
    });
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      {liked ? (
        <Image
          src="/assets/like-filled-red.svg"
          alt="Add like"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
          onClick={handleRemoveLikeFromPost}
        />
      ) : (
        <Image
          src="/assets/like.svg"
          alt="Remove like"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
          onClick={handleAddLikeToPost}
        />
      )}
      <Link
        href={`/post/${JSON.parse(postId)}`}
        className="flex items-center gap-[2px]"
      >
        <Image
          src="/assets/comment.svg"
          alt="comment"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
        />
        {numberOfComments ? (
          <span className="font-light text-neutral-400">
            {numberOfComments}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
