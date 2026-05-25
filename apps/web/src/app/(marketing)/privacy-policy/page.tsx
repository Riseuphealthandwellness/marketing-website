import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage("privacy-policy", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return <MarketingPage slug="privacy-policy" />;
}
