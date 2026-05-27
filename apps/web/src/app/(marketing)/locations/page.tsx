import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getLocations, getMarketingPage } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("locations");

export default async function LocationsPage() {
  const [locations, page] = await Promise.all([getLocations(), getMarketingPage("locations")]);
  if (!page) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={page.path ? buildBreadcrumbs(page.path) : undefined}
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      <Section>
        <Container>
          {locations.length === 0 ? (
            page?.emptyStateText ? <p className="text-muted-foreground">{page.emptyStateText}</p> : null
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex flex-col rounded-lg border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
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
