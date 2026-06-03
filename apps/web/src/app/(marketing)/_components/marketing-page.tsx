import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { LegalPageBody } from "@/components/sections/legal-page-body";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getMarketingPage, getMarketingPageByPath } from "@/lib/cms/content-source";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

type MarketingPageProps = {
  slug?: string;
  path?: string;
};

export async function MarketingPage({ slug, path }: MarketingPageProps) {
  const page = path ? await getMarketingPageByPath(path) : slug ? await getMarketingPage(slug) : null;
  if (!page) notFound();

  const breadcrumbs = resolveBreadcrumbs(path ?? page.path, page.breadcrumbs);

  if (page.body) {
    return (
      <>
        <PageHero breadcrumbs={breadcrumbs} eyebrow={page.eyebrow} title={page.title} />
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
