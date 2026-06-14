import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardList, ExternalLink, PhoneCall } from "lucide-react";

import { getCardColor, getCareIcon } from "@/components/care/care-icon";
import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CareModelSection } from "@/components/sections/care-model-section";
import { ContactFormSection } from "@/components/sections/contact-form-section";
import { PositionsListSection } from "@/components/sections/positions-list-section";
import { ConditionList } from "@/components/sections/condition-list";
import { FaqSection } from "@/components/sections/faq-section";
import { TeamMemberPortrait } from "@/components/team/team-member-portrait";
import { TeamMemberCard } from "@/components/team/team-member-card";
import { Badge } from "@/components/ui/badge";
import { getProgramHref, getServiceHref } from "@/lib/care-routes";
import type { BlocksListItem, Drug, PageBlock, ServiceConditionsBlock } from "@/lib/cms/types";

const stepIcons = {
  phone: PhoneCall,
  clipboard: ClipboardList,
  "calendar-check": CalendarCheck,
} as const;

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

type ConditionLink = { key: string; title: string; href: string };

function buildConditionLinks(services: ServiceConditionsBlock["services"]): {
  conditions: ConditionLink[];
  treatments: ConditionLink[];
} {
  const conditions = new Map<string, ConditionLink>();
  const treatments = new Map<string, ConditionLink>();

  services.forEach((service) => {
    service.conditions?.forEach((condition) => {
      if (!condition.slug || !condition.category) return;
      const key = `${condition.category}:${condition.slug}`;
      if (!conditions.has(key)) {
        conditions.set(key, {
          key,
          title: condition.title,
          href: `/care/services/${service.slug}/conditions/${condition.slug}`,
        });
      }
    });
    service.medications?.forEach((drug: Pick<Drug, "slug" | "name">) => {
      if (!drug.slug) return;
      treatments.set(drug.slug, {
        key: drug.slug,
        title: drug.name,
        href: `/care/medications/${drug.slug}`,
      });
    });
  });

  return {
    conditions: Array.from(conditions.values()).sort((a, b) => a.title.localeCompare(b.title)),
    treatments: Array.from(treatments.values()).sort((a, b) => a.title.localeCompare(b.title)),
  };
}

function ConditionRefList({ heading, links }: { heading: string; links: ConditionLink[] }) {
  if (!links.length) return null;
  return (
    <div>
      <h3 className="border-b-2 border-brand-action pb-2 font-heading text-xs font-black uppercase tracking-widest text-brand-coal">
        {heading}
      </h3>
      <ul className="mt-1 columns-2 gap-x-6 sm:columns-3">
        {links.map((link) => (
          <li key={link.key} className="break-inside-avoid border-b border-border/50">
            <Link
              href={link.href}
              className="group flex items-center justify-between py-1.5 text-sm text-foreground transition-colors hover:text-brand-action"
            >
              <span>{link.title}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-action"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const blocksListCardClass =
  "group flex h-full flex-col rounded-lg border border-border bg-white p-4 text-brand-coal shadow-sm transition-shadow hover:shadow-md";

function BlocksListCardContent({ item }: { item: BlocksListItem }) {
  return (
    <>
      <div className="flex justify-center pb-4 pt-2">
        <TeamMemberPortrait
          image={item.image}
          name={item.title}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col">
        {item.badge ? (
          <Badge className="mb-3 w-fit border-brand-trust/20 bg-brand-trust/10 text-brand-trust">
            {item.badge}
          </Badge>
        ) : null}
        <h3 className="font-heading text-lg font-black tracking-normal text-brand-coal">
          {item.title}
          {item.titleSuffix ? (
            <span className="ml-1.5 font-sans text-sm font-normal text-brand-trust/78">
              {item.titleSuffix}
            </span>
          ) : null}
        </h3>
        {item.subtitle ? (
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-warm-accent">
            {item.subtitle}
          </p>
        ) : null}
        <p className="mt-3 line-clamp-3 text-sm text-brand-trust/82">
          {item.description}
        </p>
        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                className="rounded-full bg-brand-warm-white px-2.5 py-1 text-xs font-semibold text-brand-trust"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {item.ctaHref && item.ctaLabel ? (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-action group-hover:underline">
            {item.ctaLabel}
            {isExternalUrl(item.ctaHref) ? (
              <ExternalLink className="size-3.5" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-3.5" aria-hidden="true" />
            )}
          </span>
        ) : null}
      </div>
    </>
  );
}

function BlocksListCards({ items }: { items: BlocksListItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        if (item.ctaHref) {
          if (isExternalUrl(item.ctaHref)) {
            return (
              <a
                key={item.title}
                href={item.ctaHref}
                rel="noreferrer"
                target="_blank"
                className={blocksListCardClass}
              >
                <BlocksListCardContent item={item} />
              </a>
            );
          }

          return (
            <Link key={item.title} href={item.ctaHref} className={blocksListCardClass}>
              <BlocksListCardContent item={item} />
            </Link>
          );
        }

        return (
          <article key={item.title} className={blocksListCardClass}>
            <BlocksListCardContent item={item} />
          </article>
        );
      })}
    </div>
  );
}

function BlocksListHeader({
  eyebrow,
  heading,
  description,
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  if (!eyebrow && !heading && !description) return null;

  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
          {eyebrow}
        </p>
      ) : null}
      {heading ? (
        <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
          {heading}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-brand-trust/82 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function TeamListCards({ providers }: { providers: Extract<PageBlock, { _type: "teamListBlock" }>["providers"] }) {
  if (!providers.length) {
    return <p className="text-muted-foreground">Team member profiles will be added soon.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <TeamMemberCard key={provider.slug} provider={provider} />
      ))}
    </div>
  );
}

type PageBlocksProps = {
  blocks: PageBlock[];
  compact?: boolean;
};

export function PageBlocks({ blocks, compact = false }: PageBlocksProps) {
  if (compact) {
    return (
      <div className="space-y-5">
        {blocks.map((block, index) => {
          if (block._type === "pageSection") {
            return (
              <div key={index} className="space-y-3 pt-8 first:pt-0">
                <h2 className="font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                  {block.heading}
                </h2>
                <PortableTextContent
                  className="[&_p]:!text-brand-trust/82 [&_p]:sm:!text-lg"
                  value={block.body}
                />
              </div>
            );
          }

          if (block._type === "ctaBlock") {
            return (
              <div key={index} className="space-y-4 rounded-lg bg-muted p-5 pt-8 first:pt-5">
                <div>
                  <h2 className="font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
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

          if (block._type === "blocksListBlock") {
            if (!block.items?.length) return null;
            return (
              <div
                key={index}
                className="relative left-1/2 w-screen -translate-x-1/2 bg-surface py-10 sm:py-12 lg:py-14"
              >
                <Container>
                  <BlocksListHeader
                    eyebrow={block.sectionEyebrow}
                    heading={block.sectionHeading}
                    description={block.description}
                  />
                  <BlocksListCards items={block.items} />
                </Container>
              </div>
            );
          }

          if (block._type === "teamListBlock") {
            return (
              <div
                key={index}
                className="relative left-1/2 w-screen -translate-x-1/2 pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pb-12"
              >
                <Container>
                  <BlocksListHeader
                    eyebrow={block.sectionEyebrow}
                    heading={block.sectionHeading}
                    description={block.description}
                  />
                  <TeamListCards providers={block.providers} />
                </Container>
              </div>
            );
          }

          if (block._type === "positionsListBlock") {
            return (
              <div key={index} className="pt-8 first:pt-0">
                <PositionsListSection
                  eyebrow={block.sectionEyebrow}
                  heading={block.sectionHeading}
                  description={block.description}
                  emptyStateText={block.emptyStateText}
                  positions={block.positions ?? []}
                />
              </div>
            );
          }

          if (block._type === "newPatientStepsBlock") {
            if (!block.steps?.length) return null;
            return (
              <div key={index} className="pt-8 first:pt-0">
                <BlocksListHeader
                  eyebrow={block.sectionEyebrow}
                  heading={block.sectionHeading}
                  description={block.description}
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  {block.steps.map((step, i) => {
                    const Icon = stepIcons[step.iconName as keyof typeof stepIcons];
                    return (
                      <div key={step.title} className="flex flex-col rounded-lg border border-border bg-white shadow-sm">
                        <div className="relative">
                          {step.image?.url ? (
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
                              <Image
                                src={step.image.url}
                                alt={step.image.alt ?? step.title}
                                fill
                                className="rounded-t-lg object-cover"
                                placeholder={step.image.lqip ? "blur" : undefined}
                                blurDataURL={step.image.lqip ?? undefined}
                                sizes="(max-width: 640px) 100vw, 33vw"
                              />
                            </div>
                          ) : (
                            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-lg bg-brand-coal/[0.04]">
                              <span className="select-none font-heading text-[4rem] font-black leading-none text-brand-coal/[0.06]">
                                0{i + 1}
                              </span>
                            </div>
                          )}
                          <span className="absolute bottom-0 left-4 z-10 flex size-9 translate-y-1/2 items-center justify-center rounded-full bg-brand-warm-accent text-white ring-[3px] ring-white">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col px-4 pb-4 pt-7">
                          <h3 className="font-heading text-base font-black tracking-normal text-foreground">
                            {step.title}
                          </h3>
                          <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
                            {step.body}
                          </p>
                          {step.ctaHref && step.ctaLabel ? (
                            <a
                              href={step.ctaHref}
                              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-action hover:underline"
                              {...(isExternalUrl(step.ctaHref) ? { target: "_blank", rel: "noreferrer" } : {})}
                            >
                              {step.ctaLabel}
                              {isExternalUrl(step.ctaHref)
                                ? <ExternalLink className="size-3" aria-hidden="true" />
                                : <ArrowRight className="size-3" aria-hidden="true" />}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
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

        if (block._type === "servicesGridBlock") {
          if (!block.services.length) return null;
          const showViewAll = block.showViewAllCard !== false;
          const totalCards = block.services.length + (showViewAll ? 1 : 0);
          const gridCols =
            totalCards === 1 ? "sm:grid-cols-1 max-w-sm" :
            totalCards === 2 ? "sm:grid-cols-2" :
            totalCards === 3 ? "sm:grid-cols-3" :
            totalCards === 4 ? "sm:grid-cols-2 lg:grid-cols-4" :
            "sm:grid-cols-2 lg:grid-cols-3";
          return (
            <section key={index} className="bg-surface py-14 sm:py-16">
              <Container>
                {(block.sectionEyebrow || block.sectionHeading || block.sectionDescription) ? (
                  <div className="mb-12 text-center">
                    {block.sectionEyebrow ? (
                      <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                        {block.sectionEyebrow}
                      </p>
                    ) : null}
                    {block.sectionHeading ? (
                      <h2 className="mt-2 font-heading text-4xl font-black tracking-normal text-brand-coal sm:text-5xl">
                        {block.sectionHeading}
                      </h2>
                    ) : null}
                    {block.sectionDescription ? (
                      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-brand-coal/68">
                        {block.sectionDescription}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <div className={`grid gap-5 ${gridCols}`}>
                  {block.services.map((service, i) => {
                    const Icon = getCareIcon(service.icon);
                    const headerBg = getCardColor(service.cardColor, i);
                    return (
                      <Link key={service.slug} href={getServiceHref(service)} className="group">
                        <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-200 group-hover:shadow-lg">
                          <div className={`relative flex h-44 items-center justify-center overflow-hidden ${headerBg}`}>
                            <div aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                            <div aria-hidden="true" className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-white/8" />
                            <Icon aria-hidden="true" className="relative z-10 size-20 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <h3 className="font-heading text-xl font-black tracking-normal text-brand-coal transition-colors group-hover:text-brand-action">
                              {service.title}
                            </h3>
                            <p className="mt-2 flex-1 text-base leading-7 text-brand-coal/68">
                              {service.description}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-trust transition-colors group-hover:text-brand-action">
                              {block.ctaLabel ?? "Learn more"}
                              <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                  {showViewAll ? (
                    <Link href="/care/services" className="group">
                      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-200 group-hover:shadow-lg">
                        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-brand-coal">
                          <div aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/8" />
                          <div aria-hidden="true" className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-white/6" />
                          <ArrowRight aria-hidden="true" className="relative z-10 size-16 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-heading text-xl font-black tracking-normal text-brand-coal transition-colors group-hover:text-brand-action">
                            {block.viewAllLabel ?? "All services"}
                          </h3>
                          <p className="mt-2 flex-1 text-base leading-7 text-brand-coal/68">
                            {block.viewAllDescription ?? "Browse all conditions we treat, medications, and more."}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-trust transition-colors group-hover:text-brand-action">
                            View all
                            <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ) : null}
                </div>
              </Container>
            </section>
          );
        }

        if (block._type === "servicesListBlock") {
          if (!block.services.length) return null;
          return (
            <div key={index}>
              {block.sectionHeading ? (
                <div className="border-y border-border bg-white py-8 sm:py-10">
                  <Container>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        {block.sectionEyebrow ? (
                          <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                            {block.sectionEyebrow}
                          </p>
                        ) : null}
                        <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                          {block.sectionHeading}
                        </h2>
                      </div>
                      {block.viewAllLabel ? (
                        <Link
                          href="/care/services"
                          className="flex items-center gap-1.5 text-sm font-semibold text-brand-trust transition-colors hover:text-brand-action"
                        >
                          {block.viewAllLabel}
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                      ) : null}
                    </div>
                  </Container>
                </div>
              ) : null}
              <div className="bg-surface py-10 sm:py-12 lg:py-14">
                <Container>
                  <div className="flex flex-col gap-5">
                    {block.services.map((service, i) => {
                      const Icon = getCareIcon(service.icon);
                      const panelBg = getCardColor(service.cardColor, i);
                      const isReversed = i % 2 === 1;

                      return (
                        <article
                          key={service.slug}
                          className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className={`grid lg:items-stretch ${isReversed ? "lg:grid-cols-[1fr_380px]" : "lg:grid-cols-[380px_1fr]"}`}>
                            {/* Colored icon panel — always in the 380px column */}
                            <div
                              className={`relative flex min-h-[200px] items-center justify-center overflow-hidden ${panelBg} lg:min-h-[300px] ${
                                isReversed ? "lg:order-2" : "lg:order-1"
                              }`}
                            >
                              <div aria-hidden="true" className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/[0.08]" />
                              <div aria-hidden="true" className="absolute -bottom-12 -left-6 h-44 w-44 rounded-full bg-white/[0.06]" />
                              <Icon
                                aria-hidden="true"
                                className="relative z-10 size-24 text-white/90 transition-transform duration-300 group-hover:scale-105 sm:size-32 lg:size-36"
                              />
                            </div>

                            {/* Text side — always in the 1fr column */}
                            <div
                              className={`flex flex-col justify-center p-8 lg:p-12 ${
                                isReversed ? "lg:order-1" : "lg:order-2"
                              }`}
                            >
                              <h2 className="font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal transition-colors group-hover:text-brand-action sm:text-4xl">
                                {service.title}
                              </h2>
                              <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                                {service.description}
                              </p>
                              <div className="mt-8">
                                <Link
                                  href={getServiceHref(service)}
                                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-brand-action px-6 font-heading text-sm font-bold text-brand-warm-white transition-colors hover:bg-brand-action-hover"
                                >
                                  {block.ctaLabel ?? "Learn more"}
                                  <ArrowRight aria-hidden="true" className="size-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </Container>
              </div>
            </div>
          );
        }

        if (block._type === "serviceConditionsBlock") {
          const { conditions, treatments } = buildConditionLinks(block.services);
          if (!conditions.length && !treatments.length) return null;
          return (
            <Section key={index} tone="muted" className="py-10 sm:py-12 lg:py-14">
              <Container>
                {(block.heading || block.description) ? (
                  <div className="mb-8">
                    {block.heading ? (
                      <h2 className="font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                        {block.heading}
                      </h2>
                    ) : null}
                    {block.description ? (
                      <p className="mt-3 text-base leading-7 text-brand-trust/76">
                        {block.description}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <div className="grid gap-10">
                  <ConditionRefList
                    heading={block.conditionsHeading ?? "Conditions we treat"}
                    links={conditions}
                  />
                  <ConditionRefList
                    heading={block.treatmentsHeading ?? "Medications & treatments"}
                    links={treatments}
                  />
                </div>
              </Container>
            </Section>
          );
        }

        if (block._type === "programsBlock") {
          if (!block.programs.length) return null;
          return (
            <Section key={index} className="py-10 sm:py-12 lg:py-14">
              <Container>
                {(block.eyebrow || block.heading || block.description) ? (
                  <div className="mb-8 max-w-3xl">
                    {block.eyebrow ? (
                      <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                        {block.eyebrow}
                      </p>
                    ) : null}
                    {block.heading ? (
                      <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                        {block.heading}
                      </h2>
                    ) : null}
                    {block.description ? (
                      <p className="mt-3 text-base leading-7 text-brand-trust/76 sm:text-lg">
                        {block.description}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <div className="grid gap-5 md:grid-cols-3">
                  {block.programs.map((program) => (
                    <Link
                      key={program.slug}
                      href={getProgramHref(program)}
                      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition-all hover:border-brand-action/30 hover:shadow-md"
                    >
                      <div className="h-1 w-full bg-[linear-gradient(90deg,var(--brand-warm-accent),var(--brand-emphasis),var(--brand-soft-accent))]" />
                      <div className="flex flex-1 flex-col p-5">
                        {program.audience ? (
                          <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-warm-accent">
                            {program.audience}
                          </p>
                        ) : null}
                        <h3 className="mt-3 font-heading text-xl font-black leading-tight tracking-normal text-brand-coal group-hover:text-brand-action">
                          {program.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {program.description}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-action">
                          {block.ctaLabel ?? "Learn more"}
                          <ArrowRight aria-hidden="true" className="size-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Container>
            </Section>
          );
        }

        if (block._type === "featureSplitBlock") {
          const isDark = block.tone === "dark";
          const isRight = block.imagePosition === "right";
          const sectionBg = isDark
            ? "bg-brand-trust text-brand-warm-white"
            : block.tone === "white"
            ? "bg-white text-brand-coal"
            : "bg-surface text-brand-coal";
          const eyebrowColor = isDark ? "text-brand-soft-accent" : "text-brand-action";
          const bodyColor = isDark ? "text-brand-warm-white/76" : "text-brand-coal/68";
          const ctaClass = isDark
            ? "bg-brand-warm-white text-brand-coal hover:bg-brand-warm-white/90"
            : "bg-brand-action text-brand-warm-white hover:bg-brand-action-hover";

          return (
            <section key={index} className={`${sectionBg} overflow-hidden`}>
              <div className={`grid lg:grid-cols-2`}>
                <div className={`relative min-h-[340px] lg:min-h-[520px] ${isRight ? "lg:order-2" : "lg:order-1"}`}>
                  {block.image?.url ? (
                    <Image
                      alt={block.image.alt ?? block.heading}
                      className="absolute inset-0 h-full w-full object-cover"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      src={block.image.url}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-coal/8">
                      <p className="text-sm italic text-brand-coal/36">Add a feature image in Studio</p>
                    </div>
                  )}
                </div>
                <div className={`flex flex-col justify-center px-8 py-14 sm:px-12 lg:py-20 ${isDark ? "" : "bg-white"} ${isRight ? "lg:order-1" : "lg:order-2"}`}>
                  {block.eyebrow ? (
                    <p className={`font-heading text-xs font-black uppercase tracking-widest ${eyebrowColor}`}>
                      {block.eyebrow}
                    </p>
                  ) : null}
                  <h2 className="mt-3 font-heading text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                    {block.heading}
                  </h2>
                  {block.description ? (
                    <p className={`mt-5 max-w-lg text-lg leading-8 ${bodyColor}`}>
                      {block.description}
                    </p>
                  ) : null}
                  {block.ctaLabel && block.ctaHref ? (
                    <div className="mt-8">
                      <Link
                        href={block.ctaHref}
                        className={`inline-flex min-h-12 items-center gap-2 rounded-md px-6 font-heading text-sm font-bold transition-colors ${ctaClass}`}
                      >
                        {block.ctaLabel}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        }

        if (block._type === "statsBandBlock") {
          return (
            <section key={index} className="relative isolate overflow-hidden bg-brand-coal py-16 text-brand-warm-white sm:py-20">
              {block.backgroundImage?.url ? (
                <>
                  <Image
                    alt={block.backgroundImage.alt ?? ""}
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                    fill
                    sizes="100vw"
                    src={block.backgroundImage.url}
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-coal/78" />
                </>
              ) : null}
              <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full opacity-10"
                preserveAspectRatio="none"
                viewBox="0 0 1440 480"
              >
                <path d="M-80 380C130 300 270 440 474 340C648 253 758 128 992 198C1192 258 1302 154 1520 192" fill="none" stroke="rgb(247 243 238)" strokeWidth="2" />
                <path d="M-60 270C148 208 298 308 506 250C714 190 820 72 1040 128C1212 174 1326 96 1504 116" fill="none" stroke="rgb(247 243 238)" strokeWidth="1.5" />
                <path d="M-80 162C160 118 318 188 528 152C740 114 858 20 1092 68C1268 105 1368 46 1520 56" fill="none" stroke="rgb(247 243 238)" strokeWidth="1" />
              </svg>
              <Container className="relative">
                {(block.eyebrow || block.heading) ? (
                  <div className="mb-12 text-center">
                    {block.eyebrow ? (
                      <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-soft-accent">
                        {block.eyebrow}
                      </p>
                    ) : null}
                    {block.heading ? (
                      <h2 className="mt-2 font-heading text-4xl font-black tracking-normal sm:text-5xl">
                        {block.heading}
                      </h2>
                    ) : null}
                  </div>
                ) : null}
                <div className={`grid gap-10 text-center ${block.stats.length === 2 ? "sm:grid-cols-2" : block.stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
                  {block.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="font-heading text-5xl font-black leading-none tracking-tight text-brand-warm-white sm:text-6xl">
                        {stat.value}
                      </span>
                      <span className="mt-3 font-heading text-base font-black uppercase tracking-widest text-brand-soft-accent">
                        {stat.label}
                      </span>
                      {stat.description ? (
                        <p className="mt-2 max-w-[14rem] text-sm leading-6 text-brand-warm-white/60">
                          {stat.description}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          );
        }

        if (block._type === "trustStripBlock") {
          const toneStyles: Record<string, string> = {
            trust: "bg-brand-trust text-brand-warm-white",
            action: "bg-brand-action text-brand-warm-white",
            dark: "bg-brand-coal text-brand-warm-white",
            warm: "bg-brand-warm-accent text-brand-coal",
          };
          const btnStyles: Record<string, string> = {
            trust: "border-brand-warm-white/40 text-brand-warm-white hover:bg-brand-warm-white/12",
            action: "border-brand-warm-white/40 text-brand-warm-white hover:bg-brand-warm-white/12",
            dark: "border-brand-warm-white/40 text-brand-warm-white hover:bg-brand-warm-white/12",
            warm: "border-brand-coal/30 text-brand-coal hover:bg-brand-coal/8",
          };
          const tone = block.tone ?? "trust";

          return (
            <section key={index} className={`${toneStyles[tone] ?? toneStyles.trust} py-6 sm:py-8`}>
              <Container>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="font-heading text-lg font-black leading-snug tracking-normal sm:text-xl">
                    {block.text}
                  </p>
                  {block.ctaLabel && block.ctaHref ? (
                    <Link
                      href={block.ctaHref}
                      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border px-5 text-sm font-bold transition-colors ${btnStyles[tone] ?? btnStyles.trust}`}
                    >
                      {block.ctaLabel}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  ) : null}
                </div>
              </Container>
            </section>
          );
        }

        if (block._type === "quoteBlock") {
          const isDark = block.tone === "dark";
          return (
            <section key={index} className={`${isDark ? "bg-brand-trust text-brand-warm-white" : "bg-surface text-brand-coal"} py-16 sm:py-20`}>
              <Container>
                <div className="mx-auto max-w-3xl text-center">
                  <svg aria-hidden="true" className={`mx-auto mb-6 h-10 w-10 ${isDark ? "text-brand-soft-accent/50" : "text-brand-action/30"}`} fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5C7.5 11.515 9.015 10 10 10V8Zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5C21.5 11.515 23.015 10 24 10V8Z" />
                  </svg>
                  <blockquote>
                    <p className="font-heading text-2xl font-black leading-snug tracking-normal sm:text-3xl">
                      {block.quote}
                    </p>
                  </blockquote>
                  {(block.attribution || block.photo?.url) ? (
                    <div className="mt-10 flex items-center justify-center gap-4">
                      {block.photo?.url ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-current/20 shadow-sm">
                          <Image
                            alt={block.photo.alt ?? block.attribution ?? ""}
                            className="object-cover"
                            fill
                            sizes="56px"
                            src={block.photo.url}
                          />
                        </div>
                      ) : (
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 ${isDark ? "border-brand-warm-white/20 bg-brand-warm-white/10" : "border-brand-coal/12 bg-brand-coal/6"}`}>
                          <span className={`text-xs italic ${isDark ? "text-brand-warm-white/40" : "text-brand-coal/30"}`}>photo</span>
                        </div>
                      )}
                      <div className="text-left">
                        {block.attribution ? (
                          <p className={`font-heading text-base font-black tracking-normal ${isDark ? "text-brand-warm-white" : "text-brand-coal"}`}>
                            {block.attribution}
                          </p>
                        ) : null}
                        {block.role ? (
                          <p className={`text-sm ${isDark ? "text-brand-warm-white/60" : "text-brand-coal/56"}`}>
                            {block.role}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Container>
            </section>
          );
        }

        if (block._type === "programsListBlock") {
          if (!block.programs.length) return null;
          return (
            <div key={index}>
              {block.sectionHeading ? (
                <div className="border-y border-border bg-brand-trust py-8 text-brand-warm-white sm:py-10">
                  <Container>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        {block.sectionEyebrow ? (
                          <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-soft-accent">
                            {block.sectionEyebrow}
                          </p>
                        ) : null}
                        <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal sm:text-4xl">
                          {block.sectionHeading}
                        </h2>
                      </div>
                      {block.viewAllLabel ? (
                        <Link
                          href="/care/programs"
                          className="flex items-center gap-1.5 text-sm font-semibold text-brand-warm-white/82 transition-colors hover:text-brand-warm-white"
                        >
                          {block.viewAllLabel}
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                      ) : null}
                    </div>
                  </Container>
                </div>
              ) : null}
              <div className="divide-y divide-border border-b border-border">
                {block.programs.map((program, i) => {
                  const Icon = getCareIcon(program.icon);
                  const panelBg = getCardColor(program.cardColor, i);
                  const isReversed = i % 2 === 1;
                  const headingOffset = program.audience ? "mt-3" : "-mt-5";

                  return (
                    <div
                      key={program.slug}
                      className="group grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)_minmax(0,40rem)_minmax(0,1fr)]"
                    >
                      <div aria-hidden="true" className={`hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:block ${isReversed ? panelBg : "bg-background"}`} />
                      <div aria-hidden="true" className={`hidden lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:block ${isReversed ? "bg-background" : panelBg}`} />
                      <div aria-hidden="true" className={`hidden lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:block ${isReversed ? "bg-black/10" : "bg-brand-coal/[0.035]"}`} />
                      <div aria-hidden="true" className={`hidden lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:block ${isReversed ? "bg-brand-coal/[0.035]" : "bg-black/10"}`} />

                      <div
                        className={`relative z-10 flex flex-col justify-center bg-background px-4 py-12 transition-colors group-hover:bg-brand-warm-accent/[0.08] group-hover:ring-1 group-hover:ring-inset group-hover:ring-brand-action/20 sm:px-6 lg:row-start-1 lg:bg-transparent lg:px-8 lg:py-20 ${
                          isReversed ? "lg:col-start-3 lg:col-end-4" : "lg:col-start-2 lg:col-end-3"
                        }`}
                      >
                        <span aria-hidden="true" className="select-none font-heading text-[6.5rem] font-black leading-none tracking-tight text-brand-coal/[0.06]">
                          0{i + 1}
                        </span>
                        {program.audience ? (
                          <p className="-mt-4 font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                            {program.audience}
                          </p>
                        ) : null}
                        <h2 className={`${headingOffset} font-heading text-4xl font-black leading-tight tracking-normal text-brand-coal transition-colors group-hover:text-brand-action sm:text-5xl`}>
                          {program.title}
                        </h2>
                        <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                          {program.description}
                        </p>
                        <div className="mt-8">
                          <Link
                            href={getProgramHref(program)}
                            className="inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-action px-6 font-heading text-sm font-bold text-brand-warm-white transition-colors hover:bg-brand-action-hover"
                          >
                            {block.ctaLabel ?? "Learn more"}
                            <ArrowRight aria-hidden="true" className="size-4" />
                          </Link>
                        </div>
                      </div>

                      <div
                        className={`relative z-10 flex min-h-[220px] items-center justify-center overflow-hidden ${panelBg} px-4 sm:px-6 lg:row-start-1 lg:min-h-full lg:bg-transparent lg:px-8 ${
                          isReversed ? "lg:col-start-2 lg:col-end-3" : "lg:col-start-3 lg:col-end-4"
                        }`}
                      >
                        <Icon aria-hidden="true" className="size-28 max-w-[65%] text-white transition-transform duration-300 group-hover:scale-105 sm:size-36 lg:size-44" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (block._type === "newPatientStepsBlock") {
          if (!block.steps?.length) return null;
          return (
            <div key={index}>
              <section className="pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pb-12">
                <Container>
                  <BlocksListHeader
                    eyebrow={block.sectionEyebrow}
                    heading={block.sectionHeading}
                    description={block.description}
                  />
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {block.steps.map((step, i) => {
                      const Icon = stepIcons[step.iconName];
                      return (
                        <div
                          key={step.title}
                          className="flex flex-col rounded-lg border border-border bg-white shadow-sm"
                        >
                          {/* Upper area — outer div is relative but NOT overflow-hidden so icon can spill out */}
                          <div className="relative">
                            {step.image?.url ? (
                              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                                <Image
                                  src={step.image.url}
                                  alt={step.image.alt ?? step.title}
                                  fill
                                  className="rounded-t-lg object-cover"
                                  placeholder={step.image.lqip ? "blur" : undefined}
                                  blurDataURL={step.image.lqip ?? undefined}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                              </div>
                            ) : (
                              <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-t-lg bg-brand-coal/[0.04]">
                                <span className="select-none font-heading text-[6rem] font-black leading-none text-brand-coal/[0.06]">
                                  0{i + 1}
                                </span>
                              </div>
                            )}
                            <span className="absolute bottom-0 left-6 z-10 flex size-11 translate-y-1/2 items-center justify-center rounded-full bg-brand-warm-accent text-white ring-4 ring-white">
                              <Icon className="size-5" aria-hidden="true" />
                            </span>
                          </div>

                          {/* Content area */}
                          <div className="flex flex-1 flex-col px-6 pb-6 pt-9">
                            <h3 className="font-heading text-xl font-black tracking-normal text-foreground">
                              {step.title}
                            </h3>
                            <p className="mt-2 flex-1 text-base leading-7 text-muted-foreground">
                              {step.body}
                            </p>
                            {step.ctaHref && step.ctaLabel ? (
                              <a
                                href={step.ctaHref}
                                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-action hover:underline"
                                {...(isExternalUrl(step.ctaHref) ? { target: "_blank", rel: "noreferrer" } : {})}
                              >
                                {step.ctaLabel}
                                {isExternalUrl(step.ctaHref)
                                  ? <ExternalLink className="size-3.5" aria-hidden="true" />
                                  : <ArrowRight className="size-3.5" aria-hidden="true" />}
                              </a>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Container>
              </section>
            </div>
          );
        }

        if (block._type === "contactFormBlock") {
          return <ContactFormSection key={index} content={block} />;
        }

        if (block._type === "blocksListBlock") {
          if (!block.items?.length) return null;
          return (
            <Section key={index} className="bg-surface py-10 sm:py-12 lg:py-14">
              <Container>
                <BlocksListHeader
                  eyebrow={block.sectionEyebrow}
                  heading={block.sectionHeading}
                  description={block.description}
                />
                <BlocksListCards items={block.items} />
              </Container>
            </Section>
          );
        }

        if (block._type === "teamListBlock") {
          return (
            <Section key={index} className="pt-0 pb-8 sm:pt-0 sm:pb-10 lg:pt-0 lg:pb-12">
              <Container>
                <BlocksListHeader
                  eyebrow={block.sectionEyebrow}
                  heading={block.sectionHeading}
                  description={block.description}
                />
                <TeamListCards providers={block.providers} />
              </Container>
            </Section>
          );
        }

        if (block._type === "positionsListBlock") {
          return (
            <Section key={index}>
              <Container>
                <PositionsListSection
                  eyebrow={block.sectionEyebrow}
                  heading={block.sectionHeading}
                  description={block.description}
                  emptyStateText={block.emptyStateText}
                  positions={block.positions ?? []}
                />
              </Container>
            </Section>
          );
        }

        return null;
      })}
    </>
  );
}
