"use client";

import { Download, FileText, Mail, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

// Strips a leading country code "1" from an 11-digit US number so callers can
// treat it the same as a bare 10-digit number.
function normalizePhoneDigits(digitsOnly: string) {
  return digitsOnly.length === 11 && digitsOnly.startsWith("1") ? digitsOnly.slice(1) : digitsOnly;
}

function isValidPhone(value: string) {
  const normalized = normalizePhoneDigits(value.replace(/\D/g, ""));
  // NANP area codes never start with 0 or 1, so a leading 1 always means country code.
  return /^[2-9]\d{9}$/.test(normalized);
}

function formatPhoneDisplay(rawInput: string) {
  const normalized = normalizePhoneDigits(rawInput.replace(/\D/g, "").slice(0, 11));
  const area = normalized.slice(0, 3);
  const prefix = normalized.slice(3, 6);
  const line = normalized.slice(6, 10);
  const overflow = normalized.slice(10);
  if (!normalized) return "";
  if (normalized.length < 4) return `(${area}`;
  if (normalized.length < 7) return `(${area}) ${prefix}`;
  return `(${area}) ${prefix}-${line}${overflow}`;
}

function buildPayload(formData: FormData, startedAt: number | null) {
  return {
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
    startedAt,
  };
}

function getFieldErrors(payload: ReturnType<typeof buildPayload>): FieldErrors {
  const errors: FieldErrors = {};
  if (!payload.referringProviderOrganization) errors.referringProviderOrganization = "Required";
  if (!payload.contactPerson) errors.contactPerson = "Required";
  if (!payload.contactPhone) errors.contactPhone = "Required";
  else if (!isValidPhone(payload.contactPhone)) errors.contactPhone = "Enter a valid phone number";
  if (!payload.patientName) errors.patientName = "Required";
  if (payload.ssnLast4 && !/^\d{4}$/.test(payload.ssnLast4)) errors.ssnLast4 = "Enter exactly 4 digits";
  if (payload.patientPhone && !isValidPhone(payload.patientPhone)) errors.patientPhone = "Enter a valid phone number";
  if (!payload.reasonForReferral || payload.reasonForReferral.length < 10)
    errors.reasonForReferral = "Please provide more detail (at least 10 characters)";
  if (!payload.consent) errors.consent = "Please confirm before submitting";
  return errors;
}

const fieldOrder = [
  "referringProviderOrganization",
  "contactPerson",
  "contactPhone",
  "patientName",
  "ssnLast4",
  "patientPhone",
  "reasonForReferral",
  "consent",
] as const;

const fieldIdByName: Record<string, string> = {
  referringProviderOrganization: "referral-organization",
  contactPerson: "referral-contact-person",
  contactPhone: "referral-contact-phone",
  patientName: "referral-patient-name",
  ssnLast4: "referral-ssn-last-4",
  patientPhone: "referral-patient-phone",
  reasonForReferral: "referral-reason",
  consent: "referral-consent",
};

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

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs font-semibold text-brand-action" id={id} role="alert">
      {message}
    </p>
  );
}

export function ReferralFormSection({ settings, siteSettings }: ReferralFormSectionProps) {
  const startedAtRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const touchedFieldsRef = useRef<Record<string, boolean>>({});
  const [state, setState] = useState<FormState>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [ssnDigits, setSsnDigits] = useState("");
  const [ssnFocused, setSsnFocused] = useState(false);
  const [contactPhoneDigits, setContactPhoneDigits] = useState("");
  const [patientPhoneDigits, setPatientPhoneDigits] = useState("");

  const formConsentLabel =
    settings?.formConsentLabel?.trim() ||
    "I understand this online form only accepts the last 4 digits of Social Security numbers and does not accept labs, radiology reports, progress notes, or attachments. Supporting documents will be sent through the approved secure channel.";
  const formDescription = settings?.formDescription?.trim();
  const formDocumentNote = settings?.formDocumentNote?.trim();
  const formEyebrow = settings?.formEyebrow?.trim() || "Online referral";
  const formHeading = settings?.formHeading?.trim() || "Send referral details.";
  const referralPdf = settings?.referralPdf;

  // Anchor the anti-bot timer to page render, not the first field interaction,
  // so autofilled or password-manager-filled submissions aren't misread as bots.
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  function markStarted() {
    startedAtRef.current ??= Date.now();
  }

  // The Send button is disabled until the form is valid, so a field's error must be
  // surfaced here too — otherwise an invalid entry just silently blocks the button
  // with no explanation. Only show errors for fields the user has actually touched.
  function applyLiveValidation(touchedField?: string) {
    const form = formRef.current;
    if (!form) return;
    if (touchedField) touchedFieldsRef.current[touchedField] = true;
    const payload = buildPayload(new FormData(form), startedAtRef.current);
    const errors = getFieldErrors(payload);
    if (includesSsn(`${payload.reasonForReferral} ${payload.patientAddress}`)) {
      errors.reasonForReferral = "Please enter only the last 4 digits of the Social Security number.";
    }
    setCanSubmit(Object.keys(errors).length === 0);
    setFieldErrors(Object.fromEntries(Object.entries(errors).filter(([key]) => touchedFieldsRef.current[key])));
  }

  function handleFormActivity(event: React.SyntheticEvent<HTMLFormElement>) {
    markStarted();
    const fieldName = (event.target as HTMLElement).getAttribute?.("name") ?? undefined;
    applyLiveValidation(fieldName);
  }

  // ssnDigits/phone digits live outside the DOM value (which only ever shows the mask or
  // formatted text), so re-check validity once the mirrored inputs have actually re-rendered.
  useEffect(() => {
    applyLiveValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssnDigits, contactPhoneDigits, patientPhoneDigits]);

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>, setDigits: (value: string) => void) {
    setDigits(event.target.value.replace(/\D/g, "").slice(0, 11));
  }

  const maskedSsnDisplay = ssnDigits
    .split("")
    .map((digit, index) => (ssnFocused && index === ssnDigits.length - 1 ? digit : "•"))
    .join("");

  function handleSsnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    markStarted();
    if (/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      touchedFieldsRef.current.ssnLast4 = true;
      setSsnDigits((prev) => (prev.length < 4 ? prev + event.key : prev));
      return;
    }
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      touchedFieldsRef.current.ssnLast4 = true;
      setSsnDigits((prev) => prev.slice(0, -1));
      return;
    }
    if (!["Tab", "Shift", "ArrowLeft", "ArrowRight", "Home", "End", "Enter"].includes(event.key)) {
      event.preventDefault();
    }
  }

  function handleSsnPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    markStarted();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (digits) setSsnDigits(digits);
    touchedFieldsRef.current.ssnLast4 = true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    markStarted();
    setIsSubmitting(true);
    setState({});

    const formData = new FormData(form);
    const payload = buildPayload(formData, startedAtRef.current);

    const errors = getFieldErrors(payload);
    // Only scan freeform text fields; scanning every field (phone numbers, insurance IDs,
    // dates, the anti-bot timestamp) produced false positives no matter what was entered.
    if (includesSsn(`${payload.reasonForReferral} ${payload.patientAddress}`)) {
      errors.reasonForReferral = "Please enter only the last 4 digits of the Social Security number.";
    }

    if (Object.keys(errors).length > 0) {
      for (const name of Object.keys(errors)) touchedFieldsRef.current[name] = true;
      setFieldErrors(errors);
      setIsSubmitting(false);
      setCanSubmit(false);
      setState({ error: "Please review the highlighted fields below and try again." });
      const firstErrorField = fieldOrder.find((name) => errors[name]);
      const fieldId = firstErrorField ? fieldIdByName[firstErrorField] : undefined;
      const invalidElement = fieldId ? form.querySelector<HTMLElement>(`#${fieldId}`) : null;
      invalidElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      invalidElement?.focus();
      return;
    }
    setFieldErrors({});

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
      startedAtRef.current = Date.now();
      setCanSubmit(false);
      setSsnDigits("");
      setContactPhoneDigits("");
      setPatientPhoneDigits("");
      touchedFieldsRef.current = {};
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
          onBlurCapture={handleFormActivity}
          onChangeCapture={handleFormActivity}
          onFocusCapture={markStarted}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <p className="text-sm text-muted-foreground">
            Fields marked <span className="text-brand-action">*</span> are required.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-date">
                Date of referral
              </label>
              <input
                className={`${fieldClass(false)} cursor-not-allowed bg-muted text-muted-foreground`}
                disabled
                id="referral-date"
                type="date"
                value={todayString()}
              />
              {/* Locked to submission day so the audit trail can't be backdated; disabled inputs don't post, so mirror the value. */}
              <input name="dateOfReferral" type="hidden" value={todayString()} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-organization">
                Referring provider/organization <span className="text-brand-action">*</span>
              </label>
              <input
                aria-describedby={fieldErrors.referringProviderOrganization ? "referral-organization-error" : undefined}
                aria-invalid={!!fieldErrors.referringProviderOrganization}
                className={fieldClass(!!fieldErrors.referringProviderOrganization)}
                id="referral-organization"
                maxLength={120}
                name="referringProviderOrganization"
              />
              <FieldError id="referral-organization-error" message={fieldErrors.referringProviderOrganization} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-contact-person">
                Contact person <span className="text-brand-action">*</span>
              </label>
              <input
                aria-describedby={fieldErrors.contactPerson ? "referral-contact-person-error" : undefined}
                aria-invalid={!!fieldErrors.contactPerson}
                autoComplete="name"
                className={fieldClass(!!fieldErrors.contactPerson)}
                id="referral-contact-person"
                maxLength={80}
                name="contactPerson"
              />
              <FieldError id="referral-contact-person-error" message={fieldErrors.contactPerson} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="referral-contact-phone">
                Contact phone number <span className="text-brand-action">*</span>
              </label>
              <input
                aria-describedby={fieldErrors.contactPhone ? "referral-contact-phone-error" : undefined}
                aria-invalid={!!fieldErrors.contactPhone}
                autoComplete="tel"
                className={fieldClass(!!fieldErrors.contactPhone)}
                id="referral-contact-phone"
                inputMode="numeric"
                maxLength={16}
                name="contactPhone"
                onChange={(event) => handlePhoneChange(event, setContactPhoneDigits)}
                placeholder="(555) 123-4567"
                type="tel"
                value={formatPhoneDisplay(contactPhoneDigits)}
              />
              <FieldError id="referral-contact-phone-error" message={fieldErrors.contactPhone} />
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
                  aria-describedby={fieldErrors.patientName ? "referral-patient-name-error" : undefined}
                  aria-invalid={!!fieldErrors.patientName}
                  className={fieldClass(!!fieldErrors.patientName)}
                  id="referral-patient-name"
                  maxLength={100}
                  name="patientName"
                />
                <FieldError id="referral-patient-name-error" message={fieldErrors.patientName} />
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
                <div
                  className={`${fieldClass(!!fieldErrors.ssnLast4)} flex items-center gap-1 font-mono text-base tracking-[0.2em]`}
                >
                  <span aria-hidden="true" className="select-none text-muted-foreground">
                    XXX-XX-
                  </span>
                  <input
                    aria-describedby={fieldErrors.ssnLast4 ? "referral-ssn-last-4-error" : undefined}
                    aria-invalid={!!fieldErrors.ssnLast4}
                    aria-label="Last 4 digits of Social Security number"
                    autoComplete="off"
                    className="w-12 flex-1 bg-transparent font-mono tracking-[0.3em] text-foreground outline-none"
                    id="referral-ssn-last-4"
                    inputMode="numeric"
                    onBlur={() => setSsnFocused(false)}
                    onChange={() => undefined}
                    onFocus={() => setSsnFocused(true)}
                    onKeyDown={handleSsnKeyDown}
                    onPaste={handleSsnPaste}
                    value={maskedSsnDisplay}
                  />
                </div>
                <input name="ssnLast4" type="hidden" value={ssnDigits} />
                <FieldError id="referral-ssn-last-4-error" message={fieldErrors.ssnLast4} />
              </div>

              <div>
                <label className="text-sm font-bold text-foreground" htmlFor="referral-patient-phone">
                  Patient phone number
                </label>
                <input
                  aria-describedby={fieldErrors.patientPhone ? "referral-patient-phone-error" : undefined}
                  aria-invalid={!!fieldErrors.patientPhone}
                  autoComplete="tel"
                  className={fieldClass(!!fieldErrors.patientPhone)}
                  id="referral-patient-phone"
                  inputMode="numeric"
                  maxLength={16}
                  name="patientPhone"
                  onChange={(event) => handlePhoneChange(event, setPatientPhoneDigits)}
                  placeholder="(555) 123-4567"
                  type="tel"
                  value={formatPhoneDisplay(patientPhoneDigits)}
                />
                <FieldError id="referral-patient-phone-error" message={fieldErrors.patientPhone} />
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
              aria-describedby={fieldErrors.reasonForReferral ? "referral-reason-error" : undefined}
              aria-invalid={!!fieldErrors.reasonForReferral}
              className={`${textareaClass(!!fieldErrors.reasonForReferral)} min-h-32`}
              id="referral-reason"
              maxLength={1500}
              name="reasonForReferral"
            />
            <FieldError id="referral-reason-error" message={fieldErrors.reasonForReferral} />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="referral-website">Website</label>
            <input autoComplete="off" id="referral-website" name="website" tabIndex={-1} type="text" />
          </div>

          <div className="mt-5">
            <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
              <input
                aria-describedby={fieldErrors.consent ? "referral-consent-error" : undefined}
                aria-invalid={!!fieldErrors.consent}
                className="mt-1 size-4 rounded border-input accent-brand-action"
                id="referral-consent"
                name="consent"
                type="checkbox"
              />
              <span>
                {formConsentLabel} <span className="text-brand-action">*</span>
              </span>
            </label>
            <FieldError id="referral-consent-error" message={fieldErrors.consent} />
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

          <Button className="mt-6" disabled={isSubmitting || !canSubmit} type="submit">
            <Send aria-hidden="true" className="size-4" />
            {isSubmitting ? "Sending…" : "Send referral"}
          </Button>
        </form>
      </Container>
    </Section>
  );
}
