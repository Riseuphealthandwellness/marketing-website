import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { SupplementalSections } from "@/components/sections/supplemental-sections";
import { getDrugBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { resolveBreadcrumbs, type BreadcrumbItem } from "@/lib/breadcrumbs";

type DrugDetailPageProps = {
  slug: string;
  path?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export async function generateDrugMetadata({
  slug,
  path,
}: {
  slug: string;
  path?: string;
}): Promise<Metadata> {
  const [drug, settings] = await Promise.all([getDrugBySlug(slug), getSiteSettings()]);
  if (!drug) return {};
  return createPageMetadata({
    title: drug.name,
    description: drug.description ?? "",
    path: path ?? `/care/medications/${slug}`,
    seo: drug.seo,
    site: settings ?? undefined,
  });
}

export async function DrugDetailPage({
  slug,
  path,
  eyebrow,
  breadcrumbs,
}: DrugDetailPageProps) {
  const [drug, settings] = await Promise.all([getDrugBySlug(slug), getSiteSettings()]);
  if (!drug) notFound();

  const subtitle = drug.genericName ? `${drug.genericName}` : undefined;
  const breadcrumbsForHero =
    settings?.showBreadcrumbs === false
      ? undefined
      : (breadcrumbs ??
        resolveBreadcrumbs(path ?? `/care/medications/${slug}`, undefined, settings?.showBreadcrumbs));

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbsForHero}
        eyebrow={eyebrow ?? drug.pageLabels?.eyebrow}
        title={drug.name}
        description={subtitle}
        backgroundImage={drug.image}
      />

      <Section className="bg-white py-10 sm:py-12 lg:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
            <div>
              {drug.description ? (
                <p className="text-lg leading-8 text-brand-coal/80 sm:text-xl">
                  {drug.description}
                </p>
              ) : null}

              {drug.body && (drug.body as unknown[]).length > 0 ? (
                <div className="mt-8">
                  <PortableTextContent value={drug.body} />
                </div>
              ) : null}
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-border bg-brand-warm-white p-5 shadow-[var(--shadow-soft)]">
                {drug.genericName ? (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {drug.pageLabels?.genericNameLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-brand-coal">
                      {drug.genericName}
                    </p>
                  </div>
                ) : null}

                {drug.aliases && drug.aliases.length > 0 ? (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {drug.pageLabels?.aliasesLabel}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {drug.aliases.map((alias) => (
                        <li className="text-sm text-brand-trust" key={alias}>
                          {alias}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {drug.learnMoreUrl ? (
                  <a
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-white px-4 py-3 text-sm font-semibold text-brand-trust transition-colors hover:border-brand-action/30 hover:text-brand-action"
                    href={drug.learnMoreUrl}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
                    {drug.learnMoreLabel}
                  </a>
                ) : null}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {drug.supplementalSections?.length ? (
        <SupplementalSections data={{ sections: drug.supplementalSections }} />
      ) : null}

      <ContactBand />
    </>
  );
}
