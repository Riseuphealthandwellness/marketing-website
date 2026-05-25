import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage("terms-of-service", "/terms-of-service");

export default function TermsOfServicePage() {
  return <MarketingPage slug="terms-of-service" />;
}
