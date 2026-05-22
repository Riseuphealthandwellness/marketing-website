"use client";

import { Send } from "lucide-react";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { ContactFormContent } from "@/lib/cms/types";

type FormState = {
  error?: string;
  ok?: boolean;
};

type ContactFormSectionProps = {
  content?: ContactFormContent;
};

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
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

export function ContactFormSection({ content }: ContactFormSectionProps) {
  const startedAtRef = useRef<number | null>(null);
  const [state, setState] = useState<FormState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const topics = content?.topics ?? [];

  if (!content) return null;

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
    const name = cleanText(formData.get("name"), 80);
    const email = cleanText(formData.get("email"), 254).toLowerCase();
    const phone = cleanText(formData.get("phone"), 30);
    const topic = cleanText(formData.get("topic"), 40);
    const message = cleanText(formData.get("message"), 1_500);
    const consent = formData.get("consent") === "on";

    if (!name) {
      setState({ error: "Please enter your name." });
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(email)) {
      setState({ error: "Please enter a valid email address." });
      setIsSubmitting(false);
      return;
    }

    if (!topics.includes(topic)) {
      setState({ error: "Please select a topic." });
      setIsSubmitting(false);
      return;
    }

    if (message.length < 20) {
      setState({ error: "Please enter a message with at least 20 characters." });
      setIsSubmitting(false);
      return;
    }

    if (includesEmergencyLanguage(message)) {
      setState({
        error:
          "This form is not monitored for urgent concerns. Please call 911 or use your approved care channel.",
      });
      setIsSubmitting(false);
      return;
    }

    if (includesLikelySensitiveDetails(message)) {
      setState({
        error:
          "Please remove protected health, insurance, or identity details before sending this message.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!consent) {
      setState({
        error:
          "Please confirm that your message is non-urgent and does not include protected health information.",
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      name,
      email,
      phone,
      topic,
      message,
      consent,
      website: formData.get("website"),
      startedAt: startedAtRef.current,
    };

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
      startedAtRef.current = null;
      setState({ ok: true });
    } catch {
      setState({ error: "The message could not be sent right now. Please call or email us directly." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section className="bg-surface">
      <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-black uppercase text-brand-warm-accent">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>
          {content.note ? (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {content.note}
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
              <label className="text-sm font-bold text-foreground" htmlFor="contact-name">
                Name
              </label>
              <input
                autoComplete="name"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="contact-name"
                maxLength={80}
                name="name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="contact-email">
                Email
              </label>
              <input
                autoComplete="email"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="contact-email"
                maxLength={254}
                name="email"
                required
                type="email"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="contact-phone">
                Phone
              </label>
              <input
                autoComplete="tel"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="contact-phone"
                maxLength={30}
                name="phone"
                type="tel"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground" htmlFor="contact-topic">
                Topic
              </label>
              <select
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue=""
                id="contact-topic"
                name="topic"
                required
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
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-bold text-foreground" htmlFor="contact-message">
              Message
            </label>
            <textarea
              className="mt-2 min-h-36 w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-base leading-7 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              id="contact-message"
              maxLength={1500}
              minLength={20}
              name="message"
              required
            />
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
              className="mt-1 size-4 rounded border-input accent-brand-action"
              name="consent"
              required
              type="checkbox"
            />
            <span>
              I understand this is a general contact form and have not included
              personal medical or insurance information.
            </span>
          </label>

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

          <Button className="mt-6" disabled={isSubmitting} type="submit">
            <Send aria-hidden="true" className="size-4" />
            {isSubmitting ? "Sending" : "Send message"}
          </Button>
        </form>
      </Container>
    </Section>
  );
}
