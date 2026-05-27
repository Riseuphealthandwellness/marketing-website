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
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getMarketingPage, getServices } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("services", "/care/services");

const serviceIconPool = [HeartPulse, Stethoscope, Pill, Brain, ShieldPlus, Users];

export default async function ServicesPage() {
  const [services, page] = await Promise.all([
    getServices(),
    getMarketingPage("services"),
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
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              {services.map((service, i) => {
                const Icon = serviceIconPool[i % serviceIconPool.length]!;
                return (
                  <Link
                    key={service.slug}
                    href={service.href ?? `/care/${service.slug}`}
                    className="group grid border-b border-border p-5 transition-colors last:border-b-0 hover:bg-muted/50 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start sm:gap-5"
                  >
                    <span className="mb-4 flex size-12 items-center justify-center rounded-lg bg-brand-warm-accent/12 text-brand-action sm:mb-0 sm:mt-0.5">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span>
                      <span className="block font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                        {service.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-6 text-muted-foreground">
                        {service.description}
                      </span>
                    </span>
                    <span className="hidden items-center gap-1 pt-0.5 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-brand-action sm:flex sm:mt-0.5">
                      Learn more
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
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
