import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForLegalPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForLegalPage("/terms-of-service", "legal-page-terms");

export default function TermsOfServicePage() {
  return <MarketingPage legalPageId="legal-page-terms" />;
}
