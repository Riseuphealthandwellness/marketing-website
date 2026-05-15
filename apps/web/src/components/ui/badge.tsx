import type * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        // Calm healthcare badge: subtle tint + brand text, not a loud filled pill.
        "inline-flex items-center rounded-md border border-brand-trust/20 bg-brand-trust/10 px-3 py-1 text-xs font-semibold text-brand-trust",
        className,
      )}
      {...props}
    />
  );
}
