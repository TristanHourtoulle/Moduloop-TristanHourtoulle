import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-xl border bg-transparent px-3 py-2 text-sm text-gray-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-gray-50 read-only:text-gray-700",
  {
    variants: {
      color: {
        default: "border-gray-300 focus-visible:ring-gray-400",
        primary: "border-ui-primary focus-visible:ring-ui-primary",
        danger: "border-ui-danger focus-visible:ring-ui-danger",
        secondary: "border-ui-secondary focus-visible:ring-ui-secondary",
      },
      variant: {
        flat: "border-none bg-gray-100",
        bordered: "border",
        underlined: "border-0 border-b rounded-none px-0",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      isInvalid: {
        true: "border-ui-danger focus-visible:ring-ui-danger",
      },
    },
    defaultVariants: {
      color: "default",
      variant: "bordered",
      size: "md",
      isInvalid: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    VariantProps<typeof inputVariants> {
  label?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  description?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      color,
      variant,
      size,
      label,
      startContent,
      endContent,
      description,
      errorMessage,
      fullWidth,
      isRequired,
      isDisabled,
      isReadOnly,
      isInvalid,
      type = "text",
      ...props
    },
    ref
  ) => {
    const invalid = isInvalid || !!errorMessage;

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {isRequired && <span className="text-ui-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {startContent && (
            <div className="absolute left-3 flex items-center pointer-events-none">
              {startContent}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ color, variant, size, isInvalid: invalid, className }),
              startContent && "pl-10",
              endContent && "pr-10"
            )}
            ref={ref}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-invalid={invalid}
            {...props}
          />
          {endContent && (
            <div className="absolute right-3 flex items-center pointer-events-none">
              {endContent}
            </div>
          )}
        </div>
        {description && !errorMessage && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-xs text-ui-danger">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
