import { Download } from "lucide-react";

import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { ReferralFormSection } from "@/components/sections/referral-form-section";
import { Button } from "@/components/ui/button";
import { getReferralSettings } from "@/lib/cms/content-source";

export const generateMetadata = () => metadataForPage("referrals");

export default async function ReferralsPage() {
  const referralSettings = await getReferralSettings();
  const referralPdf = referralSettings?.referralPdf;
  const pdfSectionHeading = referralSettings?.pdfSectionHeading?.trim();
  const pdfSectionDescription = referralSettings?.pdfSectionDescription?.trim();

  return (
    <>
      <StaticMarketingPage slug="referrals" />

      <Section className="bg-background">
        <Container>
          <div className="grid gap-6 rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              {pdfSectionHeading ? (
                <h2 className="font-heading text-2xl font-black tracking-normal text-foreground">
                  {pdfSectionHeading}
                </h2>
              ) : null}
              {pdfSectionDescription ? (
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                  {pdfSectionDescription}
                </p>
              ) : null}
            </div>

            {referralPdf?.url ? (
              <Button asChild className="w-fit">
                <a href={referralPdf.url} rel="noreferrer" target="_blank">
                  <Download aria-hidden="true" className="size-4" />
                  {referralSettings?.downloadLabel}
                </a>
              </Button>
            ) : referralSettings?.missingPdfMessage ? (
              <p className="text-sm font-semibold text-muted-foreground">
                {referralSettings.missingPdfMessage}
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      <ReferralFormSection settings={referralSettings} />
      <ContactBand />
    </>
  );
}
