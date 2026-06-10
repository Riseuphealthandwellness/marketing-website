import { notFound } from "next/navigation";
import { Download, FileText } from "lucide-react";

import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { PageSidebar } from "@/components/sections/page-sidebar";
import { LegalPageBody } from "@/components/sections/legal-page-body";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";
import type { CmsFile } from "@/lib/cms/types";

type StaticMarketingPageProps = {
  slug: string;
  path?: string;
};

function RecordRequestDownload({
  file,
  label,
  inline = false,
}: {
  file?: CmsFile;
  label?: string;
  inline?: boolean;
}) {
  if (!file?.url) return null;

  const card = (
    <div className="max-w-4xl rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-trust" />
          <div className="min-w-0">
            <p className="font-heading text-base font-black tracking-normal text-foreground">
              Authorization form PDF
            </p>
            {file.originalFilename ? (
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {file.originalFilename}
              </p>
            ) : null}
          </div>
        </div>
        <Button asChild className="shrink-0">
          <a href={file.url} rel="noreferrer" target="_blank">
            <Download aria-hidden="true" className="size-4" />
            {label?.trim() || "Download authorization form"}
          </a>
        </Button>
      </div>
    </div>
  );

  if (inline) {
    return <div className="mt-8">{card}</div>;
  }

  return (
    <Section className="pt-0">
      <Container>{card}</Container>
    </Section>
  );
}

export async function StaticMarketingPage({ slug, path }: StaticMarketingPageProps) {
  const [page, settings] = await Promise.all([getMarketingPage(slug), getSiteSettings()]);
  if (!page) notFound();

  const breadcrumbs = resolveBreadcrumbs(
    path ?? page.path,
    page.breadcrumbs,
    settings?.showBreadcrumbs,
  );
  const hasSidebar = (page.sidebar?.length ?? 0) > 0;

  if (page.body) {
    return (
      <>
        <PageHero breadcrumbs={breadcrumbs} eyebrow={page.eyebrow} title={page.title} />
        <LegalPageBody body={page.body} title={page.title} sidebar={page.sidebar} />
        <RecordRequestDownload
          file={page.recordRequestPdf}
          label={page.recordRequestPdfLabel}
        />
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
                <RecordRequestDownload
                  file={page.recordRequestPdf}
                  inline
                  label={page.recordRequestPdfLabel}
                />
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
      <RecordRequestDownload
        file={page.recordRequestPdf}
        label={page.recordRequestPdfLabel}
      />
      {page.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}
    </>
  );
}
