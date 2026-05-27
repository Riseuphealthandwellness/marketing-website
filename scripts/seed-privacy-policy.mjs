/**
 * Seeds the Privacy Policy body content for website-page-privacy-policy.
 * Adapted from MedExpress privacy policy for Rise Up Health & Wellness.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-privacy-policy.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error("Set SANITY_WRITE_TOKEN before running."); process.exit(1); }

// ─── Block builders ───────────────────────────────────────────────────────────

let k = 0;
const key = () => `pp${String(++k).padStart(4, "0")}`;

const p = (text) => ({
  _type: "block", _key: key(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const h2 = (text) => ({
  _type: "block", _key: key(), style: "h2", markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const h3 = (text) => ({
  _type: "block", _key: key(), style: "h3", markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const li = (text) => ({
  _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

// Paragraph with an inline link. segments: array of { text, href? }
const pLink = (segments) => {
  const markDefs = [];
  const children = segments.map(({ text, href }) => {
    if (href) {
      const linkKey = key();
      markDefs.push({ _type: "link", _key: linkKey, href });
      return { _type: "span", _key: key(), text, marks: [linkKey] };
    }
    return { _type: "span", _key: key(), text, marks: [] };
  });
  return { _type: "block", _key: key(), style: "normal", markDefs, children };
};

// ─── Body content ─────────────────────────────────────────────────────────────

const body = [

  // ── HIPAA Notice ────────────────────────────────────────────────────────────
  h2("HIPAA Notice of Privacy Practices"),
  pLink([
    { text: "Rise Up Health & Wellness is committed to protecting your health and medical information. To learn about your privacy rights and our practices under the Health Insurance Portability and Accountability Act (HIPAA), please review our " },
    { text: "Notice of Privacy Practices", href: "/patients-rights-privacy/notice-privacy-practices" },
    { text: "." },
  ]),

  // ── Website Privacy Policy ──────────────────────────────────────────────────
  h2("Website Privacy Policy"),

  h3("Introduction"),
  p("We recognize that the privacy of your personal information is important. The purpose of this policy is to let you know how we handle the information collected through the use of this website."),
  p("Portions of this website may describe privacy practices applicable to specific types of information or to information provided on specific web pages. This policy does not apply to information collected through other means, such as by telephone or in person, although that information may be protected by other privacy policies."),
  p("As used in this policy, terms such as \"we,\" \"our,\" and \"Company\" refer to Rise Up Health & Wellness and its current and future affiliated entities operating in West Virginia."),
  p("This website is intended for a United States audience. Any information you provide, including any personal information, will be transferred to and processed by a computer server located within the United States."),

  h3("Cookies and Tracking"),
  p("Rise Up Health & Wellness uses various technologies, which may include \"cookie\" technology, to gather information from our website visitors, such as pages visited and how often they are visited, and to enable certain features on this website."),
  p("\"Cookies\" are small text files that may be placed on your computer when you visit a website or click on a URL. Cookies may include \"single-session cookies\" which generally record information during only a single visit to a website and then are erased, and \"persistent\" cookies, which are generally stored on a computer unless or until they are deleted or are set to expire."),
  p("You may disable cookies and similar items by adjusting your browser preferences at any time; however, this may limit your ability to take advantage of all the features on this website."),
  p("Note that we do not currently respond to web browser \"Do Not Track\" signals that provide a method to opt out of the collection of information about online activities over time and across third-party websites or online services."),
  p("We may also allow third-party service providers to use cookies and other technologies to collect information and to track browsing activity over time and across third-party websites. We do not control these third-party technologies and their use is governed by the privacy policies of those third parties."),
  p("We may use analytics tools to gather information and aggregate data from our website visitors, such as which pages are visited and how often. We may use and disclose your activity information unless restricted by this policy or by law. Some examples of the ways we use your activity information include:"),
  li("Customizing your experience on the website, including managing and recording your preferences."),
  li("Marketing, product development and research purposes."),
  li("Tracking resources and data accessed on the website and visitor location."),
  li("Developing reports regarding website usage, activity and statistics."),
  li("Assisting users experiencing website problems."),
  li("Enabling certain functions and tools on this website."),
  li("Tracking paths of visitors to this website and within this website."),

  h3("Your Personal Information"),
  p("This website may include web pages that give you the opportunity to provide us with personal information about yourself. You do not have to provide us with personal information if you do not want to; however, that may limit your ability to use certain functions of this website or to request certain services or information."),
  p("We may use personal information for a number of purposes, such as:"),
  li("To respond to an email or particular request from you."),
  li("To personalize the website for you."),
  li("To process an application as requested by you."),
  li("To administer surveys and promotions."),
  li("To provide you with information that we believe may be useful to you, such as information about health products or services provided by us or other businesses."),
  li("To perform analytics and to improve our products, websites and advertising."),
  li("To comply with applicable laws, regulations and legal processes."),
  li("To protect someone's health, safety or welfare."),
  li("To protect our rights or take appropriate legal action, such as to enforce our Terms of Use."),
  li("To keep a record of our transactions and communications."),
  li("As otherwise necessary or useful for us to conduct our business, so long as such use is permitted by law."),
  p("We may use personal information to contact you through any contact information you provide through this website, including any email address, telephone number, cell phone number, text message number or fax number."),
  p("We may also share personal information within the Company, and we may combine personal information that you provide us through this website with other information we have received from you, whether online or offline, or from other sources."),

  h3("Sharing Personal Information"),
  p("We will only share your personal information with third parties as outlined in this policy and as otherwise permitted by law."),
  p("We may share personal information if all or part of the Company is sold, merged, dissolved, acquired or in a similar transaction."),
  p("We may share personal information in response to a court order, subpoena, search warrant, law or regulation. We may cooperate with law enforcement authorities in investigating and prosecuting activities that are illegal, violate our rules, or may be harmful to other visitors."),
  p("We may also share personal information with other third-party companies that we collaborate with or hire to perform services on our behalf. For example, we may hire a company to help us send and manage email, and we might provide the company with your email address and certain other information in order for them to send you an email message on our behalf. Similarly, we may hire companies to host or operate some of our websites and related computers and software applications."),

  h3("Website and Information Security"),
  p("We maintain reasonable administrative, technical and physical safeguards designed to protect the information that you provide on this website."),
  p("However, no security system is impenetrable and we cannot guarantee the security of our website, nor can we guarantee that the information you supply will not be intercepted while being transmitted to us over the Internet, and we are not liable for the illegal acts of third parties, such as criminal hackers."),

  h3("Our Online Communication Practices"),
  p("We may send electronic newsletters, notification of account status, and other communications, such as marketing communications, on a periodic basis to various individuals and organizations. We may also send email communications regarding topics such as general health benefits, website updates, health conditions and general health topics."),
  p("We offer you appropriate consent mechanisms, such as opt-out, for marketing and certain other communications. You may opt-out as provided for in a specific email communication or by contacting us as described below."),
  p("Please be aware that opt-outs may not apply to certain types of communications, such as account status, website updates or other communications."),

  h3("Information for Children Under 13"),
  p("We will not intentionally collect any personal information from children under the age of 13 through this website without receiving parental consent. If you think that we have collected personal information from a child under the age of 13 through this website, please contact us."),

  h3("Contact Us"),
  p("To contact us regarding this policy and our related privacy practices, please email us at contact@riseupwv.com. If you believe we or any company associated with us has misused any of your information, please contact us immediately and report such misuse."),

  h3("Effective Date"),
  p("The effective date of this policy is January 1, 2025."),

  h3("Changes to This Website Privacy Policy"),
  p("We may change this policy. If we do so, such change will appear on this page of our website. We will also provide appropriate notice and choices to you, on this website and in other appropriate locations, based on the scope and extent of changes. You may always visit this policy to learn of any updates."),

  // ── Your Rights Regarding Your PHI ─────────────────────────────────────────
  h2("Your Rights Regarding Your Health Information"),

  h3("Deceased Individuals"),
  p("Rise Up Health & Wellness may disclose a decedent's protected health information (PHI) related to a recent illness and care to family members and others who were involved in the care or payment for the decedent prior to death, unless doing so is inconsistent with any prior expressed preference of the individual that is known to us."),

  h3("Your Authorizations"),
  p("Other uses or disclosures of your PHI will be made only with your written authorization, unless otherwise permitted or required by law. For example, in most cases, we will obtain your authorization before we use or disclose psychotherapy notes related to you. We will never sell your PHI unless you have authorized us to do so."),
  p("If you authorize Rise Up Health & Wellness to use or disclose PHI about you, you may revoke that permission in writing at any time and we will no longer use or disclose PHI about you for the reasons covered by your authorization."),
  p("Please understand that we are unable to take back any uses or disclosures we have already made with your permission and that we are required to retain our records of the medical treatment or other services we have provided to you."),

  // ── SSN Protection ──────────────────────────────────────────────────────────
  h2("Social Security Number Protection"),
  p("Protecting personal information is important to Rise Up Health & Wellness. It is our policy to protect the confidentiality of Social Security numbers (SSNs) that we receive or collect in the course of business."),
  p("We secure the confidentiality of SSNs through various means, including physical, technical and administrative safeguards that are designed to protect against unauthorized access. It is our policy to limit access to SSNs to that which is lawful, and to prohibit unlawful disclosure of SSNs."),
];

// ─── Write to Sanity ──────────────────────────────────────────────────────────

const mutation = {
  createOrReplace: {
    _id: "website-page-privacy-policy",
    _type: "websitePage",
    key: "privacy-policy",
    path: "/patients-rights-privacy/privacy-policy",
    pageType: "legal",
    status: "published",
    title: "Privacy Policy",
    seo: { _type: "seoFields", noIndex: false },
    body,
  },
};

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: [mutation] }),
  },
);

const json = await res.json();
if (!res.ok) { console.error("Seed failed:", JSON.stringify(json, null, 2)); process.exit(1); }

console.log(`✓ Seeded privacy policy with ${body.length} blocks`);
console.log(JSON.stringify(json, null, 2));
