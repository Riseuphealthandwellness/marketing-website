import type { SupplementalData } from "./types";

export const conditionSupplementalContent: Record<string, SupplementalData> = {
  "alcohol-use-disorder": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "28.9M", label: "Americans with alcohol use disorder (SAMHSA, 2023)" },
          { value: "7.2%", label: "Who receive treatment in a given year" },
          { value: "95,000", label: "U.S. deaths attributable to excessive alcohol use annually" },
          { value: "~50%", label: "Reduction in heavy drinking days with naltrexone vs. placebo" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding AUD",
        heading: "What is alcohol use disorder?",
        paragraphs: [
          "Alcohol use disorder (AUD) is a chronic brain condition characterized by compulsive drinking, loss of control over how much you consume, and physical and emotional changes when you stop. It is not a failure of willpower or character — it reflects lasting changes in brain circuits that regulate motivation, reward, and self-control.",
          "The brain's dopamine reward system becomes dysregulated over time, creating powerful cravings that persist even when someone genuinely wants to stop drinking. The hypothalamic-pituitary-adrenal axis also shifts, producing heightened stress responses that make alcohol feel necessary just to feel normal.",
          "AUD affects people across every demographic. Genetic factors account for roughly 50% of the risk, and co-occurring mental health conditions — depression, anxiety, PTSD — are extremely common. In West Virginia, alcohol-related hospitalizations and deaths consistently rank among the highest in the nation.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing AUD",
        heading: "Signs and symptoms",
        description: "The DSM-5 defines AUD by 11 criteria. Two or more within a 12-month period indicates AUD, which ranges from mild (2–3) to severe (6 or more).",
        groups: [
          {
            heading: "Loss of control",
            items: [
              "Drinking more or for longer than you intended",
              "Persistent desire or multiple failed attempts to cut back",
              "Strong cravings or urges to drink",
              "Spending a lot of time getting alcohol, drinking, or recovering",
            ],
          },
          {
            heading: "Life impact",
            items: [
              "Failing to meet obligations at work, school, or home because of drinking",
              "Continuing to drink even though it causes relationship or social problems",
              "Giving up important activities or hobbies in favor of drinking",
              "Using alcohol in physically dangerous situations such as driving",
            ],
          },
          {
            heading: "Physical dependence",
            items: [
              "Needing more alcohol to get the same effect (tolerance)",
              "Experiencing withdrawal symptoms when stopping: tremors, sweating, anxiety, rapid heartbeat, nausea",
              "In severe cases: seizures during withdrawal — a medical emergency",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "At Rise Up, alcohol use disorder is treated the same way we treat any chronic medical condition — with evidence-based medications, close monitoring, and care that connects to your overall health.",
        steps: [
          {
            title: "Comprehensive initial evaluation",
            body: "Your provider reviews your drinking history, past quit attempts, current medications, and overall health. Lab work typically includes liver function tests, a complete metabolic panel, and a blood count.",
          },
          {
            title: "Withdrawal assessment and management",
            body: "If your body has become dependent on alcohol, stopping suddenly carries real medical risks — including seizures. Your provider uses the CIWA assessment to gauge withdrawal severity and prescribes appropriate medications if needed for a safer transition.",
          },
          {
            title: "Medication selection",
            body: "We discuss which FDA-approved medication fits your situation: naltrexone (oral daily or monthly Vivitrol injection) reduces cravings, acamprosate (Campral) eases the anxiety and restlessness that often drive relapse, and disulfiram (Antabuse) provides a strong deterrent for those who prefer a commitment-based approach.",
          },
          {
            title: "Integrated primary care monitoring",
            body: "Liver health, blood pressure, sleep, and nutrition are tracked alongside alcohol use at your regular visits. Problems are addressed as a whole, not in isolation.",
          },
          {
            title: "Ongoing follow-up and adjustment",
            body: "Follow-up visits are scheduled at a frequency that matches your situation — more often early in treatment, spacing out as you stabilize. Medications and plans are adjusted based on how you're doing.",
          },
        ],
      },
    ],
  },

  "opioid-use-disorder": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "4.8M", label: "Americans with opioid use disorder (SAMHSA NSDUH, 2024)" },
          { value: "78/100K", label: "WV drug overdose death rate — among the highest in the nation" },
          { value: "34% fewer", label: "Deaths in year 1 with buprenorphine-naloxone vs. no treatment (2024 study)" },
          { value: "<20%", label: "People with OUD who receive FDA-approved medication treatment" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding OUD",
        heading: "What is opioid use disorder?",
        paragraphs: [
          "Opioid use disorder (OUD) is a chronic medical condition defined by compulsive opioid use despite significant negative consequences, combined with physical dependence. It develops because opioids — whether prescription painkillers, heroin, or synthetic opioids like fentanyl — cause long-term changes in brain chemistry that make stopping extremely difficult without medical support.",
          "The same brain circuits that govern reward, motivation, and learning become rewired by repeated opioid exposure. The brain's natural opioid system downregulates, meaning the body becomes unable to function without the drug and goes into withdrawal when it's absent. This is physiology, not weakness.",
          "West Virginia has been among the hardest-hit states in the opioid epidemic for over a decade, with overdose death rates that have at times exceeded 50 deaths per 100,000 people annually. The majority of those deaths involve fentanyl, which is now present in most street opioids.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing OUD",
        heading: "Signs and symptoms",
        description: "OUD is diagnosed when two or more of the following occur within a 12-month period.",
        groups: [
          {
            heading: "Behavioral signs",
            items: [
              "Using opioids in larger amounts or for longer than intended",
              "Persistent desire or unsuccessful efforts to cut down",
              "Spending a great deal of time obtaining, using, or recovering from opioids",
              "Strong craving or urge to use",
              "Giving up important activities because of opioid use",
              "Continued use despite knowing it causes physical or psychological problems",
            ],
          },
          {
            heading: "Physical dependence",
            items: [
              "Tolerance — needing more to achieve the same effect, or diminished effect with the same amount",
              "Withdrawal symptoms when stopping: anxiety, muscle aches, sweating, nausea, vomiting, diarrhea, goosebumps, insomnia, intense craving",
              "Using opioids specifically to avoid or relieve withdrawal symptoms",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "Medications for opioid use disorder (MOUD) are the most effective treatment available. They reduce cravings, block withdrawal, and significantly lower overdose risk.",
        steps: [
          {
            title: "Initial assessment",
            body: "Your provider evaluates your opioid use history, current medications, mental health, and overall physical health. Lab work includes liver and kidney panels and infectious disease screening if indicated.",
          },
          {
            title: "Starting buprenorphine",
            body: "Most patients can begin buprenorphine at home. Your provider will give you clear instructions on timing your first dose — typically 12 to 24 hours after your last opioid use, once you're beginning to feel withdrawal. This prevents precipitated withdrawal.",
          },
          {
            title: "Dose stabilization",
            body: "Over the first two to four weeks, your dose is adjusted until cravings and withdrawal symptoms are well controlled. Follow-up contact is more frequent during this phase.",
          },
          {
            title: "Maintenance treatment",
            body: "Ongoing visits — initially every one to four weeks, then monthly as you stabilize — monitor your progress and overall health. MOUD is safe and effective for as long as it's needed; there is no required endpoint.",
          },
          {
            title: "Injectable options",
            body: "Once you're stable on a dose, you may prefer to switch to a monthly injectable formulation (Sublocade or Brixadi) to eliminate daily dosing and simplify your routine.",
          },
          {
            title: "Integrated primary care",
            body: "Blood pressure, liver function, mental health, and other conditions are monitored and managed by the same providers — not siloed in a separate office with no knowledge of your history.",
          },
        ],
      },
    ],
  },

  "nicotine-use-disorder": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "28.8M", label: "U.S. adults who currently smoke (CDC, 2022)" },
          { value: "~26%", label: "WV adult smoking rate — highest in the nation" },
          { value: "480,000", label: "U.S. deaths caused by tobacco use annually" },
          { value: "3×", label: "Improvement in quit rate with varenicline (Chantix) vs. placebo" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding nicotine dependence",
        heading: "What is nicotine use disorder?",
        paragraphs: [
          "Nicotine is one of the most addictive substances known. It reaches the brain within seconds of inhalation, triggering a rapid release of dopamine that creates a powerful cycle of reinforcement. Over time, the brain downregulates its nicotinic receptors, meaning it needs nicotine just to feel normal. Without it, withdrawal sets in quickly.",
          "Quitting cold turkey works for only about 5 to 7% of people in the long term — not because they lack willpower, but because they're fighting significant neurochemical dependence without the tools that close the gap. Medications change that dramatically: varenicline (Chantix) triples quit rates, bupropion doubles them, and combination nicotine replacement therapy adds further benefit.",
          "For primary care, tobacco cessation is one of the highest-impact interventions available. Tobacco use worsens cardiovascular disease, hypertension, respiratory illness, cancer risk, wound healing, and more. Helping a patient quit smoking often improves a dozen other health conditions at the same time.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing dependence",
        heading: "Signs of nicotine dependence",
        groups: [
          {
            heading: "Behavioral and psychological signs",
            items: [
              "Smoking or vaping within 30 minutes of waking — a strong indicator of physical dependence",
              "Difficulty going through a full day at work or in public without using",
              "Continuing to use despite knowing it's harming your health",
              "Multiple failed quit attempts",
              "Using tobacco to manage stress, anxiety, or boredom",
              "Continuing to smoke even when sick with a respiratory illness",
            ],
          },
          {
            heading: "Withdrawal symptoms when stopping",
            items: [
              "Intense cravings for nicotine",
              "Irritability, frustration, or anger",
              "Difficulty concentrating",
              "Anxiety and restlessness",
              "Depressed mood",
              "Increased appetite and weight gain",
              "Sleep disruption — difficulty falling or staying asleep",
            ],
          },
        ],
      },
      {
        type: "prose",
        eyebrow: "Why quitting matters",
        heading: "The health benefits of quitting — by timeline",
        paragraphs: [
          "Quitting tobacco is one of the few health changes where benefits appear within minutes and continue for years. Within 20 minutes of the last cigarette, heart rate begins to drop toward normal. Within 12 hours, carbon monoxide in the blood returns to normal. After 2 to 12 weeks, circulation improves and lung function begins to increase.",
          "After one year without smoking, the excess risk of heart disease is cut in half. After five years, stroke risk equals that of a non-smoker. After 10 years, lung cancer risk is roughly half that of a current smoker. After 15 years, the risk of heart disease is equivalent to someone who never smoked. This timeline applies regardless of how long or how heavily someone smoked — it's never too late for quitting to matter.",
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "Nicotine use disorder is treated as part of your regular primary care at Rise Up, not as a separate program requiring additional appointments.",
        steps: [
          {
            title: "Assessment of use and motivation",
            body: "Your provider reviews your smoking history, current level of use, previous quit attempts, and any barriers you've experienced. The Fagerström Test for Nicotine Dependence may be used to gauge physical dependence.",
          },
          {
            title: "Medication selection",
            body: "In most cases, varenicline (Chantix) is the first-line choice — it reduces cravings and blocks nicotine's reinforcing effects. If varenicline isn't appropriate, bupropion or nicotine replacement therapy (patch, gum, or lozenge) may be recommended, and combinations are often used together for higher success rates.",
          },
          {
            title: "Set a quit date",
            body: "With varenicline, you typically begin taking the medication one to two weeks before your quit date, giving it time to reach therapeutic levels. With bupropion, the lead time is one to two weeks as well. This structured lead-in dramatically improves outcomes.",
          },
          {
            title: "Support through withdrawal",
            body: "Follow-up contact in the first weeks addresses cravings, side effects, and any challenges. Your provider adjusts the plan if needed.",
          },
          {
            title: "Long-term follow-through",
            body: "If a slip occurs, it's addressed without judgment and treated as information to improve the approach — not a reason to stop treatment. Many people need more than one serious attempt before quitting permanently, and medication significantly improves the odds each time.",
          },
        ],
      },
    ],
  },

  "stimulant-use-disorder": {
    sections: [
      {
        type: "prose",
        eyebrow: "Understanding stimulant use disorder",
        heading: "What is stimulant use disorder?",
        paragraphs: [
          "Stimulant use disorder involves compulsive use of stimulant drugs — most commonly methamphetamine or cocaine — despite significant harm to health, relationships, and daily life. In West Virginia and across Appalachia, methamphetamine use has surged dramatically over the past decade, often in combination with fentanyl, creating one of the most dangerous drug combinations seen in modern overdose data.",
          "Stimulants work by flooding the brain's dopamine system — the primary driver of motivation, reward, and pleasure. Methamphetamine triggers a dopamine surge three to five times greater than cocaine and far longer-lasting. With repeated use, the brain's dopamine system becomes significantly depleted, leaving people unable to feel normal pleasure without the drug. This state, called anhedonia, is one of the most powerful drivers of continued use.",
          "Brain imaging studies show that the dopamine pathway damage caused by heavy methamphetamine use begins to recover after 12 or more months of abstinence — but this recovery takes time and is very difficult without support for the depression and dysphoria that characterize early sobriety.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing stimulant use disorder",
        heading: "Signs and symptoms",
        groups: [
          {
            heading: "During active use",
            items: [
              "Intense euphoria and surges of energy followed by a prolonged crash",
              "Dramatic weight loss and neglect of eating",
              "Extended periods without sleep",
              "Elevated heart rate and blood pressure — risks for heart attack and stroke",
              "Paranoia, suspicion, or hallucinations (particularly with heavy meth use)",
              "Repetitive behaviors — picking at skin, taking apart and reassembling objects",
              "Severe dental decay from dry mouth and teeth grinding ('meth mouth')",
            ],
          },
          {
            heading: "During withdrawal (the crash)",
            items: [
              "Extreme fatigue and sleeping for unusually long periods",
              "Profound depression and inability to feel pleasure",
              "Intense drug craving",
              "Increased appetite and rapid weight gain",
              "Irritability, anxiety, and agitation",
              "Difficulty concentrating or thinking clearly",
            ],
          },
        ],
      },
      {
        type: "prose",
        eyebrow: "Treatment approach",
        heading: "How stimulant use disorder is treated",
        paragraphs: [
          "Unlike opioid or alcohol use disorder, there are currently no FDA-approved medications specifically for stimulant use disorder. However, behavioral treatment approaches have strong evidence — particularly contingency management (CM), which uses structured positive incentives to reinforce drug-free behavior confirmed by urine testing. Multiple large clinical trials show CM significantly outperforms other approaches for this condition.",
          "Medications may still play an important role: treating co-occurring depression, anxiety, ADHD, or PTSD often significantly reduces stimulant use. Several medications including mirtazapine and N-acetylcysteine (NAC) are in active clinical trials. The medical consequences of stimulant use — cardiovascular stress, malnutrition, dental damage, sleep disruption — also require direct attention as part of a comprehensive treatment approach.",
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        steps: [
          {
            title: "Medical assessment",
            body: "Comprehensive evaluation including cardiovascular exam, blood pressure, lab work, nutritional status, and assessment of any infectious disease risks associated with IV use.",
          },
          {
            title: "Mental health evaluation",
            body: "Screening for depression, anxiety, PTSD, and ADHD — all of which frequently co-occur with stimulant use disorder and often require their own treatment. Addressing these conditions significantly improves outcomes.",
          },
          {
            title: "Medication for co-occurring conditions",
            body: "While no single medication is FDA-approved for stimulant use disorder itself, medications treating co-occurring depression, anxiety, or ADHD may be appropriate and can reduce the urge to use stimulants.",
          },
          {
            title: "Behavioral support coordination",
            body: "Your provider will help coordinate with behavioral health providers and programs that specialize in stimulant use. Contingency management programs, when available, offer the strongest evidence base.",
          },
          {
            title: "Ongoing monitoring and support",
            body: "Regular visits track your health recovery — mood, sleep, weight, cardiovascular status, and overall stability. Medical care continues throughout your recovery process.",
          },
        ],
      },
    ],
  },

  "benzodiazepine-dependence": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "4–6 wks", label: "Minimum time for physical dependence to develop with daily use" },
          { value: "30.6M", label: "U.S. adults who used benzodiazepines in a recent year (NIDA)" },
          { value: "Fatal risk", label: "Benzodiazepine withdrawal can cause life-threatening seizures" },
          { value: "Months–years", label: "Typical duration of a safe, medically supervised taper" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding benzodiazepine dependence",
        heading: "What is benzodiazepine dependence?",
        paragraphs: [
          "Benzodiazepines — including alprazolam (Xanax), clonazepam (Klonopin), diazepam (Valium), and lorazepam (Ativan) — are widely prescribed medications for anxiety, panic disorder, insomnia, and seizures. They work by enhancing GABA, an inhibitory neurotransmitter that calms the nervous system. They are effective for these conditions but carry a significant risk: physical dependence can develop with as few as four to six weeks of daily use, even at prescribed doses.",
          "When the brain adapts to the consistent presence of benzodiazepines, it suppresses its own GABA production and upregulates the excitatory glutamate system to compensate. When the medication is reduced or stopped suddenly, this compensation mechanism drives the nervous system into dangerous hyperactivity. This is why benzodiazepine withdrawal is one of only two drug withdrawal syndromes — along with alcohol — that can cause fatal seizures.",
          "Dependence often develops in people who were legitimately prescribed these medications for anxiety or sleep. It is not a sign of addiction or moral failure. It is a physiological adaptation that requires a careful, medically supervised approach to resolve safely.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing dependence",
        heading: "Signs of benzodiazepine dependence",
        groups: [
          {
            heading: "Signs of dependence",
            items: [
              "Needing to take the medication every day just to feel normal",
              "Experiencing anxiety, tremors, or sweating when a dose is missed or delayed",
              "Needing increasing doses to manage anxiety or sleep (tolerance)",
              "Strong discomfort or anxiety when thinking about reducing or stopping",
              "Continuing to use despite wanting to stop or being advised to by a provider",
              "Experiencing physical symptoms between doses: rapid heartbeat, trembling, hyperventilation",
            ],
          },
          {
            heading: "Withdrawal symptoms (mild to moderate)",
            items: [
              "Rebound anxiety — often worse than the original anxiety being treated",
              "Insomnia, often severe",
              "Tremors, shakiness, muscle twitching",
              "Sweating and heart pounding",
              "Headaches, nausea",
              "Difficulty concentrating, memory problems, brain fog",
            ],
          },
          {
            heading: "Severe withdrawal (medical emergency)",
            items: [
              "Seizures — can occur days after stopping a short-acting benzodiazepine",
              "Hallucinations — visual, auditory, or tactile",
              "Delirium and confusion",
              "Life-threatening cardiovascular instability",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "How we approach a safe taper",
        description: "Abrupt discontinuation of benzodiazepines is medically dangerous. The standard of care is a slow, individualized taper with close medical supervision.",
        steps: [
          {
            title: "Full evaluation",
            body: "Your provider reviews your current medication, dose, how long you've been taking it, any prior withdrawal history, and the underlying condition that led to benzodiazepine use.",
          },
          {
            title: "Converting to a longer-acting agent if needed",
            body: "If you're on a short-acting benzodiazepine like Xanax or Ativan, your provider may convert your dose to an equivalent amount of diazepam (Valium). Its longer half-life produces a smoother, more gradual decline and makes the taper more manageable.",
          },
          {
            title: "A slow, individualized reduction schedule",
            body: "Doses are reduced incrementally — typically 5 to 10 percent of the current dose every two to four weeks. The pace is always yours. If a reduction produces significant symptoms, we hold the current dose or slow the pace.",
          },
          {
            title: "Managing symptoms throughout",
            body: "Anxiety, sleep difficulties, and other withdrawal symptoms are actively managed. Non-benzodiazepine medications and other approaches may be used to make the process more tolerable.",
          },
          {
            title: "Treating the underlying condition",
            body: "The anxiety, panic, or insomnia that originally led to benzodiazepine use is addressed throughout the taper — not after you've stopped. You will not be left without support for these underlying needs.",
          },
          {
            title: "No pressure, no arbitrary timeline",
            body: "Tapering off benzodiazepines can take months to more than a year for long-term users at higher doses. We follow your pace and adjust based on how you're doing — not a fixed schedule.",
          },
        ],
      },
    ],
  },

  // ── Primary care conditions ──────────────────────────────────────────────

  "high-blood-pressure": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "120M", label: "Americans with hypertension — about 1 in 2 adults (AHA, 2023)" },
          { value: "1 in 3", label: "People with hypertension don't know they have it" },
          { value: "35–40%", label: "Reduction in stroke risk with controlled blood pressure" },
          { value: "Silent", label: "Hypertension causes no symptoms in most people until serious damage is done" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding hypertension",
        heading: "What is high blood pressure?",
        paragraphs: [
          "Blood pressure measures the force of blood pushing against the walls of your arteries with each heartbeat. It is recorded as two numbers: systolic (when the heart beats) over diastolic (when the heart rests between beats). Normal blood pressure is below 120/80 mmHg. Hypertension is defined as a consistent reading at or above 130/80 mmHg, with stage 2 hypertension above 140/90 mmHg.",
          "Primary — or essential — hypertension is the most common form, with no single identifiable cause. It develops over years through a combination of genetics, diet (particularly sodium), physical inactivity, obesity, stress, and aging. Secondary hypertension has a specific underlying cause: kidney disease, sleep apnea, thyroid disorders, or certain medications.",
          "Hypertension is called the silent killer for good reason — it damages arteries, the heart, kidneys, brain, and eyes for years before causing any symptoms. The only way to know your blood pressure is to measure it. In West Virginia, heart disease and stroke are among the leading causes of death, and uncontrolled hypertension is one of the most significant driving factors.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "What to watch for",
        heading: "Signs and symptoms",
        description: "Most people with high blood pressure have no symptoms whatsoever. This is why regular screening is essential. Symptoms are usually only present in severe or crisis-level hypertension.",
        groups: [
          {
            heading: "Severe hypertension symptoms",
            items: [
              "Severe headache — often described as the worst headache of one's life",
              "Shortness of breath",
              "Nosebleeds that are difficult to stop",
              "Chest pain or pressure",
              "Visual changes or blurred vision",
              "Dizziness or lightheadedness",
              "Blood in the urine",
            ],
          },
          {
            heading: "Long-term damage hypertension can cause",
            items: [
              "Heart attack and heart failure",
              "Stroke — hypertension is its leading preventable cause",
              "Chronic kidney disease",
              "Peripheral artery disease",
              "Aortic aneurysm",
              "Hypertensive retinopathy (damage to vision)",
              "Erectile dysfunction",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "Hypertension management is an ongoing part of primary care at Rise Up — not a one-time fix. Consistent monitoring and adjustments over time produce the best outcomes.",
        steps: [
          {
            title: "Accurate diagnosis",
            body: "Blood pressure is measured at every visit, and multiple readings over time are used to confirm a diagnosis. We screen for secondary causes if clinical signs suggest them.",
          },
          {
            title: "Cardiovascular risk assessment",
            body: "Blood pressure doesn't exist in isolation. Your provider calculates your overall cardiovascular risk, factoring in cholesterol, diabetes, smoking, age, and family history, to guide treatment targets.",
          },
          {
            title: "Lifestyle guidance",
            body: "Dietary sodium reduction, the DASH diet, aerobic exercise, weight loss, limiting alcohol, and smoking cessation each have meaningful, quantified effects on blood pressure. We provide specific, practical guidance.",
          },
          {
            title: "Medication management",
            body: "If lifestyle changes alone are insufficient, we prescribe from first-line medication classes — ACE inhibitors, ARBs, calcium channel blockers, and thiazide diuretics. Most patients with stage 2 hypertension will need two or more medications to reach target.",
          },
          {
            title: "Home monitoring",
            body: "We guide patients on how to monitor blood pressure at home correctly. Home readings are often more accurate than office readings and help us make better-informed decisions between visits.",
          },
          {
            title: "Regular follow-up",
            body: "Blood pressure, kidney function, and related conditions are monitored at regular intervals. When blood pressure is well controlled, we adjust the follow-up frequency accordingly.",
          },
        ],
      },
    ],
  },

  "type-2-diabetes": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "38.4M", label: "Americans have diabetes — 90–95% is type 2 (CDC, 2024)" },
          { value: "97.6M", label: "American adults have prediabetes — most don't know it" },
          { value: "Top 5", label: "WV's national ranking for adult diabetes prevalence" },
          { value: "50%", label: "Of diabetes complications are preventable with good blood sugar and blood pressure control" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding type 2 diabetes",
        heading: "What is type 2 diabetes?",
        paragraphs: [
          "Type 2 diabetes occurs when the body doesn't produce enough insulin, or the cells don't respond to insulin effectively — a condition called insulin resistance. Without insulin doing its job, glucose (sugar) builds up in the bloodstream rather than being used for energy. Over time, consistently elevated blood sugar damages blood vessels and nerves throughout the body.",
          "Risk factors include obesity (especially abdominal fat), physical inactivity, family history, age over 45, a history of gestational diabetes, and prediabetes. Type 2 diabetes is often preventable — intensive lifestyle changes, particularly modest weight loss, can prevent or delay progression from prediabetes to diabetes in a large proportion of people.",
          "Diabetes management is genuinely integrative. Blood sugar control directly affects blood pressure, kidney function, nerve health, eye health, foot health, and cardiovascular risk. At Rise Up, these are all tracked and managed by the same providers as part of a connected care plan.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing diabetes",
        heading: "Signs and symptoms",
        description: "Many people with type 2 diabetes have no symptoms, especially early in the disease. Symptoms often develop gradually.",
        groups: [
          {
            heading: "Classic symptoms",
            items: [
              "Increased thirst (polydipsia)",
              "Frequent urination, especially at night (polyuria)",
              "Fatigue and low energy",
              "Blurred vision",
              "Slow-healing cuts, bruises, or wounds",
              "Frequent infections — skin, bladder, or gum infections",
              "Tingling, numbness, or pain in hands or feet (early peripheral neuropathy)",
              "Unexplained weight loss (less common in type 2 than type 1)",
            ],
          },
          {
            heading: "What we monitor for complications",
            items: [
              "HbA1c (A1c) — average blood sugar over the past 3 months",
              "Kidney function: creatinine, eGFR, urine albumin",
              "Annual dilated eye exam for diabetic retinopathy",
              "Annual comprehensive foot exam for neuropathy and circulation",
              "Blood pressure and cholesterol — both critical cardiovascular risk factors",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "Diabetes management is one of the most comprehensive areas of primary care. At Rise Up, it is handled proactively — not just reactively when complications arise.",
        steps: [
          {
            title: "Diagnosis and baseline labs",
            body: "A fasting blood glucose, A1c, kidney function panel, cholesterol panel, and urine albumin give us a complete starting picture. We also assess blood pressure and other cardiovascular risk factors.",
          },
          {
            title: "Lifestyle counseling",
            body: "Nutrition guidance, physical activity recommendations, and weight management are first-line components of diabetes care. Even modest weight loss (5–10%) significantly improves blood sugar control in most patients.",
          },
          {
            title: "Medication management",
            body: "Metformin is the standard first-line medication. For patients who need additional control — or who have cardiovascular or kidney disease — GLP-1 receptor agonists (like Ozempic and Trulicity) and SGLT2 inhibitors (like Jardiance and Farxiga) offer powerful benefits beyond blood sugar reduction, including weight loss, heart protection, and kidney protection.",
          },
          {
            title: "Complication monitoring",
            body: "We order A1c every 3–6 months until blood sugar is controlled, then every 6 months. Kidney function, urine protein, and cholesterol are checked annually. We coordinate eye exam and foot exam referrals.",
          },
          {
            title: "Managing related conditions",
            body: "Blood pressure and cholesterol are managed with the same focus and rigor as blood sugar, because they drive most of the serious complications of diabetes — heart attack, stroke, and kidney failure.",
          },
          {
            title: "Education and self-management support",
            body: "We refer to diabetes educators and registered dietitians for patients who want deeper support. Understanding how food, activity, stress, and illness affect blood sugar empowers patients to manage their condition day to day.",
          },
        ],
      },
    ],
  },

  "high-cholesterol": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "93M", label: "U.S. adults have total cholesterol above 200 mg/dL (CDC)" },
          { value: "38%", label: "Of U.S. adults have high LDL cholesterol" },
          { value: "25–35%", label: "Reduction in heart attack risk with statin therapy" },
          { value: "No symptoms", label: "High cholesterol causes no symptoms — most people don't know they have it" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding cholesterol",
        heading: "What is high cholesterol?",
        paragraphs: [
          "Cholesterol is a waxy, fat-like substance produced by the liver and obtained from food. Not all cholesterol is harmful. LDL (low-density lipoprotein), often called bad cholesterol, builds up in artery walls over time, narrowing them and increasing the risk of heart attack and stroke. HDL (high-density lipoprotein), known as good cholesterol, helps carry excess cholesterol away from the arteries. Triglycerides are a third type of blood fat that, when elevated, also increase cardiovascular risk.",
          "High LDL cholesterol is primarily influenced by diet (saturated and trans fats), physical inactivity, obesity, and genetics. Familial hypercholesterolemia — a genetic condition causing very high LDL from birth — affects about 1 in 250 people and significantly elevates lifetime cardiovascular risk. Some medications, including steroids and certain blood pressure drugs, can also raise cholesterol levels.",
          "In West Virginia, heart disease is the leading cause of death. Uncontrolled high cholesterol is one of the most modifiable risk factors, and treating it is one of the best-evidenced interventions in all of preventive medicine.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "What to know",
        heading: "Signs and who is at risk",
        description: "High cholesterol causes no symptoms. The only way to know your levels is through a blood test.",
        groups: [
          {
            heading: "Risk factors for high cholesterol",
            items: [
              "Diet high in saturated fats (red meat, full-fat dairy) and trans fats (fried foods, processed snacks)",
              "Physical inactivity",
              "Obesity — particularly abdominal fat",
              "Smoking (lowers HDL)",
              "Age — risk increases with age as the liver becomes less efficient at removing LDL",
              "Family history — especially first-degree relatives with early heart disease",
              "Diabetes and insulin resistance",
              "Hypothyroidism (untreated thyroid disease raises LDL)",
            ],
          },
          {
            heading: "Rare visible signs of very high cholesterol",
            items: [
              "Xanthomas — yellowish fatty deposits under the skin, especially on tendons or around the knees and elbows",
              "Xanthelasmas — yellowish deposits on or around the eyelids",
              "Corneal arcus — a white or gray ring around the iris of the eye, particularly significant if appearing before age 45",
              "These signs suggest familial hypercholesterolemia and warrant prompt evaluation",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        steps: [
          {
            title: "Lipid panel blood test",
            body: "A fasting lipid panel measures total cholesterol, LDL, HDL, and triglycerides. This is included in routine preventive care and is the foundation for treatment decisions.",
          },
          {
            title: "Cardiovascular risk calculation",
            body: "Your provider calculates your 10-year cardiovascular risk using the ASCVD risk score, which incorporates cholesterol, blood pressure, diabetes, smoking, age, and sex. Risk guides treatment intensity.",
          },
          {
            title: "Lifestyle guidance",
            body: "The DASH or Mediterranean diet (emphasizing fruits, vegetables, whole grains, and healthy fats), regular aerobic exercise, and weight loss each reduce LDL meaningfully. We provide specific, actionable guidance.",
          },
          {
            title: "Medication when indicated",
            body: "Statins — the first-line medication class — reduce LDL by 30–50% and have robust evidence reducing heart attacks and strokes. For patients who cannot tolerate statins, or who need additional LDL reduction, ezetimibe and other agents are available.",
          },
          {
            title: "Follow-up lipid testing",
            body: "A repeat lipid panel 4–12 weeks after starting or changing medication confirms the treatment is working. Once controlled, annual monitoring is typical.",
          },
          {
            title: "Integrated primary care",
            body: "Cholesterol is managed alongside blood pressure, blood sugar, and other cardiovascular risk factors — since these all interact and collectively determine your heart disease risk.",
          },
        ],
      },
    ],
  },

  "hepatitis-c": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "#1", label: "WV has the highest Hepatitis C diagnosis rate in the United States (CDC)" },
          { value: ">95%", label: "Cure rate with modern direct-acting antiviral medications — in 8–12 weeks" },
          { value: "2.4M", label: "Americans currently living with chronic Hepatitis C" },
          { value: "Leading", label: "Hepatitis C is the leading infectious disease cause of liver transplant in the U.S." },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding Hepatitis C",
        heading: "What is Hepatitis C?",
        paragraphs: [
          "Hepatitis C is a viral infection caused by the Hepatitis C virus (HCV) that attacks the liver and, if left untreated, can cause progressive liver damage over years or decades. HCV is transmitted primarily through blood-to-blood contact — most commonly through sharing needles, syringes, or other injection drug equipment. It can also be passed through sexual contact (less common), contaminated medical equipment, tattoo or piercing instruments that haven't been properly sterilized, or from a mother to her baby at birth.",
          "About 75–85% of people exposed to HCV develop chronic infection. For decades, chronic Hepatitis C causes inflammation and, over time, scarring of the liver (fibrosis and cirrhosis). Cirrhosis can lead to liver failure and hepatocellular carcinoma — liver cancer. The progression is slow and largely silent, which is why so many people don't know they have it.",
          "The landscape of Hepatitis C treatment was transformed by the development of direct-acting antivirals (DAAs) beginning around 2013. These oral medications cure Hepatitis C in over 95% of patients, typically with minimal side effects, in just 8–12 weeks. At Rise Up, we screen, diagnose, and treat Hepatitis C directly in primary care — no referral to a specialist required for most patients.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing hepatitis C",
        heading: "Signs, symptoms, and who should be tested",
        description: "Chronic Hepatitis C is often asymptomatic for 20–30 years. Most people are diagnosed through screening, not symptoms.",
        groups: [
          {
            heading: "Symptoms (when present)",
            items: [
              "Fatigue — often the first and most persistent symptom",
              "Right upper abdominal discomfort or pain",
              "Nausea and poor appetite",
              "Jaundice — yellowing of the skin or whites of the eyes (indicates significant liver damage)",
              "Dark urine and pale-colored stools",
              "Easy bruising and bleeding",
              "Swelling in the legs (edema) or abdomen (ascites) — signs of advanced cirrhosis",
            ],
          },
          {
            heading: "Who should be screened",
            items: [
              "Everyone born between 1945 and 1965 — this generation has the highest prevalence of HCV",
              "Anyone who has ever injected drugs, even once — decades ago counts",
              "People who received blood transfusions or organ transplants before 1992",
              "Anyone with HIV",
              "People with unexplained elevated liver enzymes",
              "Children born to HCV-positive mothers",
              "Anyone in WV with a history of substance use — HCV rates here are among the highest in the nation",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "Hepatitis C can be cured. At Rise Up, we handle the entire process from initial screening through cure confirmation — all in one practice.",
        steps: [
          {
            title: "HCV antibody screening",
            body: "A simple blood test checks for HCV antibodies. A positive antibody test means past or present infection; a follow-up RNA test confirms active infection.",
          },
          {
            title: "Viral load and genotype testing",
            body: "An HCV RNA viral load confirms active infection and establishes a baseline. Genotyping — identifying which of the six HCV strains you have — was historically important for treatment selection, though newer pan-genotypic regimens work across all types.",
          },
          {
            title: "Liver health assessment",
            body: "A FIB-4 score (calculated from routine lab values) or FibroScan (non-invasive liver stiffness test) evaluates the degree of liver scarring, which influences treatment urgency and monitoring.",
          },
          {
            title: "Direct-acting antiviral treatment",
            body: "Your provider prescribes an 8–12 week course of oral direct-acting antivirals. Common regimens include Harvoni, Epclusa, or Mavyret — all highly effective and generally well tolerated.",
          },
          {
            title: "Cure confirmation",
            body: "An HCV RNA test drawn 12 weeks after completing treatment (SVR12) confirms cure. An undetectable viral load at that point means the virus is gone.",
          },
          {
            title: "Ongoing liver health monitoring",
            body: "Patients with advanced fibrosis or cirrhosis continue to have regular liver ultrasounds and alpha-fetoprotein testing to screen for liver cancer, even after cure. Patients without cirrhosis who are cured require no ongoing HCV-specific monitoring.",
          },
        ],
      },
    ],
  },

  "hiv-and-prep": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "1.2M", label: "Americans living with HIV (CDC, 2022)" },
          { value: ">99%", label: "Effectiveness of PrEP at preventing HIV when taken as directed" },
          { value: "U=U", label: "Undetectable = Untransmittable — people on effective HIV treatment cannot sexually transmit the virus" },
          { value: "WV rising", label: "HIV rates in West Virginia have increased in recent years, driven primarily by injection drug use" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding HIV and prevention",
        heading: "HIV, PrEP, and care for people living with HIV",
        paragraphs: [
          "HIV (Human Immunodeficiency Virus) attacks the immune system, specifically CD4+ T cells — the cells that coordinate the body's defense against infection. Without treatment, HIV progressively weakens the immune system over years, eventually leading to AIDS (Acquired Immunodeficiency Syndrome), a state of severe immune compromise. With modern antiretroviral therapy (ART), people living with HIV can have near-normal life expectancy and, when virally suppressed, cannot transmit the virus sexually (Undetectable = Untransmittable, or U=U).",
          "PrEP (Pre-Exposure Prophylaxis) is medication taken by HIV-negative people to prevent HIV infection. Daily oral PrEP — Truvada or Descovy — is more than 99% effective at preventing HIV through sexual contact and highly effective for preventing transmission through injection drug use. A long-acting injectable PrEP option (Apretude, given every two months) is also available for people who prefer not to take a daily pill.",
          "West Virginia's HIV epidemic is closely tied to injection drug use. Outbreaks have occurred in communities across the state, disproportionately affecting people who inject drugs and their sexual partners. At Rise Up, HIV testing, PrEP initiation, and care coordination for people living with HIV are all part of routine primary care — offered in a confidential, stigma-free environment.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing HIV infection",
        heading: "Signs, symptoms, and who should consider PrEP",
        groups: [
          {
            heading: "Symptoms of acute (primary) HIV infection",
            items: [
              "Flu-like illness 2–4 weeks after exposure: fever, swollen lymph nodes, sore throat, rash, muscle aches",
              "These symptoms usually last 1–3 weeks and are sometimes called 'acute retroviral syndrome'",
              "After the acute phase, HIV typically causes no symptoms for years",
              "The only way to confirm HIV infection is through testing — symptoms are non-specific and overlap with many common illnesses",
            ],
          },
          {
            heading: "Who should consider PrEP",
            items: [
              "People who inject drugs and share needles or equipment",
              "Sexual partners of people living with HIV",
              "People who have multiple sex partners, especially without consistent condom use",
              "Anyone who has had a bacterial STI (chlamydia, gonorrhea, syphilis) in the past 6 months",
              "People who have used post-exposure prophylaxis (PEP) more than once",
              "Anyone who asks for it — PrEP is available to any adult or adolescent at risk for HIV",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect",
        steps: [
          {
            title: "Confidential HIV testing",
            body: "HIV screening is a standard part of primary care at Rise Up, offered at every new patient visit and annually for patients at ongoing risk. Fourth-generation antigen/antibody tests detect HIV earlier than older tests.",
          },
          {
            title: "PrEP evaluation",
            body: "Before starting PrEP, your provider confirms you are HIV-negative, reviews your kidney function (PrEP medications are processed by the kidneys), and screens for active Hepatitis B infection and other STIs.",
          },
          {
            title: "PrEP prescription",
            body: "Your provider prescribes the appropriate PrEP regimen — daily oral Truvada or Descovy for most patients, or Apretude (long-acting injectable) for those who prefer every-two-month injections. PrEP is covered by most insurance plans and the manufacturer patient assistance programs.",
          },
          {
            title: "Quarterly PrEP follow-up",
            body: "PrEP requires follow-up every three months: HIV testing (to confirm you are still HIV-negative), kidney function, and STI screening. These visits are built into your regular care schedule.",
          },
          {
            title: "Care coordination for people living with HIV",
            body: "For patients already living with HIV, Rise Up coordinates with infectious disease specialists to integrate HIV management — antiretroviral therapy, CD4 count, viral load monitoring — with your other primary care needs. Co-occurring OUD and HIV are managed together.",
          },
        ],
      },
    ],
  },

  "asthma-and-copd": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "25M", label: "Americans have asthma (CDC)" },
          { value: "16M", label: "U.S. adults diagnosed with COPD — millions more undiagnosed" },
          { value: "Top 5", label: "WV's national ranking for COPD prevalence — driven by high smoking rates and occupational exposures" },
          { value: "Preventable", label: "Most COPD cases are preventable — and most progression is controllable with treatment" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding asthma and COPD",
        heading: "Two different conditions, both treatable",
        paragraphs: [
          "Asthma and COPD are both chronic respiratory conditions that cause obstruction of airflow, but they are distinct diseases. Asthma is characterized by reversible airway inflammation and bronchoconstriction triggered by allergens, exercise, cold air, respiratory infections, or irritants. It often begins in childhood and can range from mild and intermittent to severe and persistent. With proper management, most people with asthma can live without significant day-to-day limitation.",
          "COPD (Chronic Obstructive Pulmonary Disease) encompasses emphysema and chronic bronchitis. It is caused primarily by cigarette smoking — about 85–90% of cases — but also by occupational dust and chemical exposure, indoor air pollution, and genetic factors (alpha-1 antitrypsin deficiency). Unlike asthma, COPD airflow obstruction is largely irreversible and slowly progressive. It is currently the fourth leading cause of death in the United States.",
          "West Virginia's high rates of both smoking and coal industry employment contribute to exceptionally high COPD prevalence. The state also has high asthma rates, partly related to air quality and the high prevalence of tobacco use. Rise Up manages both conditions as part of ongoing primary care, with a particular focus on preventing exacerbations (sudden worsening episodes that often require emergency care), which are both dangerous and avoidable.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing these conditions",
        heading: "Signs and symptoms",
        groups: [
          {
            heading: "Asthma symptoms",
            items: [
              "Wheezing — a whistling or squeaky sound when breathing",
              "Shortness of breath, especially with activity",
              "Chest tightness or pressure",
              "Coughing, often worse at night or early morning",
              "Symptoms triggered by allergens (dust, pollen, pets), cold air, exercise, smoke, or respiratory infections",
              "Episodes can range from mild to life-threatening (asthma attack)",
            ],
          },
          {
            heading: "COPD symptoms",
            items: [
              "Chronic productive cough — often present for years before diagnosis",
              "Increasing shortness of breath, first with exertion then at rest",
              "Wheezing and chest tightness",
              "Frequent respiratory infections",
              "Fatigue and reduced exercise tolerance",
              "Unintentional weight loss in advanced stages",
              "Cyanosis — blue-tinged lips or fingertips (severe cases)",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        steps: [
          {
            title: "Spirometry and lung function testing",
            body: "Spirometry is the gold-standard test for diagnosing and staging both asthma and COPD. It measures how much air you can exhale and how fast. This guides diagnosis and treatment intensity.",
          },
          {
            title: "Inhaler and medication management",
            body: "Bronchodilators (short-acting for rescue, long-acting for daily control) and inhaled corticosteroids are the mainstays of both asthma and COPD treatment. We review technique, simplify regimens, and adjust medications based on how controlled your condition is.",
          },
          {
            title: "Smoking cessation support",
            body: "Quitting smoking is the single most important intervention for COPD — it slows disease progression significantly. For asthma patients who smoke, cessation also meaningfully improves control. Rise Up provides medication-assisted cessation as part of the same care plan.",
          },
          {
            title: "Vaccinations",
            body: "Annual influenza vaccine and pneumococcal vaccines are critical for patients with COPD or asthma — respiratory infections are the leading cause of COPD exacerbations and can be severe in asthma. We keep all vaccinations current.",
          },
          {
            title: "Exacerbation management",
            body: "We develop an action plan with every patient so you know what to do if symptoms worsen. We provide access to urgent consultations and coordinate with pulmonology for complex cases or severe COPD.",
          },
          {
            title: "Pulmonary rehabilitation referral",
            body: "For moderate to severe COPD, pulmonary rehabilitation — structured exercise and education — significantly improves function, reduces hospitalizations, and improves quality of life. We facilitate referrals when appropriate.",
          },
        ],
      },
    ],
  },

  "thyroid-disorders": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "20M", label: "Americans have some form of thyroid disease (American Thyroid Association)" },
          { value: "60%", label: "Of people with thyroid disease don't know they have it" },
          { value: "5-8×", label: "More common in women than in men" },
          { value: "Treatable", label: "Hypothyroidism is highly treatable with daily levothyroxine — one of the most commonly prescribed medications in the US" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding thyroid disorders",
        heading: "What are thyroid disorders?",
        paragraphs: [
          "The thyroid gland — a small, butterfly-shaped gland in the front of the neck — produces hormones (T3 and T4) that regulate virtually every metabolic process in the body: heart rate, body temperature, energy use, mood, digestion, and more. When the thyroid produces too little hormone (hypothyroidism), these processes slow down. When it produces too much (hyperthyroidism), they speed up.",
          "Primary hypothyroidism, the most common thyroid disorder, is most often caused by Hashimoto's thyroiditis — an autoimmune condition in which the immune system attacks the thyroid. It affects up to 10% of adults, particularly women. Because its symptoms — fatigue, weight gain, depression, cold intolerance — are nonspecific and develop gradually, it is frequently attributed to aging or other causes and goes undiagnosed for years.",
          "Hyperthyroidism is less common and is most often caused by Graves' disease, another autoimmune condition, or by thyroid nodules that produce excess hormone. Thyroid nodules themselves are extremely common — detectable by ultrasound in up to 60% of adults — and the vast majority are benign, though evaluation is important.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing thyroid disorders",
        heading: "Signs and symptoms",
        groups: [
          {
            heading: "Hypothyroidism (underactive thyroid)",
            items: [
              "Persistent fatigue and sluggishness despite adequate sleep",
              "Unexplained weight gain",
              "Increased sensitivity to cold",
              "Constipation",
              "Dry skin and brittle nails",
              "Puffy face, especially around the eyes",
              "Hoarse voice",
              "Muscle weakness, aches, stiffness, and joint pain",
              "Depression and slowed thinking or memory",
              "Elevated cholesterol (hypothyroidism raises LDL)",
              "Heavy or irregular menstrual periods",
              "Hair loss or thinning",
            ],
          },
          {
            heading: "Hyperthyroidism (overactive thyroid)",
            items: [
              "Unintentional weight loss despite increased appetite",
              "Rapid heartbeat (tachycardia) or palpitations",
              "Increased sensitivity to heat and excessive sweating",
              "Nervousness, anxiety, and irritability",
              "Tremors — usually fine trembling in the hands",
              "More frequent bowel movements or diarrhea",
              "Fatigue and muscle weakness",
              "Difficulty sleeping",
              "Enlarged thyroid gland (goiter) visible in the neck",
              "Changes in menstrual cycles",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        steps: [
          {
            title: "TSH screening",
            body: "Thyroid-stimulating hormone (TSH) is the first-line blood test for thyroid function. An elevated TSH suggests hypothyroidism; a suppressed TSH suggests hyperthyroidism. This test is included in routine preventive care.",
          },
          {
            title: "Confirmatory testing",
            body: "If TSH is abnormal, free T4 (and free T3 in some cases) are checked to confirm and quantify the dysfunction. Thyroid peroxidase (TPO) antibodies confirm autoimmune Hashimoto's disease.",
          },
          {
            title: "Thyroid nodule evaluation",
            body: "Thyroid nodules found on physical exam or incidentally on imaging are evaluated with thyroid ultrasound. Size, characteristics, and clinical risk factors determine whether fine-needle aspiration biopsy is needed.",
          },
          {
            title: "Hypothyroidism treatment",
            body: "Levothyroxine, a synthetic form of T4, is the standard treatment. Dose is individualized and adjusted based on follow-up TSH testing every 6–8 weeks initially, then annually once stable. Symptoms typically begin improving within a few weeks.",
          },
          {
            title: "Hyperthyroidism management",
            body: "Mild or subclinical hyperthyroidism may be monitored closely. More significant cases are managed with antithyroid medications, radioactive iodine, or surgery — usually in coordination with an endocrinologist.",
          },
          {
            title: "Long-term monitoring",
            body: "Thyroid function requires periodic monitoring once treatment is established. Changes in weight, other medications, and life events (pregnancy, menopause) can affect thyroid hormone needs, and we adjust accordingly.",
          },
        ],
      },
    ],
  },

  "preventive-care-and-wellness-visits": {
    sections: [
      {
        type: "prose",
        eyebrow: "Why preventive care matters",
        heading: "Staying healthy before problems start",
        paragraphs: [
          "Preventive care is the foundation of good primary care. Its goal is to identify health risks and conditions before they cause symptoms or become serious — when they are far easier to treat. Annual wellness visits at Rise Up go beyond a routine physical: they are a comprehensive review of your current health, a conversation about your risks, and a coordinated plan for the screenings, immunizations, and lifestyle support that make the most difference for you specifically.",
          "The evidence for preventive care is compelling. Blood pressure screenings catch hypertension before it causes a heart attack or stroke. Colorectal cancer screening finds polyps before they become cancer. Cervical cancer screening with Pap smears and HPV testing has dramatically reduced cervical cancer deaths. Lipid testing identifies people at high cardiovascular risk who benefit most from treatment. These interventions save lives — and West Virginia, with high rates of preventable disease, stands to benefit enormously from high screening rates.",
          "Rise Up integrates preventive care into every primary care visit. We use USPSTF evidence-based recommendations to ensure you are receiving the right screenings at the right intervals for your age, sex, and personal risk factors.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "What preventive care covers",
        heading: "What we screen for and when",
        groups: [
          {
            heading: "Chronic disease screening",
            items: [
              "Blood pressure — at every visit; annually if normal",
              "Cholesterol (lipid panel) — starting at 35 for men, 45 for women, earlier if risk factors present",
              "Blood sugar / diabetes screening (A1c or fasting glucose) — adults 35–70 who are overweight",
              "Thyroid function — when symptoms suggest it",
              "Kidney function and urinalysis — for patients with hypertension, diabetes, or other risk factors",
            ],
          },
          {
            heading: "Cancer screenings",
            items: [
              "Colorectal cancer — colonoscopy every 10 years starting at 45, or annual stool-based testing",
              "Cervical cancer — Pap smear + HPV co-test every 5 years for ages 21–65",
              "Breast cancer mammography — starting at 40; annually if at average risk",
              "Lung cancer CT screening — annually for high-risk smokers ages 50–80",
              "Skin cancer screening — for patients with high-risk sun exposure history",
            ],
          },
          {
            heading: "Immunizations (adult)",
            items: [
              "Influenza — annually",
              "COVID-19 — as recommended by current CDC guidance",
              "Tdap (tetanus, diphtheria, pertussis) — every 10 years",
              "Shingles (Shingrix) — two doses for adults 50+",
              "Pneumococcal vaccine — adults 65+; younger adults with high-risk conditions",
              "Hepatitis A and B — for unvaccinated adults or those at risk",
              "HPV vaccine — through age 26; shared decision-making 27–45",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect at your wellness visit",
        steps: [
          {
            title: "Comprehensive health review",
            body: "Your provider reviews your medical history, current medications, family history, and any symptoms or concerns you've noticed. This is the time to raise anything you've been wondering about.",
          },
          {
            title: "Physical examination",
            body: "A head-to-toe physical examination including vital signs, weight and BMI, cardiovascular and lung exam, abdominal exam, skin assessment, and any indicated area based on symptoms or risk factors.",
          },
          {
            title: "Lab work and screenings",
            body: "Based on your age, sex, and risk factors, your provider orders the appropriate labs and connects you to the preventive screenings most likely to benefit you.",
          },
          {
            title: "Immunization review",
            body: "We review your vaccination history and bring any recommended vaccines up to date at the visit or schedule them.",
          },
          {
            title: "Chronic condition review",
            body: "If you have ongoing conditions — diabetes, hypertension, thyroid disease, asthma — the annual visit ensures all the monitoring and medication management for each is coordinated and up to date.",
          },
          {
            title: "Personalized health goals",
            body: "We close the visit with a conversation about one or two specific, achievable health goals. Whether it's improving diet, increasing activity, quitting tobacco, or improving sleep — we help you build a realistic plan.",
          },
        ],
      },
    ],
  },

  "metabolic-syndrome": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "35%", label: "U.S. adults meet the criteria for metabolic syndrome (AHA, 2023)" },
          { value: "5×", label: "Greater risk of type 2 diabetes with metabolic syndrome vs. without" },
          { value: "2×", label: "Greater risk of heart disease and stroke with metabolic syndrome" },
          { value: "Reversible", label: "Lifestyle change and targeted treatment can normalize all five components" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding metabolic syndrome",
        heading: "What is metabolic syndrome?",
        paragraphs: [
          "Metabolic syndrome is not a single disease but a cluster of five interconnected metabolic abnormalities that together dramatically raise the risk of type 2 diabetes, cardiovascular disease, stroke, and non-alcoholic fatty liver disease. The five components are: elevated waist circumference (excess abdominal fat), elevated blood pressure, elevated fasting blood sugar, elevated triglycerides, and low HDL ('good') cholesterol. Meeting three or more of the five criteria constitutes the diagnosis.",
          "The underlying driver of metabolic syndrome is insulin resistance — the body's cells stop responding efficiently to insulin, causing the pancreas to produce more and more of it to compensate. Over time, this compensatory capacity is overwhelmed and blood glucose rises. Visceral fat — the fat packed around the organs in the abdomen, not the subcutaneous fat under the skin — is metabolically active and contributes significantly to systemic inflammation and insulin resistance.",
          "Metabolic syndrome is closely linked to lifestyle factors including physical inactivity, a diet high in refined carbohydrates and saturated fat, poor sleep, and chronic stress — all of which are addressable. At Rise Up, we assess and treat all five components together, rather than managing each risk factor in isolation.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing metabolic syndrome",
        heading: "The five diagnostic criteria",
        description: "Metabolic syndrome is defined by the presence of three or more of the following five criteria (National Cholesterol Education Program ATP III / AHA/NHLBI guidelines).",
        groups: [
          {
            heading: "The five components",
            items: [
              "Abdominal obesity — waist circumference ≥40 inches in men, ≥35 inches in women",
              "Elevated blood pressure — ≥130/85 mmHg, or currently taking antihypertensive medication",
              "Elevated fasting blood glucose — ≥100 mg/dL, or currently taking glucose-lowering medication",
              "Elevated triglycerides — ≥150 mg/dL, or currently taking triglyceride-lowering medication",
              "Low HDL cholesterol — <40 mg/dL in men, <50 mg/dL in women",
            ],
          },
          {
            heading: "Associated health risks",
            items: [
              "Non-alcoholic fatty liver disease (NAFLD) and its progressive form, NASH",
              "Obstructive sleep apnea — strongly associated with insulin resistance",
              "Polycystic ovary syndrome (PCOS) in women",
              "Chronic kidney disease",
              "Elevated uric acid and gout",
              "Increased cardiovascular event risk even in the absence of traditional risk factor thresholds",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from treatment",
        description: "Metabolic syndrome requires a coordinated approach targeting all five components simultaneously. At Rise Up, that coordination is built in — your providers see the full picture.",
        steps: [
          {
            title: "Comprehensive metabolic evaluation",
            body: "Lab work includes a fasting lipid panel, fasting glucose, HbA1c, liver enzymes, kidney function, and uric acid. Vital signs and waist circumference are measured at every visit. This baseline identifies which of the five components are present and how far outside range they are.",
          },
          {
            title: "Nutrition and lifestyle counseling",
            body: "A Mediterranean-pattern or low-glycemic diet is consistently supported by evidence for reducing all five components of metabolic syndrome. Your provider discusses specific changes — reducing refined carbohydrates and added sugars, increasing fiber, healthy fat sources, and sustainable caloric patterns.",
          },
          {
            title: "Physical activity prescription",
            body: "150 minutes of moderate-intensity aerobic activity per week, combined with resistance training two days per week, is the evidence-based recommendation. Your provider helps build a realistic starting point and a progression plan.",
          },
          {
            title: "Targeted pharmacotherapy",
            body: "Depending on which components are out of range and by how much, your provider may prescribe blood pressure medication, a statin, a glucose-lowering agent, or a GLP-1 receptor agonist — medications that address multiple components simultaneously.",
          },
          {
            title: "Ongoing monitoring and adjustment",
            body: "Lab work is repeated at 3–6 month intervals to track progress across all components. Treatment intensity is adjusted based on results rather than waiting until a condition crosses an arbitrary threshold.",
          },
        ],
      },
    ],
  },

  "glp-1-medications": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "15–22%", label: "Average body weight reduction with semaglutide in clinical trials (STEP trials, NEJM)" },
          { value: "20%", label: "Reduction in major cardiovascular events with semaglutide (SELECT trial, 2023)" },
          { value: "10–15%", label: "Average weight loss with liraglutide (SCALE trial)" },
          { value: "~22%", label: "Average weight loss with tirzepatide vs. 2.4% placebo (SURMOUNT-1, NEJM 2022)" },
        ],
      },
      {
        type: "prose",
        eyebrow: "About GLP-1 medications",
        heading: "What are GLP-1 receptor agonists?",
        paragraphs: [
          "GLP-1 receptor agonists are a class of medications that mimic glucagon-like peptide-1 (GLP-1), a hormone naturally produced in the gut after eating. GLP-1 plays a central role in regulating blood sugar, appetite, and digestion. By activating GLP-1 receptors throughout the body — in the brain's appetite centers, the pancreas, the stomach, and the cardiovascular system — these medications reduce hunger, slow gastric emptying, improve blood sugar regulation, and produce significant and durable weight loss.",
          "Originally developed for type 2 diabetes management (liraglutide in 2010, semaglutide in 2017), GLP-1 receptor agonists have since received separate FDA approvals for chronic weight management at higher doses: liraglutide as Saxenda, semaglutide as Wegovy, and tirzepatide (a dual GLP-1/GIP agonist) as Zepbound. The weight loss produced by these medications is among the largest achieved by any non-surgical intervention, and emerging evidence suggests cardiovascular, renal, and potentially liver benefits beyond weight alone.",
          "At Rise Up, GLP-1 medications are prescribed as part of a comprehensive weight management program — paired with nutritional guidance and monitoring. These medications work best when prescribed in the context of a practice that understands metabolic health, manages comorbidities, and provides ongoing follow-up.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Who benefits most",
        heading: "Appropriate candidates and considerations",
        description: "GLP-1 medications are FDA-approved for specific indications and evaluated individually based on your health history and goals.",
        groups: [
          {
            heading: "Approved weight management indications",
            items: [
              "BMI ≥30 kg/m² (obesity) — any comorbidities or not",
              "BMI ≥27 kg/m² (overweight) with at least one weight-related comorbidity: type 2 diabetes, high blood pressure, high cholesterol, sleep apnea, or cardiovascular disease",
              "Type 2 diabetes management — several GLP-1 agents are approved primarily for blood sugar control with weight loss as a benefit",
              "Cardiovascular risk reduction — semaglutide (Wegovy) has an approved cardiovascular indication based on the SELECT trial",
            ],
          },
          {
            heading: "Important considerations and contraindications",
            items: [
              "Personal or family history of medullary thyroid carcinoma or MEN2 syndrome — contraindicated",
              "History of pancreatitis — requires careful evaluation before prescribing",
              "Pregnancy or planning pregnancy — not recommended; adequate contraception required",
              "Gastrointestinal side effects (nausea, vomiting, diarrhea, constipation) — most common, typically transient with gradual dose titration",
              "Injection site reactions with subcutaneous formulations",
              "Not a substitute for addressing underlying eating behaviors — counseling improves outcomes",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Getting started at Rise Up",
        heading: "What to expect when starting a GLP-1 medication",
        description: "Starting a GLP-1 medication involves careful evaluation, gradual titration, and ongoing monitoring to maximize benefit and minimize side effects.",
        steps: [
          {
            title: "Eligibility evaluation",
            body: "Your provider reviews your BMI, existing conditions, current medications, and health goals. Lab work typically includes metabolic panel, HbA1c, lipid panel, and thyroid function if indicated.",
          },
          {
            title: "Medication selection",
            body: "There are several GLP-1 and dual GIP/GLP-1 options, each with different dosing schedules, approved indications, and insurance coverage profiles. Your provider discusses the best fit based on your clinical picture and insurance situation.",
          },
          {
            title: "Gradual dose titration",
            body: "All GLP-1 medications are started at a low dose and increased slowly over several weeks or months. This controlled titration is the primary strategy for minimizing gastrointestinal side effects.",
          },
          {
            title: "Nutritional guidance",
            body: "These medications reduce appetite significantly — making it important to prioritize protein and nutrient density within a reduced caloric intake. Your provider discusses dietary patterns that work with, not against, the medication's effects.",
          },
          {
            title: "Monitoring and follow-up",
            body: "Weight, blood pressure, blood glucose, and tolerability are assessed at each follow-up visit. For patients with diabetes, glucose-lowering medications may need to be adjusted as blood sugar improves. Kidney function and heart rate are monitored over time.",
          },
          {
            title: "Long-term maintenance planning",
            body: "GLP-1 medications require ongoing use to maintain weight loss — research shows weight regain after discontinuation is common. Your provider discusses realistic long-term expectations and strategies for maintaining results.",
          },
        ],
      },
    ],
  },

  "diabetes-prevention": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "96M", label: "American adults with prediabetes — 80% don't know they have it (CDC, 2024)" },
          { value: "58%", label: "Reduction in type 2 diabetes risk with lifestyle intervention (Diabetes Prevention Program)" },
          { value: "71%", label: "Risk reduction for adults over 60 with lifestyle change (DPP research group)" },
          { value: "~70%", label: "People with prediabetes who will develop type 2 diabetes without intervention" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding prediabetes",
        heading: "What is diabetes prevention?",
        paragraphs: [
          "Prediabetes is a state in which blood sugar levels are elevated above normal but not yet high enough for a type 2 diabetes diagnosis. It represents a window of opportunity — a period when intervention can reverse the trajectory and prevent or significantly delay type 2 diabetes. Prediabetes is defined by a fasting blood glucose of 100–125 mg/dL, a 2-hour glucose of 140–199 mg/dL on an oral glucose tolerance test, or an HbA1c of 5.7–6.4%.",
          "The landmark Diabetes Prevention Program (DPP), a large-scale randomized controlled trial sponsored by the NIH, demonstrated that a structured lifestyle intervention (modest weight loss of 5–7% of body weight and 150 minutes of moderate physical activity per week) reduced the development of type 2 diabetes by 58% overall and by 71% in adults over 60. This effect was more powerful than treatment with metformin (31% reduction), which is also used as a prevention strategy for high-risk individuals.",
          "At Rise Up, diabetes prevention is integrated into primary care — we screen for prediabetes routinely, discuss your risk, and partner with you on a plan that's grounded in evidence and adapted to your life. Preventing type 2 diabetes avoids decades of cardiovascular risk, neuropathy, kidney disease, vision loss, and the substantial burden of daily disease management.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing your risk",
        heading: "Prediabetes risk factors and screening",
        description: "Prediabetes usually has no symptoms — it is identified through blood tests. These risk factors guide who should be screened.",
        groups: [
          {
            heading: "Primary risk factors",
            items: [
              "BMI ≥25 kg/m² (or ≥23 kg/m² in Asian Americans)",
              "Age 45 or older — risk increases significantly with age",
              "First-degree relative with type 2 diabetes — genetic risk is substantial",
              "History of gestational diabetes or delivery of a baby over 9 pounds",
              "Physical inactivity — sedentary lifestyle is a major modifiable risk",
              "Polycystic ovary syndrome (PCOS)",
            ],
          },
          {
            heading: "Metabolic and cardiovascular risk factors",
            items: [
              "High blood pressure (≥130/80 mmHg)",
              "Low HDL cholesterol (<35 mg/dL in men, <50 mg/dL in women)",
              "Elevated triglycerides (≥250 mg/dL)",
              "Metabolic syndrome — three or more of the five components",
              "History of cardiovascular disease",
              "Certain medications — corticosteroids, antipsychotics, statins — can raise blood glucose",
              "Obstructive sleep apnea",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from diabetes prevention care",
        description: "Diabetes prevention is not about perfection — it is about targeted, sustainable change. A 5–7% reduction in body weight is the most impactful single intervention.",
        steps: [
          {
            title: "Screening and baseline assessment",
            body: "A fasting glucose or HbA1c test identifies where you are on the spectrum. If prediabetes is confirmed, we establish a baseline with a full metabolic panel, lipid panel, and blood pressure measurement.",
          },
          {
            title: "Risk stratification",
            body: "Your provider calculates your specific 10-year risk of progression to type 2 diabetes using your labs, BMI, family history, and other factors. This helps prioritize the intensity of intervention.",
          },
          {
            title: "Nutrition counseling",
            body: "Reducing refined carbohydrates, added sugars, and ultra-processed foods while increasing fiber, vegetables, legumes, and lean protein has a measurable effect on fasting glucose and insulin sensitivity. Your provider discusses realistic, evidence-based dietary changes.",
          },
          {
            title: "Physical activity plan",
            body: "150 minutes per week of moderate-intensity activity is the DPP-validated target. Even starting with 10–15 minutes daily and progressing from there produces meaningful improvement in insulin sensitivity.",
          },
          {
            title: "Metformin (when indicated)",
            body: "For patients who cannot achieve lifestyle targets or who are at very high risk (HbA1c near 6.4%, strong family history, obesity), metformin is an effective, safe, and low-cost medication that reduces diabetes risk by 31% in the DPP. Your provider discusses whether this is appropriate for your situation.",
          },
          {
            title: "Annual rescreening",
            body: "HbA1c or fasting glucose is repeated annually to track progress. We celebrate improvement and adjust the plan if things aren't moving in the right direction.",
          },
        ],
      },
    ],
  },

  "medically-supervised-weight-loss": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "5–10%", label: "Weight reduction associated with clinically significant improvement in blood pressure, blood sugar, and cholesterol" },
          { value: "3×", label: "Better long-term outcomes with medical supervision vs. self-directed dieting alone" },
          { value: "58%", label: "Reduction in type 2 diabetes risk with medically supervised lifestyle change (DPP)" },
          { value: "40M+", label: "Americans attempting to lose weight in any given year — most without medical guidance" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Medical weight management",
        heading: "What is medically supervised weight loss?",
        paragraphs: [
          "Medically supervised weight loss is a structured approach to weight management that combines medical evaluation, personalized treatment planning, evidence-based nutrition guidance, behavioral counseling, and — when clinically indicated — pharmacotherapy. It is distinct from commercial diet programs in that it starts with a full medical assessment, addresses the health conditions that may be driving or complicating weight gain, and monitors safety and effectiveness through regular clinical follow-up.",
          "Obesity is now recognized as a chronic medical condition driven by a complex interaction of genetic, hormonal, environmental, psychological, and metabolic factors. The body has powerful homeostatic mechanisms that resist weight loss — including hormonal changes that increase hunger and reduce metabolic rate after caloric restriction. This is not a lack of willpower; it is physiology. Medical supervision is particularly valuable because it accounts for these mechanisms and provides evidence-based tools — including medications — to work with them.",
          "At Rise Up, medically supervised weight management is integrated with the treatment of weight-related conditions including hypertension, type 2 diabetes, prediabetes, sleep apnea, fatty liver disease, and dyslipidemia. Managing weight and its comorbidities together produces better outcomes than addressing each in a separate silo.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Who benefits",
        heading: "When medical supervision matters most",
        description: "Medically supervised weight management is appropriate for a wide range of patients — not only those with severe obesity.",
        groups: [
          {
            heading: "Indications for medical oversight",
            items: [
              "BMI ≥30 (obesity) — any class",
              "BMI ≥27 with a weight-related comorbidity: hypertension, type 2 diabetes, prediabetes, sleep apnea, dyslipidemia, fatty liver, or cardiovascular disease",
              "Multiple previous unsuccessful attempts at self-directed weight loss",
              "Rapid unexplained weight gain (warrants evaluation for secondary causes)",
              "Weight contributing to joint pain, mobility limitations, or quality-of-life impairment",
              "Consideration of bariatric surgery — medical supervision is required and improves surgical outcomes",
            ],
          },
          {
            heading: "Conditions a medical evaluation can identify",
            items: [
              "Hypothyroidism — an underactive thyroid slows metabolism and contributes to weight gain",
              "Polycystic ovary syndrome (PCOS) — hormonal disorder that promotes fat storage and insulin resistance",
              "Cushing's syndrome — excess cortisol from adrenal or pituitary pathology causes central weight gain",
              "Insulin resistance and prediabetes — may be driving hunger and fat storage",
              "Medication-related weight gain — antipsychotics, corticosteroids, certain antidepressants, and others",
              "Sleep apnea — disrupts the hormones that regulate hunger and satiety",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect",
        description: "Medically supervised weight loss at Rise Up is individualized — your plan is built around your health history, your goals, and the factors most likely to help you succeed.",
        steps: [
          {
            title: "Comprehensive baseline evaluation",
            body: "Your provider takes a thorough medical history, measures height, weight, waist circumference, blood pressure, and BMI, and reviews your medications. Lab work screens for thyroid dysfunction, insulin resistance, metabolic abnormalities, and other contributors to weight gain.",
          },
          {
            title: "Goal setting and expectations",
            body: "We discuss realistic, health-focused goals. A 5–10% reduction in starting weight produces clinically meaningful improvements in blood sugar, blood pressure, cholesterol, and joint burden — often more meaningful than achieving a specific target weight.",
          },
          {
            title: "Nutrition guidance",
            body: "Your provider discusses evidence-based dietary approaches appropriate for your conditions and preferences — a consistent calorie reduction, a lower-glycemic approach, or a Mediterranean-style pattern. We emphasize sustainable change over restrictive short-term protocols.",
          },
          {
            title: "Physical activity integration",
            body: "Even modest increases in physical activity improve metabolic health independently of weight loss. Your provider builds a realistic activity prescription starting from where you are now.",
          },
          {
            title: "Pharmacotherapy evaluation",
            body: "For patients who are appropriate candidates, FDA-approved weight loss medications — including GLP-1 receptor agonists, phentermine/topiramate, bupropion/naltrexone, or others — are discussed. These are tools, not shortcuts, and work best when combined with lifestyle change.",
          },
          {
            title: "Regular monitoring and adjustment",
            body: "Weight, labs, blood pressure, and relevant comorbidity markers are assessed at each follow-up visit. The plan evolves based on your progress and response.",
          },
        ],
      },
    ],
  },

  "obesity": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "41.9%", label: "U.S. adults with obesity (CDC NHANES, 2017–2020)" },
          { value: "#2", label: "WV obesity rate — 40.6% of adults, second highest in the nation (CDC 2023)" },
          { value: "4 in 10", label: "Americans with obesity also have cardiovascular disease, the leading cause of death" },
          { value: "200+", label: "Health conditions with a causal or contributing relationship to obesity (NEJM 2017)" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding obesity",
        heading: "Obesity as a chronic medical condition",
        paragraphs: [
          "Obesity is a chronic, complex medical condition defined by excess body fat that impairs health. It is diagnosed by a BMI of 30 or above (class 1: 30–34.9, class 2: 35–39.9, class 3: ≥40), with waist circumference used as a supplemental measure of visceral fat burden. Obesity is not a personal failure or a matter of insufficient effort — it is driven by a multifactorial interaction of genetics, hormones, sleep, stress, environment, and the physiology of energy homeostasis.",
          "The brain's hypothalamus acts as a master regulator of body weight, integrating signals from hormones including leptin, insulin, ghrelin, GLP-1, and peptide YY to calibrate hunger and energy expenditure. In obesity, this system becomes dysregulated: leptin resistance develops, the hunger-promoting hormone ghrelin rises, and calorie restriction triggers compensatory increases in appetite and decreases in metabolic rate that make sustained weight loss physiologically difficult without support.",
          "West Virginia has one of the highest obesity rates in the country — a result of combined factors including economic stress, food access challenges in rural areas, a historic culture of physically demanding but now-declining industrial work, and limited access to evidence-based treatment. At Rise Up, we treat obesity the same way we treat hypertension or type 2 diabetes: as a medical condition that deserves serious, evidence-based, ongoing care without stigma.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Health impact of obesity",
        heading: "Conditions associated with obesity",
        description: "Obesity is not just a weight number — it is a root cause and amplifier of numerous serious health conditions across every organ system.",
        groups: [
          {
            heading: "Cardiovascular and metabolic",
            items: [
              "Type 2 diabetes — obesity is responsible for 80–85% of type 2 diabetes risk",
              "Hypertension — excess adipose tissue increases systemic vascular resistance",
              "Dyslipidemia — elevated triglycerides, low HDL, and small dense LDL particles",
              "Coronary artery disease and heart failure",
              "Atrial fibrillation — strongly linked to obesity",
              "Non-alcoholic fatty liver disease (NAFLD) progressing to NASH and cirrhosis",
            ],
          },
          {
            heading: "Structural and other systems",
            items: [
              "Obstructive sleep apnea — obesity is the primary risk factor",
              "Osteoarthritis — especially of the knee and hip",
              "Gastroesophageal reflux disease (GERD)",
              "Chronic kidney disease — obesity accelerates progression",
              "Certain cancers — including breast, colon, uterine, kidney, and esophageal cancers",
              "Polycystic ovary syndrome (PCOS) and infertility",
              "Depression and anxiety — a bidirectional relationship with significant quality-of-life impact",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect from obesity treatment",
        description: "Effective obesity care requires addressing the whole person — not just the number on the scale. At Rise Up, treatment is evidence-based, non-stigmatizing, and integrated with the management of your other health conditions.",
        steps: [
          {
            title: "Medical evaluation",
            body: "A thorough initial evaluation includes height, weight, waist circumference, blood pressure, BMI classification, and a targeted review of weight-related comorbidities. Lab work screens for thyroid function, metabolic abnormalities, blood glucose, liver enzymes, kidney function, and lipids.",
          },
          {
            title: "Goal framing",
            body: "Before discussing intervention, your provider discusses what 'success' looks like for you — which is not always a specific weight. A 5–10% reduction in starting weight produces measurable clinical benefit: lower blood pressure, improved blood sugar, reduced joint load, better sleep. Framing goals around health outcomes, not a target weight, improves adherence and outcomes.",
          },
          {
            title: "Nutrition and behavior counseling",
            body: "Evidence-based dietary approaches — including a moderate caloric deficit, reduced ultra-processed foods, increased protein and fiber — are discussed in the context of your current diet, preferences, and life circumstances. We address the psychological and behavioral dimensions of eating alongside the nutritional ones.",
          },
          {
            title: "Physical activity prescription",
            body: "150–300 minutes of moderate aerobic activity per week plus resistance training are the evidence-based targets. Your provider builds an individualized starting point, accounting for musculoskeletal limitations, fitness level, and preferences.",
          },
          {
            title: "Pharmacotherapy",
            body: "For appropriate patients, FDA-approved weight management medications are offered as a tool that works with lifestyle change. GLP-1 and GLP-1/GIP receptor agonists (semaglutide, tirzepatide) currently produce the largest evidence-based weight loss outside of surgery. Your provider reviews which options are appropriate given your conditions, medication history, and insurance coverage.",
          },
          {
            title: "Long-term management",
            body: "Obesity is a chronic condition requiring long-term management, not a one-time intervention. Your care plan includes regular follow-up, annual labs, and adjustment of pharmacotherapy as needed. We coordinate with the management of comorbidities so that as weight improves, medications for related conditions can be appropriately adjusted.",
          },
        ],
      },
    ],
  },

  "sexually-transmitted-infections": {
    sections: [
      {
        type: "stats",
        items: [
          { value: "1 in 5", label: "Americans have an STI at any given time (CDC, 2021)" },
          { value: "+300%", label: "Increase in syphilis cases in WV from 2016 to 2021" },
          { value: "Asymptomatic", label: "Most STIs cause no symptoms — the only way to know is testing" },
          { value: "Treatable", label: "The most common bacterial STIs are cured with a single dose or short course of antibiotics" },
        ],
      },
      {
        type: "prose",
        eyebrow: "Understanding STIs",
        heading: "Sexually transmitted infections in West Virginia",
        paragraphs: [
          "Sexually transmitted infections (STIs) are infections passed primarily through sexual contact — including vaginal, anal, and oral sex. The most common bacterial STIs are chlamydia, gonorrhea, and syphilis. Viral STIs include HIV, herpes simplex virus (HSV), human papillomavirus (HPV), and Hepatitis B. Many STIs can also be transmitted through shared injection drug equipment, which makes their management especially relevant at a practice serving patients with substance use histories.",
          "West Virginia has seen dramatic increases in bacterial STI rates over the past decade. Syphilis, which had been largely controlled nationally, has re-emerged sharply — including congenital syphilis (passed from mother to baby), which can cause serious birth defects or death. Gonorrhea, particularly antibiotic-resistant strains, is also increasing. These trends make routine screening essential for all sexually active patients.",
          "The vast majority of STIs are either curable (bacterial STIs) or manageable with treatment (viral STIs). Early detection protects both individual health and prevents further transmission. At Rise Up, STI screening is offered as part of routine primary care — confidentiality is standard, and there is no judgment.",
        ],
      },
      {
        type: "symptoms",
        eyebrow: "Recognizing STIs",
        heading: "Symptoms and when to test",
        description: "Most STIs cause no symptoms, which is why routine screening is more important than waiting for symptoms.",
        groups: [
          {
            heading: "Symptoms that may indicate an STI",
            items: [
              "Unusual discharge from the penis, vagina, or rectum",
              "Sores, ulcers, or blisters on or around the genitals, anus, or mouth",
              "A rash — particularly a non-itchy rash on the palms or soles (a classic sign of secondary syphilis)",
              "Burning, stinging, or pain during urination",
              "Pain or burning during sex",
              "Pelvic pain or pressure in women",
              "Testicular pain, swelling, or tenderness in men",
              "Swollen lymph nodes in the groin",
              "Anal pain, discharge, or bleeding",
            ],
          },
          {
            heading: "Who should be screened routinely",
            items: [
              "All sexually active adults annually — especially those with new or multiple partners",
              "All pregnant women — for chlamydia, gonorrhea, syphilis, HIV, and Hepatitis B",
              "People who have ever injected drugs — for HIV, Hepatitis B, and Hepatitis C",
              "Men who have sex with men — more frequent screening at 3–6 month intervals",
              "Anyone who has had an STI before — significantly elevated risk of reinfection",
              "Anyone whose partner has been diagnosed with an STI",
            ],
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Your care at Rise Up",
        heading: "What to expect",
        steps: [
          {
            title: "Confidential risk assessment",
            body: "Your provider asks about your sexual health history in a private, non-judgmental setting. This helps determine which tests are most relevant for you.",
          },
          {
            title: "Testing panel",
            body: "Based on your history and risk factors, your provider orders appropriate tests — which may include urine or swab samples for chlamydia/gonorrhea, blood tests for syphilis, HIV, and Hepatitis B and C, and other targeted tests.",
          },
          {
            title: "Treatment of positive results",
            body: "Bacterial STIs (chlamydia, gonorrhea, syphilis) are treated with antibiotics, often a single dose or short course. Your provider explains the treatment plan and any sexual activity restrictions during treatment.",
          },
          {
            title: "Test of cure",
            body: "Gonorrhea and chlamydia require re-testing 3 months after treatment to check for reinfection — not just cure confirmation. This is a routine part of the follow-up plan.",
          },
          {
            title: "Partner notification support",
            body: "Your provider discusses partner notification — informing recent sexual partners that they may need testing. We can help with anonymous partner notification resources if needed.",
          },
          {
            title: "PrEP and prevention",
            body: "If your testing reveals HIV risk factors, we discuss PrEP (HIV prevention medication) and other prevention strategies — including consistent condom use and harm reduction for people who use drugs.",
          },
        ],
      },
    ],
  },
};
