import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { getAllDrugs } from "@/lib/cms/content-source";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata = {
  title: "Medications",
  description: "Medications offered at Rise Up Health & Wellness.",
};

export default async function MedicationsPage() {
  const drugs = await getAllDrugs();

  return (
    <>
      <PageHero
        breadcrumbs={buildBreadcrumbs("/care")}
        eyebrow="Medications"
        title="Medications we offer"
        description="Evidence-based medications used as part of individualized treatment plans at Rise Up."
      />

      {drugs.length > 0 ? (
        <Section>
          <Container>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {drugs.map((drug) => (
                <Link
                  key={drug.slug}
                  href={`/care/medications/${drug.slug}`}
                  className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand-action/30 hover:bg-muted/40"
                >
                  <div>
                    {drug.genericName ? (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {drug.genericName}
                      </p>
                    ) : null}
                    <h2 className="font-heading text-xl font-black tracking-normal text-foreground group-hover:text-brand-action">
                      {drug.name}
                    </h2>
                    {drug.description ? (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {drug.description}
                      </p>
                    ) : null}
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

      <ContactBand />
    </>
  );
}
