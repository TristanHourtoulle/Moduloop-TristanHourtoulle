import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      color: {
        default: "bg-gray-100 text-gray-900",
        primary: "bg-ui-primary text-white",
        danger: "bg-ui-danger text-white",
        secondary: "bg-ui-secondary text-white",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
      },
      variant: {
        solid: "",
        flat: "bg-opacity-10",
        bordered: "bg-transparent border-2",
        dot: "pl-2 relative",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-3 text-sm",
        lg: "h-8 px-4 text-md",
      },
    },
    compoundVariants: [
      {
        variant: "bordered",
        color: "primary",
        className: "border-ui-primary text-ui-primary",
      },
      {
        variant: "bordered",
        color: "danger",
        className: "border-ui-danger text-ui-danger",
      },
      {
        variant: "flat",
        color: "primary",
        className: "bg-ui-primary text-ui-primary",
      },
    ],
    defaultVariants: {
      color: "default",
      variant: "solid",
      size: "md",
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof chipVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onClose?: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      color,
      variant,
      size,
      startContent,
      endContent,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        className={cn(chipVariants({ color, variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === "dot" && (
          <span className="absolute left-1 h-2 w-2 rounded-full bg-current" />
        )}
        {startContent && <span className="mr-1">{startContent}</span>}
        {children}
        {endContent && <span className="ml-1">{endContent}</span>}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-1 rounded-full hover:bg-black hover:bg-opacity-10 p-0.5"
            type="button"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
