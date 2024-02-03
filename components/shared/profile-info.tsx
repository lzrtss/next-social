import Image from 'next/image';

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
        <div className="flex items-start gap-4">
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
      </div>

      <p className="mt-6 max-w-lg text-neutral-100">{bio}</p>

      <div className="mt-8 h-[1px] w-full bg-neutral-700" />
    </div>
  );
}
