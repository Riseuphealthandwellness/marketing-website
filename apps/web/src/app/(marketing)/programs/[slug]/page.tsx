import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { getAllProgramSlugs, getProgramBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [program, settings] = await Promise.all([getProgramBySlug(slug), getSiteSettings()]);
  if (!program) return {};
  return createPageMetadata({
    title: program.title,
    description: program.description,
    path: `/programs/${slug}`,
    seo: program.seo,
    site: settings ?? undefined,
  });
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={buildBreadcrumbs(`/programs/${slug}`, program.title)}
        eyebrow="Programs"
        title={program.title}
        description={program.description}
      />

      {program.audience || (program.body && (program.body as unknown[]).length > 0) ? (
        <Section>
          <Container>
            {program.audience ? (
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                For: <Badge className="ml-1">{program.audience}</Badge>
              </p>
            ) : null}
            {program.body && (program.body as unknown[]).length > 0 ? (
              <PortableTextContent className="max-w-3xl" value={program.body} />
            ) : null}
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
