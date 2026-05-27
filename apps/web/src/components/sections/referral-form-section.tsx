"use client";

import { Download, FileText, Mail, Phone, Send } from "lucide-react";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { ReferralSettings, SiteSettings } from "@/lib/cms/types";

const sexOptions = ["Female", "Male", "Other", "Prefer not to say"];

type FormState = { error?: string; ok?: boolean };
type FieldErrors = Record<string, string>;

type ReferralFormSectionProps = {
  settings?: ReferralSettings | null;
  siteSettings?: SiteSettings | null;
};

function todayString() {
  return new Date().toISOString().split("T")[0]!;
}

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function includesSsn(value: string) {
  return /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/.test(value);
}

function isValidPhone(value: string) {
  return /^[\d\s\-().+]{7,}$/.test(value);
}

function fieldClass(hasError: boolean) {
  return [
    "mt-2 h-11 w-full rounded-md border bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
    hasError ? "border-brand-action" : "border-input",
  ].join(" ");
}

function textareaClass(hasError: boolean) {
  return [
    "mt-2 w-full resize-y rounded-md border bg-background px-3 py-3 text-base leading-7 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
    hasError ? "border-brand-action" : "border-input",
  ].join(" ");
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-semibold text-brand-action">{message}</p>;
}

export function ReferralFormSection({ settings, siteSettings }: ReferralFormSectionProps) {
  const startedAtRef = useRef<number | null>(null);
  const [state, setState] = useState<FormState>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formConsentLabel =
    settings?.formConsentLabel?.trim() ||
    "I understand this online form only accepts the last 4 digits of Social Security numbers and does not accept labs, radiology reports, progress notes, or attachments. Supporting documents will be sent through the approved secure channel.";
  const formDescription = settings?.formDescription?.trim();
  const formDocumentNote = settings?.formDocumentNote?.trim();
  const formEyebrow = settings?.formEyebrow?.trim() || "Online referral";
  const formHeading = settings?.formHeading?.trim() || "Send referral details.";
  const referralPdf = settings?.referralPdf;

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

    const errors: FieldErrors = {};
    if (!payload.referringProviderOrganization) errors.referringProviderOrganization = "Required";
    if (!payload.contactPerson) errors.contactPerson = "Required";
    if (!payload.contactPhone) errors.contactPhone = "Required";
    else if (!isValidPhone(payload.contactPhone)) errors.contactPhone = "Enter a valid phone number";
    if (!payload.patientName) errors.patientName = "Required";
    if (payload.patientPhone && !isValidPhone(payload.patientPhone)) errors.patientPhone = "Enter a valid phone number";
    if (payload.ssnLast4 && !/^\d{4}$/.test(payload.ssnLast4)) errors.ssnLast4 = "Enter exactly 4 digits";
    if (!payload.reasonForReferral || payload.reasonForReferral.length < 10)
      errors.reasonForReferral = "Please provide more detail (at least 10 characters)";
    if (!payload.consent) errors.consent = "Please confirm before submitting";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }
    setFieldErrors({});

    if (includesSsn(Object.values(payload).join(" "))) {
      setState({ error: "Please enter only the last 4 digits of the Social Security number." });
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
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="max-w-3xl">
          {formEyebrow ? (
            <p className="font-heading text-sm font-black uppercase text-brand-action">
              {formEyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
            {formHeading}
          </h2>
          {formDescription ? (
            <p className="mt-4 text-lg leading-7 text-muted-foreground">{formDescription}</p>
          ) : null}
          {formDocumentNote ? (
            <p className="mt-4 text-base leading-7 text-muted-foreground">{formDocumentNote}</p>
          ) : null}

          {referralPdf?.url ? (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-trust" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">Printable referral form</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Download the printable referral PDF when a paper referral is preferred. Send supporting records through the appropriate secure channel.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-trust hover:text-brand-action hover:underline"
                  href={referralPdf.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Download aria-hidden="true" className="size-3.5" />
                  {settings?.downloadLabel ?? "Download PDF"}
                </a>
              </div>
            </div>
          ) : null}

          {siteSettings?.phone || siteSettings?.email ? (
            <div className="mt-6 space-y-2 border-t border-border pt-5">
              <p className="text-sm font-bold text-foreground">Or reach us directly</p>
              {siteSettings.phone ? (
                <a
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-action"
                  href={`tel:${siteSettings.phone.replace(/[^\d+]/g, "")}`}
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {siteSettings.phone}
                </a>
              ) : null}
              {siteSettings.email ? (
                <a
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-action"
                  href={`mailto:${siteSettings.email}`}
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {siteSettings.email}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <form
          className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
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
                className={fieldClass(false)}
                defaultValue={todayString()}
                id="referral-date"
                name="dateOfReferral"
                type="date"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-organization">
                Referring provider/organization <span className="text-brand-action">*</span>
              </label>
              <input
                className={fieldClass(!!fieldErrors.referringProviderOrganization)}
                id="referral-organization"
                maxLength={120}
                name="referringProviderOrganization"
                aria-invalid={!!fieldErrors.referringProviderOrganization}
              />
              <FieldError message={fieldErrors.referringProviderOrganization} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-contact-person">
                Contact person <span className="text-brand-action">*</span>
              </label>
              <input
                autoComplete="name"
                className={fieldClass(!!fieldErrors.contactPerson)}
                id="referral-contact-person"
                maxLength={80}
                name="contactPerson"
                aria-invalid={!!fieldErrors.contactPerson}
              />
              <FieldError message={fieldErrors.contactPerson} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-contact-phone">
                Contact phone number <span className="text-brand-action">*</span>
              </label>
              <input
                autoComplete="tel"
                className={fieldClass(!!fieldErrors.contactPhone)}
                id="referral-contact-phone"
                maxLength={30}
                name="contactPhone"
                type="tel"
                aria-invalid={!!fieldErrors.contactPhone}
              />
              <FieldError message={fieldErrors.contactPhone} />
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-heading text-lg font-black tracking-normal text-foreground">
              Patient information
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-patient-name">
                  Name <span className="text-brand-action">*</span>
                </label>
                <input
                  className={fieldClass(!!fieldErrors.patientName)}
                  id="referral-patient-name"
                  maxLength={100}
                  name="patientName"
                  aria-invalid={!!fieldErrors.patientName}
                />
                <FieldError message={fieldErrors.patientName} />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-sex">
                  Sex
                </label>
                <select
                  className={fieldClass(false)}
                  defaultValue=""
                  id="referral-sex"
                  name="sex"
                >
                  <option value="">Select</option>
                  {sexOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-dob">
                  Date of birth
                </label>
                <input
                  className={fieldClass(false)}
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
                  className={fieldClass(!!fieldErrors.ssnLast4)}
                  id="referral-ssn-last-4"
                  inputMode="numeric"
                  maxLength={4}
                  name="ssnLast4"
                  pattern="[0-9]{4}"
                  aria-invalid={!!fieldErrors.ssnLast4}
                />
                <FieldError message={fieldErrors.ssnLast4} />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-patient-phone">
                  Patient phone number
                </label>
                <input
                  autoComplete="tel"
                  className={fieldClass(!!fieldErrors.patientPhone)}
                  id="referral-patient-phone"
                  maxLength={30}
                  name="patientPhone"
                  type="tel"
                  aria-invalid={!!fieldErrors.patientPhone}
                />
                <FieldError message={fieldErrors.patientPhone} />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-foreground" htmlFor="referral-address">
                Address
              </label>
              <textarea
                className={`${textareaClass(false)} min-h-24`}
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
                  className={fieldClass(false)}
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
                  className={fieldClass(false)}
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
                  className={fieldClass(false)}
                  id="referral-member"
                  maxLength={80}
                  name="memberId"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-bold text-foreground" htmlFor="referral-reason">
              Reason for referral <span className="text-brand-action">*</span>
            </label>
            <textarea
              className={`${textareaClass(!!fieldErrors.reasonForReferral)} min-h-32`}
              id="referral-reason"
              maxLength={1500}
              name="reasonForReferral"
              aria-invalid={!!fieldErrors.reasonForReferral}
            />
            <FieldError message={fieldErrors.reasonForReferral} />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="referral-website">Website</label>
            <input autoComplete="off" id="referral-website" name="website" tabIndex={-1} type="text" />
          </div>

          <div className="mt-5">
            <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
              <input
                className="mt-1 size-4 rounded border-input accent-brand-action"
                name="consent"
                type="checkbox"
                aria-invalid={!!fieldErrors.consent}
              />
              <span>{formConsentLabel}</span>
            </label>
            <FieldError message={fieldErrors.consent} />
          </div>

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
            {isSubmitting ? "Sending…" : "Send referral"}
          </Button>
        </form>
      </Container>
    </Section>
  );
}
