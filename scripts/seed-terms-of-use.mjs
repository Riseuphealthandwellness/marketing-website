/**
 * Seeds the Terms of Use body content for website-page-terms-of-use.
 * Adapted from MedExpress Terms of Use for Rise Up Health & Wellness.
 * Removes MSO/Optum corporate structure sections not applicable to Rise Up.
 * Governing law updated to West Virginia.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-terms-of-use.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error("Set SANITY_WRITE_TOKEN before running."); process.exit(1); }

// ─── Block builders ───────────────────────────────────────────────────────────

let k = 0;
const key = () => `tou${String(++k).padStart(4, "0")}`;

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

// ─── Body content ─────────────────────────────────────────────────────────────

const body = [

  // ── Important note regarding website content ──────────────────────────────
  h2("Important Note Regarding Website Content"),
  p("The information and content (collectively, \"Content\") on this website is for your general educational information only. The Content cannot, and is not intended to, replace the relationship that you have with your health care professionals."),
  p("The Content on this website should not be considered medical advice and is not intended as medical advice. If you are experiencing a medical emergency, you should not rely on any information on this website and should seek appropriate emergency medical assistance, such as calling 911."),
  p("You should always talk to your health care professionals for diagnosis and treatment, including information regarding which drugs or treatment may be appropriate for you."),
  p("None of the Content on this website represents or warrants that any particular drug or treatment is safe, appropriate or effective for you. Health information changes quickly. Therefore, you should always confirm information with your health care professionals."),
  p("This website is intended for a United States audience. If you live outside the U.S., you may see information on this website about products or therapies that are not available or authorized in your country."),
  p("The Content may include information regarding therapeutic and generic alternatives for certain prescription drugs, and may describe uses for products or therapies that have not been approved by the Food and Drug Administration. This Content is for informational purposes only. It is not medical advice and does not replace consultation with a doctor, pharmacist or other health care professional. Talk to your health care provider to determine if an alternative prescription drug is right for you."),

  // ── Agreement and terms ───────────────────────────────────────────────────
  h2("Agreement and Terms"),
  p("These website Terms of Use (\"Terms\") describe the rules for using this website. These Terms constitute a legally binding agreement between you, the person using this website, and Rise Up Health & Wellness and its current and future affiliated entities operating in West Virginia (collectively, \"Rise Up\" or \"Company\")."),
  p("If you are helping another person use this website, these Terms constitute a legally binding agreement between both the helper and the person being helped and Rise Up."),
  p("By using this website, you agree to the most-recent Terms as well as the most-recent version of our Privacy Policy. We may change these Terms at any time, and such changes will be posted on this or a similar page of this website. It is your responsibility to review these Terms each time you use this website. By continuing to use this website, you consent to any changes to our Terms."),
  p("By using this website, you acknowledge and agree that any activity on this website is subject to monitoring by the Company at any time, and that the Company may use the results of such monitoring without limitation, subject to applicable law."),
  p("If you enter into any other agreement with the Company, then these Terms are in addition to the terms of such other agreement. Neither entering into this agreement, nor visiting this website, nor any of these Terms, guarantees that you are eligible to receive any specific services through this website or otherwise."),

  // ── License and content ownership ────────────────────────────────────────
  h2("License to Use This Website and Content Ownership"),
  p("Subject to these Terms, Rise Up grants you a personal, nontransferable, nonexclusive, revocable, limited license to view the Content on the website for the sole purpose of collecting information regarding our practices and related activities."),
  p("You may also print a reasonable number of copies of the Content for your personal use, but in such case you must reproduce all proprietary copyright and trademark notices."),
  p("All rights, title and interest in and to the website, including the Content, and all intellectual property rights, including all copyright, trademark, patent and trade secret rights therein shall remain with Rise Up and our licensors and vendors. No ownership interest is transferred to you or any other entity by virtue of making the Content available on the website, granting the foregoing licenses or entering into this Agreement."),
  p("In the event you choose to provide us with any feedback, suggestions, or similar communications, all such messages (collectively, \"Feedback Messages\") will be considered non-personal, non-confidential (except for personal information as described in our Privacy Policy) and nonproprietary. You hereby grant Rise Up a perpetual, sub-licensable, assignable, unrestricted, worldwide, royalty-free, irrevocable license to use, reproduce, display, perform, practice, modify, create derivative or collective works, transmit and distribute your Feedback Messages, in whole or in part, and including all intellectual property rights therein."),
  p("We may terminate this license at any time for any reason. If you breach any of these Terms, your license to the Content terminates immediately. Upon the termination of this license you must stop using this website, including all Content, and return or destroy all copies, including electronic copies, of the Content in your possession or control."),

  // ── Restrictions on use ───────────────────────────────────────────────────
  h2("Restrictions on Use of This Website"),
  p("You agree:"),
  li("not to use this website or Content in any way not explicitly permitted by these Terms or the text of the website itself;"),
  li("not to copy, modify or create derivative works involving the Content, except you may print a reasonable number of copies for your personal use, provided that you reproduce all proprietary copyright and trademark notices;"),
  li("not to misrepresent your identity or provide us with any false information in any information-collection portion of this website;"),
  li("not to take any action intended to interfere with the operation of this website;"),
  li("not to access or attempt to access any portion of this website to which you have not been explicitly granted access;"),
  li("not to share any password assigned to or created by you with any third parties or use any password granted to or created by a third party;"),
  li("not to directly or indirectly authorize anyone else to take actions prohibited in this section;"),
  li("to comply with all applicable laws and regulations while using this website or the Content. You represent and warrant that you are at least 13 years of age, and that if you are between 13 and 18 years of age a parent and/or guardian agrees to these Terms of Use on your behalf."),
  p("You are solely responsible for the content of any postings you submit and Rise Up assumes no responsibility or liability for any content submitted by you or any other website visitor."),
  p("We may, but are not obligated to, restrict or remove any and all content that we determine in our sole discretion violates these Terms or is otherwise harmful to us, our patients, or any third party."),
  p("We reserve the right to remove the content you provide at any time, but you understand that we may preserve and access a backup copy, and we may disclose the content if required to do so by law or in a good faith belief that such access, preservation, or disclosure is required by law or in the best interests of Rise Up."),
  p("If you do post content or submit material, you grant Rise Up a nonexclusive, royalty-free, perpetual, irrevocable, and fully sub-licensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media. You represent and warrant that you own or otherwise control all of the rights to the content that you post and that use of the content you supply does not violate these Terms and will not cause injury to any person or entity."),

  // ── DMCA ──────────────────────────────────────────────────────────────────
  h2("Copyright Infringement — DMCA Notice"),
  p("The Digital Millennium Copyright Act of 1998 (the DMCA) provides recourse for copyright owners who believe that material appearing on the Internet infringes their rights under US copyright law."),
  p("If you believe in good faith that content or material on this website infringes a copyright owned by you, you (or your agent) may send Rise Up a notice requesting that the material be removed, or access to it blocked. This request should be sent to contact@riseupwv.com."),
  p("The notice must include the following information:"),
  li("(a) a physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;"),
  li("(b) identification of the copyrighted work claimed to have been infringed;"),
  li("(c) identification of the material that is claimed to be infringing or the subject of infringing activity;"),
  li("(d) the name, address, telephone number, and email address of the complaining party;"),
  li("(e) a statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; and"),
  li("(f) a statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed."),
  p("If you believe in good faith that a notice of copyright infringement has been wrongly filed against you, the DMCA permits you to send us a counter-notice. Notices and counter-notices must meet the then-current statutory requirements imposed by the DMCA and should be sent to the address above."),

  // ── Changes to website content ────────────────────────────────────────────
  h2("Changes to Website Content"),
  p("We may change, add or remove some or all of the Content on this website at any time. Although our goal is to provide accurate information, certain features that may be offered through this website, such as participating healthcare providers, pricing information or other Content, may not be accurate or up to date."),

  // ── Links ─────────────────────────────────────────────────────────────────
  h2("Links"),
  p("While visiting this website you may click on a link to other websites and leave this website. We provide links to other websites that may contain information that may be useful or interesting to you. We do not endorse, and are not responsible for, the content and accuracy of linked websites operated by third parties or for any of your dealings with such third parties. You are solely responsible for your dealings with such third parties and we encourage you to read the terms of use and privacy policies on such third-party websites."),

  // ── No warranties ─────────────────────────────────────────────────────────
  h2("No Warranties"),
  p("ALL CONTENT ON THIS WEBSITE IS PROVIDED TO YOU ON AN \"AS IS\", \"AS AVAILABLE\" BASIS. RISE UP HEALTH & WELLNESS AND ALL THIRD PARTIES PROVIDING CONTENT, SUPPORT OR INFORMATION FOR THIS WEBSITE (COLLECTIVELY, \"WEBSITE-RELATED-PARTIES\") HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT."),
  p("THE WEBSITE-RELATED-PARTIES MAKE NO WARRANTY AS TO THE ACCURACY, COMPLETENESS, TIMELINESS, CORRECTNESS, OR RELIABILITY OF ANY CONTENT AVAILABLE THROUGH THIS WEBSITE."),
  p("THE WEBSITE-RELATED-PARTIES MAKE NO REPRESENTATIONS OR WARRANTIES THAT USE OF THIS WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THIS WEBSITE OR THE TECHNOLOGY THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOU ARE RESPONSIBLE FOR TAKING ALL PRECAUTIONS NECESSARY TO ENSURE THAT ANY CONTENT YOU MAY OBTAIN FROM THIS WEBSITE IS FREE OF VIRUSES AND ANY OTHER POTENTIALLY DESTRUCTIVE COMPUTER CODE."),

  // ── Limitation of liability ───────────────────────────────────────────────
  h2("Limitation of Liability"),
  p("YOU AGREE THAT NONE OF THE WEBSITE-RELATED-PARTIES SHALL BE LIABLE FOR ANY DAMAGE RESULTING FROM YOUR USE OR INABILITY TO USE THIS WEBSITE OR THE CONTENT. THIS PROTECTION COVERS CLAIMS BASED ON WARRANTY, CONTRACT, TORT, STRICT LIABILITY, AND ANY OTHER LEGAL THEORY, AND COVERS ALL LOSSES INCLUDING, WITHOUT LIMITATION, DIRECT OR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY, AND PUNITIVE DAMAGES, PERSONAL INJURY/WRONGFUL DEATH, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION."),
  p("THE TOTAL, CUMULATIVE LIABILITY OF THE WEBSITE-RELATED-PARTIES, IF ANY, FOR LOSSES OR DAMAGES SHALL BE LIMITED TO THE AMOUNT OF YOUR ACTUAL DAMAGES, NOT TO EXCEED U.S. $100.00."),
  p("YOU AGREE THAT YOU USE THIS WEBSITE AT YOUR OWN RISK. IF YOU ARE DISSATISFIED WITH THIS WEBSITE OR THE CONTENT, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE WEBSITE."),

  // ── Governing law ─────────────────────────────────────────────────────────
  h2("Governing Law and Statute of Limitations"),
  p("The laws of the State of West Virginia govern these Terms and any cause of action arising under or relating to your use of the website, without reference to its choice-of-law principles."),
  p("You agree that the only proper jurisdiction and venue for any dispute with Rise Up, or in any way relating to your use of this website, is in the state and federal courts in the State of West Virginia, U.S.A. You further agree and consent to the exercise of personal jurisdiction in these courts in connection with any dispute involving Rise Up or its employees, officers, directors, agents and providers."),
  p("Before seeking legal recourse for any harm you believe you have suffered arising from or related to your use of this website, you agree to inform us in writing and to give us 30 days to cure the harm before initiating any action. You must initiate any cause of action within one year after the claim has arisen, or you will be barred from pursuing any cause of action."),

  // ── Contact us ────────────────────────────────────────────────────────────
  h2("Contact Us"),
  p("To contact us regarding these Terms or the operation of the website, please email us at contact@riseupwv.com."),

  // ── Effective date ────────────────────────────────────────────────────────
  h2("Effective Date"),
  p("The effective date of these Terms is January 1, 2025."),

  // ── Additional terms ──────────────────────────────────────────────────────
  h2("Additional Terms"),
  p("Your obligations under the following sections survive termination of this Agreement: Important Note Regarding Website Content; Agreement and Terms; License to Use This Website and Content Ownership; Restrictions on Use of This Website; Copyright Infringement — DMCA Notice; Changes to Website Content; Links; No Warranties; Limitation of Liability; Governing Law and Statute of Limitations; Additional Terms."),
  p("If any provision of these Terms is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms, which shall remain in full force and effect."),
  p("No waiver of any of these Terms shall be deemed a further or continuing waiver of such term or condition or any other term or condition."),
  p("You agree to defend and indemnify Rise Up Health & Wellness and its subsidiaries, affiliates, officers, directors, employees, and agents harmless from any claim, demand, or damage, including reasonable attorneys' fees, arising out of or related to your breach of this Agreement or your use or misuse of the Content or website."),
  p("You may not transfer or assign any rights or obligations under this Agreement. Rise Up Health & Wellness may transfer or assign its rights and obligations under this Agreement."),
];

// ─── Write to Sanity ──────────────────────────────────────────────────────────

const mutation = {
  createOrReplace: {
    _id: "website-page-terms-of-use",
    _type: "websitePage",
    key: "terms-of-use",
    path: "/patients-rights-privacy/terms-of-use",
    pageType: "legal",
    status: "published",
    title: "Terms of Use",
    eyebrow: "Patient rights",
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

console.log(`✓ Seeded terms of use with ${body.length} blocks`);
console.log(JSON.stringify(json, null, 2));
