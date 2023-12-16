import Image from 'next/image';
import Link from 'next/link';

interface SocialActionsProps {
  id: string;
  className?: string;
}

export default function SocialActions({ id, className }: SocialActionsProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <Image
        src="/assets/like.svg"
        alt="like"
        width={24}
        height={24}
        className="object-contain cursor-pointer"
      />
      <Link href={`/post/${id}`}>
        <Image
          src="/assets/reply.svg"
          alt="reply"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
        />
      </Link>
    </div>
  );
}
