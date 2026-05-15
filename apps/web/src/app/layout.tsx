import type { Metadata, Viewport } from "next";

import "@/app/globals.css";

import { ImageDragGuard } from "@/components/site/image-drag-guard";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { RouteScrollManager } from "@/components/site/route-scroll-manager";
import { SkipLink } from "@/components/site/skip-link";
import { absoluteUrl } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/cms/content-source";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const name = settings?.name ?? "";
  const url = settings?.url ?? "https://localhost:3000";

  return {
    metadataBase: new URL(url),
    title: { default: name, template: `%s | ${name}` },
    applicationName: name,
    authors: name ? [{ name }] : undefined,
    creator: name || undefined,
    publisher: name || undefined,
    openGraph: {
      title: name,
      url: absoluteUrl("/", url),
      siteName: name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D8141C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ImageDragGuard />
        <RouteScrollManager />
        <SkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
