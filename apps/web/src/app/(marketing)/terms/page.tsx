import { permanentRedirect } from "next/navigation";

export const generateMetadata = () => ({ title: "Terms of Service" });

export default function TermsPage() {
  permanentRedirect("/terms-of-service");
}
