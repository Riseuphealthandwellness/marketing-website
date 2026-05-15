"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      return;
    }

    window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
