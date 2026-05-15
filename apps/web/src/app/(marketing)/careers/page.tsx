import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("careers");

export default function CareersPage() {
  return (
    <StaticMarketingPage
      description="Explore opportunities to join a team focused on integrated, community-rooted care."
      eyebrow="Careers"
      slug="careers"
      title="Work with Rise Up"
    />
  );
}
