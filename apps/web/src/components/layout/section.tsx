import type * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "default" | "surface" | "muted";
};

export function Section({ className, tone = "default", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-12 sm:py-14 lg:py-16",
        tone === "surface" && "bg-surface text-surface-foreground",
        tone === "muted" && "bg-muted",
        className,
      )}
      {...props}
    />
  );
}
