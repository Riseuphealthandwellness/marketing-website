import type { MetadataRoute } from "next";

import { getAllProgramSlugs, getServices, getSiteSettings } from "@/lib/cms/content-source";

export const dynamic = "force-dynamic";

const routes = [
  "",
  "/care",
  "/care/services/primary-care",
  "/care/services/addiction-medicine",
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
  "/site-map",
  "/home-page-2",
  "/privacy-policy",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, services, programSlugs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAllProgramSlugs(),
  ]);
  const now = new Date();
  const dynamicRoutes = [
    ...services.map((service) => `/care/services/${service.slug}`),
    ...services.flatMap((service) => [
      ...(service.conditions?.map(
        (condition) => `/care/services/${service.slug}/conditions/${condition.slug}`,
      ) ?? []),
      ...(service.medications?.map(
        (medication) => `/care/services/${service.slug}/treatments/${medication.slug}`,
      ) ?? []),
    ]),
    ...programSlugs.map((slug) => `/care/programs/${slug}`),
  ];

  return Array.from(new Set([...routes, ...dynamicRoutes])).map((route) => ({
    url: new URL(route || "/", settings?.url ?? "https://localhost:3000").toString(),
    lastModified: now,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
