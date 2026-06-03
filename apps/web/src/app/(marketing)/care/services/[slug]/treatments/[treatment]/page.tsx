import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DrugDetailPage, generateDrugMetadata } from "@/app/(marketing)/_components/drug-detail-page";
import { getServiceBySlug } from "@/lib/cms/content-source";

type Props = { params: Promise<{ slug: string; treatment: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, treatment } = await params;
  return generateDrugMetadata({
    slug: treatment,
    path: `/care/services/${slug}/treatments/${treatment}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug, treatment } = await params;
  const service = await getServiceBySlug(slug);
  if (!service || !service.medications?.some((item) => item.slug === treatment)) notFound();

  return (
    <DrugDetailPage
      slug={treatment}
      path={`/care/services/${slug}/treatments/${treatment}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Care", href: "/care" },
        { label: "Services", href: "/care/services" },
        { label: service.title, href: `/care/services/${slug}` },
      ]}
    />
  );
}
