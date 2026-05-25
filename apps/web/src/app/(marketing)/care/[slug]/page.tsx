import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getAllPageSlugs, getAllServiceSlugs, getServiceBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const [serviceSlugs, pageSlugs] = await Promise.all([
    getAllServiceSlugs(),
    getAllPageSlugs(),
  ]);
  const carePageSlugs = pageSlugs
    .filter((s) => s.startsWith("care/"))
    .map((s) => s.slice("care/".length));
  return [
    ...serviceSlugs.map((slug) => ({ slug })),
    ...carePageSlugs.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) return metadataForPage(`care/${slug}`);
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

  // Fall back to page builder if no service matches (e.g. /care/what-to-expect)
  if (!service) return <MarketingPage slug={`care/${slug}`} />;

  return (
    <>
      <PageHero
        breadcrumbs={buildBreadcrumbs(`/care/${slug}`)}
        eyebrow="Care"
        title={service.title}
        description={service.description}
      />

      {service.body && (service.body as unknown[]).length > 0 ? (
        <Section>
          <Container>
            <PortableTextContent className="max-w-3xl" value={service.body} />
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
