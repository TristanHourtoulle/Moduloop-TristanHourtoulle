import Image from "next/image";

export const LogoIcon = () => {
  return (
    <Image
      src={"/icons/logoImage.svg"}
      alt="Moduloop logo"
      width={40}
      height={40}
    />
  );
};
