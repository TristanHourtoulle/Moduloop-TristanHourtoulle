import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-md font-outfit transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-auto whitespace-nowrap",
  {
    variants: {
      color: {
        default: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        primary:
          "bg-ui-primary text-white hover:bg-ui-primary-hover focus-visible:ring-ui-primary",
        danger:
          "bg-ui-danger text-white hover:bg-ui-danger-hover focus-visible:ring-ui-danger",
        secondary:
          "bg-ui-secondary text-white hover:bg-ui-secondary-hover focus-visible:ring-ui-secondary",
      },
      variant: {
        solid: "",
        ghost: "bg-transparent border-2",
        bordered: "bg-transparent border-2",
        flat: "bg-opacity-10",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-md",
      },
      isIconOnly: {
        true: "aspect-square p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        color: "primary",
        className: "border-ui-primary text-ui-primary hover:bg-ui-primary hover:text-white",
      },
      {
        variant: "ghost",
        color: "danger",
        className: "border-ui-danger text-ui-danger hover:bg-ui-danger hover:text-white",
      },
      {
        variant: "bordered",
        color: "primary",
        className: "border-ui-primary text-ui-primary hover:bg-ui-primary hover:text-white",
      },
      {
        variant: "bordered",
        color: "danger",
        className: "border-ui-danger text-ui-danger hover:bg-ui-danger hover:text-white",
      },
      {
        variant: "flat",
        color: "primary",
        className: "bg-ui-primary text-ui-primary",
      },
      {
        isIconOnly: true,
        size: "sm",
        className: "h-8 w-8",
      },
      {
        isIconOnly: true,
        size: "md",
        className: "h-10 w-10",
      },
      {
        isIconOnly: true,
        size: "lg",
        className: "h-12 w-12",
      },
    ],
    defaultVariants: {
      color: "default",
      variant: "solid",
      size: "md",
      isIconOnly: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color,
      variant,
      size,
      isIconOnly,
      fullWidth,
      isLoading,
      startContent,
      endContent,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ color, variant, size, isIconOnly, fullWidth, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {startContent}
            {children}
            {endContent}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
