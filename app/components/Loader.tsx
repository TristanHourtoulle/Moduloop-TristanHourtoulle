import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center my-auto">
      <Image
        src="/icons/logoImage.png"
        alt="Loader"
        width={50}
        height={50}
        className="loader"
      />
    </div>
  );
};

export default Loader;
