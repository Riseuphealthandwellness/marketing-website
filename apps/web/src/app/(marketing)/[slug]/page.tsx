import { notFound } from "next/navigation";

import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { getAllPageSlugs } from "@/lib/cms/content-source";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return metadataForPage(slug);
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  // Guard against slugs that conflict with known static routes handled elsewhere.
  // Next.js resolves specific routes before [slug], but this is a safety net.
  const staticRoutes = new Set([
    "about", "care", "careers", "contact", "insurance-payment",
    "new-patients", "patient-resources", "primary-care",
    "privacy", "programs", "referrals", "services", "team", "terms",
  ]);
  if (staticRoutes.has(slug)) notFound();

  return <MarketingPage slug={slug} />;
}
