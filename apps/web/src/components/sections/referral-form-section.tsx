"use client";

import { Send } from "lucide-react";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { ReferralSettings } from "@/lib/cms/types";

const sexOptions = ["Female", "Male", "Other", "Prefer not to say"];

type FormState = {
  error?: string;
  ok?: boolean;
};

type ReferralFormSectionProps = {
  settings?: ReferralSettings | null;
};

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function includesSsn(value: string) {
  return /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/.test(value);
}

export function ReferralFormSection({ settings }: ReferralFormSectionProps) {
  const startedAtRef = useRef<number | null>(null);
  const [state, setState] = useState<FormState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formConsentLabel = settings?.formConsentLabel?.trim();
  const formDescription = settings?.formDescription?.trim();
  const formDocumentNote = settings?.formDocumentNote?.trim();
  const formEyebrow = settings?.formEyebrow?.trim();
  const formHeading = settings?.formHeading?.trim();

  if (!settings || !formConsentLabel || !formHeading) return null;

  function markStarted() {
    startedAtRef.current ??= Date.now();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    markStarted();
    setIsSubmitting(true);
    setState({});

    const formData = new FormData(form);
    const payload = {
      dateOfReferral: cleanText(formData.get("dateOfReferral"), 20),
      referringProviderOrganization: cleanText(formData.get("referringProviderOrganization"), 120),
      contactPerson: cleanText(formData.get("contactPerson"), 80),
      contactPhone: cleanText(formData.get("contactPhone"), 30),
      reasonForReferral: cleanText(formData.get("reasonForReferral"), 1_500),
      patientName: cleanText(formData.get("patientName"), 100),
      sex: cleanText(formData.get("sex"), 30),
      dateOfBirth: cleanText(formData.get("dateOfBirth"), 20),
      ssnLast4: cleanText(formData.get("ssnLast4"), 4),
      patientAddress: cleanText(formData.get("patientAddress"), 220),
      patientPhone: cleanText(formData.get("patientPhone"), 30),
      insurance: cleanText(formData.get("insurance"), 120),
      groupNumber: cleanText(formData.get("groupNumber"), 80),
      memberId: cleanText(formData.get("memberId"), 80),
      consent: formData.get("consent") === "on",
      website: formData.get("website"),
      startedAt: startedAtRef.current,
    };

    if (
      !payload.referringProviderOrganization ||
      !payload.contactPerson ||
      !payload.contactPhone ||
      !payload.patientName ||
      payload.reasonForReferral.length < 10
    ) {
      setState({ error: "Please complete the required referral fields." });
      setIsSubmitting(false);
      return;
    }

    if (includesSsn(Object.values(payload).join(" "))) {
      setState({ error: "Please enter only the last 4 digits of the Social Security number." });
      setIsSubmitting(false);
      return;
    }

    if (payload.ssnLast4 && !/^\d{4}$/.test(payload.ssnLast4)) {
      setState({ error: "Please enter exactly 4 digits for the SSN field." });
      setIsSubmitting(false);
      return;
    }

    if (!payload.consent) {
      setState({
        error:
          "Please confirm that supporting documents will be sent separately through the appropriate secure channel.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as FormState;

      if (!response.ok || data.error) {
        setState({ error: data.error || "The referral could not be sent right now." });
        return;
      }

      form.reset();
      startedAtRef.current = null;
      setState({ ok: true });
    } catch {
      setState({ error: "The referral could not be sent right now. Please use the PDF or call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section className="bg-surface">
      <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="max-w-3xl">
          {formEyebrow ? (
            <p className="font-heading text-sm font-black uppercase text-brand-warm-accent">
              {formEyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
            {formHeading}
          </h2>
          {formDescription ? (
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {formDescription}
            </p>
          ) : null}
          {formDocumentNote ? (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {formDocumentNote}
            </p>
          ) : null}
        </div>

        <form
          className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6"
          onChangeCapture={markStarted}
          onFocusCapture={markStarted}
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-date">
                Date of referral
              </label>
              <input
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="referral-date"
                name="dateOfReferral"
                type="date"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-organization">
                Referring provider/organization
              </label>
              <input
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="referral-organization"
                maxLength={120}
                name="referringProviderOrganization"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-contact-person">
                Contact person
              </label>
              <input
                autoComplete="name"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="referral-contact-person"
                maxLength={80}
                name="contactPerson"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-contact-phone">
                Contact phone number
              </label>
              <input
                autoComplete="tel"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="referral-contact-phone"
                maxLength={30}
                name="contactPhone"
                required
                type="tel"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
              Patient information
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-patient-name">
                  Name
                </label>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-patient-name"
                  maxLength={100}
                  name="patientName"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-sex">
                  Sex
                </label>
                <select
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue=""
                  id="referral-sex"
                  name="sex"
                >
                  <option value="">Select</option>
                  {sexOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-dob">
                  DOB
                </label>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-dob"
                  name="dateOfBirth"
                  type="date"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-ssn-last-4">
                  Last 4 of SSN
                </label>
                <input
                  autoComplete="off"
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-ssn-last-4"
                  inputMode="numeric"
                  maxLength={4}
                  name="ssnLast4"
                  pattern="[0-9]{4}"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-patient-phone">
                  Patient phone number
                </label>
                <input
                  autoComplete="tel"
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-patient-phone"
                  maxLength={30}
                  name="patientPhone"
                  type="tel"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-foreground" htmlFor="referral-address">
                Address
              </label>
              <textarea
                className="mt-2 min-h-24 w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-base leading-7 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="referral-address"
                maxLength={220}
                name="patientAddress"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
              Insurance information
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-insurance">
                  Insurance
                </label>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-insurance"
                  maxLength={120}
                  name="insurance"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-group">
                  Group number
                </label>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-group"
                  maxLength={80}
                  name="groupNumber"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-member">
                  Member ID
                </label>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="referral-member"
                  maxLength={80}
                  name="memberId"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-bold text-foreground" htmlFor="referral-reason">
              Reason for referral
            </label>
            <textarea
              className="mt-2 min-h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-base leading-7 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              id="referral-reason"
              maxLength={1500}
              minLength={10}
              name="reasonForReferral"
              required
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="referral-website">Website</label>
            <input autoComplete="off" id="referral-website" name="website" tabIndex={-1} type="text" />
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <input
              className="mt-1 size-4 rounded border-input accent-brand-action"
              name="consent"
              required
              type="checkbox"
            />
            <span>{formConsentLabel}</span>
          </label>

          {state.error ? (
            <p className="mt-4 rounded-md border border-brand-action/30 bg-brand-action/10 px-4 py-3 text-sm font-semibold text-brand-action">
              {state.error}
            </p>
          ) : null}

          {state.ok ? (
            <p className="mt-4 rounded-md border border-brand-trust/30 bg-brand-trust/10 px-4 py-3 text-sm font-semibold text-brand-trust">
              Your referral was sent.
            </p>
          ) : null}

          <Button className="mt-6" disabled={isSubmitting} type="submit">
            <Send aria-hidden="true" className="size-4" />
            {isSubmitting ? "Sending" : "Send referral"}
          </Button>
        </form>
      </Container>
    </Section>
  );
}
