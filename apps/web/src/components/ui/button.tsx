import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-heading inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-action text-brand-warm-white shadow-sm hover:bg-brand-action-hover",
        secondary:
          "bg-brand-trust text-brand-warm-white hover:bg-brand-trust/90",
        // High-contrast brand-safe buttons (useful on bg-primary sections).
        brand: "bg-brand-coal text-brand-warm-white shadow-sm hover:bg-brand-coal/90",
        brandOutline:
          "border border-brand-coal/35 bg-transparent text-brand-coal hover:bg-brand-coal/10",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        link: "h-auto min-h-0 px-0 py-0 text-brand-trust underline-offset-4 hover:text-brand-action-hover hover:underline",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
