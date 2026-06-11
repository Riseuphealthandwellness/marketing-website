import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { getCardColor, getCareIcon } from "@/components/care/care-icon";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";
import { getProgramHref, getServiceHref } from "@/lib/care-routes";
import { getMarketingPage, getPrograms, getServices, getSiteSettings } from "@/lib/cms/content-source";
import type { Drug, Program, Service, ServicesPageSectionContent } from "@/lib/cms/types";

export const generateMetadata = () => metadataForPage("services", "/care/services");

type ConditionLink = { key: string; title: string; href: string };

function buildConditionLinks(services: Service[]): {
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

    service.medications?.forEach((drug: Pick<Drug, "slug" | "name" | "description">) => {
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

function SectionHeader({
  content,
  align = "left",
}: {
  content?: ServicesPageSectionContent;
  align?: "left" | "center";
}) {
  if (!content?.eyebrow && !content?.heading && !content?.description) return null;

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {content.eyebrow ? (
        <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
          {content.eyebrow}
        </p>
      ) : null}
      {content.heading ? (
        <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
          {content.heading}
        </h2>
      ) : null}
      {content.description ? (
        <p className="mt-3 text-base leading-7 text-brand-trust/76 sm:text-lg">
          {content.description}
        </p>
      ) : null}
    </div>
  );
}

function ConditionList({ heading, links }: { heading: string; links: ConditionLink[] }) {
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

function ProgramsGrid({ programs, ctaLabel }: { programs: Program[]; ctaLabel?: string }) {
  if (!programs.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {programs.map((program) => (
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
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{program.description}</p>
            {ctaLabel ? (
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-action">
                {ctaLabel}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </span>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function ServicesPage() {
  const [services, programs, page, settings] = await Promise.all([
    getServices(),
    getPrograms(),
    getMarketingPage("services"),
    getSiteSettings(),
  ]);
  if (!page) notFound();

  const content = page.servicesPageContent;
  const breadcrumbs = resolveBreadcrumbs(
    page.path ?? "/care/services",
    page.breadcrumbs,
    settings?.showBreadcrumbs,
  );
  const { conditions, treatments } = buildConditionLinks(services);
  const hasConditionsOrTreatments = conditions.length > 0 || treatments.length > 0;

  return (
    <>
      <PageHero
        backgroundImage={page.heroImage}
        breadcrumbs={breadcrumbs}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      {/* ── Alternating full-width service panels ── */}
      {services.length > 0 ? (
        <div className="divide-y divide-border border-b border-border">
          {services.map((service, i) => {
            const Icon = getCareIcon(service.icon);
            const panelBg = getCardColor(service.cardColor, i);
            const isReversed = i % 2 === 1;

            return (
              <div
                key={service.slug}
                className="group grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)_minmax(0,40rem)_minmax(0,1fr)]"
              >
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:block ${
                    isReversed ? panelBg : "bg-background"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:block ${
                    isReversed ? "bg-background" : panelBg
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:block ${
                    isReversed ? "bg-black/10" : "bg-brand-coal/[0.035]"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:block ${
                    isReversed ? "bg-brand-coal/[0.035]" : "bg-black/10"
                  }`}
                />

                {/* Text side */}
                <div
                  className={`relative z-10 flex flex-col justify-center bg-background px-4 py-12 transition-colors group-hover:bg-brand-warm-accent/[0.08] group-hover:ring-1 group-hover:ring-inset group-hover:ring-brand-action/20 sm:px-6 lg:row-start-1 lg:bg-transparent lg:px-8 lg:py-20 ${
                    isReversed
                      ? "lg:col-start-3 lg:col-end-4"
                      : "lg:col-start-2 lg:col-end-3"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="select-none font-heading text-[7rem] font-black leading-none tracking-tight text-brand-coal/[0.06]"
                  >
                    0{i + 1}
                  </span>
                  <h2 className="-mt-6 font-heading text-4xl font-black leading-tight tracking-normal text-brand-coal transition-colors group-hover:text-brand-action sm:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-8">
                    <Link
                      href={getServiceHref(service)}
                      className="inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-action px-6 font-heading text-sm font-bold text-brand-warm-white transition-colors hover:bg-brand-action-hover"
                    >
                      {content?.services?.ctaLabel ?? "Learn more"}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>

                {/* Colored panel side */}
                <div
                  className={`relative z-10 flex min-h-[220px] items-center justify-center ${panelBg} px-4 sm:px-6 lg:row-start-1 lg:min-h-full lg:bg-transparent lg:px-8 ${
                    isReversed
                      ? "lg:col-start-2 lg:col-end-3"
                      : "lg:col-start-3 lg:col-end-4"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-28 text-white transition-transform duration-300 group-hover:scale-105 sm:size-36 lg:size-44"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* ── Conditions and treatments ── */}
      {hasConditionsOrTreatments ? (
        <Section tone="muted" className="py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="mb-8">
              {content?.references?.heading ? (
                <h2 className="font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                  {content.references.heading}
                </h2>
              ) : null}
              {content?.references?.description ? (
                <p className="mt-3 text-base leading-7 text-brand-trust/76">
                  {content.references.description}
                </p>
              ) : null}
            </div>
            <div className="grid gap-10">
              <ConditionList
                heading={content?.references?.conditionsHeading ?? "Conditions we treat"}
                links={conditions}
              />
              <ConditionList
                heading={content?.references?.treatmentsHeading ?? "Medications & treatments"}
                links={treatments}
              />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ── Programs ── */}
      {programs.length > 0 ? (
        <Section className="py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="mb-8">
              <SectionHeader content={content?.programs} />
            </div>
            <ProgramsGrid programs={programs} ctaLabel={content?.programs?.ctaLabel} />
          </Container>
        </Section>
      ) : null}

      {page.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      <ContactBand />
    </>
  );
}
