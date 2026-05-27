import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage(
    "medical-record-request-authorization",
    "/patients-rights-privacy/medical-record-request-authorization",
  );

export default function MedicalRecordRequestPage() {
  return <StaticMarketingPage slug="medical-record-request-authorization" path="/patients-rights-privacy/medical-record-request-authorization" />;
}
