import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getProviders, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata({
    title: "About",
    description: "RiseUp Health & Wellness is an integrated primary care and behavioral health practice serving West Virginia.",
    path: "/about",
    site: settings ?? undefined,
  });
}

export default async function AboutPage() {
  const providers = await getProviders();

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Whole-person care, rooted in community"
        description="RiseUp Health & Wellness brings primary care, addiction medicine, and behavioral health together under one roof — so patients get the coordinated support they actually need."
      />

      {/* Mission */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                Our mission
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                Treatment that meets people where they are
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                We believe recovery and wellness are inseparable. By combining medication-assisted treatment, primary care, and mental health services, we remove the barriers that force patients to choose between the care they need.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Our team works together across disciplines — sharing records, coordinating appointments, and treating every patient as a whole person rather than a collection of separate diagnoses.
              </p>
            </div>
            <div>
              <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                Our approach
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                Integrated, not just co-located
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Many clinics say they offer integrated care but keep services siloed. At RiseUp, our providers actively collaborate — behavioral health clinicians and primary care physicians share charts, attend joint case reviews, and communicate daily.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                That coordination means fewer handoffs, less repeated paperwork, and a care team that already knows your history when you walk through the door.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team preview */}
      {providers.length > 0 ? (
        <Section tone="muted">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                  People
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                  Meet the team
                </h2>
              </div>
              <Link
                href="/team"
                className="hidden shrink-0 text-sm font-semibold text-brand-action hover:underline sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {providers.slice(0, 4).map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/team/${provider.slug}`}
                  className="group flex flex-col items-center rounded-lg bg-background p-5 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  {provider.image?.url ? (
                    <div className="relative mb-4 size-24 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={provider.image.url}
                        alt={provider.image.alt ?? provider.name}
                        fill
                        className="object-cover object-top"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 size-24 rounded-full bg-muted" />
                  )}
                  <h3 className="font-heading font-black tracking-normal text-foreground group-hover:text-brand-action">
                    {provider.name}
                  </h3>
                  {provider.credentials ? (
                    <p className="text-xs text-muted-foreground">{provider.credentials}</p>
                  ) : null}
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-warm-accent">
                    {provider.role}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link href="/team" className="text-sm font-semibold text-brand-action hover:underline">
                View all team members →
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
