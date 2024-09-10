import React from 'react';
import { cn } from "@/lib/utils";

// Define the ButtonProps interface with specific variants and sizes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Define the Button component with forwardRef
export const Button = React.forwardRef<HTMLButtonElement | HTMLDivElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Determine the component type based on asChild prop
    const Comp = asChild ? "div" : "button";

    // Function to get variant-specific classes
    const getVariantClasses = (variant: string | undefined) => {
      switch (variant) {
        case "default":
          return "bg-primary text-primary-foreground hover:bg-primary/90";
        case "destructive":
          return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
        case "outline":
          return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
        case "ghost":
          return "hover:bg-accent hover:text-accent-foreground";
        case "secondary":
          return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
        default:
          return "";
      }
    };

    // Size classes based on size prop
    const sizeClasses: Record<string, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-9 w-9",
    };

    // Combine all class names
    const combinedClasses = cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      getVariantClasses(variant),
      sizeClasses[size],
      className
    );

    // Callback ref to handle both HTMLButtonElement and HTMLDivElement
    const setRef = (node: HTMLButtonElement | HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // Type assertion to MutableRefObject<HTMLButtonElement | HTMLDivElement | null>
        (ref as React.MutableRefObject<HTMLButtonElement | HTMLDivElement | null>).current = node;
      }
    };

    return (
      <Comp
        className={combinedClasses}
        ref={setRef}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
