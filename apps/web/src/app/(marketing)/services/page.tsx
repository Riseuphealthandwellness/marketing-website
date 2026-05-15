import { permanentRedirect } from "next/navigation";

export const generateMetadata = () => ({ title: "Services" });

export default function ServicesPage() {
  permanentRedirect("/care/services");
}
