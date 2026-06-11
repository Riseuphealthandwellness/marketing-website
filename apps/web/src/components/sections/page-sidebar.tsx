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
      <div className="sticky top-24 divide-y divide-border border-y border-border">
        {cards.map((card, i) => (
          <div
            key={i}
            className="py-5"
          >
            <h3 className="font-heading text-lg font-black leading-tight tracking-normal text-brand-action">
              {card.heading}
            </h3>
            {card.description ? (
              <p className="mt-2 text-base leading-6 text-brand-trust">
                {card.description}
              </p>
            ) : null}
            {card.ctaLabel && card.ctaHref ? (
              <Link
                href={card.ctaHref}
                className="mt-4 inline-flex items-center gap-1 text-sm font-black uppercase tracking-wide text-brand-trust transition-colors hover:text-brand-action"
              >
                {card.ctaLabel}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
