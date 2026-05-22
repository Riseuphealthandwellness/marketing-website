const imageProjection = `{
  "url": asset->url,
  "alt": alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const fileProjection = `{
  "url": asset->url,
  "originalFilename": asset->originalFilename
}`;

const seoProjection = `{ title, description, canonicalUrl, noIndex, ogImage }`;

const serviceProjection = `{
  "slug": slug.current,
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

export const cmsQueries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    name,
    tagline,
    copyrightText,
    url,
    phone,
    email,
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

  homepage: `*[_type == "homepageSettings" && _id == "homepageSettings"][0]{
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

  pageBySlug: `select(
    $slug == "referrals" && defined(*[_type == "referralPageSettings" && _id == "referralPageSettings"][0].title) => *[_type == "referralPageSettings" && _id == "referralPageSettings"][0],
    defined(*[_type == "landingPageSettings" && slug == $slug][0].title) => *[_type == "landingPageSettings" && slug == $slug][0],
    *[_type == "page" && slug.current == $slug && status == "published"][0]
  ){
    title,
    eyebrow,
    description,
    blocks[]{
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
        "services": *[_type == "service"] | order(title asc){
          "slug": slug.current, title, description, href
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
    },
    contactForm,
    newPatientSteps,
    newPatientAccessCards,
    emptyStateText,
    seo
  }`,

  allPageSlugs: `*[_type == "page" && status == "published" && defined(slug.current)]{
    "slug": slug.current
  }`,

  legalPageById: `*[_type == "legalPage" && _id == $id][0]{ title, body, seo }`,

  referralSettings: `*[_type == "referralPageSettings" && _id == "referralPageSettings"][0]{
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

  conditionBySlug: `*[_type == "condition" && slug.current == $slug][0]{ "slug": slug.current, title, category, shortDescription, body, seo }`,

  allConditionSlugs: `*[_type == "condition" && defined(slug.current)]{ "slug": slug.current, category }`,

  careModelBlock: `*[_type == "landingPageSettings" && slug == "care"][0].blocks[_type == "careModelBlock"][0]{
    eyebrow, heading, description, items[]{ title, body, iconName }
  }`,

  faqsByCategory: `*[_type == "faq" && category == $category] | order(orderRank asc, question asc){ question, answer }`,

  announcement: `*[_type == "announcement" && status == "published" && (!defined(expiresAt) || expiresAt > now())] | order(publishedAt desc)[0]{
    title,
    message,
    "link": link{ label, href }
  }`,

  services: `*[_type == "service"] | order(title asc) ${serviceProjection}`,

  serviceBySlug: `*[_type == "service" && slug.current == $slug][0] ${serviceProjection}`,

  allServiceSlugs: `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`,

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
