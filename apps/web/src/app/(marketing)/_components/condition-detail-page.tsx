import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getConditionBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = {
  slug: string;
  serviceSlug: string;
  serviceLabel: string;
};

export async function generateConditionMetadata({
  slug,
  serviceSlug,
}: {
  slug: string;
  serviceSlug: string;
}): Promise<Metadata> {
  const [condition, settings] = await Promise.all([getConditionBySlug(slug), getSiteSettings()]);
  if (!condition) return {};
  return createPageMetadata({
    title: condition.title,
    description: condition.shortDescription,
    path: `/care/${serviceSlug}/${slug}`,
    seo: condition.seo,
    site: settings ?? undefined,
  });
}

export async function ConditionDetailPage({ slug, serviceSlug, serviceLabel }: Props) {
  const condition = await getConditionBySlug(slug);
  if (!condition) notFound();

  return (
    <>
      <PageHero eyebrow={serviceLabel} title={condition.title} description={condition.shortDescription} />

      {condition.body && (condition.body as unknown[]).length > 0 ? (
        <Section>
          <Container>
            <PortableTextContent className="max-w-3xl" value={condition.body} />
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
