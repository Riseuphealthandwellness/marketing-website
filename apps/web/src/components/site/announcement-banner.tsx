"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Announcement } from "@/lib/cms/types";

const STORAGE_KEY_PREFIX = "announcement-dismissed-";

type AnnouncementBannerProps = {
  announcement: Announcement;
  id: string;
};

export function AnnouncementBanner({ announcement, id }: AnnouncementBannerProps) {
  const [visible, setVisible] = useState(false);
  const storageKey = `${STORAGE_KEY_PREFIX}${id}`;

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) setVisible(true);
  }, [storageKey]);

  function dismiss() {
    localStorage.setItem(storageKey, "1");
    setVisible(false);
  }

  if (!visible) return null;

  const { message, link } = announcement;

  return (
    <div className="relative bg-brand-action py-2.5 text-center text-sm font-medium text-white">
      <span>{message}</span>
      {link?.href && link.label ? (
        <>
          {" "}
          <Link
            href={link.href}
            className="underline underline-offset-2 hover:no-underline"
          >
            {link.label}
          </Link>
        </>
      ) : null}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 opacity-80 hover:opacity-100"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
