import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomepageConcept } from "./_components/homepage-concept-page";
import { getHomepageSettings, getPrograms, getServices, getSiteSettings } from "@/lib/cms/content-source";
import { JsonLd, organizationJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, siteSettings] = await Promise.all([
    getHomepageSettings(),
    getSiteSettings(),
  ]);

  return createPageMetadata({
    title: settings?.seo?.title ?? settings?.title ?? "Integrated primary care and wellness in West Virginia",
    description: settings?.seo?.description ?? "Rise Up Health & Wellness provides integrated primary care, addiction medicine, and recovery support in West Virginia — all under one roof.",
    path: "/",
    site: siteSettings ?? undefined,
  });
}

export default async function HomePage() {
  const [settings, allServices, allPrograms, siteSettings] = await Promise.all([
    getHomepageSettings(),
    getServices(),
    getPrograms(),
    getSiteSettings(),
  ]);

  if (!settings?.components?.length) notFound();

  return (
    <>
      {siteSettings ? <JsonLd data={organizationJsonLd(siteSettings)} /> : null}
      <HomepageConcept settings={settings} allServices={allServices} allPrograms={allPrograms} />
    </>
  );
}
