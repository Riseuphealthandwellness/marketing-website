import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage("terms-of-use", "/patients-rights-privacy/terms-of-use");

export default function TermsOfUsePage() {
  return <StaticMarketingPage slug="terms-of-use" path="/patients-rights-privacy/terms-of-use" />;
}
