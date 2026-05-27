import {
  ArrowRight,
  ClipboardList,
  HeartPulse,
  Route,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { HomepageCareOptions, ServiceHighlight } from "@/lib/cms/types";

const serviceIcons = [HeartPulse, ClipboardList, Route];

type HighlightsGridProps = {
  content?: HomepageCareOptions;
  services?: ServiceHighlight[];
};

export function HighlightsGrid({ content, services }: HighlightsGridProps) {
  const items = services ?? [];
  if (!content && items.length === 0) return null;

  return (
    <Section className="bg-background pb-10 pt-14 sm:pb-12 sm:pt-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:order-2">
            {content?.eyebrow ? (
              <p className="font-heading text-sm font-black uppercase text-brand-emphasis">
                {content.eyebrow}
              </p>
            ) : null}
            <Image
              alt="Clinicians standing near healthcare service doors"
              className="mt-6 h-auto w-full object-contain"
              height={452}
              sizes="(min-width: 1024px) 38vw, 100vw"
              src="/images/illustrations/Asset%2034.png"
              width={1424}
            />
            {content?.heading ? (
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
                {content.heading}
              </h2>
            ) : null}
            {content?.description ? (
              <p className="mt-4 max-w-xl text-lg leading-7 text-muted-foreground">
                {content.description}
              </p>
            ) : null}
            {content?.ctaLabel && content.ctaHref ? (
              <Link
                className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand-trust hover:text-brand-action-hover hover:underline"
                href={content.ctaHref}
              >
                {content.ctaLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            ) : null}
          </div>

          <div className="grid gap-0 overflow-hidden rounded-lg border border-border bg-card lg:order-1">
            {items.map((service, index) => {
              const Icon = serviceIcons[index] ?? HeartPulse;

              return (
                <Link
                  className="grid gap-4 border-b border-border px-5 py-6 transition-colors last:border-b-0 hover:bg-muted/55 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center"
                  href={service.href}
                  key={service.title}
                >
                  <span className="flex size-14 items-center justify-center rounded-md bg-brand-warm-accent/12 text-brand-action">
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <span>
                    <span className="block font-heading text-xl font-black tracking-normal text-foreground">
                      {service.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="hidden size-5 text-brand-trust sm:block" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
