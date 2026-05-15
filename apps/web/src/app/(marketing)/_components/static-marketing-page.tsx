import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { getMarketingPage } from "@/lib/cms/content-source";

type StaticMarketingPageProps = {
  description: string;
  eyebrow?: string;
  slug: string;
  title: string;
};

export async function StaticMarketingPage({
  description,
  eyebrow,
  slug,
  title,
}: StaticMarketingPageProps) {
  const page = await getMarketingPage(slug);

  return (
    <>
      <PageHero
        description={page?.description ?? description}
        eyebrow={page?.eyebrow ?? eyebrow}
        title={page?.title ?? title}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}
    </>
  );
}
