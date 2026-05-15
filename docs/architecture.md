# Rise Up Website Architecture

## Recommended Stack

Use a custom Next.js foundation, not a broad commercial template.

- **Next.js App Router**: Server components by default, route groups, metadata APIs, sitemap/robots support, and a straightforward path to standalone Docker deployment.
- **TypeScript**: Required for stable content contracts, CMS data mapping, and future integration adapters.
- **Tailwind CSS v4**: CSS-variable-driven theming with semantic healthcare tokens instead of hard-coded palette classes.
- **shadcn/ui**: Adopt the component pattern and registry compatibility, but keep the public site restrained and editorial.
- **Sanity-compatible headless CMS**: Non-developers should eventually edit pages, services, programs, providers, FAQs, announcements, navigation, and CTA blocks.
- **Docker standalone deployment**: Build once, run in Cloud Run or any self-hosted container environment.

This is the practical path because Rise Up needs a calm public healthcare website first, with clean expansion points for CMS and vendors later. A flashy startup template would create more cleanup than leverage.

## Architecture

The codebase separates the public website from CMS access, UI primitives, and future patient-system integrations.

```text
app routes
  render public pages and metadata

components
  reusable layout, site chrome, sections, and shadcn-compatible UI primitives

content
  typed local content used until CMS data is connected

lib/cms
  Sanity client, query names, and shared CMS types

lib/integrations
  external patient portal, scheduling, intake, referral, and future vendor adapters

lib/seo
  metadata composition, sitemap helpers, and structured data

lib/analytics
  small provider abstraction with no invasive tracking hard-wired
```

## Route Plan

Initial routes:

- `/`
- `/about`
- `/services`
- `/programs`
- `/primary-care`
- `/team`
- `/patient-resources`
- `/referrals`
- `/contact`
- `/careers`
- `/privacy`
- `/terms`
- `/healthz`

Keep all public marketing pages under the `(marketing)` route group. Future patient-facing app routes should use a separate route group, such as `(patient)`, only after vendor and privacy requirements are defined.

## Folder Structure

```text
apps/web/src/app/(marketing) Public pages and marketing layout
apps/web/src/app/globals.css Semantic theme tokens and base accessibility styles
apps/web/src/components/layout Section and page layout helpers
apps/web/src/components/sections Reusable composed marketing sections
apps/web/src/components/site  Header, footer, and site-wide UI
apps/web/src/components/ui    shadcn/ui-compatible primitives
apps/web/src/content          Local structured content fallback
apps/web/src/lib/analytics    Analytics adapter boundary
apps/web/src/lib/cms          CMS data access and content types
apps/web/src/lib/integrations External patient-system link and adapter boundary
apps/web/src/lib/seo          Metadata and JSON-LD utilities
```

## Phased Implementation Plan

### Phase 1: Foundation

- Establish App Router, TypeScript, Tailwind v4, shadcn-compatible primitives, and Docker.
- Build semantic theme tokens, typography, section layouts, header/footer, CTAs, and baseline pages.
- Add metadata, Open Graph defaults, sitemap, robots, health check, and security headers.
- Keep content local but typed so it maps cleanly to CMS later.

### Phase 2: Content And CMS

- Add Sanity Studio in a separate app or workspace when editorial workflows are ready.
- Replace local content imports with CMS loaders and preview/draft mode.
- Add image handling, portable rich text rendering, editorial validation, and redirect handling.
- Train non-developers on page modules rather than free-form page building.

### Phase 3: Service Depth

- Expand service and program detail pages.
- Add provider profiles, location detail pages, FAQs, referral flows, and downloadable resources.
- Add schema.org structured data for organization, medical clinic, provider, location, and FAQ pages.

### Phase 4: Integrations

- Connect portal, scheduling, intake, and referral links to vendor systems.
- Add vendor API adapters only when contracts, consent, privacy, and security requirements are known.
- Keep PHI out of the public marketing app unless a compliance review explicitly approves it.

### Phase 5: Production Hardening

- Add uptime monitoring, error monitoring, accessibility audits, analytics consent policy, backup strategy, CMS workflow roles, and deployment rollback documentation.
- Add automated visual checks and Lighthouse budgets.

## Design System Plan

The public site should feel calm, warm, readable, and clinical without feeling cold.

- **Color tokens**: Use semantic tokens such as `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`, `border`, and `ring`.
- **Brand palette**: Rise Red `#D8141C`, Ember Orange `#FA5A22`, Sunrise Coral `#F77B58`, Raspberry Pink `#E63E7F`, Magenta Glow `#C91E7B`, Warm White `#F7F3EE`, Coal `#1F1C19`, and Deep Slate `#3F5666`.
- **Brand direction**: Warm White should be the default background. Rise Red should carry primary CTA emphasis and brand anchoring, Ember Orange and Sunrise Coral should support warm accents, Raspberry Pink and Magenta Glow should be used sparingly for human or bold supporting moments, and Deep Slate should support links, diagrams, and dark fields.
- **Typography**: Lato for headings, section titles, and short calls to action. Open Sans for body copy, captions, navigation, and paragraphs.
- **Spacing**: Section-level rhythm through layout components rather than one-off page spacing.
- **Radius**: Modest radius, 8px or less for cards and controls unless a component has a specific need.
- **Motion**: Minimal. Prefer focus, hover, and disclosure state changes over decorative animation.
- **Accessibility**: Skip link, keyboard-friendly nav, visible focus rings, semantic headings, sufficient contrast, and real labels for interactive elements.

## Component Inventory

Core UI:

- `Button`
- `Card`
- `Badge`
- `Container`
- `Section`

Site components:

- `SiteHeader`
- `SiteFooter`
- `SkipLink`

Marketing sections:

- `PageHero`
- `HomeHero`
- `CareModelSection`
- `HighlightsGrid`
- `CareModelSection`
- `TeamPreview`
- `ResourcesPreview`
- `ReferralBand`
- `ContactBand`
- `CTAGroup`
- `FAQList`

Content cards:

- `ServiceCard`
- `ProviderCard`
- `ResourceCard`
- `ContactCard`

## CMS Content Models

Recommended Sanity document types:

- **Site settings**: Site name, logo, default SEO, contact info, emergency disclaimer, social links.
- **Navigation**: Header nav items, footer nav groups, CTA labels and URLs.
- **Footer**: Legal links, address, contact methods, accreditation text, compliance notices.
- **Homepage**: Ordered modular sections, hero, care model, highlights, team preview, resource preview, referral CTA, contact CTA.
- **Generic page**: Title, slug, intro, rich body, modular sections, SEO.
- **Service**: Title, slug, summary, eligibility notes, care setting, related programs, FAQs, CTA block, SEO.
- **Program**: Title, slug, summary, audience, outcomes, services included, referral information, FAQs, SEO.
- **Provider/team member**: Name, credentials, role, specialties, bio, photo, accepting status, locations, SEO.
- **Location**: Name, address, phone, hours, map URL, services offered, accessibility notes, SEO.
- **FAQ**: Question, answer, category, related services/programs.
- **Announcement/news**: Title, slug, date, summary, body, status, SEO.
- **Referral CTA block**: Heading, summary, CTA label, CTA URL, supporting phone/email.
- **SEO fields**: Meta title, description, canonical URL, noindex flag, OG image, structured data type.

For page building, use a curated module list. Do not give editors unconstrained layout control in v1.

## Integration Boundary

V1 should expose links to external systems:

- Patient portal
- Scheduling
- Intake
- Referral submission

Code should read those links from environment-backed configuration in `apps/web/src/lib/integrations/patient-access.ts`.

Future API adapters belong under `apps/web/src/lib/integrations/vendor-adapters`. Each adapter should implement stable internal interfaces, so the app does not depend directly on vendor-specific EMR/EHR contracts. Do not introduce PHI storage, custom intake forms, appointment booking logic, or record access into the marketing app without a separate privacy and security design.

## Docker And Deployment

Use `output: "standalone"` in Next.js and a multi-stage Docker build.

Recommended runtime:

- Node 22 Alpine
- Non-root runtime user
- `PORT=3000`
- `HOSTNAME=0.0.0.0`
- Health check at `/healthz`
- Environment variables injected at deploy time
- Reverse proxy or platform-managed TLS

Production checklist:

- Set `SITE_URL`
- Configure portal, scheduling, intake, and referral links
- Confirm headers and CSP needs with the final hosting environment
- Run `npm run lint`, `npm run typecheck`, and `npm run build`
- Run an accessibility pass on every route before launch
