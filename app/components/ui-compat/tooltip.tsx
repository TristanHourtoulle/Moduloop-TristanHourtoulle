"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  color?: "default" | "primary" | "danger" | "secondary";
  showArrow?: boolean;
  closeDelay?: number;
  isDisabled?: boolean;
  className?: string;
}

const Tooltip = ({
  children,
  content,
  placement = "top",
  delay = 200,
  color = "default",
  showArrow = true,
  closeDelay = 100,
  isDisabled = false,
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    if (isDisabled) return;
    timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setTimeout(() => {
      setIsVisible(false);
    }, closeDelay);
  };

  const colorClasses = {
    default: "bg-gray-900 text-white",
    primary: "bg-ui-primary text-white",
    danger: "bg-ui-danger text-white",
    secondary: "bg-ui-secondary text-white",
  };

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-4",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-4",
    left: "left-full top-1/2 -translate-y-1/2 border-l-4",
    right: "right-full top-1/2 -translate-y-1/2 border-r-4",
  };

  const arrowColors = {
    default: "border-t-gray-900",
    primary: "border-t-ui-primary",
    danger: "border-t-ui-danger",
    secondary: "border-t-ui-secondary",
  };

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      } as React.HTMLAttributes<HTMLElement>)}
      {isVisible && !isDisabled && (
        <div
          className={cn(
            "absolute z-50 px-3 py-1.5 text-xs rounded-lg shadow-lg whitespace-nowrap",
            colorClasses[color],
            placementClasses[placement],
            "animate-in fade-in-0 zoom-in-95",
            className
          )}
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                "absolute w-0 h-0 border-4 border-transparent",
                arrowClasses[placement],
                arrowColors[color]
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

export { Tooltip };
