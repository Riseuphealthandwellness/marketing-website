import { ArrowRight, ExternalLink, Send } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import {
  isExternalUrl,
  type PatientAccessLinks,
} from "@/lib/integrations/patient-access";
import type { CtaBlock } from "@/lib/cms/types";

type ReferralBandProps = {
  cta?: CtaBlock;
  accessLinks?: PatientAccessLinks;
};

export function ReferralBand({ cta, accessLinks }: ReferralBandProps) {
  const primaryHref = cta?.primaryHref || accessLinks?.referral || "#";
  const secondaryHref = cta?.secondaryHref || "/contact";
  const referralIsExternal = isExternalUrl(primaryHref);

  return (
    <section className="bg-surface pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-6 rounded-lg bg-[linear-gradient(135deg,var(--brand-action),var(--brand-emphasis))] p-6 text-brand-warm-white shadow-[0_22px_60px_rgb(31_28_25_/_18%)] sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex size-14 items-center justify-center rounded-md bg-brand-warm-white/12 text-brand-soft-accent">
            <Send aria-hidden="true" className="size-7" />
          </div>

          <div>
            <p className="font-heading text-sm font-black uppercase text-brand-warm-white">
              Referral partners
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal">
              {cta?.heading ?? "A direct route for providers, families, and community partners."}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-warm-white/78">
              {cta?.description ??
                "Use the referral path for service questions and partner coordination. Sensitive clinical details should stay in approved intake, portal, or direct staff channels."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            {referralIsExternal ? (
              <a
                className="font-heading inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-warm-white px-6 py-3 text-base font-bold text-brand-trust shadow-sm transition-colors hover:bg-brand-warm-white/90 hover:text-brand-action"
                href={primaryHref}
                rel="noreferrer"
                target="_blank"
              >
                {cta?.primaryLabel ?? "Referral information"}
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            ) : (
              <Link
                className="font-heading inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-warm-white px-6 py-3 text-base font-bold text-brand-trust shadow-sm transition-colors hover:bg-brand-warm-white/90 hover:text-brand-action"
                href={primaryHref}
              >
                {cta?.primaryLabel ?? "Referral information"}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            )}
            {cta?.secondaryLabel !== "" ? (
              <Link
                className="font-heading inline-flex min-h-12 items-center justify-center rounded-md border border-brand-warm-white/24 bg-brand-warm-white/8 px-6 py-3 text-base font-bold text-brand-warm-white transition-colors hover:bg-brand-warm-white/14"
                href={secondaryHref}
              >
                {cta?.secondaryLabel ?? "Contact team"}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
