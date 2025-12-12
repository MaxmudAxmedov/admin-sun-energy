import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      label,
      error,
      defaultValue,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="text-sm font-medium text-active block">
            {label}
          </label>
        )}

        <input
          type={type}
          ref={ref}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            `
            w-full h-11 rounded-xl 
            border border-gray-300 
            bg-white px-4 text-sm text-active 
            shadow-sm transition-all duration-200
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
            placeholder:text-active
            disabled:opacity-50 disabled:cursor-not-allowed
            `,
            error &&
            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
