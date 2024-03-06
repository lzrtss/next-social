import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/lib/utils';

interface ActivityCardProps {
  createdAt: string;
  imageUrl: string;
  name: string;
  parentId?: string;
  userId: string;
  username: string;
}

export default function ActivityCard({
  createdAt,
  imageUrl,
  name,
  parentId,
  userId,
  username,
}: ActivityCardProps) {
  return (
    <article className="px-6 py-4 flex justify-between items-center gap-2 rounded-md bg-neutral-750">
      <div className="flex gap-2 items-center">
        <Link href={`/profile/${userId}`}>
          <Image
            src={imageUrl}
            alt="User image"
            width={28}
            height={28}
            className="object-cover rounded-full"
          />
        </Link>

        <p className="text-neutral-100">
          <Link
            href={`/profile/${userId}`}
            className="text-orange-300 hover:text-orange-400"
          >
            {name || username}
          </Link>{' '}
          replied to your{' '}
          <Link
            href={`/post/${parentId}`}
            className="text-orange-300 hover:text-orange-400"
          >
            post
          </Link>
        </p>
      </div>
      <p className="text-sm text-neutral-400 italic max-sm:hidden">
        ({formatDate(createdAt)})
      </p>
    </article>
  );
}
