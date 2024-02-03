import { Container } from '@/components/server';

export default function CommunitiesNavbar() {
  return (
    <aside
      className="hidden xl:sticky right-0 top-0 h-screen w-fit z-10 overflow-auto custom-scrollbar border-l border-l-neutral-700 max-xl:hidden;
  "
    >
      <Container className="flex flex-col justify-between gap-10">
        <div className="flex flex-1 flex-col justify-start">
          <h3 className="text-xl">Suggested Communities</h3>
        </div>

        <div className="flex flex-1 flex-col justify-start">
          <h3 className="text-xl">Suggested Users</h3>
        </div>
      </Container>
    </aside>
  );
}
