import { getLegalPage, getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
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

export async function metadataForLegalPage(
  path: string,
  id: "legal-page-privacy" | "legal-page-terms",
) {
  const [page, settings] = await Promise.all([
    getLegalPage(id),
    getSiteSettings(),
  ]);

  return createPageMetadata({
    title: page?.title ?? path,
    description: "",
    path,
    seo: page?.seo,
    site: settings ?? undefined,
  });
}
