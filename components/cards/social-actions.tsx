import Image from 'next/image';
import Link from 'next/link';

interface SocialActionsProps {
  postId: string;
  className?: string;
}

export default function SocialActions({
  postId,
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
      <Link href={`/post/${postId}`}>
        <Image
          src="/assets/comment.svg"
          alt="comment"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
        />
      </Link>
    </div>
  );
}
