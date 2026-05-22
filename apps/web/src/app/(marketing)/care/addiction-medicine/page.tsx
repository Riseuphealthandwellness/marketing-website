import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";

export const generateMetadata = () => metadataForPage("addiction-medicine", "/care/addiction-medicine");

export default async function AddictionMedicinePage() {
  return (
    <>
      <StaticMarketingPage slug="addiction-medicine" />
      <ContactBand />
    </>
  );
}
