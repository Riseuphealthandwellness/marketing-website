import { notFound } from "next/navigation";

import { ContactBand } from "@/components/sections/contact-band";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("new-patients");

export default async function NewPatientsPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getMarketingPage("new-patients")]);
  if (!page) notFound();

  const hasSidebar = (page.sidebar?.length ?? 0) > 0;

  return (
    <>
      <PageHero
        breadcrumbs={resolveBreadcrumbs(page.path, page.breadcrumbs, settings?.showBreadcrumbs)}
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {hasSidebar ? (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
              <div>
                {page?.blocks && page.blocks.length > 0 ? (
                  <PageBlocks blocks={page.blocks} compact />
                ) : null}
              </div>
              <PageSidebar cards={page.sidebar!} />
            </div>
          </Container>
        </Section>
      ) : (
        page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null
      )}
      <ContactBand />
    </>
  );
}
