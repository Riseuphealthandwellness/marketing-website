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

  return (
    <>
      <StaticMarketingPage
        description="Referral partners can connect patients with integrated treatment, recovery, and primary care services."
        eyebrow="Referrals"
        slug="referrals"
        title="Refer a patient to Rise Up"
      />

      <Section className="bg-background">
        <Container>
          <div className="grid gap-6 rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-heading text-2xl font-black tracking-normal text-foreground">
                Printable referral form
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                Download the referral PDF when you need the printable version or need to route
                supporting documents through an approved secure channel.
              </p>
            </div>

            {referralPdf?.url ? (
              <Button asChild className="w-fit">
                <a href={referralPdf.url} rel="noreferrer" target="_blank">
                  <Download aria-hidden="true" className="size-4" />
                  {referralSettings?.downloadLabel ?? "Download referral PDF"}
                </a>
              </Button>
            ) : (
              <p className="text-sm font-semibold text-muted-foreground">
                Upload the referral PDF in Sanity to enable downloads.
              </p>
            )}
          </div>
        </Container>
      </Section>

      <ReferralFormSection />
      <ContactBand />
    </>
  );
}
