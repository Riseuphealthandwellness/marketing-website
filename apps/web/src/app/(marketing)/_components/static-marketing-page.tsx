import { notFound } from "next/navigation";

import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { LegalPageBody } from "@/components/sections/legal-page-body";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getMarketingPage } from "@/lib/cms/content-source";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type StaticMarketingPageProps = {
  slug: string;
  path?: string;
};

export async function StaticMarketingPage({ slug, path }: StaticMarketingPageProps) {
  const page = await getMarketingPage(slug);
  if (!page) notFound();

  const breadcrumbs = buildBreadcrumbs(path ?? page.path ?? "");
  const hasSidebar = (page.sidebar?.length ?? 0) > 0;

  if (page.body) {
    return (
      <>
        <PageHero breadcrumbs={breadcrumbs} eyebrow={page.eyebrow} title={page.title} />
        <LegalPageBody body={page.body} title={page.title} sidebar={page.sidebar} />
      </>
    );
  }

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
      {page.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}
    </>
  );
}
