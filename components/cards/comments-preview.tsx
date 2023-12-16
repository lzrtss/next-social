import Link from 'next/link';

interface CommentsPreviewProps {
  id: string;
  numberOfComments: number;
  className?: string;
}

export default function CommentsPreview({
  id,
  numberOfComments,
  className,
}: CommentsPreviewProps) {
  const isPlural = numberOfComments > 1;

  return (
    <div className={`mt-1 text-neutral-400 ${className}`}>
      <Link href={`/post/${id}`}>
        <p>
          {numberOfComments} {isPlural ? 'comments' : 'comment'}
        </p>
      </Link>
    </div>
  );
}
