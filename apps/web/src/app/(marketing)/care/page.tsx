import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { getCardColor, getCareIcon } from "@/components/care/care-icon";
import { Container } from "@/components/layout/container";
import { ContactBand } from "@/components/sections/contact-band";
import { FaqSection } from "@/components/sections/faq-section";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getProgramHref, getServiceHref } from "@/lib/care-routes";
import {
  getFaqsByCategory,
  getMarketingPage,
  getPrograms,
  getServices,
  getSiteSettings,
} from "@/lib/cms/content-source";
import type { HomepageV2IconName, PageBlock } from "@/lib/cms/types";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("care", "/care");

type CareModelBlockType = Extract<PageBlock, { _type: "careModelBlock" }>;

function CareModelSection({ block }: { block: CareModelBlockType }) {
  return (
    <section className="bg-brand-warm-white py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {block.eyebrow ? (
            <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-action">
              {block.eyebrow}
            </p>
          ) : null}
          {block.heading ? (
            <h2 className="mt-3 font-heading text-4xl font-black tracking-normal text-brand-coal sm:text-5xl">
              {block.heading}
            </h2>
          ) : null}
          {block.description ? (
            <p className="mt-5 text-lg leading-8 text-brand-coal/72">{block.description}</p>
          ) : null}
        </div>
        {block.items?.length ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {block.items.map((item, index) => {
              const Icon = getCareIcon(item.iconName as HomepageV2IconName);
              return (
                <article
                  className="rounded-lg border border-border bg-white p-6 shadow-sm"
                  key={`${item.title}-${index}`}
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-brand-action text-brand-warm-white">
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-black tracking-normal text-brand-coal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-brand-coal/72">{item.body}</p>
                </article>
              );
            })}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export default async function CarePage() {
  const [services, programs, page, faqs, settings] = await Promise.all([
    getServices(),
    getPrograms(),
    getMarketingPage("care"),
    getFaqsByCategory("care"),
    getSiteSettings(),
  ]);
  if (!page) notFound();
  const breadcrumbs = resolveBreadcrumbs(
    page.path ?? "/care",
    page.breadcrumbs,
    settings?.showBreadcrumbs,
  );

  const pageBlocks = page.blocks ?? [];
  const careModelBlock = pageBlocks.find(
    (b): b is CareModelBlockType => b._type === "careModelBlock",
  );
  const remainingBlocks = pageBlocks.filter((b) => b._type !== "careModelBlock");

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      {/* ── Services ── */}
      {services.length > 0 ? (
        <>
          <div className="border-y border-border bg-white py-8 sm:py-10">
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
                  className="flex items-center gap-1.5 text-sm font-semibold text-brand-trust transition-colors hover:text-brand-action"
                >
                  All services
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Container>
          </div>

          <div className="divide-y divide-border border-b border-border">
            {services.map((service, i) => {
              const Icon = getCareIcon(service.icon);
              const panelBg = getCardColor(service.cardColor, i);
              const isReversed = i % 2 === 1;

              return (
                <div
                  key={service.slug}
                  className="group grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)_minmax(0,40rem)_minmax(0,1fr)]"
                >
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:block ${isReversed ? panelBg : "bg-background"}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:block ${isReversed ? "bg-background" : panelBg}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:block ${isReversed ? "bg-black/10" : "bg-brand-coal/[0.035]"}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:block ${isReversed ? "bg-brand-coal/[0.035]" : "bg-black/10"}`}
                  />

                  <div
                    className={`relative z-10 flex flex-col justify-center bg-background px-4 py-12 transition-colors group-hover:bg-brand-warm-accent/[0.08] group-hover:ring-1 group-hover:ring-inset group-hover:ring-brand-action/20 sm:px-6 lg:row-start-1 lg:bg-transparent lg:px-8 lg:py-20 ${
                      isReversed ? "lg:col-start-3 lg:col-end-4" : "lg:col-start-2 lg:col-end-3"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="select-none font-heading text-[7rem] font-black leading-none tracking-tight text-brand-coal/[0.06]"
                    >
                      0{i + 1}
                    </span>
                    <h2 className="-mt-6 font-heading text-4xl font-black leading-tight tracking-normal text-brand-coal transition-colors group-hover:text-brand-action sm:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-8">
                      <Link
                        href={getServiceHref(service)}
                        className="inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-action px-6 font-heading text-sm font-bold text-brand-warm-white transition-colors hover:bg-brand-action-hover"
                      >
                        Learn more
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`relative z-10 flex min-h-[220px] items-center justify-center ${panelBg} px-4 sm:px-6 lg:row-start-1 lg:min-h-full lg:bg-transparent lg:px-8 ${
                      isReversed ? "lg:col-start-2 lg:col-end-3" : "lg:col-start-3 lg:col-end-4"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-28 text-white transition-transform duration-300 group-hover:scale-105 sm:size-36 lg:size-44"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      {/* ── Care model / How it works ── */}
      {careModelBlock ? <CareModelSection block={careModelBlock} /> : null}

      {/* ── Programs ── */}
      {programs.length > 0 ? (
        <>
          <div className="border-y border-border bg-brand-trust py-8 text-brand-warm-white sm:py-10">
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-soft-accent">
                    Programs
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal sm:text-4xl">
                    Structured support
                  </h2>
                </div>
                <Link
                  href="/care/programs"
                  className="flex items-center gap-1.5 text-sm font-semibold text-brand-warm-white/82 transition-colors hover:text-brand-warm-white"
                >
                  All programs
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Container>
          </div>

          <div className="divide-y divide-border border-b border-border">
            {programs.map((program, i) => {
              const Icon = getCareIcon(program.icon);
              const panelBg = getCardColor(program.cardColor, i);
              const isReversed = i % 2 === 1;
              const headingOffset = program.audience ? "mt-3" : "-mt-5";

              return (
                <div
                  key={program.slug}
                  className="group grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)_minmax(0,40rem)_minmax(0,1fr)]"
                >
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:block ${isReversed ? panelBg : "bg-background"}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:block ${isReversed ? "bg-background" : panelBg}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:block ${isReversed ? "bg-black/10" : "bg-brand-coal/[0.035]"}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`hidden lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:block ${isReversed ? "bg-brand-coal/[0.035]" : "bg-black/10"}`}
                  />

                  <div
                    className={`relative z-10 flex flex-col justify-center bg-background px-4 py-12 transition-colors group-hover:bg-brand-warm-accent/[0.08] group-hover:ring-1 group-hover:ring-inset group-hover:ring-brand-action/20 sm:px-6 lg:row-start-1 lg:bg-transparent lg:px-8 lg:py-20 ${
                      isReversed ? "lg:col-start-3 lg:col-end-4" : "lg:col-start-2 lg:col-end-3"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="select-none font-heading text-[6.5rem] font-black leading-none tracking-tight text-brand-coal/[0.06]"
                    >
                      0{i + 1}
                    </span>
                    {program.audience ? (
                      <p className="-mt-4 font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                        {program.audience}
                      </p>
                    ) : null}
                    <h2
                      className={`${headingOffset} font-heading text-4xl font-black leading-tight tracking-normal text-brand-coal transition-colors group-hover:text-brand-action sm:text-5xl`}
                    >
                      {program.title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                      {program.description}
                    </p>
                    <div className="mt-8">
                      <Link
                        href={getProgramHref(program)}
                        className="inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-action px-6 font-heading text-sm font-bold text-brand-warm-white transition-colors hover:bg-brand-action-hover"
                      >
                        Learn more
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`relative z-10 flex min-h-[220px] items-center justify-center overflow-hidden ${panelBg} px-4 sm:px-6 lg:row-start-1 lg:min-h-full lg:bg-transparent lg:px-8 ${
                      isReversed ? "lg:col-start-2 lg:col-end-3" : "lg:col-start-3 lg:col-end-4"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-28 max-w-[65%] text-white transition-transform duration-300 group-hover:scale-105 sm:size-36 lg:size-44"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      {remainingBlocks.length > 0 ? <PageBlocks blocks={remainingBlocks} /> : null}

      <FaqSection faqs={faqs} />
      <ContactBand />
    </>
  );
}
