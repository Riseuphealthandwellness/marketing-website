import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getSiteSettings } from "@/lib/cms/content-source";

export async function ContactBand() {
  const settings = await getSiteSettings();

  const lat = settings?.location.lat;
  const lng = settings?.location.lng;
  const zoom = settings?.location.zoom ?? 13;

  const mapSrc =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? `/api/map/static?lat=${lat}&lng=${lng}&z=${zoom}&w=600&h=440&scale=2&style=${encodeURIComponent("mapbox/streets-v12")}`
      : null;

  return (
    <Section className="bg-brand-warm-white">
      <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-black uppercase text-brand-warm-accent">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
            Start with the team, not a maze of forms.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Public contact should stay simple and low-friction. Clinical
            details, appointment changes, and urgent concerns belong in
            approved care channels or direct staff communication.
          </p>
        </div>

        <div className="flex flex-col overflow-hidden rounded-lg bg-brand-trust text-brand-warm-white shadow-[var(--shadow-soft)]">
          <div className="grid md:grid-cols-[1fr_1fr]">
            <div className="border-b border-brand-warm-white/16 p-6 md:border-r md:border-b-0">
              <Phone aria-hidden="true" className="size-6 text-brand-soft-accent" />
              <h3 className="mt-4 font-heading text-2xl font-black tracking-normal">
                Call
              </h3>
              <a
                className="mt-3 block text-lg font-bold text-brand-warm-white hover:text-brand-soft-accent"
                href={`tel:${(settings?.phone ?? "").replace(/[^\d+]/g, "")}`}
              >
                {settings?.phone}
              </a>
            </div>

            <div className="border-b border-brand-warm-white/16 p-6 md:border-b-0">
              <Mail aria-hidden="true" className="size-6 text-brand-soft-accent" />
              <h3 className="mt-4 font-heading text-2xl font-black tracking-normal">
                Email
              </h3>
              <a
                className="mt-3 block whitespace-nowrap text-base font-bold text-brand-warm-white hover:text-brand-soft-accent sm:text-lg md:text-[clamp(0.9rem,1.45vw,1.125rem)]"
                href={`mailto:${settings?.email}`}
              >
                {settings?.email}
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-stretch border-t border-brand-warm-white/16 md:flex-row">
            <div className="p-6 md:basis-[40%] md:flex-none">
              <MapPin aria-hidden="true" className="size-6 text-brand-soft-accent" />
              <h3 className="mt-4 font-heading text-2xl font-black tracking-normal">
                Location
              </h3>
              <p className="mt-3 text-base leading-7 text-brand-warm-white/78">
                {settings?.address}
              </p>
            </div>

            <div
              aria-label="Map preview of our location"
              className="relative min-h-48 flex-1 self-stretch overflow-hidden border-t border-brand-warm-white/16 md:border-t-0 md:border-l"
              role="img"
            >
              {mapSrc ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 -bottom-8 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mapSrc})` }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
