import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
    loading?: boolean;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
    ({ loading, className, children, disabled, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                disabled={disabled || loading}
                className={cn("relative", className)}
                {...props}
            >
                {loading && (
                    <span className="absolute inset-y-0 right-3 flex items-center" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin">
              <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none" opacity=".25"/>
              <path d="M22 12a10 10 0 0 1-10 10" strokeWidth="4" stroke="currentColor" fill="none"/>
            </svg>
          </span>
                )}
                <span className={cn(loading && "opacity-75")}>{children}</span>
            </Button>
        );
    }
);
LoadingButton.displayName = "LoadingButton";
