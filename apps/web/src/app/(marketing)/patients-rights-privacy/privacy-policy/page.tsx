import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage("privacy-policy", "/patients-rights-privacy/privacy-policy");

export default function PrivacyPolicyPage() {
  return <StaticMarketingPage slug="privacy-policy" path="/patients-rights-privacy/privacy-policy" />;
}
