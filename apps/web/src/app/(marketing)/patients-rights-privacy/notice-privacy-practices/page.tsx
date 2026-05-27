import { StaticMarketingPage } from "@/app/(marketing)/_components/static-marketing-page";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () =>
  metadataForPage("notice-privacy-practices", "/patients-rights-privacy/notice-privacy-practices");

export default function NoticePrivacyPracticesPage() {
  return <StaticMarketingPage slug="notice-privacy-practices" path="/patients-rights-privacy/notice-privacy-practices" />;
}
