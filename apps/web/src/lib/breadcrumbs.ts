export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbConfig =
  | boolean
  | {
      enabled?: boolean;
      items?: BreadcrumbItem[];
    };

const SEGMENT_LABELS: Record<string, string> = {
  // Top-level pages
  about: "About",
  contact: "Contact",
  careers: "Careers",
  locations: "Locations",
  programs: "Programs",
  referrals: "Referrals",
  team: "Team",
  // Patient access
  "insurance-payment": "Insurance & Payment",
  "new-patients": "New Patients",
  "patient-resources": "Patient Resources",
  "patient-rights-privacy": "Patient Rights & Privacy",
  "patients-rights-privacy": "Patient Rights & Privacy",
  "notice-privacy-practices": "Notice of Privacy Practices",
  "medical-record-request-authorization": "Medical Record Request & Authorization",
  "terms-of-use": "Terms of Use",
  // Care
  care: "Care",
  medications: "Medications",
  services: "Services",
  "addiction-medicine": "Addiction Medicine",
  "primary-care": "Primary Care",
  "weight-loss-mgmt": "Weight Loss Management",
  // Legal
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
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

/**
 * Builds a breadcrumb trail with ancestor pages plus the current page as
 * the final unlinked crumb. This lets the global breadcrumb toggle visibly
 * apply to top-level pages such as /new-patients.
 */
export function buildBreadcrumbs(path: string): BreadcrumbItem[] {
  const segments = path.replace(/^\//, "").split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  segments.forEach((segment, i) => {
    const isCurrent = i === segments.length - 1;
    crumbs.push({
      label: formatLabel(segment),
      ...(isCurrent ? {} : { href: "/" + segments.slice(0, i + 1).join("/") }),
    });
  });

  return crumbs;
}

export function resolveBreadcrumbs(
  path: string | undefined,
  breadcrumbs?: BreadcrumbConfig | null,
  siteBreadcrumbsEnabled = true,
): BreadcrumbItem[] | undefined {
  if (breadcrumbs === false) return undefined;
  if (breadcrumbs && typeof breadcrumbs === "object" && breadcrumbs.enabled === false) {
    return undefined;
  }

  if (breadcrumbs && typeof breadcrumbs === "object" && breadcrumbs.items?.length) {
    return breadcrumbs.items;
  }

  if (breadcrumbs && typeof breadcrumbs === "object" && breadcrumbs.enabled === true) {
    return path ? buildBreadcrumbs(path) : undefined;
  }

  if (!siteBreadcrumbsEnabled) return undefined;

  return path ? buildBreadcrumbs(path) : undefined;
}
