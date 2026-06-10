import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/sections/page-hero";
import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata = {
  title: "Patient Rights & Privacy",
  description:
    "Information about your privacy rights, HIPAA protections, and how Rise Up handles your health information.",
};

const privacyLinks = [
  {
    label: "Notice of Privacy Practices",
    href: "/patients-rights-privacy/notice-privacy-practices",
  },
  {
    label: "Privacy Policy",
    href: "/patients-rights-privacy/privacy-policy",
  },
  {
    label: "Medical Record Request & Authorization",
    href: "/patients-rights-privacy/medical-record-request-authorization",
  },
  {
    label: "Terms of Use",
    href: "/patients-rights-privacy/terms-of-use",
  },
];

export default async function PatientsRightsPrivacyPage() {
  const [page, settings] = await Promise.all([
    getMarketingPage("patients-rights-privacy"),
    getSiteSettings(),
  ]);

  const title = page?.title ?? "Your Privacy is Important to Us";
  const eyebrow = page?.eyebrow ?? "Patient rights";
  const description =
    page?.description ??
    "Rise Up is committed to protecting our patients’ privacy. We make all reasonable efforts to comply with applicable federal and state privacy regulations, including the Health Insurance Portability and Accountability Act (HIPAA)/HITECH ACT.";
  const breadcrumbs = resolveBreadcrumbs(page?.path, page?.breadcrumbs, settings?.showBreadcrumbs);

  return (
    <>
      <PageHero breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} />

      <Section className="bg-white py-10 sm:py-12 lg:py-14">
        <Container>
          <p className="max-w-3xl text-lg leading-8 text-brand-coal/80">{description}</p>

          {page?.body && (page.body as unknown[]).length > 0 ? (
            <div className="mt-5 max-w-3xl">
              <PortableTextContent value={page.body} />
            </div>
          ) : (
            <p className="mt-5 max-w-3xl leading-7 text-brand-coal/72">
              The following items detail our HIPAA, privacy, terms of use and interpretive service
              programs, as well as how to request and authorize a copy of your medical records:
            </p>
          )}

          <ul className="mt-8 max-w-2xl divide-y divide-border">
            {privacyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="group flex items-center justify-between gap-4 py-4 font-heading font-bold text-brand-trust transition-colors hover:text-brand-action"
                  href={link.href}
                >
                  {link.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
