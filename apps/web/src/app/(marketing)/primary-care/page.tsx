import { permanentRedirect } from "next/navigation";

export const generateMetadata = () => ({ title: "Primary care" });

export default function PrimaryCarePage() {
  permanentRedirect("/care/services/primary-care");
}
