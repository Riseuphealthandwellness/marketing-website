import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardList, ExternalLink, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { getMarketingPage, getSiteSettings } from "@/lib/cms/content-source";
import type { NewPatientAccessCard, NewPatientStep, PatientAccessLinks, SiteSettings } from "@/lib/cms/types";
import { isExternalUrl } from "@/lib/integrations/patient-access";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("new-patients");

const stepIcons = {
  phone: PhoneCall,
  clipboard: ClipboardList,
  "calendar-check": CalendarCheck,
};

function resolveStepCta(
  step: NewPatientStep,
  settings: SiteSettings | null,
  access: PatientAccessLinks | undefined,
) {
  if (step.ctaType === "phone" && settings?.phone) {
    return {
      label: (step.ctaLabel ?? "").replace("[phone]", settings.phone),
      href: `tel:${settings.phone.replace(/[^\d+]/g, "")}`,
    };
  }

  if (step.ctaType === "intake" && access?.intake) {
    return { label: step.ctaLabel, href: access.intake };
  }

  if (step.ctaType === "custom" && step.ctaHref) {
    return { label: step.ctaLabel, href: step.ctaHref };
  }

  return null;
}

function resolveAccessCardHref(card: NewPatientAccessCard, access: PatientAccessLinks | undefined) {
  if (card.linkType === "scheduling") return access?.scheduling;
  if (card.linkType === "portal") return access?.portal;
  if (card.linkType === "referral") return access?.referral || "/referrals";
  return card.href;
}

export default async function NewPatientsPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getMarketingPage("new-patients")]);
  if (!page) notFound();

  const access = settings?.accessLinks;
  const steps = page?.newPatientSteps ?? [];
  const accessCards = page?.newPatientAccessCards ?? [];

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      {steps.length > 0 ? (
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = stepIcons[step.iconName];
              const cta = resolveStepCta(step, settings, access);
              return (
                <div key={step.title} className="flex flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-trust text-brand-warm-white font-heading font-black text-sm">
                      {i + 1}
                    </span>
                    <Icon className="size-5 text-brand-warm-accent" aria-hidden="true" />
                  </div>
                  <h2 className="font-heading text-xl font-black tracking-normal text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-muted-foreground flex-1">{step.body}</p>
                  {cta?.href && cta.label ? (
                    <a
                      href={cta.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-action hover:underline"
                      {...(isExternalUrl(cta.href) ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {cta.label}
                      {isExternalUrl(cta.href)
                        ? <ExternalLink className="size-3.5" aria-hidden="true" />
                        : <ArrowRight className="size-3.5" aria-hidden="true" />}
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      ) : null}

      {accessCards.length > 0 ? (
        <Section tone="muted">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {accessCards.map((card) => {
                const href = resolveAccessCardHref(card, access);
                if (!href) return null;

                return (
                <div className="rounded-lg border border-border bg-white p-6" key={`${card.linkType}-${card.title}`}>
                  <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                  <Button asChild size="sm" variant="outline" className="mt-4">
                    {isExternalUrl(href) ? (
                      <a href={href} rel="noreferrer" target="_blank">
                        {card.ctaLabel}
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={href}>
                        {card.ctaLabel}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </Button>
                </div>
                );
              })}
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
