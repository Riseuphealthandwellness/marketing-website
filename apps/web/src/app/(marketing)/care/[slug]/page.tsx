import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getAllServiceSlugs, getServiceBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

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
    path: `/care/${slug}`,
    seo: service.seo,
    site: settings ?? undefined,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Care" title={service.title} description={service.description} />

      {service.body && (service.body as unknown[]).length > 0 ? (
        <Section>
          <Container>
            <div className="prose prose-lg max-w-3xl text-foreground prose-headings:font-heading prose-headings:font-black prose-headings:tracking-normal prose-a:text-brand-action prose-strong:text-foreground">
              <PortableText value={service.body as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
