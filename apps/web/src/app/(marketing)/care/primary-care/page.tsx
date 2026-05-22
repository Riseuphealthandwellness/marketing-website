import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";

export const generateMetadata = () => metadataForPage("primary-care", "/care/primary-care");

export default async function PrimaryCarePage() {
  return (
    <>
      <StaticMarketingPage slug="primary-care" />
      <ContactBand />
    </>
  );
}
