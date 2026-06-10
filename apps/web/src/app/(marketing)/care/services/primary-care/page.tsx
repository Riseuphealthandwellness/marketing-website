import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { ContactBand } from "@/components/sections/contact-band";

const path = "/care/services/primary-care";

export const generateMetadata = () => metadataForPage("primary-care", path);

export default async function PrimaryCareServicePage() {
  return (
    <>
      <StaticMarketingPage slug="primary-care" path={path} />
      <ContactBand />
    </>
  );
}
