import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Pill } from "lucide-react";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { SupplementalSections } from "@/components/sections/supplemental-sections";
import { getConditionBySlug, getServiceBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { getTreatmentHref, getServiceHref } from "@/lib/care-routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";

type Props = {
  slug: string;
  serviceSlug: string;
  serviceLabel: string;
  path?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export async function generateConditionMetadata({
  slug,
  serviceSlug,
  path,
}: {
  slug: string;
  serviceSlug: string;
  path?: string;
}): Promise<Metadata> {
  const [condition, settings] = await Promise.all([getConditionBySlug(slug), getSiteSettings()]);
  if (!condition) return {};
  return createPageMetadata({
    title: condition.title,
    description: condition.shortDescription,
    path: path ?? `/care/${serviceSlug}/${slug}`,
    seo: condition.seo,
    site: settings ?? undefined,
  });
}

export async function ConditionDetailPage({
  slug,
  serviceSlug,
  path,
  breadcrumbs,
}: Props) {
  const [condition, service, settings] = await Promise.all([
    getConditionBySlug(slug),
    getServiceBySlug(serviceSlug),
    getSiteSettings(),
  ]);
  if (!condition) notFound();

  const medications = service?.medications ?? [];
  const breadcrumbsForHero =
    settings?.showBreadcrumbs === false
      ? undefined
      : (breadcrumbs ??
        resolveBreadcrumbs(
          path ?? `/care/services/${serviceSlug}/conditions/${slug}`,
          undefined,
          settings?.showBreadcrumbs,
        ));

  return (
    <>
      <PageHero
        backgroundImage={condition.image}
        breadcrumbs={breadcrumbsForHero}
        eyebrow={condition.pageLabels?.eyebrow}
        title={condition.title}
        description={condition.shortDescription}
      />

      {condition.body && (condition.body as unknown[]).length > 0 ? (
        <Section className="bg-white py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
              <div>
                <PortableTextContent autoLinkDrugs className="max-w-none" value={condition.body} />
              </div>

              <aside className="space-y-4">
                {/* Get started card */}
                <div className="rounded-lg border border-brand-action/25 bg-brand-action/5 p-5">
                  <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-action">
                    {condition.pageLabels?.ctaHeading}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {condition.pageLabels?.ctaDescription}
                  </p>
                  {condition.pageLabels?.ctaButtonHref ? (
                    <Link
                      href={condition.pageLabels.ctaButtonHref}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-action px-4 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-brand-action-hover"
                    >
                      {condition.pageLabels?.ctaButtonLabel}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  ) : null}
                </div>

                {/* Related medications */}
                {medications.length > 0 ? (
                  <div className="rounded-lg border border-border bg-brand-warm-white p-5 shadow-[var(--shadow-soft)]">
                    <div className="mb-3 flex items-center gap-2">
                      <Pill aria-hidden="true" className="size-4 text-brand-action" />
                      <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-coal">
                        {condition.pageLabels?.medicationsHeading}
                      </p>
                    </div>
                    <ul className="space-y-0.5">
                      {medications.map((med) => (
                        <li key={med.slug}>
                          <Link
                            href={getTreatmentHref(med)}
                            className="group flex items-center justify-between py-1.5 text-sm text-foreground transition-colors hover:text-brand-action"
                          >
                            <span>{med.name}</span>
                            <ArrowRight
                              aria-hidden="true"
                              className="size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-action"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {service ? (
                      <Link
                        href={`${getServiceHref(service)}#medications`}
                        className="mt-3 block text-xs font-semibold text-brand-action hover:underline"
                      >
                        {condition.pageLabels?.viewAllLabel}
                      </Link>
                    ) : null}
                  </div>
                ) : null}

                {/* External learn more */}
                {condition.learnMoreUrl ? (
                  <a
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-white px-4 py-3 text-sm font-semibold text-brand-trust transition-colors hover:border-brand-action/30 hover:text-brand-action"
                    href={condition.learnMoreUrl}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
                    {condition.learnMoreLabel}
                  </a>
                ) : null}
              </aside>
            </div>
          </Container>
        </Section>
      ) : null}

      {condition.supplementalSections?.length ? (
        <SupplementalSections data={{ sections: condition.supplementalSections }} />
      ) : null}

      <ContactBand />
    </>
  );
}
