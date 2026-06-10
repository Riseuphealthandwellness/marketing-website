import { getAllPageSlugs } from "@/lib/cms/content-source";
import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pageSlugs = await getAllPageSlugs();
  const carePageSlugs = pageSlugs
    .filter((s) => s.startsWith("care/"))
    .map((s) => s.slice("care/".length));
  return carePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return metadataForPage(`care/${slug}`);
}

export default async function CarePage({ params }: Props) {
  const { slug } = await params;
  return <MarketingPage slug={`care/${slug}`} />;
}
