'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../client';

interface SearchBarProps {
  routeType: string;
  className?: string;
}

export default function SearchBar({ routeType, className }: SearchBarProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (searchQuery) {
        router.push(`/${routeType}?q=${searchQuery}`);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayBounce);
  }, [searchQuery, routeType]);

  return (
    <div className={`px-4 py-2 flex bg-neutral-700 rounded-lg ${className}`}>
      <Image
        src={'/assets/search-grey.svg'}
        alt="Search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        autoComplete="off"
        autoCorrect="off"
        id="text"
        value={searchQuery}
        placeholder="Type name or username"
        className="border-none outline-none bg-neutral-700 text-neutral-100 text-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        onChange={(e) => setSearchQuery(e.target.value.trim())}
      />
    </div>
  );
}
