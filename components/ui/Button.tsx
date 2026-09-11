import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium uppercase tracking-[0.15em] text-xs transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary: "bg-stone-900 text-stone-50 hover:bg-stone-800 active:bg-black",
      secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 active:bg-stone-300",
      outline: "border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-stone-50",
      ghost: "text-stone-700 hover:text-stone-950 hover:bg-stone-100",
      gold: "bg-[#927238] text-white hover:bg-[#7e622f] active:bg-[#6c5427]",
    };

    const sizeStyles = {
      sm: "h-9 px-4 py-2 text-[10px]",
      md: "h-11 px-6 py-2.5 text-xs",
      lg: "h-13 px-8 py-3 text-xs tracking-[0.2em]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
