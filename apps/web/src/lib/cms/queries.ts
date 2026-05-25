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
  slug,
  title,
  description,
  body,
  href,
  seo ${seoProjection}
}`;

const programProjection = `{
  "slug": slug.current,
  title,
  description,
  audience,
  body,
  href,
  seo ${seoProjection}
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

const pageBlocksProjection = `blocks[]{
  _type,
  _type == "pageSection" => { heading, body },
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
    "services": *[_type == "websitePage" && key == "services" && status == "published"][0].services[]{
      slug, title, description, href
    }
  },
  _type == "programsBlock" => {
    heading,
    "programs": *[_type == "program"] | order(title asc){
      "slug": slug.current, title, description, audience, href
    }
  },
  _type == "careModelBlock" => {
    eyebrow,
    heading,
    description,
    items[]{ title, body, iconName }
  }
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
    contactBand,
    footerNotice,
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
        "groups": groups[]{
          title,
          "links": links[]{ label, href, description }
        }
      }
    }
  }`,

  homepage: `*[_type == "homepage"][0]{
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

  pageBySlug: `*[_type == "websitePage" && key == $slug && status == "published"][0]{
    title,
    path,
    eyebrow,
    description,
    "heroImage": heroImage ${imageProjection},
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

  conditionBySlug: `*[_type == "condition" && slug.current == $slug][0]{ "slug": slug.current, title, category, shortDescription, body, learnMoreUrl, learnMoreLabel, seo }`,

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

  services: `*[_type == "websitePage" && key == "services" && status == "published"][0].services[] ${serviceProjection}`,

  serviceBySlug: `*[_type == "websitePage" && key == "services" && status == "published"][0].services[slug == $slug][0] ${serviceProjection}`,

  allServiceSlugs: `*[_type == "websitePage" && key == "services" && status == "published"][0].services[defined(slug)]{ slug }`,

  programs: `*[_type == "program"] | order(title asc) ${programProjection}`,

  programBySlug: `*[_type == "program" && slug.current == $slug][0] ${programProjection}`,

  allProgramSlugs: `*[_type == "program" && defined(slug.current)]{ "slug": slug.current }`,

  providers: `*[_type == "provider" && coalesce(showOnTeamPage, true)] | order(coalesce(sortOrder, 9999) asc, lastName asc, firstName asc, name asc) ${providerProjection}`,

  providerBySlug: `*[_type == "provider" && slug.current == $slug][0] ${providerProjection}`,

  allProviderSlugs: `*[_type == "provider" && defined(slug.current)]{ "slug": slug.current }`,

  locations: `*[_type == "location"] | order(name asc) ${locationProjection}`,

  locationBySlug: `*[_type == "location" && slug.current == $slug][0] ${locationProjection}`,

  allLocationSlugs: `*[_type == "location" && defined(slug.current)]{ "slug": slug.current }`,
};
