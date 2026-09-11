import React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium uppercase tracking-[0.1em] text-stone-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full h-11 px-3.5 py-2 text-sm bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors duration-150 disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-stone-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
