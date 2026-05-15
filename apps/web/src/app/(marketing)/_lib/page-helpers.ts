import { getLegalPage, getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function metadataForPage(slug: string) {
  const [page, settings] = await Promise.all([
    getMarketingPage(slug),
    getSiteSettings(),
  ]);

  return createPageMetadata({
    title: page?.title ?? slug,
    description: page?.description ?? "",
    path: `/${slug}`,
    seo: page?.seo,
    site: settings ?? undefined,
  });
}

export async function metadataForLegalPage(
  path: string,
  id: "legalPage.privacy" | "legalPage.terms",
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
