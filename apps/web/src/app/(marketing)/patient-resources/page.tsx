import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("patient-resources");

export default function PatientResourcesPage() {
  return (
    <StaticMarketingPage
      description="Helpful links and guidance for patients navigating care, appointments, and support resources."
      eyebrow="Patient resources"
      slug="patient-resources"
      title="Patient resources"
    />
  );
}
