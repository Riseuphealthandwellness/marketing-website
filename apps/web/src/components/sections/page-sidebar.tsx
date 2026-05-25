import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { SidebarCard } from "@/lib/cms/types";

type PageSidebarProps = {
  cards: SidebarCard[];
};

export function PageSidebar({ cards }: PageSidebarProps) {
  if (!cards.length) return null;

  return (
    <aside>
      <div className="sticky top-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {cards.map((card, i) => (
          <div
            key={i}
            className="px-6 py-5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
          >
            <h3 className="font-heading text-base font-black tracking-normal text-brand-action">
              {card.heading}
            </h3>
            {card.description ? (
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
            ) : null}
            {card.ctaLabel && card.ctaHref ? (
              <Link
                href={card.ctaHref}
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-action transition-colors hover:text-brand-action-hover"
              >
                {card.ctaLabel}
                <ArrowRight className="size-3" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
