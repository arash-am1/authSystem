import * as React from "react";
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variant styles (مثل shadcn/ui)
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white hover:bg-blue-700",
                destructive: "bg-red-600 text-white hover:bg-red-700",
                outline: "border border-gray-300 bg-white hover:bg-gray-50",
                ghost: "hover:bg-gray-100",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
