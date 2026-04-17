import Image from 'next/image';

export default function Logo({ width = 96 }: { width?: number }) {
  return (
    <Image
      src="/ando-logo-red.png"
      alt="Ando"
      width={width}
      height={Math.round(width * 0.3)}
      priority
      className="h-auto w-auto"
      style={{ maxWidth: width }}
    />
  );
}
