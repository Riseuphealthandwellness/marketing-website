import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DrugDetailPage, generateDrugMetadata } from "@/app/(marketing)/_components/drug-detail-page";
import { getProgramBySlug } from "@/lib/cms/content-source";

type Props = { params: Promise<{ slug: string; treatment: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, treatment } = await params;
  return generateDrugMetadata({
    slug: treatment,
    path: `/care/programs/${slug}/treatments/${treatment}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug, treatment } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  return (
    <DrugDetailPage
      slug={treatment}
      path={`/care/programs/${slug}/treatments/${treatment}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Care", href: "/care" },
        { label: "Programs", href: "/care/programs" },
        { label: program.title, href: `/care/programs/${slug}` },
      ]}
    />
  );
}
