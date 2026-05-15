import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("programs");

export default function ProgramsPage() {
  return (
    <StaticMarketingPage
      description="Learn about Rise Up programs designed to support recovery, wellness, and long-term stability."
      eyebrow="Programs"
      slug="programs"
      title="Programs built around real needs"
    />
  );
}
