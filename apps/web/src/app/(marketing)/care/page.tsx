import { notFound } from "next/navigation";

import { ContactBand } from "@/components/sections/contact-band";
import { Container } from "@/components/layout/container";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { Section } from "@/components/layout/section";
import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("care", "/care");

export default async function CarePage() {
  const [page, settings] = await Promise.all([
    getMarketingPage("care"),
    getSiteSettings(),
  ]);
  if (!page) notFound();

  const breadcrumbs = resolveBreadcrumbs(
    page.path ?? "/care",
    page.breadcrumbs,
    settings?.showBreadcrumbs,
  );

  const hasSidebar = (page.sidebar?.length ?? 0) > 0;
  const blocks = page.blocks ?? [];
  const firstSectionIdx = hasSidebar ? blocks.findIndex((b) => b._type === "pageSection") : -1;
  const preBlocks = firstSectionIdx > 0 ? blocks.slice(0, firstSectionIdx) : [];
  const sectionBlock = firstSectionIdx >= 0 ? blocks[firstSectionIdx] : null;
  const postBlocks = firstSectionIdx >= 0 ? blocks.slice(firstSectionIdx + 1) : blocks;

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      {preBlocks.length > 0 ? <PageBlocks blocks={preBlocks} /> : null}
      {hasSidebar && sectionBlock ? (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-12">
              <PageBlocks blocks={[sectionBlock]} compact />
              <PageSidebar cards={page.sidebar!} />
            </div>
          </Container>
        </Section>
      ) : null}
      {postBlocks.length > 0 ? <PageBlocks blocks={postBlocks} /> : null}
      <ContactBand />
    </>
  );
}
