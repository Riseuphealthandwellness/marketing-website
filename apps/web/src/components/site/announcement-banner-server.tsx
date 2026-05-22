import { getAnnouncement } from "@/lib/cms/content-source";
import { AnnouncementBanner } from "./announcement-banner";

export async function AnnouncementBannerServer() {
  const announcement = await getAnnouncement();
  if (!announcement?.message) return null;

  // Stable ID derived from title so dismissal survives deploys for the same announcement.
  const id = announcement.title
    ? announcement.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    : "default";

  return <AnnouncementBanner announcement={announcement} id={id} />;
}
