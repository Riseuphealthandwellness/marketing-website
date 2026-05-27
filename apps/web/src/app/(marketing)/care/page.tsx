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
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { FaqSection } from "@/components/sections/faq-section";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getFaqsByCategory, getMarketingPage, getPrograms, getServices } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("care", "/care");

const serviceIconPool = [HeartPulse, Stethoscope, Pill, Brain, ShieldPlus, Users];

export default async function CarePage() {
  const [services, programs, page, faqs] = await Promise.all([
    getServices(),
    getPrograms(),
    getMarketingPage("care"),
    getFaqsByCategory("care"),
  ]);
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      {services.length > 0 ? (
        <Section>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                  Services
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                  What we treat
                </h2>
              </div>
              <Link
                href="/new-patients"
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-trust hover:text-brand-action hover:underline"
              >
                New patient info
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {services.map((service, i) => {
                const Icon = serviceIconPool[i % serviceIconPool.length]!;
                return (
                  <Link
                    key={service.slug}
                    href={service.href ?? `/care/${service.slug}`}
                    className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand-action/30 hover:bg-muted/40"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-warm-accent/12 text-brand-action">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-action"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 text-right">
              <Link
                href="/care/services"
                className="text-sm font-semibold text-brand-trust hover:text-brand-action hover:underline"
              >
                View all services
                <ArrowRight aria-hidden="true" className="ml-1 inline size-4" />
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      {programs.length > 0 ? (
        <Section>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                  Programs
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                  Structured support
                </h2>
              </div>
              <Link
                href="/care/programs"
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-trust hover:text-brand-action hover:underline"
              >
                All programs
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={program.href ?? `/programs/${program.slug}`}
                  className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand-action/30 hover:bg-muted/40"
                >
                  <div>
                    {program.audience ? (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {program.audience}
                      </p>
                    ) : null}
                    <h3 className="font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">
                      {program.description}
                    </p>
                  </div>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-action">
                    Learn more
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FaqSection faqs={faqs} />
      <ContactBand />
    </>
  );
}
