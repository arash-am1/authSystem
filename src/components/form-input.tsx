import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string | null;
    ariaDescribedBy?: string;
    ariaInvalid?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    ({ id, label, className, error, ariaDescribedBy, ariaInvalid, ...props }, ref) => {
        return (
            <div className="space-y-1">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <Input
                    id={id}
                    ref={ref}
                    className={cn(
                        "text-left",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    aria-invalid={ariaInvalid}
                    aria-describedby={ariaDescribedBy}
                    {...props}
                />
            </div>
        );
    }
);
FormInput.displayName = "FormInput";
