'use client';

import { useRouter } from 'next/navigation';

import { Button } from '../client';

interface PaginationProps {
  pageNumber: number;
  path: string;
  isNext: boolean;
  className?: string;
}

export default function Pagination({
  pageNumber,
  path,
  isNext,
  className,
}: PaginationProps) {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === 'prev') {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === 'next') {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  if (!isNext && pageNumber === 1) {
    return null;
  }

  return (
    <div className="mt-8 w-full flex gap-5 justify-center items-center">
      <Button
        variant="link"
        disabled={pageNumber === 1}
        className={`text-neutral-100 ${className}`}
        onClick={() => handleNavigation('prev')}
      >
        Prev
      </Button>

      <p className=" font-semibold text-neutral-100">{pageNumber}</p>

      <Button
        variant="link"
        disabled={!isNext}
        className={`text-neutral-100 ${className}`}
        onClick={() => handleNavigation('next')}
      >
        Next
      </Button>
    </div>
  );
}
