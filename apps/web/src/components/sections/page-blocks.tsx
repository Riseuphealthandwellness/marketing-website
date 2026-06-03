import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CareModelSection } from "@/components/sections/care-model-section";
import { ConditionList } from "@/components/sections/condition-list";
import { FaqSection } from "@/components/sections/faq-section";
import { getProgramHref, getServiceHref } from "@/lib/care-routes";
import type { PageBlock } from "@/lib/cms/types";

type PageBlocksProps = {
  blocks: PageBlock[];
  compact?: boolean;
};

export function PageBlocks({ blocks, compact = false }: PageBlocksProps) {
  if (compact) {
    return (
      <div className="space-y-8 divide-y divide-border">
        {blocks.map((block, index) => {
          if (block._type === "pageSection") {
            return (
              <div key={index} className="space-y-3 pt-8 first:pt-0">
                <h2 className="font-heading text-2xl font-black tracking-normal text-foreground sm:text-3xl">
                  {block.heading}
                </h2>
                <PortableTextContent value={block.body} />
              </div>
            );
          }

          if (block._type === "ctaBlock") {
            return (
              <div key={index} className="space-y-4 rounded-lg bg-muted p-5 pt-8 first:pt-5">
                <div>
                  <h2 className="font-heading text-2xl font-black tracking-normal text-foreground sm:text-3xl">
                    {block.heading}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{block.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    href={block.primaryHref}
                  >
                    {block.primaryLabel}
                  </a>
                  {block.secondaryLabel && block.secondaryHref ? (
                    <a
                      className="inline-flex h-9 items-center rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted"
                      href={block.secondaryHref}
                    >
                      {block.secondaryLabel}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          }

          if (block._type === "faqBlock") {
            return (
              <div key={index} className="pt-8 first:pt-0">
                <FaqSection faqs={block.faqs} heading={block.heading} />
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (block._type === "pageSection") {
          return (
            <Section key={index}>
              <Container>
                <div className="max-w-4xl space-y-3">
                  <h2 className="font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
                    {block.heading}
                  </h2>
                  <PortableTextContent value={block.body} />
                </div>
              </Container>
            </Section>
          );
        }

        if (block._type === "ctaBlock") {
          return (
            <Section key={index} tone="muted">
              <Container>
                <div className="max-w-4xl space-y-4">
                  <div>
                    <h2 className="font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
                      {block.heading}
                    </h2>
                    <p className="mt-2 text-base leading-7 text-muted-foreground">
                      {block.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      href={block.primaryHref}
                    >
                      {block.primaryLabel}
                    </a>
                    {block.secondaryLabel && block.secondaryHref ? (
                      <a
                        className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted"
                        href={block.secondaryHref}
                      >
                        {block.secondaryLabel}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Container>
            </Section>
          );
        }

        if (block._type === "careModelBlock") {
          return (
            <CareModelSection
              key={index}
              eyebrow={block.eyebrow}
              heading={block.heading}
              description={block.description}
              items={block.items}
            />
          );
        }

        if (block._type === "conditionsBlock") {
          return (
            <ConditionList
              key={index}
              conditions={block.conditions}
              serviceSlug={block.category}
              heading={block.heading}
            />
          );
        }

        if (block._type === "faqBlock") {
          return (
            <FaqSection
              key={index}
              faqs={block.faqs}
              heading={block.heading}
            />
          );
        }

        if (block._type === "servicesBlock") {
          if (!block.services.length) return null;
          return (
            <Section key={index}>
              <Container>
                {block.heading ? (
                  <h2 className="mb-6 font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
                    {block.heading}
                  </h2>
                ) : null}
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                  {block.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={getServiceHref(service)}
                      className="group flex items-center justify-between gap-4 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-muted/50"
                    >
                      <div>
                        <span className="block font-heading text-base font-black tracking-normal text-foreground group-hover:text-brand-action">
                          {service.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </span>
                      </div>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-action"
                      />
                    </Link>
                  ))}
                </div>
              </Container>
            </Section>
          );
        }

        if (block._type === "programsBlock") {
          if (!block.programs.length) return null;
          return (
            <Section key={index}>
              <Container>
                {block.heading ? (
                  <h2 className="mb-6 font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
                    {block.heading}
                  </h2>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {block.programs.map((program) => (
                    <Link
                      key={program.slug}
                      href={getProgramHref(program)}
                      className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand-action/30 hover:bg-muted/40"
                    >
                      <div>
                        {program.audience ? (
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {program.audience}
                          </p>
                        ) : null}
                        <h3 className="font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                          {program.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">
                          {program.description}
                        </p>
                      </div>
                      <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-action">
                        Learn more
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </Container>
            </Section>
          );
        }

        return null;
      })}
    </>
  );
}
