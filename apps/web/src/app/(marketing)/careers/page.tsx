import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("careers");

export default function CareersPage() {
  return <StaticMarketingPage slug="careers" />;
}
