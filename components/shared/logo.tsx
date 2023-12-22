import Image from 'next/image';

interface LogoProps {
  height?: number;
  width?: number;
}

export default function Logo({ height = 28, width = 28 }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo-light.svg" alt="logo" width={width} height={height} />
      <p className={`hidden sm:block text-[24px] font-medium`}>Posts</p>
    </div>
  );
}
