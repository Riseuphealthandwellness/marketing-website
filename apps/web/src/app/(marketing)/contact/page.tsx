import { ContactBand } from "@/components/sections/contact-band";
import { ContactFormSection } from "@/components/sections/contact-form-section";
import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("contact");

export default function ContactPage() {
  return (
    <>
      <StaticMarketingPage
        description="Reach Rise Up for non-urgent questions, referrals, access support, and general information."
        eyebrow="Contact"
        slug="contact"
        title="Contact Rise Up"
      />
      <ContactFormSection />
      <ContactBand />
    </>
  );
}
