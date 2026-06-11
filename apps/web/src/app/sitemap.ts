import type { MetadataRoute } from "next";

import { getAllDrugSlugs, getAllProgramSlugs, getServices, getSiteSettings } from "@/lib/cms/content-source";

export const dynamic = "force-dynamic";

const routes = [
  "",
  "/care",
  "/care/services",
  "/care/services/primary-care",
  "/care/services/addiction-medicine",
  "/care/medications",
  "/care/weight-loss-mgmt",
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
  "/patients-rights-privacy",
  "/patients-rights-privacy/notice-privacy-practices",
  "/patients-rights-privacy/privacy-policy",
  "/patients-rights-privacy/medical-record-request-authorization",
  "/patients-rights-privacy/terms-of-use",
  "/site-map",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, services, programSlugs, drugSlugs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAllProgramSlugs(),
    getAllDrugSlugs(),
  ]);
  const now = new Date();
  const dynamicRoutes = [
    ...services.map((service) => `/care/services/${service.slug}`),
    ...services.flatMap((service) =>
      service.conditions?.map(
        (condition) => `/care/services/${service.slug}/conditions/${condition.slug}`,
      ) ?? [],
    ),
    ...programSlugs.map((slug) => `/care/programs/${slug}`),
    ...drugSlugs.map((slug) => `/care/medications/${slug}`),
  ];

  return Array.from(new Set([...routes, ...dynamicRoutes])).map((route) => ({
    url: new URL(route || "/", settings?.url ?? "https://localhost:3000").toString(),
    lastModified: now,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
