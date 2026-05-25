import { MarketingPage } from "@/app/(marketing)/_components/marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage("notice-privacy-practices", "/about/notice-privacy-practices");

export default function NoticePrivacyPracticesPage() {
  return <MarketingPage slug="notice-privacy-practices" />;
}
