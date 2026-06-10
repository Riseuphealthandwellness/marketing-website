# Rise Up Marketing Website

Production-ready starter foundation for the Rise Up public website. The site is built for calm, trustworthy healthcare communication, CMS-managed content, and future integration with scheduling, intake, patient portal, and vendor systems without putting PHI-heavy workflows into v1.

## Stack Decision

This project uses a custom foundation rather than a generic template.

- **Next.js App Router** for server components, route groups, metadata APIs, sitemap, robots, and production deployment.
- **TypeScript** for maintainable content, component, CMS, and integration contracts.
- **Tailwind CSS v4** with semantic CSS variables for theming.
- **shadcn/ui-compatible primitives** for accessible, reusable UI without adopting a flashy startup template.
- **Sanity-ready CMS boundary** through typed content models and a client module.
- **Docker standalone output** for self-hosted container deployment.
- **Rise Up brand tokens** from the current style guide: Rise Red, Ember Orange, Sunrise Coral, Raspberry Pink, Magenta Glow, Warm White, Coal, and Deep Slate.
- **Self-hosted brand typography** with Lato for headings/CTAs and Open Sans for body/navigation copy.

The best template strategy for this project is minimal and editorial: start from this foundation, then add shadcn components selectively. Avoid broad landing-page template kits, SaaS dashboards, and animation-heavy starter themes.

## Commands

```bash
npm install
npm run dev
npm run dev:web
npm run dev:studio
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` into `.env.local` and set values for the deployment environment.

The v1 public site links out to external patient systems:

- `PATIENT_PORTAL_URL`
- `SCHEDULING_URL`
- `INTAKE_URL`
- `REFERRAL_URL`

These are intentionally links, not custom clinical workflows.

## Project Structure

```text
apps/web/src/app
  (marketing)              Public marketing route group
  healthz                  Container health route
  globals.css              Tailwind v4 theme tokens and base styles
  layout.tsx               Root metadata, SEO, shell
  robots.ts                Robots metadata route
  sitemap.ts               Sitemap metadata route

apps/web/src/components
  layout                   Page layout helpers
  sections                 Marketing page sections
  site                     Header, footer, structured site chrome
  ui                       shadcn/ui-compatible primitives

apps/web/src/content       Temporary typed content before CMS hookup
apps/web/src/lib/analytics Privacy-conscious analytics abstraction
apps/web/src/lib/cms       Sanity-ready CMS client, queries, and types
apps/web/src/lib/integrations External portal/scheduling/intake boundary
apps/web/src/lib/seo       Metadata and JSON-LD helpers

apps/studio                Sanity Studio app
docs/architecture.md       Architecture, phases, CMS models, deployment plan
```

## Docker

Build and run locally:

```bash
docker build -t riseupwv-marketing .
docker run --rm -p 3000:3000 --env-file .env.local riseupwv-marketing
```

Or use Compose:

```bash
docker compose up --build
```

## Google Cloud Run

The root `Dockerfile` builds the Next.js web app as a standalone container and runs it as a non-root user on Cloud Run's `$PORT`.

```bash
gcloud artifacts repositories create riseupwv \
  --repository-format docker \
  --location us-east1

gcloud builds submit \
  --tag us-east1-docker.pkg.dev/PROJECT_ID/riseupwv/marketing:latest

gcloud run deploy riseupwv-marketing \
  --image us-east1-docker.pkg.dev/PROJECT_ID/riseupwv/marketing:latest \
  --region us-east1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars SITE_URL=https://riseupwv.com
```

Add the patient access, Sanity, map, and analytics environment variables from `.env.example` in Cloud Run service settings or with `--set-env-vars` / `--set-secrets`.

## Sanity Content Updates

The web app caches Sanity reads for up to 5 minutes and also exposes a protected
on-demand revalidation endpoint for Sanity webhooks:

```text
POST https://riseupwv.com/api/revalidate
Authorization: Bearer SANITY_REVALIDATE_SECRET
```

Set `SANITY_REVALIDATE_SECRET` on the Cloud Run service, then create a Sanity
webhook for publish/delete events that calls `/api/revalidate`. When the webhook
fires, the app clears the Sanity cache tag and the next page request fetches
fresh content. A full Cloud Run container rebuild is only needed for code,
dependency, or environment changes, not routine CMS edits.
