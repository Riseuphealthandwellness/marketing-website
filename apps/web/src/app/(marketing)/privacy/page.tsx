import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForLegalPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForLegalPage("/privacy", "legalPage.privacy");

export default function PrivacyPage() {
  return <MarketingPage legalPageId="legalPage.privacy" />;
}
