import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  const studioUrl = process.env.SANITY_STUDIO_URL;
  redirect(studioUrl || "/");
}
