import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";

export const generateMetadata = () => metadataForPage("weight-loss-mgmt", "/care/weight-loss-mgmt");

export default async function WeightLossManagementPage() {
  return (
    <>
      <StaticMarketingPage slug="weight-loss-mgmt" />
      <ContactBand />
    </>
  );
}
