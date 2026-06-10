import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { getCardColor, getCareIcon } from "@/components/care/care-icon";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getProgramHref } from "@/lib/care-routes";
import { getMarketingPage, getPrograms, getSiteSettings } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("programs", "/care/programs");


export default async function ProgramsPage() {
  const [programs, page, settings] = await Promise.all([
    getPrograms(),
    getMarketingPage("programs"),
    getSiteSettings(),
  ]);
  if (!page) notFound();
  const breadcrumbs = resolveBreadcrumbs(
    page.path ?? "/care/programs",
    page.breadcrumbs,
    settings?.showBreadcrumbs,
  );

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      {programs.length > 0 ? (
        <div className="divide-y divide-border border-y border-border">
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
                  className={`hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:block ${
                    isReversed ? panelBg : "bg-background"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:block ${
                    isReversed ? "bg-background" : panelBg
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:block ${
                    isReversed ? "bg-black/10" : "bg-brand-coal/[0.035]"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`hidden lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:block ${
                    isReversed ? "bg-brand-coal/[0.035]" : "bg-black/10"
                  }`}
                />

                <div
                  className={`relative z-10 flex flex-col justify-center bg-background px-4 py-12 transition-colors group-hover:bg-brand-warm-accent/[0.08] group-hover:ring-1 group-hover:ring-inset group-hover:ring-brand-action/20 sm:px-6 lg:row-start-1 lg:bg-transparent lg:px-8 lg:py-20 ${
                    isReversed
                      ? "lg:col-start-3 lg:col-end-4"
                      : "lg:col-start-2 lg:col-end-3"
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
                    isReversed
                      ? "lg:col-start-2 lg:col-end-3"
                      : "lg:col-start-3 lg:col-end-4"
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
      ) : null}

      <ContactBand />
    </>
  );
}
