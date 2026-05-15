import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/cms/content-source";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", settings?.url ?? "https://localhost:3000").toString(),
  };
}
