import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForLegalPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForLegalPage("/terms-of-service", "legalPage.terms");

export default function TermsOfServicePage() {
  return <MarketingPage legalPageId="legalPage.terms" />;
}
