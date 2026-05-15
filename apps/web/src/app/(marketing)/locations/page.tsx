import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/sections/page-hero";
import { getLocations, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata({
    title: "Locations",
    description: "Find a RiseUp Health & Wellness location near you.",
    path: "/locations",
    site: settings ?? undefined,
  });
}

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <>
      <PageHero
        eyebrow="Where to find us"
        title="Our Locations"
        description="We serve patients across West Virginia from convenient community locations."
      />

      <Section>
        <Container>
          {locations.length === 0 ? (
            <p className="text-muted-foreground">Location information coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-brand-warm-accent" aria-hidden="true" />
                    <div>
                      <h2 className="font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                        {loc.name}
                      </h2>
                      <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{loc.address}</p>
                    </div>
                  </div>

                  {loc.phone ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      {loc.phone}
                    </div>
                  ) : null}

                  {loc.hours && loc.hours.length > 0 ? (
                    <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <Clock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      <span>{loc.hours[0]}{loc.hours.length > 1 ? ` +${loc.hours.length - 1} more` : ""}</span>
                    </div>
                  ) : null}

                  <span className="mt-4 text-sm font-semibold text-brand-action group-hover:underline">
                    View details →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
