const imageProjection = `{
  "url": asset->url,
  "alt": alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const fileProjection = `{
  "url": asset->url,
  "originalFilename": asset->originalFilename
}`;

const seoProjection = `{ title, description, canonicalUrl, noIndex, ogImage }`;

const serviceProjection = `{
  _id,
  "slug": slug.current,
  title,
  description,
  icon,
  cardColor,
  cardEyebrow,
  sortOrder,
  body,
  href,
  "conditions": conditions[]->{ "slug": slug.current, title, category, shortDescription },
  "medications": medications[]->{ name, genericName, "slug": slug.current, description },
  seo ${seoProjection}
}`;

const programProjection = `{
  _id,
  "slug": slug.current,
  title,
  description,
  icon,
  cardColor,
  cardEyebrow,
  sortOrder,
  audience,
  body,
  href,
  seo ${seoProjection}
}`;

const supplementalSectionsProjection = `supplementalSections[coalesce(enabled, true)]{
  _type == "supplementalStatsSection" => {
    "type": "stats",
    "items": items[coalesce(enabled, true)]{ value, label }
  },
  _type == "supplementalProseSection" => {
    "type": "prose",
    eyebrow,
    heading,
    paragraphs
  },
  _type == "supplementalSymptomsSection" => {
    "type": "symptoms",
    eyebrow,
    heading,
    description,
    groups[]{ heading, items }
  },
  _type == "supplementalStepsSection" => {
    "type": "steps",
    eyebrow,
    heading,
    description,
    "steps": steps[coalesce(enabled, true)]{ title, body }
  },
  _type == "supplementalBulletsSection" => {
    "type": "bullets",
    eyebrow,
    heading,
    items
  }
}`;

const providerProjection = `{
  "slug": slug.current,
  name,
  role,
  credentials,
  department,
  pronouns,
  shortBio,
  bio,
  "image": image ${imageProjection},
  specialties,
  languages,
  acceptingNewPatients,
  "locations": locations[]->{ "slug": slug.current, name },
  seo ${seoProjection}
}`;

const locationProjection = `{
  "slug": slug.current,
  name,
  address,
  phone,
  email,
  hours,
  parking,
  accessibilityNotes,
  appointmentNotes,
  serviceArea,
  "coordinates": {
    "lat": coordinates.lat,
    "lng": coordinates.lng
  }
}`;

// Expands drugReference marks inside any rich body array
const richBodyProjection = `[]{
  ...,
  markDefs[]{
    ...,
    _type == "drugReference" => {
      ...,
      "drug": drug->{ name, "slug": slug.current, description }
    }
  }
}`;

const pageBlocksProjection = `blocks[]{
  _type,
  _type == "pageSection" => { heading, "body": body ${richBodyProjection} },
  _type == "ctaBlock" => {
    eyebrow, heading, description,
    primaryLabel, primaryHref,
    secondaryLabel, secondaryHref
  },
  _type == "conditionsBlock" => {
    heading,
    category,
    "conditions": *[_type == "condition" && category == ^.category] | order(title asc){
      "slug": slug.current, title, shortDescription
    }
  },
  _type == "faqBlock" => {
    heading,
    category,
    "faqs": *[_type == "faq" && category == ^.category] | order(orderRank asc, question asc){
      question, answer
    }
  },
  _type == "servicesBlock" => {
    heading,
    "services": *[_type == "service"] | order(coalesce(sortOrder, 9999) asc, title asc){
      "slug": slug.current, title, description, href, icon, cardEyebrow, sortOrder
    }
  },
  _type == "programsBlock" => {
    heading,
    "programs": *[_type == "program"] | order(coalesce(sortOrder, 9999) asc, title asc){
      "slug": slug.current, title, description, audience, href, icon, cardEyebrow, sortOrder
    }
  },
  _type == "careModelBlock" => {
    eyebrow,
    heading,
    description,
    items[]{ title, body, iconName }
  }
}`;

const servicesPageContentProjection = `servicesPageContent{
  intro{eyebrow, heading, description},
  feature{
    eyebrow,
    heading,
    description,
    ctaLabel,
    ctaHref,
    "image": image ${imageProjection},
    stats[]{value, label, description}
  },
  services{eyebrow, heading, description, ctaLabel},
  references{eyebrow, heading, description, conditionsHeading, treatmentsHeading, ctaLabel},
  programs{eyebrow, heading, description, ctaLabel}
}`;

const aboutContentProjection = `aboutContent{
  hero{
    heading,
    "backgroundImage": backgroundImage ${imageProjection},
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
    imageAlt,
    panelEyebrow,
    panelDescription
  },
  glance{
    eyebrow,
    heading,
    items[]{ _key, iconName, label, title, detail, description }
  },
  values{
    eyebrow,
    heading,
    items[]{ _key, iconName, label, title, detail, description }
  },
  team{
    eyebrow,
    heading,
    ctaLabel,
    ctaHref,
    mobileCtaLabel,
    maxProviders
  },
  community{
    eyebrow,
    heading,
    description,
    "backgroundImage": backgroundImage ${imageProjection},
    ctaLabel,
    ctaHref,
    imageAlt
  },
  featuredNarrativeHeadings
}`;

export const cmsQueries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    name,
    tagline,
    copyrightText,
    url,
    phone,
    email,
    contactInboxEmail,
    referralInboxEmail,
    address,
    "location": {
      "lat": location.lat,
      "lng": location.lng,
      "zoom": coalesce(locationZoom, 13)
    },
    accessLinks,
    "showBreadcrumbs": coalesce(showBreadcrumbs, true),
    contactBand,
    footerNotice,
    footerDisclaimers[]{ text },
    headerCta,
    "logo": logo ${imageProjection}
  }`,

  navigation: `*[_type == "navigation" && _id == $id][0]{
    title,
    items[]{
      _type,
      _type == "navLink" => { label, href },
      _type == "navMegaMenu" => {
        label,
        "image": {
          "url": image.asset->url,
          "alt": imageAlt,
          "width": image.asset->metadata.dimensions.width,
          "height": image.asset->metadata.dimensions.height
        },
        eyebrow,
        title,
        description,
        ctaLabel,
        ctaHref,
        autoReferenceLinks{
          enabled,
          "excludeServices": excludeServices[]->{ _id }
        },
        "groups": groups[]{
          title,
          "links": links[]{ label, href, description }
        }
      }
    }
  }`,

  homepage: `*[_type == "homepage" && _id == "singleton-homepage"][0]{
    hero{
      eyebrow,
      heading[]{
        ...,
        children[]{ ..., marks },
        markDefs[]{
          ...,
          _type == "textColor" => { _key, _type, color }
        }
      },
      description,
      buttons,
      "backgroundImage": backgroundImage ${imageProjection},
      "featureImage": featureImage ${imageProjection}
    },
    heroFeaturePanel,
    careModelHighlights,
    serviceHighlights,
    careOptions,
    referralCta,
    seo
  }`,

  homepageV2Settings: `*[_type == "homepageV2Settings" && _id == "homepageV2Settings"][0]{
    title,
    routePath,
    status,
    components[]{
      _type,
      enabled,
      eyebrow,
      heading,
      description,
      buttons,
      pathCards[]{ icon, title, body, link },
      cards[]{ icon, title, body },
      "backgroundImage": backgroundImage ${imageProjection},
      "featureImage": featureImage ${imageProjection},
      offerings[]{
        _key,
        "item": item->{
          _type,
          _id,
          "slug": slug.current,
          title,
          description,
          icon,
          cardEyebrow,
          audience,
          href
        }
      },
      steps[]{ icon, title, body },
      centerCard{ icon, title, body },
      careMapCards[]{ icon, title, label }
    },
    seo
  }`,

  pageBySlug: `*[_type == "websitePage" && key == $slug && status == "published"][0]{
    title,
    path,
    breadcrumbs{enabled, items[]{label, href}},
    eyebrow,
    description,
    "heroImage": heroImage ${imageProjection},
    ${aboutContentProjection},
    ${servicesPageContentProjection},
    body,
    ${pageBlocksProjection},
    sidebar[]{heading, description, ctaLabel, ctaHref},
    contactForm,
    newPatientSteps,
    newPatientAccessCards,
    emptyStateText,
    "recordRequestPdf": recordRequestPdf ${fileProjection},
    recordRequestPdfLabel,
    seo
  }`,

  pageByPath: `*[_type == "websitePage" && path == $path && status == "published"][0]{
    title,
    path,
    breadcrumbs{enabled, items[]{label, href}},
    eyebrow,
    description,
    "heroImage": heroImage ${imageProjection},
    ${aboutContentProjection},
    ${servicesPageContentProjection},
    body,
    ${pageBlocksProjection},
    sidebar[]{heading, description, ctaLabel, ctaHref},
    contactForm,
    newPatientSteps,
    newPatientAccessCards,
    emptyStateText,
    "recordRequestPdf": recordRequestPdf ${fileProjection},
    recordRequestPdfLabel,
    seo
  }`,

  allPageSlugs: `*[_type == "websitePage" && pageType == "custom" && status == "published" && defined(key)]{
    "slug": key
  }`,

  allPagePaths: `*[_type == "websitePage" && status == "published" && defined(path)]{
    path
  }`,

  allPublishedPages: `*[_type == "websitePage" && status == "published" && defined(path)] | order(path asc){
    title,
    path
  }`,

  referralSettings: `*[_type == "websitePage" && key == "referrals" && status == "published"][0]{
    downloadLabel,
    pdfSectionHeading,
    pdfSectionDescription,
    formEyebrow,
    formHeading,
    formDescription,
    formDocumentNote,
    formConsentLabel,
    missingPdfMessage,
    "referralPdf": referralPdf ${fileProjection}
  }`,

  conditionsByCategory: `*[_type == "condition" && category == $category] | order(title asc){ "slug": slug.current, title, shortDescription }`,

  conditionBySlug: `*[_type == "condition" && slug.current == $slug][0]{ "slug": slug.current, title, category, shortDescription, "image": image ${imageProjection}, "body": body ${richBodyProjection}, learnMoreUrl, learnMoreLabel, pageLabels, ${supplementalSectionsProjection}, seo }`,

  allDrugs: `*[_type == "drug"] | order(name asc){ name, genericName, aliases, "slug": slug.current, description, learnMoreUrl }`,

  drugBySlug: `*[_type == "drug" && slug.current == $slug][0]{
    name, genericName, aliases, "slug": slug.current,
    "image": image { "url": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip },
    description,
    "body": body ${richBodyProjection},
    learnMoreUrl, learnMoreLabel,
    pageLabels,
    ${supplementalSectionsProjection},
    seo ${seoProjection}
  }`,

  allDrugSlugs: `*[_type == "drug" && defined(slug.current)]{ "slug": slug.current }`,

  allConditionSlugs: `*[_type == "condition" && defined(slug.current)]{ "slug": slug.current, category }`,

  careModelBlock: `*[_type == "websitePage" && key == "care" && status == "published"][0].blocks[_type == "careModelBlock"][0]{
    eyebrow, heading, description, items[]{ title, body, iconName }
  }`,

  faqsByCategory: `*[_type == "faq" && category == $category] | order(orderRank asc, question asc){ question, answer }`,

  announcement: `*[_type == "announcement" && status == "published" && (!defined(expiresAt) || expiresAt > now())] | order(publishedAt desc)[0]{
    title,
    message,
    "link": link{ label, href }
  }`,

  services: `*[_type == "service"] | order(coalesce(sortOrder, 9999) asc, title asc) ${serviceProjection}`,

  navigationReferenceServices: `*[_type == "service"] | order(coalesce(sortOrder, 9999) asc, title asc){
    _id,
    "slug": slug.current,
    title,
    description,
    href,
    "conditions": conditions[]->{ "slug": slug.current, title, category, shortDescription },
    "medications": medications[]->{ name, genericName, "slug": slug.current, description }
  }`,

  serviceBySlug: `*[_type == "service" && slug.current == $slug][0] ${serviceProjection}`,

  allServiceSlugs: `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`,

  programs: `*[_type == "program"] | order(coalesce(sortOrder, 9999) asc, title asc) ${programProjection}`,

  programBySlug: `*[_type == "program" && slug.current == $slug][0] ${programProjection}`,

  allProgramSlugs: `*[_type == "program" && defined(slug.current)]{ "slug": slug.current }`,

  providers: `*[_type == "provider" && coalesce(showOnTeamPage, true)] | order(coalesce(sortOrder, 9999) asc, lastName asc, firstName asc, name asc) ${providerProjection}`,

  providerBySlug: `*[_type == "provider" && slug.current == $slug][0] ${providerProjection}`,

  allProviderSlugs: `*[_type == "provider" && defined(slug.current)]{ "slug": slug.current }`,

  locations: `*[_type == "location"] | order(name asc) ${locationProjection}`,

  locationBySlug: `*[_type == "location" && slug.current == $slug][0] ${locationProjection}`,

  allLocationSlugs: `*[_type == "location" && defined(slug.current)]{ "slug": slug.current }`,
};
