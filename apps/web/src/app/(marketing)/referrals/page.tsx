import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";
import { ReferralFormSection } from "@/components/sections/referral-form-section";
import { getReferralSettings, getSiteSettings } from "@/lib/cms/content-source";

export const generateMetadata = () => metadataForPage("referrals");

export default async function ReferralsPage() {
  const [referralSettings, siteSettings] = await Promise.all([
    getReferralSettings(),
    getSiteSettings(),
  ]);

  return (
    <>
      <StaticMarketingPage slug="referrals" />
      <ReferralFormSection settings={referralSettings} siteSettings={siteSettings} />
      <ContactBand />
    </>
  );
}
