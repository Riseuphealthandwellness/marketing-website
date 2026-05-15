import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("insurance-payment");

export default function InsurancePaymentPage() {
  return (
    <StaticMarketingPage
      description="Find general insurance and payment information before starting care with Rise Up."
      eyebrow="Insurance and payment"
      slug="insurance-payment"
      title="Insurance and payment information"
    />
  );
}
