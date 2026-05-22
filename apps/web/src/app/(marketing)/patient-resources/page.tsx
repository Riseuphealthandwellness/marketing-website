import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("patient-resources");

export default function PatientResourcesPage() {
  return (
    <StaticMarketingPage slug="patient-resources" />
  );
}
