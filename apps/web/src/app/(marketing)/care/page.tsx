import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  HeartPulse,
  Pill,
  ShieldPlus,
  Stethoscope,
  Users,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CareModelSection } from "@/components/sections/care-model-section";
import { ContactBand } from "@/components/sections/contact-band";
import { getPrograms, getServices, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata({
    title: "Care",
    description:
      "Integrated primary care, addiction medicine, and behavioral health services at RiseUp Health & Wellness.",
    path: "/care",
    site: settings ?? undefined,
  });
}

const serviceIconPool = [HeartPulse, Stethoscope, Pill, Brain, ShieldPlus, Users];

export default async function CarePage() {
  const [services, programs] = await Promise.all([getServices(), getPrograms()]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-background py-14 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
              Care
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              Integrated care,
              <br className="hidden sm:block" /> all in one place.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              We bring primary care, addiction medicine, and behavioral health together so your
              team already knows your history — no retelling required.
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      {services.length > 0 ? (
        <Section>
          <Container>
            <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-start">
              {/* Left: label + intro */}
              <div className="lg:pt-2">
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                  Services
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                  What we treat
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  Our clinical team covers a wide range of needs — from ongoing primary care
                  to medication-assisted recovery and mental health support. Every service is
                  delivered in the same practice, by providers who coordinate with each other.
                </p>
                <Link
                  href="/new-patients"
                  className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand-trust hover:text-brand-action hover:underline"
                >
                  Ready to start? New patient info
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>

              {/* Right: service list */}
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                {services.map((service, i) => {
                  const Icon = serviceIconPool[i % serviceIconPool.length]!;
                  return (
                    <Link
                      key={service.slug}
                      href={service.href ?? `/care/${service.slug}`}
                      className="group grid border-b border-border p-6 transition-colors last:border-b-0 hover:bg-muted/50 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-4"
                    >
                      <span className="mb-3 flex size-12 items-center justify-center rounded-md bg-brand-warm-accent/12 text-brand-action sm:mb-0">
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <span>
                        <span className="block font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-action sm:block"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Care model section */}
      <CareModelSection />

      {/* Programs */}
      {programs.length > 0 ? (
        <Section>
          <Container>
            <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
              Programs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
              Structured pathways
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Beyond individual appointments, we offer structured programs that guide patients
              through longer recovery and wellness journeys with consistent support.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={program.href ?? `/programs/${program.slug}`}
                  className="group flex flex-col justify-between rounded-lg border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    {program.audience ? (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        For: {program.audience}
                      </p>
                    ) : null}
                    <h3 className="font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {program.description}
                    </p>
                  </div>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-action">
                    Learn more <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
