import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function metadataForPage(slug: string, path = `/${slug}`) {
  const [page, settings] = await Promise.all([
    getMarketingPage(slug),
    getSiteSettings(),
  ]);

  return createPageMetadata({
    title: page?.title ?? "",
    description: page?.description ?? "",
    path,
    seo: page?.seo,
    site: settings ?? undefined,
  });
}
