import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { getAllPageSlugs, getServiceBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pageSlugs = await getAllPageSlugs();
  const carePageSlugs = pageSlugs
    .filter((s) => s.startsWith("care/"))
    .map((s) => s.slice("care/".length));
  return carePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) return metadataForPage(`care/${slug}`);
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

  // Fall back to page builder if no service matches (e.g. /care/what-to-expect)
  if (!service) return <MarketingPage slug={`care/${slug}`} />;

  permanentRedirect(`/care/services/${slug}`);
}
