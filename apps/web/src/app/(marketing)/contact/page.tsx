import { ContactBand } from "@/components/sections/contact-band";
import { ContactFormSection } from "@/components/sections/contact-form-section";
import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { getMarketingPage } from "@/lib/cms/content-source";

export const generateMetadata = () => metadataForPage("contact");

export default async function ContactPage() {
  const page = await getMarketingPage("contact");

  return (
    <>
      <StaticMarketingPage slug="contact" />
      <ContactFormSection content={page?.contactForm} />
      <ContactBand />
    </>
  );
}
