import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getMarketingPage, getPrograms } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("programs", "/care/programs");

export default async function ProgramsPage() {
  const [programs, page] = await Promise.all([
    getPrograms(),
    getMarketingPage("programs"),
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

      {programs.length > 0 ? (
        <Section>
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={program.href ?? `/programs/${program.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand-action/30 hover:bg-muted/40"
                >
                  <div>
                    {program.audience ? (
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {program.audience}
                      </p>
                    ) : null}
                    <h2 className="font-heading text-xl font-black tracking-normal text-foreground group-hover:text-brand-action">
                      {program.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {program.description}
                    </p>
                  </div>
                  <span className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand-action">
                    Learn more
                    <ArrowRight className="size-3.5" aria-hidden="true" />
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
