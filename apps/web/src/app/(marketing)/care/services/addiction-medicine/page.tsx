import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";

const path = "/care/services/addiction-medicine";

export const generateMetadata = () => metadataForPage("addiction-medicine", path);

export default async function AddictionMedicineServicePage() {
  return (
    <>
      <StaticMarketingPage slug="addiction-medicine" path={path} />
      <ContactBand />
    </>
  );
}
