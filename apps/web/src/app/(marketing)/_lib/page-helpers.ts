import { getMarketingPage, getMarketingPageByPath, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function metadataForPage(slugOrPath: string, path?: string) {
  const isPathLookup = slugOrPath.startsWith("/") && !path;
  const routePath = path ?? (isPathLookup ? slugOrPath : `/${slugOrPath}`);
  const [page, settings] = await Promise.all([
    isPathLookup ? getMarketingPageByPath(slugOrPath) : getMarketingPage(slugOrPath),
    getSiteSettings(),
  ]);

  return createPageMetadata({
    title: page?.title ?? "",
    description: page?.description ?? "",
    path: routePath,
    seo: page?.seo,
    site: settings ?? undefined,
  });
}
