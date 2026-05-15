import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { getAllProgramSlugs, getProgramBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

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
      <PageHero eyebrow="Programs" title={program.title} description={program.description} />

      {program.audience || (program.body && (program.body as unknown[]).length > 0) ? (
        <Section>
          <Container>
            {program.audience ? (
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                For: <Badge className="ml-1">{program.audience}</Badge>
              </p>
            ) : null}
            {program.body && (program.body as unknown[]).length > 0 ? (
              <div className="prose prose-lg max-w-3xl text-foreground prose-headings:font-heading prose-headings:font-black prose-headings:tracking-normal prose-a:text-brand-action prose-strong:text-foreground">
                <PortableText value={program.body as Parameters<typeof PortableText>[0]["value"]} />
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
