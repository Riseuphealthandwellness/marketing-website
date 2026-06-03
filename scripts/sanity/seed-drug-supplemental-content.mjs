import {getCliClient} from 'sanity/cli'

const drugSupplementalContent = {
  "antabuse": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "1951", label: "Year Antabuse (disulfiram) was first FDA-approved — one of the oldest AUD medications" },
          { value: "250–500mg", label: "Typical daily oral dose" },
          { value: "10–30 min", label: "Time for disulfiram-alcohol reaction to begin after drinking" },
          { value: "Commitment", label: "Works best as an added deterrent for highly motivated patients" },
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Mild fatigue, headache, or a metallic or garlic aftertaste are common in the first week",
          "Any form of alcohol — including mouthwash, some cough syrups, vinegars in sauces, and even some hand sanitizers absorbed through skin — can trigger a reaction",
          "A disulfiram-alcohol reaction causes flushing, sweating, nausea, vomiting, heart palpitations, and an intense headache; severe reactions can affect blood pressure and heart rhythm",
          "Not recommended for people with heart disease, liver damage beyond mild impairment, psychosis, or those taking certain medications that interact with it",
          "A full medical review including liver function tests is required before starting",
          "Disulfiram stays in your system for up to two weeks after stopping — alcohol should be avoided during that entire period",
          "Tell all of your healthcare providers you are taking disulfiram — it interacts with several common medications including warfarin, phenytoin, and isoniazid",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Antabuse at Rise Up",
        steps: [
          {
            title: "Medical evaluation and lab work",
            body: "Before prescribing, your provider reviews your heart health, liver function, current medications, and history of any psychiatric conditions. A baseline liver function test and metabolic panel are ordered.",
          },
          {
            title: "Alcohol clearance period",
            body: "You must be completely alcohol-free for at least 12 hours before your first dose — typically 24 to 48 hours is recommended. Disulfiram is only started after detox is complete, not to help with detox itself.",
          },
          {
            title: "Starting dose",
            body: "Most patients start at 250 mg per day, taken in the morning or evening. Some prefer a supervised daily dose (at a pharmacy or clinic) as an additional accountability structure.",
          },
          {
            title: "Education about reactions and hidden alcohol",
            body: "Your provider or care team will review all sources of hidden alcohol you need to avoid — not just drinks, but certain foods, hygiene products, and over-the-counter medications.",
          },
          {
            title: "Monitoring visits",
            body: "Follow-up visits check liver function and overall health, assess how the medication is working as a deterrent, and integrate disulfiram with any other parts of your care plan.",
          },
        ],
      },
    ],
  },

  "brixadi": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "Weekly or monthly", label: "Unique dual dosing schedule — the only buprenorphine injection offering both" },
          { value: "FDA-approved", label: "For moderate-to-severe opioid use disorder in adults" },
          { value: "2 mg–32 mg/wk", label: "Weekly dose range; monthly equivalent formulations available separately" },
          { value: "Subcutaneous", label: "Injected under the skin — abdomen, thigh, buttock, or upper arm" },
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Injection site reactions are the most common side effect: redness, swelling, itching, or firmness at the site, usually resolving within a few days",
          "Do not massage, rub, or apply heat to the injection site",
          "Constipation is common with all buprenorphine formulations",
          "Nausea, headache, and fatigue may occur during dose adjustment",
          "Brixadi and other buprenorphine medications should not be combined with benzodiazepines or alcohol — this combination can cause dangerous respiratory depression",
          "If you need opioid pain medication for surgery or an injury, inform your surgeon that you are on buprenorphine — this is manageable but requires coordination",
          "Do not attempt to remove or puncture the depot under the skin — it is not removable like some implants and is designed to dissolve naturally",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Brixadi at Rise Up",
        steps: [
          {
            title: "Initial oral buprenorphine induction",
            body: "Before your first Brixadi injection, you'll take at least one dose of sublingual buprenorphine to confirm you tolerate the medication well and are not in precipitated withdrawal.",
          },
          {
            title: "Choosing weekly vs. monthly",
            body: "Your provider discusses which schedule fits your life and recovery stage. Weekly injections offer more frequent provider contact and faster dose adjustments early in treatment. Monthly injections offer more convenience once you're stable.",
          },
          {
            title: "First injection",
            body: "The injection is given by your provider in the office. The site is cleaned, a short needle delivers the medication under the skin, and a small depot forms that slowly releases buprenorphine over the dosing period.",
          },
          {
            title: "Dose titration",
            body: "Your provider monitors your response and may adjust the dose over the first several weeks. The weekly formulation makes this particularly easy in early treatment.",
          },
          {
            title: "Ongoing injections and monitoring",
            body: "Subsequent injections are scheduled at your regular care visits. Opioid use, cravings, mood, and overall health are monitored at each appointment.",
          },
        ],
      },
    ],
  },

  "campral": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "86%", label: "Lower risk of returning to drinking vs. placebo in a 24-study review (Cochrane)" },
          { value: "2 tablets × 3/day", label: "Standard dosing — 6 tablets daily total, best taken with meals" },
          { value: "Kidney processed", label: "Eliminated by the kidneys (not the liver) — safer for patients with liver damage" },
          { value: "Weeks to work", label: "Full effect builds over several weeks; consistent daily use is critical" },
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Diarrhea is the most common side effect and is usually mild; taking tablets with food helps",
          "Nausea, gas, and stomach upset may occur, particularly in the first one to two weeks",
          "Acamprosate does not cause sedation and has no known potential for abuse",
          "It does not interact with alcohol — it won't make you sick if you drink, unlike Antabuse",
          "If you relapse while on acamprosate, continue taking it — it's still working on the neurochemical imbalance and can help you get back on track",
          "Kidney impairment affects how the drug is processed; a creatinine check is standard before starting and during treatment",
          "Not recommended for patients with severe kidney disease (creatinine clearance below 30 mL/min)",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Campral at Rise Up",
        steps: [
          {
            title: "Alcohol-free baseline",
            body: "Acamprosate is started after you've stopped drinking — it does not help manage withdrawal. Your provider confirms you are alcohol-free and stable before prescribing.",
          },
          {
            title: "Kidney function check",
            body: "A basic metabolic panel is ordered to check your kidney function, since acamprosate is cleared through the kidneys and dose may need adjustment.",
          },
          {
            title: "Starting the medication",
            body: "Standard dosing is two 333 mg tablets three times daily with meals. The consistent schedule matters — this is not a take-as-needed medication.",
          },
          {
            title: "What to expect in the first weeks",
            body: "It takes several weeks for the full effect on GABA and glutamate balance to build. Diarrhea or stomach upset in the early days usually resolves. The goal is a gradual reduction in the restlessness, anxiety, and discomfort that drive relapse in early sobriety.",
          },
          {
            title: "Ongoing monitoring",
            body: "Follow-up visits track kidney function periodically, assess how you're tolerating the medication, and integrate Campral with any other parts of your care plan — including primary care for conditions like liver health or blood pressure.",
          },
        ],
      },
    ],
  },

  "spravato": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "24 hrs", label: "Many patients notice improvement within 24 hours of first treatment" },
          { value: "2× weekly", label: "Treatment frequency during the first month (induction phase)" },
          { value: "2 hr minimum", label: "Monitored observation period required at clinic after each session" },
          { value: "FDA 2025", label: "Approved as a standalone monotherapy for treatment-resistant depression (January 2025)" },
        ],
      },
      {
        type: "prose",
        eyebrow: "How it works",
        heading: "A different kind of antidepressant",
        paragraphs: [
          "Traditional antidepressants — SSRIs and SNRIs — target serotonin and norepinephrine systems and typically require four to six weeks before patients notice any effect. Spravato works through a completely different pathway. Esketamine acts on NMDA glutamate receptors, which play a central role in synaptic plasticity — how brain cells communicate and form new connections. Many researchers believe this is why it works so much faster.",
          "Spravato is not a maintenance antidepressant in the traditional sense. It is typically used in combination with an oral antidepressant. The initial phase involves more frequent sessions to produce the antidepressant effect; the maintenance phase involves less frequent dosing to sustain it. At this time, we can only offer Spravato to commercially insured patients.",
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Dissociation — a feeling of detachment from yourself or your surroundings — is common and expected during sessions; it typically resolves within two hours",
          "Dizziness and nausea are common during the monitoring period; driving after a session is not permitted on treatment days",
          "Blood pressure increases temporarily after administration; monitoring is part of every session",
          "Sedation or impaired attention may persist beyond the two-hour monitoring window — arrange transportation home",
          "Because of the dissociative effects, Spravato has potential for misuse; it is never dispensed for home use",
          "Tell your provider about any history of psychosis or bipolar disorder — it may not be appropriate in those situations",
          "Spravato is not recommended during pregnancy",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Spravato at Rise Up",
        steps: [
          {
            title: "Eligibility evaluation",
            body: "Your provider confirms a diagnosis of treatment-resistant depression (at least two prior antidepressant trials without adequate response) or MDD with suicidal ideation, and reviews your full psychiatric and medical history.",
          },
          {
            title: "Insurance authorization",
            body: "Prior authorization is required by most commercial insurance plans. Our team handles the documentation, including records of prior treatment failures. Note that at this time we only offer Spravato to commercially insured patients.",
          },
          {
            title: "First session",
            body: "You self-administer the nasal spray under your provider's direct observation. Blood pressure is monitored before, during, and after administration. You then stay in the office for a minimum of two hours.",
          },
          {
            title: "Induction phase",
            body: "Sessions are twice per week for the first four weeks. Some patients begin noticing changes after the first or second session; others need more time.",
          },
          {
            title: "Maintenance phase",
            body: "After induction, sessions move to once weekly for four weeks, then once every one to two weeks as a long-term maintenance schedule. This continues as long as the medication is beneficial.",
          },
        ],
      },
    ],
  },

  "sublocade": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "42.7% vs. 5%", label: "Opioid abstinence rate over 24 weeks: Sublocade vs. placebo in pivotal Phase 3 trial" },
          { value: "300mg × 2", label: "Loading dose for the first two months, then 100mg maintenance" },
          { value: "Steady state", label: "Provides consistent 24/7 buprenorphine levels with no daily peaks or valleys" },
          { value: "Once monthly", label: "Single subcutaneous injection — no daily medication to manage" },
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Injection site reactions are the most common side effect: a lump, firmness, or discomfort at the injection site that usually resolves over days to weeks",
          "Do not rub the injection site or apply heat to it",
          "Constipation is common with all buprenorphine formulations — staying hydrated and increasing fiber intake helps",
          "Nausea, headache, and fatigue may occur, particularly during dose transitions",
          "Sublocade should not be combined with benzodiazepines, alcohol, or sedatives — the combination can cause dangerous respiratory depression",
          "If emergency surgery or significant pain management is needed, inform your surgical team you are on buprenorphine; high-dose opioids can still overcome buprenorphine's receptor occupancy in urgent situations",
          "The depot is not removable — it is designed to dissolve under the skin over the month; attempting to remove it is dangerous",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Sublocade at Rise Up",
        steps: [
          {
            title: "Confirming buprenorphine tolerance",
            body: "Before your first Sublocade injection, your provider confirms you tolerate buprenorphine by having you take a single dose sublingually. This also ensures you are not in precipitated withdrawal.",
          },
          {
            title: "First loading injection",
            body: "Your provider administers 300 mg subcutaneously in the abdomen. The injection takes under a minute; a small gel depot forms under the skin that dissolves over the next four weeks.",
          },
          {
            title: "Second loading injection at one month",
            body: "A second 300 mg loading dose is given one month after the first. This establishes consistent therapeutic blood levels.",
          },
          {
            title: "Maintenance dosing",
            body: "Most patients then move to 100 mg monthly. Your provider may recommend continuing at 300 mg monthly if your clinical situation requires higher levels.",
          },
          {
            title: "Monthly monitoring visits",
            body: "Each monthly injection visit also serves as a monitoring visit — cravings, mood, sleep, liver health, and overall progress are assessed and addressed at the same appointment.",
          },
        ],
      },
    ],
  },

  "suboxone": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "34% fewer", label: "Deaths in the first year vs. untreated OUD — buprenorphine-naloxone (published study, 2024)" },
          { value: "1.9×", label: "Higher remission rate vs. untreated patients (18.8% vs. 10.1%)" },
          { value: "12–24 hrs", label: "Typical time after last opioid use before safely starting first dose" },
          { value: "Daily sublingual", label: "Thin film dissolves under the tongue at home — no daily clinic visits required" },
        ],
      },
      {
        type: "prose",
        eyebrow: "How it works",
        heading: "Why buprenorphine works differently than full opioids",
        paragraphs: [
          "Buprenorphine is a partial opioid agonist — it binds to the same opioid receptors in the brain that heroin and prescription painkillers target, but only activates them partially. This means it prevents withdrawal and calms cravings without producing significant euphoria. Crucially, it also has a 'ceiling effect': at higher doses, the effect plateaus, making it extremely difficult to overdose on buprenorphine alone.",
          "The naloxone component in Suboxone is inactive when the film is dissolved under the tongue as directed. It is activated only if someone attempts to inject the medication, causing immediate withdrawal — a strong built-in deterrent to misuse. This is why Suboxone is considered a lower-risk formulation for take-home prescribing than buprenorphine-only products.",
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Headache, nausea, and sweating are common in the first one to two weeks; they typically resolve as your body adjusts",
          "Constipation is common — increasing fluids and fiber intake helps",
          "Do not combine Suboxone with benzodiazepines, alcohol, or sedatives — this combination can cause dangerous slowing of breathing",
          "Precipitated withdrawal can occur if you take Suboxone too soon after using opioids — wait until you are in at least mild withdrawal before your first dose",
          "Oral health is important — the film is slightly acidic; rinsing your mouth with water after each dose and maintaining good dental hygiene matters",
          "Suboxone can affect your ability to drive or operate machinery in the initial period of treatment or after dose changes — use caution until you know how it affects you",
          "Tell your dentist and other providers you are taking Suboxone; it interacts with some anesthetic agents and medications",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Suboxone at Rise Up",
        steps: [
          {
            title: "Initial assessment",
            body: "Your provider evaluates your opioid use, overall health, and current medications. Lab work is ordered. You discuss your goals for treatment and any questions about buprenorphine.",
          },
          {
            title: "Understanding timing for your first dose",
            body: "Your provider will explain exactly when to take your first dose — typically 12 to 24 hours after your last opioid use, when you are beginning to feel withdrawal symptoms (restlessness, sweating, anxiety, aches). Taking it too soon can precipitate severe withdrawal.",
          },
          {
            title: "Home induction",
            body: "Most patients start Suboxone at home. Your first dose is usually 2 to 4 mg; you may take additional doses in the first day if withdrawal symptoms return, up to a prescribed daily maximum.",
          },
          {
            title: "Stabilization period",
            body: "Over the first two to four weeks, your dose is adjusted until you feel stable — cravings are manageable and you are not experiencing withdrawal between doses. Most patients stabilize at 8 to 24 mg per day.",
          },
          {
            title: "Ongoing treatment",
            body: "Once stable, your appointments are typically monthly. MOUD is most effective when continued for as long as it is working — there is no clinically recommended maximum duration. Your provider will discuss long-term planning at your regular visits.",
          },
        ],
      },
    ],
  },

  "vivitrol": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "Once monthly", label: "Single intramuscular injection — given by your provider every four weeks" },
          { value: "7–14 days", label: "Required opioid-free period before first injection (full detox must be complete)" },
          { value: "Zero opioids", label: "Contains no opioids whatsoever — no potential for opioid misuse" },
          { value: "Dual approved", label: "FDA-approved for both opioid use disorder AND alcohol use disorder" },
        ],
      },
      {
        type: "prose",
        eyebrow: "How it works",
        heading: "Blocking the reward, removing the point",
        paragraphs: [
          "Naltrexone works through a fundamentally different mechanism than buprenorphine. Rather than partially activating opioid receptors (like buprenorphine), it completely blocks them. This means that if opioids are used while Vivitrol is active, they produce no effect — no high, no relief, no reinforcement. For alcohol use disorder, it works by blocking the endogenous opioid system that mediates much of alcohol's rewarding effects, significantly reducing both cravings and the pleasure of drinking.",
          "Because Vivitrol contains no opioids at all, it is often the preferred choice for patients, families, or legal situations where an opioid-free treatment approach is important. It is also a strong option for people who have successfully completed medically supervised detox and want the protection of a once-monthly medication that eliminates daily decision-making about whether to take a pill.",
        ],
      },
      {
        type: "bullets",
        eyebrow: "Side effects and what to watch for",
        heading: "What to be aware of",
        items: [
          "Injection site pain, tenderness, swelling, or bruising — usually mild and resolves within a few days; tell your provider immediately if you notice an area of hardness, dark scabbing, or blistering",
          "Nausea is common in the first few days after injection; it typically resolves as the initial release from the depot settles",
          "Headache, fatigue, decreased appetite, and joint or muscle pain have been reported",
          "Critical: you must be completely opioid-free for 7 to 14 days before your first injection; if opioids are in your system, the injection will trigger severe, immediate precipitated withdrawal",
          "Pain medications — including after surgery — are affected; opioid pain relief will not work while Vivitrol is active; inform all treating providers before any procedures",
          "In an emergency, very high doses of opioids can overcome the block, but this is dangerous — alert emergency personnel that you are on naltrexone",
          "Vivitrol does not cause euphoria or a high at any dose and has no potential for abuse",
          "Tell your provider about any history of liver disease — high-dose oral naltrexone has been associated with liver enzyme elevations; Vivitrol injection doses are lower but disclosure is important",
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started",
        heading: "Starting Vivitrol at Rise Up",
        steps: [
          {
            title: "Completing detox first",
            body: "If you are using opioids, a full medically supervised detox must be completed and at least 7 to 14 days must pass before your first Vivitrol injection. Your provider will confirm you are opioid-free, often with a urine toxicology screen and a naloxone challenge if there is any uncertainty.",
          },
          {
            title: "Medical evaluation",
            body: "Liver function tests, a basic metabolic panel, and a review of all current medications are completed before prescribing. Vivitrol is generally well tolerated but baseline assessment is standard.",
          },
          {
            title: "First injection",
            body: "Your provider administers 380 mg into the gluteal muscle (upper buttock). The injection is given with a special needle designed for deep intramuscular delivery; rotating sides each month is recommended.",
          },
          {
            title: "Managing any post-injection discomfort",
            body: "Mild pain, tenderness, or swelling at the injection site is expected for the first few days. Ice packs and over-the-counter anti-inflammatories can help. Report any unusual skin changes to your provider promptly.",
          },
          {
            title: "Monthly follow-up",
            body: "Each monthly visit for your injection is also a clinical check-in — cravings, mood, any opioid or alcohol use, and overall health are reviewed. Injections continue for as long as the medication is beneficial.",
          },
        ],
      },
    ],
  },
}

const typeMap = {
  stats: 'supplementalStatsSection',
  prose: 'supplementalProseSection',
  symptoms: 'supplementalSymptomsSection',
  steps: 'supplementalStepsSection',
  bullets: 'supplementalBulletsSection',
}

function keyFor(...parts) {
  return parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function withEnabled(item) {
  return {
    ...item,
    enabled: item.enabled ?? true,
  }
}

function toSanitySection(section, sectionIndex) {
  const base = {
    _key: keyFor(section.type, section.heading, sectionIndex),
    _type: typeMap[section.type],
    enabled: true,
  }

  if (section.type === 'stats') {
    return {
      ...base,
      items: section.items.map((item, itemIndex) => ({
        _key: keyFor('stat', item.value, itemIndex),
        _type: 'supplementalStatItem',
        ...withEnabled(item),
      })),
    }
  }

  if (section.type === 'steps') {
    return {
      ...base,
      eyebrow: section.eyebrow,
      heading: section.heading,
      description: section.description,
      steps: section.steps.map((step, stepIndex) => ({
        _key: keyFor('step', step.title, stepIndex),
        _type: 'supplementalStepItem',
        ...withEnabled(step),
      })),
    }
  }

  if (section.type === 'symptoms') {
    return {
      ...base,
      eyebrow: section.eyebrow,
      heading: section.heading,
      description: section.description,
      groups: section.groups.map((group, groupIndex) => ({
        _key: keyFor('group', group.heading, groupIndex),
        _type: 'supplementalSymptomGroup',
        ...group,
      })),
    }
  }

  if (section.type === 'prose') {
    return {
      ...base,
      eyebrow: section.eyebrow,
      heading: section.heading,
      paragraphs: section.paragraphs,
    }
  }

  return {
    ...base,
    eyebrow: section.eyebrow,
    heading: section.heading,
    items: section.items,
  }
}

const dryRun = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2025-01-01'})

for (const [slug, data] of Object.entries(drugSupplementalContent)) {
  const drug = await client.fetch(
    '*[_type == "drug" && slug.current == $slug][0]{_id, name}',
    {slug},
  )

  if (!drug?._id) {
    console.warn(`No drug document found for slug "${slug}". Skipping.`)
    continue
  }

  const supplementalSections = data.sections.map(toSanitySection)

  if (dryRun) {
    console.log(
      `[dry-run] Would set ${supplementalSections.length} supplemental sections on ${drug.name} (${slug}).`,
    )
    continue
  }

  await client.patch(drug._id).set({supplementalSections}).commit()
  console.log(`Set ${supplementalSections.length} supplemental sections on ${drug.name} (${slug}).`)
}
