import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getConditionHref, getTreatmentHref } from "@/lib/care-routes";
import { getAllServiceSlugs, getServiceBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

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
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const hasConditions = (service.conditions?.length ?? 0) > 0;
  const hasMedications = (service.medications?.length ?? 0) > 0;

  return (
    <>
      <PageHero
        breadcrumbs={buildBreadcrumbs(`/care/services/${slug}`)}
        eyebrow="Services"
        title={service.title}
        description={service.description}
      />

      {/* ── Body content ── */}
      {service.body && (service.body as unknown[]).length > 0 ? (
        <Section>
          <Container>
            <PortableTextContent
              autoLinkDrugs
              className="max-w-3xl"
              drugReferenceHref={(drug) => getTreatmentHref(drug, { serviceSlug: service.slug })}
              value={service.body}
            />
          </Container>
        </Section>
      ) : null}

      {/* ── Conditions and medications ── */}
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
                          <ArrowRight
                            aria-hidden="true"
                            className="size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-action"
                          />
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
                          href={getTreatmentHref(medication, { serviceSlug: service.slug })}
                          className="group flex items-center justify-between py-1.5 text-sm text-foreground transition-colors hover:text-brand-action"
                        >
                          <span>{medication.name}</span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-brand-action"
                          />
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

      {/* ── Photo break ── */}
      <section className="relative overflow-hidden bg-brand-coal text-brand-warm-white">
        <div className="absolute inset-y-0 right-0 w-[62%]">
          <Image
            alt="Doctor and patient talking at golden hour in the Appalachian mountains"
            className="h-full w-full object-cover"
            fill
            sizes="62vw"
            src="/images/content/care-menu-feature.png"
            priority={false}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(31_28_25)_38%,rgb(31_28_25_/_0.88)_54%,transparent_76%)]"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-[480px]">
            <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-soft-accent">
              Integrated care
            </p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-normal sm:text-4xl">
              One team. Every part of your health.
            </h2>
            <p className="mt-4 text-base leading-7 text-brand-warm-white/78 sm:text-lg">
              Primary care, addiction treatment, and wellness support — all coordinated by providers who already know your full picture.
            </p>
            <Link
              href="/new-patients"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md border border-brand-warm-white/30 bg-brand-warm-white/8 px-5 font-heading text-sm font-bold text-brand-warm-white transition-colors hover:bg-brand-warm-white/14"
            >
              Get started
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
