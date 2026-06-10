import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MountainWellnessHomepageConcept } from "./_components/homepage-concept-page";
import { getHomepageV2Settings } from "@/lib/cms/content-source";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getHomepageV2Settings();
  const title = settings?.seo?.title ?? settings?.title;
  const description = settings?.seo?.description;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}

export default async function MountainWellnessConceptPage() {
  const settings = await getHomepageV2Settings();
  if (!settings?.components?.length) notFound();

  return <MountainWellnessHomepageConcept settings={settings} />;
}
