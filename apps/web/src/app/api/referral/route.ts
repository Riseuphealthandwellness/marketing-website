const MAX_BODY_BYTES = 16_000;
const MIN_SUBMIT_TIME_MS = 3_000;
const MAX_SUBMIT_TIME_MS = 2 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const sexOptions = new Set(["Female", "Male", "Other", "Prefer not to say"]);

type ReferralPayload = {
  dateOfReferral?: unknown;
  referringProviderOrganization?: unknown;
  contactPerson?: unknown;
  contactPhone?: unknown;
  reasonForReferral?: unknown;
  patientName?: unknown;
  sex?: unknown;
  dateOfBirth?: unknown;
  ssnLast4?: unknown;
  patientAddress?: unknown;
  patientPhone?: unknown;
  insurance?: unknown;
  groupNumber?: unknown;
  memberId?: unknown;
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

function includesBlockedSensitiveDetails(value: string) {
  return /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/.test(value);
}

function buildEmailBody(input: {
  contactPerson: string;
  contactPhone: string;
  dateOfBirth: string;
  dateOfReferral: string;
  groupNumber: string;
  insurance: string;
  memberId: string;
  patientAddress: string;
  patientName: string;
  patientPhone: string;
  reasonForReferral: string;
  referringProviderOrganization: string;
  sex: string;
  ssnLast4: string;
}) {
  return [
    "New website referral form submission",
    "",
    `Date of referral: ${input.dateOfReferral || "Not provided"}`,
    `Referring provider/organization: ${input.referringProviderOrganization}`,
    `Contact person: ${input.contactPerson}`,
    `Contact phone: ${input.contactPhone}`,
    "",
    "Patient information",
    `Name: ${input.patientName}`,
    `Sex: ${input.sex || "Not provided"}`,
    `DOB: ${input.dateOfBirth || "Not provided"}`,
    `Last 4 of SSN: ${input.ssnLast4 || "Not provided"}`,
    `Address: ${input.patientAddress || "Not provided"}`,
    `Phone: ${input.patientPhone || "Not provided"}`,
    "",
    "Insurance information",
    `Insurance: ${input.insurance || "Not provided"}`,
    `Group number: ${input.groupNumber || "Not provided"}`,
    `Member ID: ${input.memberId || "Not provided"}`,
    "",
    "Reason for referral",
    input.reasonForReferral,
    "",
    "Safety note: The online form does not collect Social Security numbers or document uploads. Referral partners should send labs, radiology reports, progress notes, and other clinical documents through the approved secure channel.",
  ].join("\n");
}

async function sendReferralEmail(input: Parameters<typeof buildEmailBody>[0]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REFERRAL_TO_EMAIL || process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL;
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
      subject: "Website referral submission",
      text: buildEmailBody(input),
    }),
  });

  if (!response.ok) {
    console.error("[referral] Resend request failed", response.status, await response.text());
  }

  return { ok: response.ok, reason: "provider" as const };
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
    return Response.json({ error: "Please keep the referral shorter." }, { status: 413 });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      { error: "Too many referrals were sent from this connection. Please try again later." },
      { status: 429 },
    );
  }

  let payload: ReferralPayload;
  try {
    payload = (await request.json()) as ReferralPayload;
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

  const input = {
    dateOfReferral: cleanText(payload.dateOfReferral, 20),
    referringProviderOrganization: cleanText(payload.referringProviderOrganization, 120),
    contactPerson: cleanText(payload.contactPerson, 80),
    contactPhone: cleanText(payload.contactPhone, 30),
    reasonForReferral: cleanText(payload.reasonForReferral, 1_500),
    patientName: cleanText(payload.patientName, 100),
    sex: cleanText(payload.sex, 30),
    dateOfBirth: cleanText(payload.dateOfBirth, 20),
    ssnLast4: cleanText(payload.ssnLast4, 4),
    patientAddress: cleanText(payload.patientAddress, 220),
    patientPhone: cleanText(payload.patientPhone, 30),
    insurance: cleanText(payload.insurance, 120),
    groupNumber: cleanText(payload.groupNumber, 80),
    memberId: cleanText(payload.memberId, 80),
  };
  const consent = payload.consent === true;

  if (
    !input.referringProviderOrganization ||
    !input.contactPerson ||
    !input.contactPhone ||
    !input.patientName ||
    input.reasonForReferral.length < 10 ||
    !consent
  ) {
    return Response.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  if (input.sex && !sexOptions.has(input.sex)) {
    return Response.json({ error: "Please select a valid sex option." }, { status: 422 });
  }

  if (input.ssnLast4 && !/^\d{4}$/.test(input.ssnLast4)) {
    return Response.json({ error: "Please enter only the last 4 digits of the SSN." }, { status: 422 });
  }

  if (includesBlockedSensitiveDetails(Object.values(input).join(" "))) {
    return Response.json(
      { error: "Please do not include Social Security numbers in the online form." },
      { status: 422 },
    );
  }

  const result = await sendReferralEmail(input);
  if (!result.ok) {
    return Response.json(
      { error: "The referral could not be sent right now. Please use the PDF or call us directly." },
      { status: result.reason === "missing_config" ? 503 : 502 },
    );
  }

  return Response.json({ ok: true });
}
