import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getTreatmentHref } from "@/lib/care-routes";
import { getAllProgramSlugs, getProgramBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [program, settings] = await Promise.all([getProgramBySlug(slug), getSiteSettings()]);
  if (!program) return {};
  return createPageMetadata({
    title: program.title,
    description: program.description,
    path: `/care/programs/${slug}`,
    seo: program.seo,
    site: settings ?? undefined,
  });
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const [program, settings] = await Promise.all([getProgramBySlug(slug), getSiteSettings()]);
  if (!program) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={resolveBreadcrumbs(`/care/programs/${slug}`, undefined, settings?.showBreadcrumbs)}
        eyebrow="Programs"
        title={program.title}
        description={program.description}
      />

      {/* ── Body content ── */}
      {(program.audience || (program.body && (program.body as unknown[]).length > 0)) ? (
        <Section className="bg-white py-10 sm:py-12 lg:py-14">
          <Container>
            {program.audience ? (
              <p className="mb-5 font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                For: {program.audience}
              </p>
            ) : null}
            {program.body && (program.body as unknown[]).length > 0 ? (
              <PortableTextContent
                autoLinkDrugs
                className="max-w-3xl"
                drugReferenceHref={(drug) => getTreatmentHref(drug, { programSlug: program.slug })}
                value={program.body}
              />
            ) : null}
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
