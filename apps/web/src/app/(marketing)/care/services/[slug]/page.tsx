import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { getConditionHref, getTreatmentHref } from "@/lib/care-routes";
import { getAllServiceSlugs, getServiceBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) return {};
  return createPageMetadata({
    title: service.title,
    description: service.description,
    path: `/care/services/${slug}`,
    seo: service.seo,
    site: settings ?? undefined,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) notFound();

  const hasConditions = (service.conditions?.length ?? 0) > 0;
  const hasMedications = (service.medications?.length ?? 0) > 0;
  const sidebar = service.sidebar ?? [];
  const hasSidebar = sidebar.length > 0;
  const blocks = service.blocks ?? [];
  const firstSectionIdx = hasSidebar ? blocks.findIndex((b) => b._type === "pageSection") : -1;
  const preBlocks = firstSectionIdx > 0 ? blocks.slice(0, firstSectionIdx) : [];
  const sectionBlock = firstSectionIdx >= 0 ? blocks[firstSectionIdx] : null;
  const postBlocks = firstSectionIdx >= 0 ? blocks.slice(firstSectionIdx + 1) : blocks;

  return (
    <>
      <PageHero
        backgroundImage={service.heroImage}
        breadcrumbs={resolveBreadcrumbs(`/care/services/${slug}`, undefined, settings?.showBreadcrumbs)}
        eyebrow="Services"
        title={service.title}
        description={service.description}
      />

      {preBlocks.length > 0 ? <PageBlocks blocks={preBlocks} /> : null}

      {hasSidebar && sectionBlock ? (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-12">
              <PageBlocks blocks={[sectionBlock]} compact />
              <PageSidebar cards={sidebar} />
            </div>
          </Container>
        </Section>
      ) : null}

      {postBlocks.length > 0 ? <PageBlocks blocks={postBlocks} /> : null}

      {hasConditions || hasMedications ? (
        <Section tone="muted" className="py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="grid gap-10">
              {hasConditions ? (
                <div>
                  <h3 className="border-b-2 border-brand-action pb-3 font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal sm:text-3xl">
                    Conditions we treat
                  </h3>
                  <ul className="mt-1 columns-2 gap-x-6 sm:columns-3">
                    {service.conditions!.map((condition) => (
                      <li key={condition.slug} className="break-inside-avoid border-b border-border/50">
                        <Link
                          href={getConditionHref(condition, { serviceSlug: service.slug })}
                          className="group flex items-center justify-between py-1.5 text-sm text-foreground transition-colors hover:text-brand-action"
                        >
                          <span>{condition.title}</span>
                          <ArrowRight aria-hidden="true" className="size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-action" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {hasMedications ? (
                <div>
                  <h3 className="border-b-2 border-brand-action pb-3 font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal sm:text-3xl">
                    Medications &amp; treatments
                  </h3>
                  <ul className="mt-1 columns-2 gap-x-6 sm:columns-3">
                    {service.medications!.map((medication) => (
                      <li key={medication.slug} className="break-inside-avoid border-b border-border/50">
                        <Link
                          href={getTreatmentHref(medication)}
                          className="group flex items-center justify-between py-1.5 text-sm text-foreground transition-colors hover:text-brand-action"
                        >
                          <span>{medication.name}</span>
                          <ArrowRight aria-hidden="true" className="size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-action" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
