export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const SEGMENT_LABELS: Record<string, string> = {
  care: "Care",
  programs: "Programs",
  locations: "Locations",
  services: "Services",
  team: "Team",
};

function formatLabel(segment: string): string {
  return (
    SEGMENT_LABELS[segment] ??
    segment
      .split("-")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(" ")
  );
}

export function buildBreadcrumbs(path: string, pageTitle: string): BreadcrumbItem[] {
  const segments = path.replace(/^\//, "").split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  if (segments.length === 0) return crumbs;

  for (let i = 0; i < segments.length - 1; i++) {
    crumbs.push({
      label: formatLabel(segments[i]!),
      href: "/" + segments.slice(0, i + 1).join("/"),
    });
  }

  crumbs.push({ label: pageTitle });
  return crumbs;
}
