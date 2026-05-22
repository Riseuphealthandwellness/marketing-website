import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { PageBlocks } from "@/components/sections/page-blocks";
import { LegalPageBody } from "@/components/sections/legal-page-body";
import { getLegalPage, getMarketingPage } from "@/lib/cms/content-source";

type MarketingPageProps =
  | { legalPageId: "legal-page-privacy" | "legal-page-terms"; slug?: never }
  | { slug: string; legalPageId?: never };

export async function MarketingPage({ legalPageId, slug }: MarketingPageProps) {
  if (legalPageId) {
    const page = await getLegalPage(legalPageId);
    if (!page) notFound();

    return (
      <>
        <PageHero title={page.title} />
        <LegalPageBody body={page.body} title={page.title} />
      </>
    );
  }

  const page = await getMarketingPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />
      {page.blocks && page.blocks.length > 0 ? (
        <PageBlocks blocks={page.blocks} />
      ) : null}
    </>
  );
}
