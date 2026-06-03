import { notFound } from "next/navigation";

import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { getAllPagePaths } from "@/lib/cms/content-source";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const paths = await getAllPagePaths();
  return paths
    .map((path) => path.replace(/^\//, ""))
    .filter(Boolean)
    .map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  return metadataForPage(path);
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;

  // Block single-segment slugs that are handled by static routes elsewhere.
  const staticRootRoutes = new Set([
    "about", "care", "careers", "contact", "insurance-payment",
    "locations", "new-patients", "patient-resources", "primary-care",
    "privacy", "programs", "referrals", "services", "team", "terms",
    "privacy-policy", "terms-of-service",
  ]);
  if (slug.length === 1 && staticRootRoutes.has(slug[0]!)) notFound();

  return <MarketingPage path={path} />;
}
