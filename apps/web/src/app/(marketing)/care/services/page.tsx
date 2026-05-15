import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("services");

export default function ServicesPage() {
  return (
    <StaticMarketingPage
      description="Explore integrated primary care, behavioral health, and recovery services from Rise Up."
      eyebrow="Services"
      slug="services"
      title="Care that works together"
    />
  );
}
