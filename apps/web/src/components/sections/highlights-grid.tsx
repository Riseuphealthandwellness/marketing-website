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
import type { ServiceHighlight } from "@/lib/cms/types";

const serviceIcons = [HeartPulse, ClipboardList, Route];

type HighlightsGridProps = {
  services?: ServiceHighlight[];
};

export function HighlightsGrid({ services }: HighlightsGridProps) {
  const items = services ?? [];
  return (
    <Section className="bg-background py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:order-2">
            <p className="font-heading text-sm font-black uppercase text-brand-emphasis">
              Care options
            </p>
            <Image
              alt="Clinicians standing near healthcare service doors"
              className="mt-6 h-auto w-full object-contain"
              height={452}
              sizes="(min-width: 1024px) 38vw, 100vw"
              src="/images/illustrations/Asset%2034.png"
              width={1424}
            />
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
              Choose the door that matches the need.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Some visitors arrive looking for treatment support. Others need
              primary care, program information, or a referral route. Keep each
              path distinct and easy to scan.
            </p>
            <Link
              className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand-trust hover:text-brand-action-hover hover:underline"
              href="/care"
            >
              View care overview
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid gap-0 overflow-hidden rounded-lg border border-border bg-card lg:order-1">
            {items.map((service, index) => {
              const Icon = serviceIcons[index] ?? HeartPulse;

              return (
                <Link
                  className="grid gap-4 border-b border-border p-6 transition-colors last:border-b-0 hover:bg-muted/55 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center"
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
