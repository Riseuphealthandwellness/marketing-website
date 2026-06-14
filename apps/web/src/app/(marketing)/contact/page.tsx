import { ContactBand } from "@/components/sections/contact-band";
import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("contact");

export default async function ContactPage() {
  return (
    <>
      <StaticMarketingPage slug="contact" />
      <ContactBand />
    </>
  );
}
