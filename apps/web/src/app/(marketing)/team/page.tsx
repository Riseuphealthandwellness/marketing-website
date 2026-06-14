import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { Section } from "@/components/layout/section";
import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("team");

export default async function TeamPage() {
  const [page, settings] = await Promise.all([
    getMarketingPage("team"),
    getSiteSettings(),
  ]);
  if (!page) notFound();
  const breadcrumbs = resolveBreadcrumbs(page.path, page.breadcrumbs, settings?.showBreadcrumbs);

  const hasSidebar = (page.sidebar?.length ?? 0) > 0;
  const blocks = page.blocks ?? [];
  const teamListIndex = blocks.findIndex((b) => b._type === "teamListBlock");
  const contentBlocks = teamListIndex >= 0 ? blocks.slice(0, teamListIndex) : blocks;
  const teamBlocks = teamListIndex >= 0 ? blocks.slice(teamListIndex) : [];

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {hasSidebar ? (
        <>
          {contentBlocks.length > 0 ? (
            <Section>
              <Container>
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
                  <div>
                    <PageBlocks blocks={contentBlocks} compact />
                  </div>
                  <PageSidebar cards={page.sidebar!} />
                </div>
              </Container>
            </Section>
          ) : null}
          {teamBlocks.length > 0 ? <PageBlocks blocks={teamBlocks} /> : null}
        </>
      ) : (
        blocks.length > 0 ? <PageBlocks blocks={blocks} /> : null
      )}
    </>
  );
}
