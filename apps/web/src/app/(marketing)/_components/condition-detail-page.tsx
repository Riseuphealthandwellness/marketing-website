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
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { conditionSupplementalContent } from "@/lib/supplemental-content/conditions";

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
  const [condition, service] = await Promise.all([
    getConditionBySlug(slug),
    getServiceBySlug(serviceSlug),
  ]);
  if (!condition) notFound();

  const supplemental = conditionSupplementalContent[slug] ?? null;
  const medications = service?.medications ?? [];

  return (
    <>
      <PageHero
        backgroundImage={condition.image}
        breadcrumbs={breadcrumbs ?? buildBreadcrumbs(path ?? `/care/${serviceSlug}/${slug}`)}
        eyebrow="Conditions"
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
                    Ready to get started?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Our team can help you understand your options and take the next step.
                  </p>
                  <Link
                    href="/new-patients"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-action px-4 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-brand-action-hover"
                  >
                    Start your care
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>

                {/* Related medications */}
                {medications.length > 0 ? (
                  <div className="rounded-lg border border-border bg-brand-warm-white p-5 shadow-[var(--shadow-soft)]">
                    <div className="mb-3 flex items-center gap-2">
                      <Pill aria-hidden="true" className="size-4 text-brand-action" />
                      <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-coal">
                        Medications &amp; treatments
                      </p>
                    </div>
                    <ul className="space-y-0.5">
                      {medications.map((med) => (
                        <li key={med.slug}>
                          <Link
                            href={getTreatmentHref(med, { serviceSlug })}
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
                        View all treatments
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
                    {condition.learnMoreLabel || "Learn more"}
                  </a>
                ) : null}
              </aside>
            </div>
          </Container>
        </Section>
      ) : null}

      {supplemental ? <SupplementalSections data={supplemental} /> : null}

      <ContactBand />
    </>
  );
}
