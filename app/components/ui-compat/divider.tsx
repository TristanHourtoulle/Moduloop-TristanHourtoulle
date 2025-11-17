import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          "border-gray-200",
          orientation === "horizontal"
            ? "w-full border-t"
            : "h-full border-l inline-block",
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
