import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ConditionDetailPage,
  generateConditionMetadata,
} from "@/app/(marketing)/_components/condition-detail-page";
import { getServiceBySlug } from "@/lib/cms/content-source";

type Props = { params: Promise<{ slug: string; condition: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, condition } = await params;
  return generateConditionMetadata({
    slug: condition,
    serviceSlug: slug,
    path: `/care/services/${slug}/conditions/${condition}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug, condition } = await params;
  const service = await getServiceBySlug(slug);
  if (!service || !service.conditions?.some((item) => item.slug === condition)) notFound();

  return (
    <ConditionDetailPage
      slug={condition}
      serviceSlug={slug}
      serviceLabel={service.title}
      path={`/care/services/${slug}/conditions/${condition}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Care", href: "/care" },
        { label: "Services", href: "/care/services" },
        { label: service.title, href: `/care/services/${slug}` },
      ]}
    />
  );
}
