import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
interface BadgeProps {
  className?: string;
  variant: string;
  children?: React.ReactNode;
}

function Badge({
  className,
  variant,
  ...props
}: Omit<BadgeProps, 'variant'> & { variant?: 'default' | 'secondary' | 'destructive' | 'outline' }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} >
        {props.children}{}
    </div>
)
}

export { Badge, badgeVariants }