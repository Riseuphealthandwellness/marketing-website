"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { ContactFormContent } from "@/lib/cms/types";

type FormState = {
  error?: string;
  ok?: boolean;
};
type FieldErrors = Record<string, string>;

type ContactFormSectionProps = {
  content?: ContactFormContent;
};

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
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

function includesEmergencyLanguage(value: string) {
  return /\b(911|emergency|urgent|overdose|suicid(?:e|al)|self[-\s]?harm|chest pain|can't breathe|cannot breathe)\b/i.test(
    value,
  );
}

function includesLikelySensitiveDetails(value: string) {
  return (
    /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/.test(value) ||
    /\b(?:dob|date of birth|birthdate|ssn|social security|medical record|mrn|policy number|member id|insurance id)\b/i.test(
      value,
    )
  );
}

function buildPayload(formData: FormData, startedAt: number | null) {
  return {
    name: cleanText(formData.get("name"), 80),
    email: cleanText(formData.get("email"), 254).toLowerCase(),
    phone: cleanText(formData.get("phone"), 30),
    topic: cleanText(formData.get("topic"), 40),
    message: cleanText(formData.get("message"), 1_500),
    consent: formData.get("consent") === "on",
    website: formData.get("website"),
    startedAt,
  };
}

function getFieldErrors(payload: ReturnType<typeof buildPayload>, topics: string[]): FieldErrors {
  const errors: FieldErrors = {};
  if (!payload.name) errors.name = "Required";
  if (!payload.email) errors.email = "Required";
  else if (!isValidEmail(payload.email)) errors.email = "Enter a valid email address";
  if (payload.phone && !isValidPhone(payload.phone)) errors.phone = "Enter a valid phone number";
  if (!topics.includes(payload.topic)) errors.topic = "Please select a topic";
  if (!payload.message || payload.message.length < 20)
    errors.message = "Please provide more detail (at least 20 characters)";
  else if (includesEmergencyLanguage(payload.message))
    errors.message = "This form is not monitored for urgent concerns. Please call 911 or use your approved care channel.";
  else if (includesLikelySensitiveDetails(payload.message))
    errors.message = "Please remove protected health, insurance, or identity details.";
  if (!payload.consent) errors.consent = "Please confirm before submitting";
  return errors;
}

const fieldOrder = ["name", "email", "phone", "topic", "message", "consent"] as const;

const fieldIdByName: Record<string, string> = {
  name: "contact-name",
  email: "contact-email",
  phone: "contact-phone",
  topic: "contact-topic",
  message: "contact-message",
  consent: "contact-consent",
};

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs font-semibold text-brand-action" id={id} role="alert">
      {message}
    </p>
  );
}

function fieldClass(hasError: boolean) {
  return [
    "mt-2 h-11 w-full rounded-md border bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
    hasError ? "border-brand-action" : "border-input",
  ].join(" ");
}

function textareaClass(hasError: boolean) {
  return [
    "mt-2 min-h-36 w-full resize-y rounded-md border bg-background px-3 py-3 text-base leading-7 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
    hasError ? "border-brand-action" : "border-input",
  ].join(" ");
}

export function ContactFormSection({ content }: ContactFormSectionProps) {
  const startedAtRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const touchedFieldsRef = useRef<Record<string, boolean>>({});
  const [state, setState] = useState<FormState>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [phoneDigits, setPhoneDigits] = useState("");
  const topics = content?.topics ?? [];

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
    const errors = getFieldErrors(payload, topics);
    setCanSubmit(Object.keys(errors).length === 0);
    setFieldErrors(Object.fromEntries(Object.entries(errors).filter(([key]) => touchedFieldsRef.current[key])));
  }

  function handleFormActivity(event: React.SyntheticEvent<HTMLFormElement>) {
    markStarted();
    const fieldName = (event.target as HTMLElement).getAttribute?.("name") ?? undefined;
    applyLiveValidation(fieldName);
  }

  // phoneDigits lives outside the DOM value (which only ever shows formatted text), so
  // re-check validity once the input has actually re-rendered with the new value.
  useEffect(() => {
    applyLiveValidation("phone");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneDigits]);

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneDigits(event.target.value.replace(/\D/g, "").slice(0, 11));
  }

  if (!content) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    markStarted();
    setIsSubmitting(true);
    setState({});

    const formData = new FormData(form);
    const payload = buildPayload(formData, startedAtRef.current);

    const errors = getFieldErrors(payload, topics);
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as FormState;

      if (!response.ok || data.error) {
        setState({ error: data.error || "The message could not be sent right now." });
        return;
      }

      form.reset();
      startedAtRef.current = Date.now();
      setCanSubmit(false);
      setPhoneDigits("");
      touchedFieldsRef.current = {};
      setState({ ok: true });
    } catch {
      setState({ error: "The message could not be sent right now. Please call or email us directly." });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="pb-12 pt-6 sm:pb-14 sm:pt-8 lg:pb-16">
      <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
            {content.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-3 text-lg leading-7 text-muted-foreground">
            {content.description}
          </p>
          {content.note ? (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {content.note}
            </p>
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
              <label className="text-sm font-bold text-foreground" htmlFor="contact-name">
                Name <span className="text-brand-action">*</span>
              </label>
              <input
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                aria-invalid={!!fieldErrors.name}
                autoComplete="name"
                className={fieldClass(!!fieldErrors.name)}
                id="contact-name"
                maxLength={80}
                name="name"
              />
              <FieldError id="contact-name-error" message={fieldErrors.name} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="contact-email">
                Email <span className="text-brand-action">*</span>
              </label>
              <input
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                aria-invalid={!!fieldErrors.email}
                autoComplete="email"
                className={fieldClass(!!fieldErrors.email)}
                id="contact-email"
                maxLength={254}
                name="email"
                type="email"
              />
              <FieldError id="contact-email-error" message={fieldErrors.email} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="contact-phone">
                Phone
              </label>
              <input
                aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                aria-invalid={!!fieldErrors.phone}
                autoComplete="tel"
                className={fieldClass(!!fieldErrors.phone)}
                id="contact-phone"
                inputMode="numeric"
                maxLength={16}
                name="phone"
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                type="tel"
                value={formatPhoneDisplay(phoneDigits)}
              />
              <FieldError id="contact-phone-error" message={fieldErrors.phone} />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="contact-topic">
                Topic <span className="text-brand-action">*</span>
              </label>
              <select
                aria-describedby={fieldErrors.topic ? "contact-topic-error" : undefined}
                aria-invalid={!!fieldErrors.topic}
                className={fieldClass(!!fieldErrors.topic)}
                defaultValue=""
                id="contact-topic"
                name="topic"
              >
                <option disabled value="">
                  Select a topic
                </option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <FieldError id="contact-topic-error" message={fieldErrors.topic} />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-bold text-foreground" htmlFor="contact-message">
              Message <span className="text-brand-action">*</span>
            </label>
            <textarea
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              aria-invalid={!!fieldErrors.message}
              className={textareaClass(!!fieldErrors.message)}
              id="contact-message"
              maxLength={1500}
              minLength={20}
              name="message"
            />
            <FieldError id="contact-message-error" message={fieldErrors.message} />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              autoComplete="off"
              id="contact-website"
              name="website"
              tabIndex={-1}
              type="text"
            />
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <input
              aria-describedby={fieldErrors.consent ? "contact-consent-error" : undefined}
              aria-invalid={!!fieldErrors.consent}
              className="mt-1 size-4 rounded border-input accent-brand-action"
              id="contact-consent"
              name="consent"
              type="checkbox"
            />
            <span>
              I understand this is a general contact form and have not included
              personal medical or insurance information. <span className="text-brand-action">*</span>
            </span>
          </label>
          <FieldError id="contact-consent-error" message={fieldErrors.consent} />

          {state.error ? (
            <p className="mt-4 rounded-md border border-brand-action/30 bg-brand-action/10 px-4 py-3 text-sm font-semibold text-brand-action">
              {state.error}
            </p>
          ) : null}

          {state.ok ? (
            <p className="mt-4 rounded-md border border-brand-trust/30 bg-brand-trust/10 px-4 py-3 text-sm font-semibold text-brand-trust">
              Your message was sent.
            </p>
          ) : null}

          <Button className="mt-6" disabled={isSubmitting || !canSubmit} type="submit">
            <Send aria-hidden="true" className="size-4" />
            {isSubmitting ? "Sending" : "Send message"}
          </Button>
        </form>
      </Container>
    </div>
  );
}
