import { SiteHeaderClient } from "@/components/site/site-header-client";
import { getNavigation, getSiteSettings } from "@/lib/cms/content-source";

export async function SiteHeader() {
  const [settings, navItems] = await Promise.all([
    getSiteSettings(),
    getNavigation("main"),
  ]);

  return (
    <SiteHeaderClient
      siteName={settings?.name}
      tagline={settings?.tagline}
      headerCta={settings?.headerCta}
      accessLinks={settings?.accessLinks}
      logo={settings?.logo}
      mainNav={navItems}
    />
  );
}
