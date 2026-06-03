import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ConditionDetailPage,
  generateConditionMetadata,
} from "@/app/(marketing)/_components/condition-detail-page";
import { getProgramBySlug } from "@/lib/cms/content-source";

type Props = { params: Promise<{ slug: string; condition: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, condition } = await params;
  return generateConditionMetadata({
    slug: condition,
    serviceSlug: slug,
    path: `/care/programs/${slug}/conditions/${condition}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug, condition } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  return (
    <ConditionDetailPage
      slug={condition}
      serviceSlug={slug}
      serviceLabel={program.title}
      path={`/care/programs/${slug}/conditions/${condition}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Care", href: "/care" },
        { label: "Programs", href: "/care/programs" },
        { label: program.title, href: `/care/programs/${slug}` },
      ]}
    />
  );
}
