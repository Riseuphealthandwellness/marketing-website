import type { Metadata } from "next";
import { ExternalLink, FileText, LayoutDashboard, MapPin, Users } from "lucide-react";

import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard | RiseUp Studio",
  robots: { index: false },
};

const quickLinks = [
  {
    label: "Content Editor",
    description: "Manage pages, programs, and services",
    href: process.env.SANITY_STUDIO_URL ?? "http://localhost:3333",
    icon: FileText,
    external: true,
  },
  {
    label: "Team Members",
    description: "Manage providers and staff profiles",
    href: process.env.SANITY_STUDIO_URL
      ? `${process.env.SANITY_STUDIO_URL}/structure/provider`
      : "http://localhost:3333/structure/provider",
    icon: Users,
    external: true,
  },
  {
    label: "Locations",
    description: "Update location details and hours",
    href: process.env.SANITY_STUDIO_URL
      ? `${process.env.SANITY_STUDIO_URL}/structure/location`
      : "http://localhost:3333/structure/location",
    icon: MapPin,
    external: true,
  },
  {
    label: "Site Settings",
    description: "Navigation, announcements, global config",
    href: process.env.SANITY_STUDIO_URL
      ? `${process.env.SANITY_STUDIO_URL}/structure/siteSettings`
      : "http://localhost:3333/structure/siteSettings",
    icon: LayoutDashboard,
    external: true,
  },
];

export default async function StudioDashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Good to see you, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>
          Manage content and settings for RiseUpWV.
        </p>
      </div>

      {/* Quick links */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ label, description, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md no-underline"
            >
              <div className="flex items-start justify-between">
                <div className="size-9 rounded-lg bg-brand-warm-white flex items-center justify-center ring-1 ring-border group-hover:bg-brand-action/10 transition-colors">
                  <Icon className="size-4 text-brand-action" aria-hidden="true" />
                </div>
                {external && (
                  <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" aria-hidden="true" />
                )}
              </div>
              <div>
                <p
                  className="text-sm font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {label}
                </p>
                <p
                  className="mt-0.5 text-xs text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Info card */}
      <section className="rounded-xl border border-brand-emphasis/30 bg-brand-emphasis/10 px-6 py-5">
        <p
          className="text-sm font-semibold text-brand-coal mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Content changes are live within minutes
        </p>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>
          After saving in the content editor, the website automatically revalidates. Most updates
          appear on the live site within 5 minutes.
        </p>
      </section>
    </div>
  );
}
