import Image from 'next/image';
import Link from 'next/link';

interface SocialActionsProps {
  postId: string;
  numberOfComments: number;
  className?: string;
}

export default function SocialActions({
  postId,
  numberOfComments,
  className,
}: SocialActionsProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <Image
        src="/assets/like.svg"
        alt="like"
        width={24}
        height={24}
        className="object-contain cursor-pointer"
      />
      <Link href={`/post/${postId}`} className="flex items-center gap-[2px]">
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
