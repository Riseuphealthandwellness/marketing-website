import { getSiteSettings } from "@/lib/cms/content-source";

const MAX_BODY_BYTES = 12_000;
const MIN_SUBMIT_TIME_MS = 3_000;
const MAX_SUBMIT_TIME_MS = 2 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const topics = new Set([
  "General question",
  "New patient access",
  "Referral question",
  "Billing or insurance",
  "Careers",
  "Other",
]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  topic?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
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

function buildEmailBody({
  email,
  message,
  name,
  phone,
  topic,
}: {
  email: string;
  message: string;
  name: string;
  phone: string;
  topic: string;
}) {
  return [
    `New website contact form submission`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Topic: ${topic}`,
    ``,
    `Message:`,
    message,
    ``,
    `Safety note: The sender confirmed they did not include clinical details, urgent concerns, or protected health information.`,
  ].join("\n");
}

async function sendContactEmail(input: {
  email: string;
  message: string;
  name: string;
  phone: string;
  topic: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const settings = await getSiteSettings();
  const to =
    settings?.contactInboxEmail ||
    process.env.CONTACT_TO_EMAIL ||
    process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Rise Up Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { ok: false, reason: "missing_config" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: input.email,
      subject: `Website contact: ${input.topic}`,
      text: buildEmailBody(input),
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend request failed", response.status, await response.text());
  }

  return { ok: response.ok, reason: "provider" as const };
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
    return Response.json({ error: "Please keep your message shorter." }, { status: 413 });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      { error: "Too many messages were sent from this connection. Please try again later." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Please submit the form again." }, { status: 400 });
  }

  if (cleanText(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_SUBMIT_TIME_MS || elapsed > MAX_SUBMIT_TIME_MS) {
    return Response.json({ error: "Please submit the form again." }, { status: 400 });
  }

  const name = cleanText(payload.name, 80);
  const email = cleanText(payload.email, 254).toLowerCase();
  const phone = cleanText(payload.phone, 30);
  const topic = cleanText(payload.topic, 40);
  const message = cleanText(payload.message, 1_500);
  const consent = payload.consent === true;

  if (!name || !isValidEmail(email) || !topics.has(topic) || message.length < 20 || !consent) {
    return Response.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  if (includesEmergencyLanguage(message)) {
    return Response.json(
      {
        error:
          "This form is not monitored for urgent concerns. Please call 911 or use your approved care channel.",
      },
      { status: 422 },
    );
  }

  if (includesLikelySensitiveDetails(message)) {
    return Response.json(
      {
        error:
          "Please remove protected health, insurance, or identity details before sending this message.",
      },
      { status: 422 },
    );
  }

  const result = await sendContactEmail({ email, message, name, phone, topic });
  if (!result.ok) {
    return Response.json(
      { error: "The message could not be sent right now. Please call or email us directly." },
      { status: result.reason === "missing_config" ? 503 : 502 },
    );
  }

  return Response.json({ ok: true });
}
