import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForLegalPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForLegalPage("/privacy-policy", "legal-page-privacy");

export default function PrivacyPolicyPage() {
  return <MarketingPage legalPageId="legal-page-privacy" />;
}
