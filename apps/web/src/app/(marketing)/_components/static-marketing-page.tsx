import { notFound } from "next/navigation";

import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getMarketingPage } from "@/lib/cms/content-source";

type StaticMarketingPageProps = {
  slug: string;
};

export async function StaticMarketingPage({ slug }: StaticMarketingPageProps) {
  const page = await getMarketingPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />
      {page.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}
    </>
  );
}
