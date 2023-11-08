import { Container } from '@/components';

export default function Footer() {
  return (
    <footer className="hidden md:block w-full border-t border-t-neutral-700 bg-neutral-800 z-20">
      <Container className="max-w-7xl flex items-center justify-between gap-3 xs:gap-5">
        Footer
      </Container>
    </footer>
  );
}
