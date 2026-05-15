import { permanentRedirect } from "next/navigation";

export const generateMetadata = () => ({ title: "Privacy Policy" });

export default function PrivacyPage() {
  permanentRedirect("/privacy-policy");
}
