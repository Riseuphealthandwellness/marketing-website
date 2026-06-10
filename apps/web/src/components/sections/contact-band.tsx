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
    <Section className="bg-brand-warm-white">
      <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-black uppercase text-brand-warm-accent">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>
        </div>

        <ContactBandClient
          phone={settings?.phone ?? ""}
          email={settings?.email ?? ""}
          address={settings?.address ?? ""}
          mapSrc={mapSrc}
          mapSrcLarge={mapSrcLarge}
          labels={{
            phone: content.phoneLabel,
            email: content.emailLabel,
            location: content.locationLabel,
            mapPreview: content.mapPreviewLabel,
            expandMap: content.expandMapLabel,
            closeMap: content.closeMapLabel,
            mapImageAlt: content.mapImageAlt,
          }}
        />
      </Container>
    </Section>
  );
}
