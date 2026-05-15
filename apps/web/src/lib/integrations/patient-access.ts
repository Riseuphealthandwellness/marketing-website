import type { PatientAccessLinks } from "@/lib/cms/types";

export type { PatientAccessLinks };

const fallbackContact = "/contact";

function env(name: string, publicName: string, fallback: string) {
  return process.env[name] ?? process.env[publicName] ?? fallback;
}

export function getPatientAccessLinks(): PatientAccessLinks {
  return {
    portal: env("PATIENT_PORTAL_URL", "NEXT_PUBLIC_PATIENT_PORTAL_URL", fallbackContact),
    scheduling: env("SCHEDULING_URL", "NEXT_PUBLIC_SCHEDULING_URL", fallbackContact),
    intake: env("INTAKE_URL", "NEXT_PUBLIC_INTAKE_URL", "/patient-resources"),
    referral: env("REFERRAL_URL", "NEXT_PUBLIC_REFERRAL_URL", "/referrals"),
  };
}

export function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
