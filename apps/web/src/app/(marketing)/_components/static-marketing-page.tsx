import { notFound } from "next/navigation";

import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getMarketingPage } from "@/lib/cms/content-source";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type StaticMarketingPageProps = {
  slug: string;
};

export async function StaticMarketingPage({ slug }: StaticMarketingPageProps) {
  const page = await getMarketingPage(slug);
  if (!page) notFound();

  const breadcrumbs = page.path ? buildBreadcrumbs(page.path) : undefined;
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
            <div className="grid gap-12 lg:grid-cols-[1fr_260px] xl:gap-16">
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
      {page.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}
    </>
  );
}
