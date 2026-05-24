import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  const studioUrl = process.env.SANITY_STUDIO_URL;
  const target = `/api/auth/sanity-login${studioUrl ? `?origin=${encodeURIComponent(studioUrl)}` : ""}`;
  redirect(target);
}
