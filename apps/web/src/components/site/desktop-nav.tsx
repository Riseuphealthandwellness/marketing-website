"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isExternalUrl } from "@/lib/integrations/patient-access";
import { cn } from "@/lib/utils";
import type { SiteNavItem, SiteNavMegaMenu } from "@/lib/cms/types";

const navLinkClassName =
  "font-heading inline-flex h-10 items-center rounded-md px-4 text-[15px] font-semibold text-brand-trust/78 transition-colors hover:bg-brand-warm-accent/10 hover:text-brand-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-brand-warm-white/78 dark:hover:bg-brand-action-hover/16 dark:hover:text-brand-soft-accent";

type MegaMenuItemProps = {
  item: SiteNavMegaMenu;
};

function MegaMenuItem({ item }: MegaMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu modal={false} onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            navLinkClassName,
            "gap-1.5 bg-transparent data-[state=open]:bg-brand-warm-accent/10 data-[state=open]:text-brand-action-hover dark:data-[state=open]:bg-brand-action-hover/16 dark:data-[state=open]:text-brand-soft-accent",
          )}
          type="button"
        >
          {item.label}
          <ChevronDown
            aria-hidden="true"
            className="size-4 transition-transform data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[min(58rem,calc(100vw-3rem))] p-3"
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,0.68fr)_minmax(0,1.42fr)]">
          <Link
            className="flex min-h-full flex-col justify-between overflow-hidden rounded-lg bg-muted/55 transition-colors hover:bg-muted/80"
            href={item.ctaHref}
            onClick={() => setIsOpen(false)}
          >
            <div className="space-y-4">
              <div className="overflow-hidden border-b border-border/70">
                <Image
                  alt={item.image.alt ?? ""}
                  className="aspect-[16/9] w-full object-cover"
                  height={item.image.height ?? 768}
                  priority
                  src={item.image.url}
                  width={item.image.width ?? 1024}
                />
              </div>
              <div className="space-y-3 px-5 pb-5">
                {item.eyebrow ? (
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.04em] text-brand-warm-accent">
                    {item.eyebrow}
                  </p>
                ) : null}
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold leading-tight text-foreground">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 px-5 pb-5 text-sm font-semibold text-foreground">
              {item.ctaLabel}
              <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" />
            </span>
          </Link>

          {item.groups && item.groups.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {item.groups.map((group) => (
                <div key={group.title} className="rounded-lg p-2">
                  <h3 className="font-heading px-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-brand-warm-accent">
                    {group.title}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className="group flex items-start gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted/70"
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-semibold leading-5 text-foreground">
                              {link.label}
                            </span>
                            {link.description ? (
                              <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                                {link.description}
                              </span>
                            ) : null}
                          </span>
                          <ChevronRight
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DesktopNav({ mainNav }: { mainNav: SiteNavItem[] }) {
  return (
    <div className="flex items-center gap-1">
      {mainNav.map((item) =>
        item._type === "navMegaMenu" ? (
          <MegaMenuItem key={item.label} item={item} />
        ) : (
          <Link
            key={item.label}
            className={navLinkClassName}
            href={item.href}
            rel={isExternalUrl(item.href) ? "noreferrer" : undefined}
            target={isExternalUrl(item.href) ? "_blank" : undefined}
          >
            {item.label}
          </Link>
        ),
      )}
    </div>
  );
}
