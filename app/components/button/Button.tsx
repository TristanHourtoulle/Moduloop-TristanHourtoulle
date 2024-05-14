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

  let className = `inline-block cursor-pointer transition-all duration-300 flex items-center gap-2`;

  // Variant Section
  if (variant === "primary") {
    className += ` text-white bg-[#30C1BD] hover:bg-[#249C99]`;
  } else if (variant === "secondary") {
    className += ` text-[#30C1BD] bg-white border-2 border-[#30C1BD] hover:bg-primary-transparent hover:border-primary-border-transparent`;
  }

  // Size Section
  if (size === "small") {
    className += ` px-3 py-2 rounded-md text-md gap-2`;
  } else if (size === "medium") {
    className += ` px-4 py-2 rounded-md text-lg gap-3`;
  } else if (size === "large") {
    className += ` px-6 py-3 rounded-lg text-xl gap-4`;
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
          width={size === "small" ? 20 : size === "medium" ? 23 : 25}
          height={size === "small" ? 20 : size === "medium" ? 23 : 25}
          alt="icon"
        />
      )}
      <span>{content}</span>
    </div>
  );
};
