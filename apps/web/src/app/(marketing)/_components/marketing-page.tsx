import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { PageBlocks } from "@/components/sections/page-blocks";
import { LegalPageBody } from "@/components/sections/legal-page-body";
import { getMarketingPage } from "@/lib/cms/content-source";

type MarketingPageProps = {
  slug: string;
};

export async function MarketingPage({ slug }: MarketingPageProps) {
  const page = await getMarketingPage(slug);
  if (!page) notFound();

  if (page.body) {
    return (
      <>
        <PageHero title={page.title} />
        <LegalPageBody body={page.body} title={page.title} />
      </>
    );
  }

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
