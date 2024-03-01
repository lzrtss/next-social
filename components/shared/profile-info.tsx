import Image from 'next/image';
import Link from 'next/link';

interface ProfileInfoProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

export default function ProfileInfo({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: ProfileInfoProps) {
  return (
    <div className="w-full flex flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              priority
              sizes="80px"
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-neutral-50">{name}</h2>
            <p className="italic text-neutral-400">@{username}</p>
          </div>
        </div>
        {accountId === authUserId ? (
          <Link
            href="/profile/edit"
            className="self-start px-4 py-1 rounded-md bg-neutral-600 hover:bg-neutral-500"
          >
            Edit profile
          </Link>
        ) : null}
      </div>

      <p className="mt-6 max-w-lg text-neutral-100">{bio}</p>
    </div>
  );
}
