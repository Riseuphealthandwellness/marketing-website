import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

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
    path: `/care/programs/${slug}`,
    seo: program.seo,
    site: settings ?? undefined,
  });
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) permanentRedirect("/care/programs");

  permanentRedirect(`/care/programs/${slug}`);
}
