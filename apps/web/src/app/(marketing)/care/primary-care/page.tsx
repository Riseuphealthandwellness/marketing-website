import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("primary-care");

export default function PrimaryCarePage() {
  return (
    <StaticMarketingPage
      description="Primary care at Rise Up is coordinated with behavioral health and recovery support."
      eyebrow="Primary care"
      slug="primary-care"
      title="Primary care connected to the whole picture"
    />
  );
}
