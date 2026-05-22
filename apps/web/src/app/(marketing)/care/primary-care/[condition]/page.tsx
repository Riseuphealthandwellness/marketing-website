import type { Metadata } from "next";

import {
  ConditionDetailPage,
  generateConditionMetadata,
} from "@/app/(marketing)/_components/condition-detail-page";
import { getAllConditionSlugs } from "@/lib/cms/content-source";

type Props = { params: Promise<{ condition: string }> };

export async function generateStaticParams() {
  const slugs = await getAllConditionSlugs();
  return slugs
    .filter((s) => s.category === "primary-care")
    .map((s) => ({ condition: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { condition } = await params;
  return generateConditionMetadata({ slug: condition, serviceSlug: "primary-care" });
}

export default async function Page({ params }: Props) {
  const { condition } = await params;
  return (
    <ConditionDetailPage
      slug={condition}
      serviceSlug="primary-care"
      serviceLabel="Primary care"
    />
  );
}
