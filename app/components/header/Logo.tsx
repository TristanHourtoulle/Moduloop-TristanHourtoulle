import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex md:hidden gap-2">
        <Image
          src="/icons/logoImage.svg"
          alt="Moduloop Logo"
          width={50}
          height={50}
          className="object-contain"
        />
      </Link>
      <Link href="/" className="hidden md:flex gap-2">
        <Image
          src="/icons/logo.png"
          alt="Moduloop Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </Link>
    </div>
  );
};
