import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, Clock, Car, Accessibility, CalendarCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { LocationMap } from "@/components/site/location-map";
import { getAllLocationSlugs, getLocationBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [location, settings] = await Promise.all([getLocationBySlug(slug), getSiteSettings()]);
  if (!location) return {};
  return createPageMetadata({
    title: location.name,
    description: location.address,
    path: `/locations/${slug}`,
    site: settings ?? undefined,
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const [location, settings] = await Promise.all([getLocationBySlug(slug), getSiteSettings()]);
  if (!location) notFound();
  const breadcrumbs = resolveBreadcrumbs(`/locations/${slug}`, undefined, settings?.showBreadcrumbs);

  const lat = location.coordinates?.lat;
  const lng = location.coordinates?.lng;
  const mapSrc =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? `/api/map/static?lat=${lat}&lng=${lng}&z=15&w=900&h=500&scale=2&style=${encodeURIComponent("mapbox/streets-v12")}`
      : null;
  const expandedMapSrc =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? `/api/map/static?lat=${lat}&lng=${lng}&z=14&w=1600&h=900&scale=2&style=${encodeURIComponent("mapbox/streets-v12")}`
      : null;

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Location"
        title={location.name}
        description={location.address}
      />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
            {/* Details */}
            <div className="space-y-6">
              {location.hours && location.hours.length > 0 ? (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-black tracking-normal text-foreground">
                    <Clock className="size-5 text-brand-warm-accent" aria-hidden="true" />
                    Hours
                  </h2>
                  <ul className="space-y-1 text-base text-muted-foreground">
                    {location.hours.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {location.phone || location.email ? (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-black tracking-normal text-foreground">
                    <Phone className="size-5 text-brand-warm-accent" aria-hidden="true" />
                    Contact
                  </h2>
                  <div className="space-y-2 text-base">
                    {location.phone ? (
                      <a
                        href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}
                        className="flex items-center gap-2 text-foreground hover:text-brand-action"
                      >
                        <Phone className="size-4" aria-hidden="true" />
                        {location.phone}
                      </a>
                    ) : null}
                    {location.email ? (
                      <a
                        href={`mailto:${location.email}`}
                        className="flex items-center gap-2 text-foreground hover:text-brand-action"
                      >
                        <Mail className="size-4" aria-hidden="true" />
                        {location.email}
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {location.appointmentNotes ? (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-black tracking-normal text-foreground">
                    <CalendarCheck className="size-5 text-brand-warm-accent" aria-hidden="true" />
                    Before your appointment
                  </h2>
                  <p className="text-base text-muted-foreground">{location.appointmentNotes}</p>
                </div>
              ) : null}

              {location.parking ? (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-black tracking-normal text-foreground">
                    <Car className="size-5 text-brand-warm-accent" aria-hidden="true" />
                    Parking & transit
                  </h2>
                  <p className="text-base text-muted-foreground">{location.parking}</p>
                </div>
              ) : null}

              {location.accessibilityNotes ? (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-black tracking-normal text-foreground">
                    <Accessibility className="size-5 text-brand-warm-accent" aria-hidden="true" />
                    Accessibility
                  </h2>
                  <p className="text-base text-muted-foreground">{location.accessibilityNotes}</p>
                </div>
              ) : null}
            </div>

            {/* Map */}
            {mapSrc && expandedMapSrc ? (
              <LocationMap
                address={location.address}
                expandedSrc={expandedMapSrc}
                lat={lat}
                lng={lng}
                locationName={location.name}
                mapSrc={mapSrc}
              />
            ) : null}
          </div>
        </Container>
      </Section>

      <ContactBand />
    </>
  );
}
