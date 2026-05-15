import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardList, ExternalLink, PhoneCall } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/cms/content-source";
import { isExternalUrl } from "@/lib/integrations/patient-access";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata({
    title: "New Patients",
    description: "Starting care at RiseUp Health & Wellness. Learn how to schedule, what to bring, and what to expect.",
    path: "/new-patients",
    site: settings ?? undefined,
  });
}

export default async function NewPatientsPage() {
  const settings = await getSiteSettings();
  const access = settings?.accessLinks;

  const steps = [
    {
      icon: PhoneCall,
      title: "Call or reach out",
      body: "Start by calling our office or using the scheduling link below. Our staff will help you find the right appointment type and answer any questions before your first visit.",
      cta: settings?.phone
        ? { label: `Call ${settings.phone}`, href: `tel:${(settings.phone).replace(/[^\d+]/g, "")}` }
        : null,
    },
    {
      icon: ClipboardList,
      title: "Complete intake paperwork",
      body: "We'll send intake forms ahead of your appointment. Completing them in advance shortens your wait and helps your care team prepare before you arrive.",
      cta: access?.intake
        ? { label: "Start intake forms", href: access.intake }
        : null,
    },
    {
      icon: CalendarCheck,
      title: "Attend your first appointment",
      body: "Bring a photo ID, insurance card, and a list of current medications. Plan to arrive 10–15 minutes early. Your provider will review your history and discuss next steps together with you.",
      cta: null,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="New patients"
        title="Starting care is simpler than it sounds"
        description="Whether you're coming in for primary care, behavioral health, or addiction medicine — we'll walk you through every step."
      />

      {/* Steps */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
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
                  {step.cta ? (
                    <a
                      href={step.cta.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-action hover:underline"
                      {...(isExternalUrl(step.cta.href) ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {step.cta.label}
                      {isExternalUrl(step.cta.href)
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

      {/* Quick access */}
      {(access?.scheduling || access?.portal) ? (
        <Section tone="muted">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {access.scheduling ? (
                <div className="rounded-lg border border-border bg-background p-6">
                  <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
                    Schedule online
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Book a new patient appointment at a time that works for you.
                  </p>
                  <Button asChild size="sm" className="mt-4">
                    <a
                      href={access.scheduling}
                      {...(isExternalUrl(access.scheduling) ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      Schedule now
                      {isExternalUrl(access.scheduling)
                        ? <ExternalLink className="size-3.5" aria-hidden="true" />
                        : <ArrowRight className="size-3.5" aria-hidden="true" />}
                    </a>
                  </Button>
                </div>
              ) : null}

              {access.portal ? (
                <div className="rounded-lg border border-border bg-background p-6">
                  <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
                    Patient portal
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Access records, messages, and results through the secure patient portal.
                  </p>
                  <Button asChild size="sm" variant="outline" className="mt-4">
                    <a
                      href={access.portal}
                      {...(isExternalUrl(access.portal) ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      Open portal
                      {isExternalUrl(access.portal)
                        ? <ExternalLink className="size-3.5" aria-hidden="true" />
                        : <ArrowRight className="size-3.5" aria-hidden="true" />}
                    </a>
                  </Button>
                </div>
              ) : null}

              <div className="rounded-lg border border-border bg-background p-6">
                <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
                  Referral partners
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Referring a patient? Use our referral pathway for coordination and service questions.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link href="/referrals">
                    Make a referral
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
