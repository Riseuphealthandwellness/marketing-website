import { Download, FileText } from "lucide-react";
import { notFound } from "next/navigation";

import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getMarketingPage } from "@/lib/cms/content-source";

export const generateMetadata = () =>
  metadataForPage("medical-record-request", "/about/medical-record-request");

export default async function MedicalRecordRequestPage() {
  const page = await getMarketingPage("medical-record-request");
  if (!page) notFound();

  const pdf = page.recordRequestPdf;

  return (
    <>
      <StaticMarketingPage slug="medical-record-request" />
      {pdf?.url ? (
        <Section className="bg-surface">
          <Container>
            <div className="max-w-xl">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <FileText
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand-trust"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-foreground">
                    Authorization for Release of Health Information
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Download the form, complete all fields, and return it to us by fax or mail using
                    the contact information on the form.
                  </p>
                  <a
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-trust hover:text-brand-action hover:underline"
                    href={pdf.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Download aria-hidden="true" className="size-3.5" />
                    {page.recordRequestPdfLabel ?? "Download authorization form (PDF)"}
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
      <ContactBand />
    </>
  );
}
