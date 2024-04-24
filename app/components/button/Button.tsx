import Image from "next/image";

export type ButtonProps = {
  variant: "primary" | "secondary";
  onClick: () => void;
  content: string;
  disabled: boolean;
  image: string | null;
  size: "small" | "medium" | "large";
  moreClasses?: string;
};

export const Button = (props: ButtonProps) => {
  const { variant, onClick, content, disabled, image, size, moreClasses } =
    props;
  let className = `cursor-pointer transition-all duration-300 flex items-center gap-2`;
  let imageClassName = { width: 20, height: 20 };

  // Variant Section
  if (variant === "primary") {
    if (image) {
      className += ` text-white bg-[#30C1BD] hover:bg-[#249C99]`;
    } else {
      className += ` text-white bg-[#30C1BD] border-2 border-[#F6F6F6] hover:bg-white hover:border-2 hover:border-[#30C1BD] hover:text-[#30C1BD]`;
    }
  } else if (variant === "secondary") {
    if (image) {
      className += ` text-[#30C1BD] bg-white border-2 border-[#30C1BD] hover:bg-primary-transparent hover:border-primary-border-transparent`;
    } else {
      className += ` text-[#30C1BD] bg-white border-2 border-[#30C1BD] hover:bg-[#30C1BD] hover:text-white`;
    }
  }

  // Size Section
  if (size === "small") {
    className += ` px-2 py-1 rounded-sm text-sm gap-2`;
    imageClassName = { width: 20, height: 20 };
  } else if (size === "medium") {
    className += ` px-4 py-2 rounded-md text-lg gap-3`;
    imageClassName = { width: 23, height: 23 };
  } else if (size === "large") {
    className += ` px-6 py-3 rounded-lg text-xl gap-4`;
    imageClassName = { width: 25, height: 25 };
  }

  // MoreClasses Section
  if (moreClasses) {
    className += ` ${moreClasses}`;
  }

  return (
    <div className={className} onClick={onClick}>
      {image && (
        <Image
          src={image}
          width={imageClassName.width}
          height={imageClassName.height}
          alt="icon"
        />
      )}
      <span>{content}</span>
    </div>
  );
};
