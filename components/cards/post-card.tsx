import Image from 'next/image';
import Link from 'next/link';
import SocialActions from './social-actions';
import CommentsPreview from './comments-preview';

interface IAuthor {
  id: string;
  image: string;
  name: string;
}

interface IComment {
  author: {
    image: string;
  };
}

interface ICommunity {
  id: string;
  image: string;
  name: string;
}

interface PostCardProps {
  id: string;
  author: IAuthor;
  currentUserId: string | undefined;
  comments: IComment[];
  community: ICommunity | null;
  content: string;
  createdAt: string;
  isComment?: boolean;
  parentId: string | null;
}

export default function PostCard({
  id,
  author,
  currentUserId,
  community,
  comments,
  content,
  createdAt,
  parentId,
  isComment,
}: PostCardProps) {
  return (
    <article className="w-full p-6 flex flex-col rounded-xl bg-neutral-700">
      <div className="flex justify-between items-start">
        <div className="w-full flex flex-row flex-1 gap-3">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-12 w-12">
              <Image
                src={author.image}
                fill
                alt="Profile image"
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-600" />
          </div>

          <div className="w-full flex flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h2 className="cursor-pointer font-semibold italic text-neutral-400">
                {author.name}
              </h2>
            </Link>

            <p className="mt-2 ">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <SocialActions id={id} />

              {isComment && comments.length > 0 ? (
                <CommentsPreview id={id} numberOfComments={comments.length} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
