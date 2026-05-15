import type * as React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  size?: "default" | "narrow" | "reading" | "wide";
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "reading" && "max-w-4xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}
