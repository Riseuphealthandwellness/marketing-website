import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { getCardColor, getCareIcon } from "@/components/care/care-icon";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { FaqSection } from "@/components/sections/faq-section";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getProgramHref, getServiceHref } from "@/lib/care-routes";
import { getFaqsByCategory, getMarketingPage, getPrograms, getServices, getSiteSettings } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("care", "/care");


export default async function CarePage() {
  const [services, programs, page, faqs, settings] = await Promise.all([
    getServices(),
    getPrograms(),
    getMarketingPage("care"),
    getFaqsByCategory("care"),
    getSiteSettings(),
  ]);
  if (!page) notFound();
  const breadcrumbs = resolveBreadcrumbs(page.path ?? "/care", page.breadcrumbs, settings?.showBreadcrumbs);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      {/* ── Services ── */}
      {services.length > 0 ? (
        <Section>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                  Services
                </p>
                <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                  What we treat
                </h2>
              </div>
              <Link
                href="/care/services"
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-trust hover:text-brand-action"
              >
                All services
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = getCareIcon(service.icon);
                const panelBg = getCardColor(service.cardColor, i);
                return (
                  <Link
                    key={service.slug}
                    href={getServiceHref(service)}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:border-brand-action/30 hover:shadow-md"
                  >
                    {/* Colored header panel */}
                    <div
                      className={`flex h-32 items-center justify-center ${panelBg} transition-opacity group-hover:opacity-90`}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-16 text-white/35"
                      />
                    </div>
                    {/* Content area */}
                    <div className="flex flex-1 flex-col bg-card p-5">
                      <h3 className="font-heading text-lg font-black leading-tight tracking-normal text-brand-coal group-hover:text-brand-action">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-action">
                        Learn more
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ── Programs ── */}
      {programs.length > 0 ? (
        <Section tone="muted">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                  Programs
                </p>
                <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                  Structured support
                </h2>
              </div>
              <Link
                href="/care/programs"
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-trust hover:text-brand-action"
              >
                All programs
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={getProgramHref(program)}
                  className="group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition-all hover:border-brand-action/30 hover:shadow-md"
                >
                  <div className="h-1 w-full bg-[linear-gradient(90deg,var(--brand-warm-accent),var(--brand-emphasis),var(--brand-soft-accent))]" />
                  <div className="flex flex-1 flex-col p-5">
                    {program.audience ? (
                      <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-warm-accent">
                        {program.audience}
                      </p>
                    ) : null}
                    <h3 className="mt-3 font-heading text-xl font-black leading-tight tracking-normal text-brand-coal group-hover:text-brand-action">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">
                      {program.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-action">
                      Learn more
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </span>
                  </div>
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
