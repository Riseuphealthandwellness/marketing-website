import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForLegalPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForLegalPage("/privacy-policy", "legalPage.privacy");

export default function PrivacyPolicyPage() {
  return <MarketingPage legalPageId="legalPage.privacy" />;
}
