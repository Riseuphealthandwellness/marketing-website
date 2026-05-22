import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/cms/content-source";

export const dynamic = "force-dynamic";

const routes = [
  "",
  "/care",
  "/care/primary-care",
  "/care/weight-loss-mgmt",
  "/care/services",
  "/care/programs",
  "/about",
  "/new-patients",
  "/patient-resources",
  "/insurance-payment",
  "/referrals",
  "/contact",
  "/careers",
  "/team",
  "/locations",
  "/privacy-policy",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const now = new Date();

  return routes.map((route) => ({
    url: new URL(route || "/", settings?.url ?? "https://localhost:3000").toString(),
    lastModified: now,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
