export type BreadcrumbItem = {
  label: string;
  href?: string;
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
 * Builds a breadcrumb trail for all ancestor pages, excluding the current page.
 * The eyebrow/title on the page itself already indicates where you are.
 * Returns only "Home" for top-level pages — PageHero hides the nav when length <= 1.
 */
export function buildBreadcrumbs(path: string): BreadcrumbItem[] {
  const segments = path.replace(/^\//, "").split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  // All segments except the last become linked ancestor crumbs
  for (let i = 0; i < segments.length - 1; i++) {
    crumbs.push({
      label: formatLabel(segments[i]!),
      href: "/" + segments.slice(0, i + 1).join("/"),
    });
  }

  return crumbs;
}
