import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/app/globals.css";

import { ImageDragGuard } from "@/components/site/image-drag-guard";
import { RouteScrollManager } from "@/components/site/route-scroll-manager";
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
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ImageDragGuard />
        <RouteScrollManager />
        {children}
      </body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}
