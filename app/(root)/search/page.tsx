import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { Pagination, SearchBar } from '@/components/client';
import { Container, UserCard } from '@/components/server';
import { getUser, getUsers } from '@/actions';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await getUser(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  const { users, isNext } = await getUsers({
    userId: user.id,
    searchQuery: searchParams.q,
    pageNumber: searchParams?.page ? Number(searchParams.page) : 1,
    pageSize: 20,
  });

  return (
    <main className="h-full bg-neutral-800">
      <Container>
        <h1 className="mt-2 mb-6 text-4xl">User search</h1>

        <div className="pb-8 border-b-[1px] border-neutral-700">
          <SearchBar routeType="search" />
        </div>

        <section className="mt-8 flex flex-col gap-8">
          {users.length > 0 ? (
            <>
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  username={user.username}
                  imageUrl={user.image}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-neutral-50">No users to show...</p>
          )}
        </section>

        <Pagination
          pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
          path="search"
          isNext={isNext}
        />
      </Container>
    </main>
  );
}
