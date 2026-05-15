import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("referrals");

export default function ReferralsPage() {
  return (
    <StaticMarketingPage
      description="Referral partners can connect patients with integrated treatment, recovery, and primary care services."
      eyebrow="Referrals"
      slug="referrals"
      title="Refer a patient to Rise Up"
    />
  );
}
