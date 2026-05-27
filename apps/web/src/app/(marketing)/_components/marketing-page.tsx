import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { LegalPageBody } from "@/components/sections/legal-page-body";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getMarketingPage } from "@/lib/cms/content-source";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type MarketingPageProps = {
  slug: string;
};

export async function MarketingPage({ slug }: MarketingPageProps) {
  const page = await getMarketingPage(slug);
  if (!page) notFound();

  const breadcrumbs = page.path ? buildBreadcrumbs(page.path) : undefined;

  if (page.body) {
    return (
      <>
        <PageHero breadcrumbs={breadcrumbs} title={page.title} />
        <LegalPageBody body={page.body} title={page.title} sidebar={page.sidebar} />
      </>
    );
  }

  const hasSidebar = (page.sidebar?.length ?? 0) > 0;

  if (hasSidebar) {
    return (
      <>
        <PageHero
          backgroundImage={page.heroImage}
          breadcrumbs={breadcrumbs}
          description={page.description}
          eyebrow={page.eyebrow}
          title={page.title}
        />
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
              <div>
                {page.blocks && page.blocks.length > 0 ? (
                  <PageBlocks blocks={page.blocks} compact />
                ) : null}
              </div>
              <PageSidebar cards={page.sidebar!} />
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        backgroundImage={page.heroImage}
        breadcrumbs={breadcrumbs}
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
