import type { SiteSettings } from "@/lib/cms/types";
import { absoluteUrl } from "@/lib/seo/metadata";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: settings.name,
    url: absoluteUrl("/", settings.url ?? undefined),
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      addressRegion: "WV",
      addressCountry: "US",
      streetAddress: settings.address,
    },
    medicalSpecialty: ["PrimaryCare", "AddictionMedicine"],
  };
}
