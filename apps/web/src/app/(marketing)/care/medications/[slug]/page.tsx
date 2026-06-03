import type { Metadata } from "next";

import { DrugDetailPage, generateDrugMetadata } from "@/app/(marketing)/_components/drug-detail-page";
import { getAllDrugSlugs } from "@/lib/cms/content-source";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllDrugSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateDrugMetadata({ slug });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <DrugDetailPage slug={slug} />;
}
