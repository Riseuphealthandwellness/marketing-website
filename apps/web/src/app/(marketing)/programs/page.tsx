import { permanentRedirect } from "next/navigation";

export const generateMetadata = () => ({ title: "Programs" });

export default function ProgramsPage() {
  permanentRedirect("/care/programs");
}
