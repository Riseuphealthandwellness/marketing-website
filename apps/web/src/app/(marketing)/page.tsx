import type { Metadata } from "next";

import { CareModelSection } from "@/components/sections/care-model-section";
import { ContactBand } from "@/components/sections/contact-band";
import { HighlightsGrid } from "@/components/sections/highlights-grid";
import { HomeHero } from "@/components/sections/home-hero";
import { ReferralBand } from "@/components/sections/referral-band";
import { getHomepageContent, getSiteSettings } from "@/lib/cms/content-source";
import { JsonLd, organizationJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPageMetadata({
    title: "Integrated treatment, recovery, and primary care",
    description: "",
    path: "/",
    site: settings ?? undefined,
  });
}

export default async function HomePage() {
  const [homepage, settings] = await Promise.all([
    getHomepageContent(),
    getSiteSettings(),
  ]);

  return (
    <>
      {settings ? <JsonLd data={organizationJsonLd(settings)} /> : null}
      <HomeHero {...homepage?.hero} accessLinks={settings?.accessLinks} />
      <CareModelSection />
      <ReferralBand cta={homepage?.referralCta} accessLinks={settings?.accessLinks} />
      <HighlightsGrid services={homepage?.serviceHighlights} />
      <ContactBand />
    </>
  );
}
