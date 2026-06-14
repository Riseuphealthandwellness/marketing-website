import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBandClient } from "@/components/sections/contact-band-client";
import { getSiteSettings } from "@/lib/cms/content-source";

export async function ContactBand() {
  const settings = await getSiteSettings();

  const lat = settings?.location.lat;
  const lng = settings?.location.lng;
  const zoom = settings?.location.zoom ?? 13;
  const content = settings?.contactBand;

  if (!content) return null;

  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
  const mapStyle = encodeURIComponent("mapbox/streets-v12");
  const mapSrc = hasCoords
    ? `/api/map/static?lat=${lat}&lng=${lng}&z=${zoom}&w=600&h=440&scale=2&style=${mapStyle}`
    : null;
  const mapSrcLarge = hasCoords
    ? `/api/map/static?lat=${lat}&lng=${lng}&z=${zoom}&w=1400&h=900&scale=2&style=${mapStyle}`
    : null;

  return (
    <Section className="bg-brand-warm-white py-6 sm:py-8 lg:py-10">
      <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal sm:text-3xl">
            {content.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-brand-trust/82 sm:text-lg">
            {content.description}
          </p>
        </div>

        <ContactBandClient
          phone={settings?.phone ?? ""}
          email={settings?.email ?? ""}
          address={settings?.address ?? ""}
          mapSrc={mapSrc}
          mapSrcLarge={mapSrcLarge}
        />
      </Container>
    </Section>
  );
}
