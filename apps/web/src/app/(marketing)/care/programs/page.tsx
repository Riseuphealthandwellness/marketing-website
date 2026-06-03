import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  HeartHandshake,
  Layers,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getProgramHref } from "@/lib/care-routes";
import { getMarketingPage, getPrograms } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("programs", "/care/programs");

const programIconPool = [HeartHandshake, Users, ClipboardList, CalendarCheck, Layers, BookOpen];

const programPanelBgs = [
  "bg-brand-deep-slate",
  "bg-brand-rise-red",
  "bg-brand-coal",
  "bg-brand-ember-orange",
  "bg-brand-deep-slate",
  "bg-brand-rise-red",
] as const;

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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, i) => {
                const Icon = programIconPool[i % programIconPool.length]!;
                const panelBg = programPanelBgs[i % programPanelBgs.length]!;
                return (
                  <Link
                    key={program.slug}
                    href={getProgramHref(program)}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:border-brand-action/30 hover:shadow-md"
                  >
                    <div
                      className={`flex h-32 items-center justify-center ${panelBg} transition-opacity group-hover:opacity-90`}
                    >
                      <Icon aria-hidden="true" className="size-16 text-white/35" />
                    </div>
                    <div className="flex flex-1 flex-col bg-card p-5">
                      {program.audience ? (
                        <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
                          {program.audience}
                        </p>
                      ) : null}
                      <h2 className="mt-2 font-heading text-lg font-black leading-tight tracking-normal text-brand-coal group-hover:text-brand-action">
                        {program.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">
                        {program.description}
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

      <ContactBand />
    </>
  );
}
