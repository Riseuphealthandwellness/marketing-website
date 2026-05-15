import type { Metadata } from "next";
import type { SeoFields, SiteSettings } from "@/lib/cms/types";

export function absoluteUrl(path = "/", baseUrl?: string | null) {
  if (!baseUrl) return path;
  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return path;
  }
}

export function createPageMetadata({
  title,
  description,
  path,
  seo,
  site,
}: {
  title: string;
  description: string;
  path: string;
  seo?: SeoFields;
  site?: Pick<SiteSettings, "name" | "url">;
}): Metadata {
  const baseUrl = site?.url ?? "https://localhost:3000";
  const metaTitle = seo?.title ?? title;
  const metaDescription = seo?.description ?? description;
  const canonical = seo?.canonicalUrl ?? absoluteUrl(path, baseUrl);
  const socialTitle =
    site?.name && metaTitle !== site.name
      ? `${metaTitle} | ${site.name}`
      : metaTitle;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical,
    },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : undefined,
    openGraph: {
      title: socialTitle,
      description: metaDescription,
      url: canonical,
      siteName: site?.name,
      type: "website",
      images: seo?.ogImage
        ? [{ url: seo.ogImage.url, alt: seo.ogImage.alt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: metaDescription,
    },
  };
}
