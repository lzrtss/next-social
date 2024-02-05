'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { deleteCommentById, deletePostById } from '@/actions';

interface DeleteBtnProps {
  postId: string;
  parentId: string | null;
  isComment?: boolean;
}

export default function DeleteBtn({
  postId,
  parentId,
  isComment = false,
}: DeleteBtnProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    if (isComment) {
      await deleteCommentById(JSON.parse(postId), pathname);
    } else {
      await deletePostById(JSON.parse(postId), pathname);
    }

    if (!parentId || !isComment) {
      router.push('/');
    }
  };

  return (
    <Image
      src="/assets/delete.svg"
      alt="Delete post"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={handleDelete}
    />
  );
}
