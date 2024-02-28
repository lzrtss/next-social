'use client';

import Image from 'next/image';
import Link from 'next/link';

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
}

export default function PostCard({
  id,
  name,
  username,
  imageUrl,
}: UserCardProps) {
  return (
    <Link href={`/profile/${id}`}>
      <article className="p-4 flex justify-between gap-4 bg-neutral-750 rounded-lg hover:bg-neutral-700">
        <div className="flex flex-1 items-center justify-start gap-3">
          <Image
            src={imageUrl}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1 text-ellipsis">
            <h3 className="font-semibold text-neutral-50">{name}</h3>
            <p className=" font-light italic text-neutral-400">@{username}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
