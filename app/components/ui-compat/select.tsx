import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "flex w-full rounded-xl border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "color" | "children">,
    VariantProps<typeof selectVariants> {
  label?: string;
  description?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  items?: Array<any>;
  placeholder?: string;
  children?: React.ReactNode | ((item: any) => React.ReactNode);
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      color,
      variant,
      size,
      label,
      description,
      errorMessage,
      fullWidth,
      isRequired,
      isDisabled,
      isInvalid,
      items,
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    const invalid = isInvalid || !!errorMessage;

    // Render function for items
    const renderItems = (): React.ReactNode => {
      if (items && typeof children === "function") {
        return items.map((item) => children(item));
      } else if (items) {
        return items.map((item) => (
          <option key={item.value || item.id || item} value={item.value || item.id || item}>
            {item.label || item.name || item}
          </option>
        ));
      } else {
        return children as React.ReactNode;
      }
    };

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {isRequired && <span className="text-ui-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              selectVariants({ color, variant, size, isInvalid: invalid, className }),
              "appearance-none pr-10"
            )}
            ref={ref}
            disabled={isDisabled}
            required={isRequired}
            aria-invalid={invalid}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {renderItems()}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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
Select.displayName = "Select";

export { Select, selectVariants };
