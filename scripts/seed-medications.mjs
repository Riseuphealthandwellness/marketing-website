/**
 * Seeds all medication / drug documents.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-medications.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

function slug(current) {
  return { _type: "slug", current };
}

function p(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}c`, _type: "span", marks: [], text }],
  };
}

function h3(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "h3",
    markDefs: [],
    children: [{ _key: `${key}c`, _type: "span", marks: [], text }],
  };
}

const docs = [
  // ── Spravato ─────────────────────────────────────────────────────────────
  {
    _id: "drug-spravato",
    _type: "drug",
    name: "Spravato",
    genericName: "esketamine",
    aliases: ["esketamine", "ketamine nasal spray", "ketamine therapy"],
    slug: slug("spravato"),
    description:
      "A prescription nasal spray approved for treatment-resistant depression and major depressive disorder with suicidal thoughts — with many patients noticing improvement within 24 hours.",
    body: [
      p(
        "sp1",
        "Spravato is a prescription nasal spray approved by the FDA for two serious conditions: treatment-resistant depression (TRD) — meaning depression that has not responded to at least two different antidepressants — and major depressive disorder in adults with active suicidal thoughts or behaviors. In January 2025, the FDA also approved Spravato as a standalone therapy for treatment-resistant depression, making it the first and only single-drug treatment of its kind.",
      ),
      p(
        "sp2",
        "It contains esketamine, a close relative of the anesthetic ketamine, and works through a completely different brain pathway than traditional antidepressants like SSRIs or SNRIs. Rather than affecting serotonin or dopamine, esketamine acts on glutamate receptors that play a role in how brain cells communicate and form new connections. Many patients notice a meaningful improvement in their depression within 24 hours of their first treatment — far faster than conventional antidepressants, which typically take weeks.",
      ),
      p(
        "sp3",
        "Spravato is not a take-home medication. Every session takes place here at Rise Up under direct supervision. You self-administer the nasal spray under a provider's observation and then stay for at least two hours while our team monitors you. Sessions are typically twice a week for the first month, then weekly, then every one to two weeks as a maintenance schedule. At this time we can only offer this service to commercially insured patients.",
      ),
    ],
    learnMoreUrl: "https://www.spravato.com/what-is-spravato",
    learnMoreLabel: "What is SPRAVATO® (esketamine)? | Official site",
    seo: { _type: "seoFields", noIndex: false },
  },

  // ── Suboxone ─────────────────────────────────────────────────────────────
  {
    _id: "drug-suboxone",
    _type: "drug",
    name: "Suboxone",
    genericName: "buprenorphine/naloxone",
    aliases: [
      "buprenorphine/naloxone",
      "buprenorphine",
      "naloxone",
      "bupe",
      "Zubsolv",
      "Bunavail",
    ],
    slug: slug("suboxone"),
    description:
      "A daily sublingual film or tablet that combines buprenorphine and naloxone to reduce opioid cravings and withdrawal symptoms as part of a treatment plan for opioid use disorder.",
    body: [
      p(
        "sb1",
        "Suboxone is a daily medication that helps people with opioid use disorder stop using opioids and stay in recovery. It combines two ingredients: buprenorphine and naloxone. Buprenorphine is a partial opioid — it attaches to the same spots in the brain that opioids like heroin or prescription painkillers target, but it only activates them partially. This quiets cravings and prevents withdrawal without producing a significant high, even at higher doses. Naloxone is added as a safeguard: if someone tries to inject the medication, the naloxone causes immediate withdrawal, acting as a strong deterrent to misuse.",
      ),
      p(
        "sb2",
        "Suboxone comes as a thin film that dissolves under your tongue or against the inside of your cheek and is taken once daily at home — you do not need to visit a clinic every day. Your provider will start you on a dose that fits your situation and adjust it over time. Most people begin treatment during or just after the onset of withdrawal symptoms from opioids.",
      ),
      p(
        "sb3",
        "Good candidates are adults with moderate-to-severe opioid use disorder who are ready to stop using opioids and commit to treatment. Most major insurance plans, Medicaid, and Medicare cover Suboxone, and the manufacturer offers a copay assistance program for eligible patients with private insurance. Suboxone works best as part of a broader plan that includes counseling or behavioral support.",
      ),
    ],
    learnMoreUrl: "https://www.suboxone.com/",
    learnMoreLabel: "Learn more about Suboxone® | Official site",
    seo: { _type: "seoFields", noIndex: false },
  },

  // ── Sublocade ─────────────────────────────────────────────────────────────
  {
    _id: "drug-sublocade",
    _type: "drug",
    name: "Sublocade",
    genericName: "buprenorphine extended-release injection",
    aliases: [
      "buprenorphine extended-release",
      "buprenorphine ER",
      "buprenorphine monthly injection",
      "monthly buprenorphine",
    ],
    slug: slug("sublocade"),
    description:
      "A once-monthly subcutaneous buprenorphine injection that provides a steady, consistent level of medication for opioid use disorder — with no daily dosing.",
    body: [
      p(
        "sloc1",
        "Sublocade is a once-a-month injectable form of buprenorphine for treating moderate-to-severe opioid use disorder. Instead of taking a film or tablet every day, you receive a single shot under the skin of your abdomen from a healthcare provider once a month. The injection slowly releases a steady level of buprenorphine over the entire month, so there are no daily peaks or valleys in the medication — your body receives consistent support around the clock.",
      ),
      p(
        "sloc2",
        "Before your first Sublocade injection, your provider will confirm you tolerate buprenorphine with a single oral dose. Your first two monthly shots are a higher loading dose (300 mg), and most patients then move to a 100 mg maintenance dose each month. Because Sublocade is only given by a provider, it also eliminates the possibility of accidentally missing a dose — a common challenge with daily medication.",
      ),
      p(
        "sloc3",
        "Sublocade is a strong option for people who want to avoid the daily routine of sublingual medication, who worry about keeping medication at home, or who have struggled with consistent adherence in the past. In clinical studies, patients on Sublocade were significantly more likely to achieve treatment success than those on placebo. It is covered by most major insurance plans and used alongside counseling and support.",
      ),
    ],
    learnMoreUrl: "https://www.sublocade.com/",
    learnMoreLabel: "Learn more about Sublocade® | Official site",
    seo: { _type: "seoFields", noIndex: false },
  },

  // ── Brixadi ───────────────────────────────────────────────────────────────
  {
    _id: "drug-brixadi",
    _type: "drug",
    name: "Brixadi",
    genericName: "buprenorphine extended-release injection",
    aliases: ["brixadi weekly", "brixadi monthly", "weekly buprenorphine injection"],
    slug: slug("brixadi"),
    description:
      "A weekly or monthly extended-release buprenorphine injection for opioid use disorder — offering flexible dosing schedules to fit different stages of treatment.",
    body: [
      p(
        "brx1",
        "Brixadi is an injectable form of buprenorphine that gives patients and providers a unique choice: a weekly shot or a monthly shot. It is approved for adults with moderate-to-severe opioid use disorder, and like other buprenorphine treatments, it reduces cravings and withdrawal by partially activating opioid receptors in the brain — without causing a high. The injection turns into a small gel depot under the skin that slowly breaks down and releases medication over the dosing period. It can be given in the abdomen, thigh, buttock, or upper arm by a healthcare provider.",
      ),
      p(
        "brx2",
        "The weekly and monthly versions of Brixadi are separate formulations — you cannot combine weekly doses to make a monthly one. The weekly option is especially useful for people who are just starting treatment or who want more frequent contact with their provider to fine-tune their dose quickly. The monthly option offers greater convenience once a stable dose has been established. Patients can transition between the two schedules depending on what works best for their life and their recovery.",
      ),
      p(
        "brx3",
        "Brixadi is a good fit for anyone who prefers not to manage a daily medication at home and who wants the flexibility to choose how often they see their provider. As with all buprenorphine treatments, it requires at least one initial dose of oral buprenorphine to ensure tolerability before the first injection. Brixadi should be used as part of a comprehensive treatment plan that includes counseling.",
      ),
    ],
    learnMoreUrl: "https://www.brixadi.com/",
    learnMoreLabel: "Learn more about Brixadi® | Official site",
    seo: { _type: "seoFields", noIndex: false },
  },

  // ── Vivitrol ──────────────────────────────────────────────────────────────
  {
    _id: "drug-vivitrol",
    _type: "drug",
    name: "Vivitrol",
    genericName: "naltrexone extended-release injection",
    aliases: [
      "naltrexone",
      "naltrexone injection",
      "naltrexone monthly",
      "Revia",
      "extended-release naltrexone",
    ],
    slug: slug("vivitrol"),
    description:
      "A once-monthly naltrexone injection that completely blocks opioid receptors and significantly reduces alcohol cravings — with no opioid content and no abuse potential.",
    body: [
      p(
        "viv1",
        "Vivitrol is a once-monthly injection used to treat both opioid use disorder and alcohol use disorder. It contains naltrexone, a medication that completely blocks opioid receptors in the brain. Because those receptors are blocked, opioids cannot produce a high — and alcohol's reinforcing effects are significantly reduced as well. This makes it much harder for cravings to take hold, and much less rewarding to use if a slip does occur. It is injected into the gluteal muscle (upper buttock area) by a healthcare provider every four weeks.",
      ),
      p(
        "viv2",
        "A critical requirement for Vivitrol is that you must be completely free of opioids for 7 to 14 days before your first injection. If opioids are still in your system when you receive the shot, the naltrexone will force your body into sudden, severe withdrawal — a process called precipitated withdrawal. Because of this, Vivitrol is not appropriate for people who are still physically dependent on opioids without completing a full detox first. For alcohol use disorder, no detox window is required before starting, though you should not be actively drinking at the time of your first injection.",
      ),
      p(
        "viv3",
        "Vivitrol is a strong option for people who have completed detox and want a medication that requires no daily pills and contains no opioids whatsoever. It is often preferred when a fully opioid-free treatment approach is a priority. Most major insurance plans and Medicaid programs cover Vivitrol, and the manufacturer offers patient assistance resources for those who qualify.",
      ),
    ],
    learnMoreUrl: "https://www.vivitrol.com/",
    learnMoreLabel: "Learn more about Vivitrol® | Official site",
    seo: { _type: "seoFields", noIndex: false },
  },

  // ── Antabuse ──────────────────────────────────────────────────────────────
  {
    _id: "drug-antabuse",
    _type: "drug",
    name: "Antabuse",
    genericName: "disulfiram",
    aliases: ["disulfiram"],
    slug: slug("antabuse"),
    description:
      "A daily oral tablet that makes drinking alcohol physically unpleasant by blocking the enzyme that breaks it down — used as a deterrent to support alcohol abstinence.",
    body: [
      p(
        "ant1",
        "Disulfiram, commonly known by the brand name Antabuse, is one of the oldest FDA-approved medications for alcohol use disorder — it has been in use since 1951. It works differently than other AUD medications: rather than reducing cravings or blocking the brain's reward system, it makes drinking alcohol physically unpleasant. Disulfiram blocks an enzyme your body uses to break down alcohol. When you drink while taking it, a toxic substance called acetaldehyde builds up in your bloodstream within 10 to 30 minutes, causing flushing, sweating, nausea, vomiting, heart palpitations, and a severe headache. Knowing this will happen is a powerful deterrent.",
      ),
      p(
        "ant2",
        "Disulfiram is taken as a daily tablet — usually 250 mg to 500 mg — and can be taken at home. It is important to know that alcohol in any form can trigger a reaction, including alcohol in mouthwash, some sauces, cough syrups, and even hand sanitizer absorbed through the skin. Disulfiram does not reduce the desire to drink; it relies on the knowledge that drinking will make you very sick.",
      ),
      p(
        "ant3",
        "The best candidates for disulfiram are people who have already stopped drinking — including completing any medically supervised detox if needed — and who are highly motivated to stay sober and are willing to use a medication as an added commitment device. It is most effective when combined with counseling and a strong support system. A full medical evaluation is required before starting, as it is not recommended for people with certain heart or liver conditions.",
      ),
    ],
    seo: { _type: "seoFields", noIndex: false },
  },

  // ── Campral ───────────────────────────────────────────────────────────────
  {
    _id: "drug-campral",
    _type: "drug",
    name: "Campral",
    genericName: "acamprosate",
    aliases: ["acamprosate", "acamprosate calcium"],
    slug: slug("campral"),
    description:
      "An oral medication that helps restore the brain's chemical balance after heavy alcohol use, reducing the restlessness and anxiety that often lead to relapse in early recovery.",
    body: [
      p(
        "cmp1",
        "Acamprosate, once sold as Campral, is an FDA-approved medication for helping people with alcohol use disorder stay sober after they have stopped drinking. Unlike Antabuse, it does not make you sick if you drink. And unlike naltrexone, it does not primarily target the brain's reward system. Instead, acamprosate helps restore a natural chemical balance in the brain that is disrupted by long-term, heavy alcohol use. Chronic drinking throws off two key brain systems — one that excites brain activity (glutamate) and one that calms it (GABA). After quitting, many people feel chronically anxious, restless, and unable to relax. Acamprosate calms that overactive system and reduces the uncomfortable feelings that often drive people back to drinking.",
      ),
      p(
        "cmp2",
        "Acamprosate is taken as two tablets three times a day with meals — six tablets per day in total. The consistent daily schedule is important: the medication builds its effect over several weeks and works best with uninterrupted use. It does not cause sedation or produce any high. A review of 24 studies found that people taking acamprosate alongside therapy had an 86% lower risk of returning to drinking compared to those on placebo.",
      ),
      p(
        "cmp3",
        "Acamprosate is a good fit for people who have recently completed alcohol detox, are not actively drinking, and want help managing the restlessness and emotional discomfort that fuel relapse in early recovery. It is processed entirely through the kidneys rather than the liver, making it a safer choice for people with liver damage from heavy drinking. Most insurance plans cover generic acamprosate, and it is generally an affordable medication.",
      ),
    ],
    seo: { _type: "seoFields", noIndex: false },
  },
];

const mutations = docs.map((doc) => ({ createOrReplace: doc }));

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});

const json = await res.json();

if (!res.ok) {
  console.error("Seed failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log(`✓ Seeded ${docs.length} medication documents.`);
console.log(JSON.stringify(json, null, 2));
