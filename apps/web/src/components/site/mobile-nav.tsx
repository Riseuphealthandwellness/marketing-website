"use client";

import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import type { SiteNavItem, SiteNavMegaMenu } from "@/lib/cms/types";

function MegaMenuSection({
  item,
  onClose,
}: {
  item: SiteNavMegaMenu;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border/60">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-foreground"
        onClick={() => setExpanded((v) => !v)}
        type="button"
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded ? (
        <div className="pb-3">
          <Link
            className="mx-5 mb-3 flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2.5 text-sm font-semibold text-foreground"
            href={item.ctaHref}
            onClick={onClose}
          >
            {item.ctaLabel}
            <ChevronRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
          </Link>

          {item.groups?.map((group) => (
            <div key={group.title} className="px-5 pb-1">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="block rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                      href={link.href}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function MobileNavButton({ mainNav }: { mainNav: SiteNavItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted lg:hidden"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {mounted
        ? createPortal(
            <>
              {/* Backdrop — portal ensures it sits above the sticky header */}
              <div
                aria-hidden="true"
                className={cn(
                  "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
                  open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={close}
              />

              {/* Slide-in panel */}
              <div
                aria-label="Mobile navigation"
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex w-[min(320px,90vw)] flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
                  open ? "translate-x-0" : "translate-x-full",
                )}
                role="dialog"
              >
                <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-border px-5">
                  <span className="font-heading text-base font-semibold text-foreground">
                    Menu
                  </span>
                  <button
                    aria-label="Close menu"
                    className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={close}
                    type="button"
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </div>

                <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto">
                  {mainNav.map((item) =>
                    item._type === "navMegaMenu" ? (
                      <MegaMenuSection key={item.label} item={item} onClose={close} />
                    ) : (
                      <Link
                        key={item.label}
                        className="flex items-center border-b border-border/60 px-5 py-4 text-base font-semibold text-foreground hover:bg-muted/40"
                        href={item.href}
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </nav>
              </div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
