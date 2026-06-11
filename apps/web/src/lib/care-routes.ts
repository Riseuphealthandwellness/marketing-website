export function getServiceHref(service: { slug: string; href?: string | null }) {
  const canonicalHref = `/care/services/${service.slug}`;
  return service.href && service.href !== `/care/${service.slug}` ? service.href : canonicalHref;
}

export function getProgramHref(program: { slug: string; href?: string | null }) {
  const canonicalHref = `/care/programs/${program.slug}`;
  return program.href && program.href !== `/programs/${program.slug}` ? program.href : canonicalHref;
}

type CareRouteContext =
  | { serviceSlug: string; programSlug?: never }
  | { programSlug: string; serviceSlug?: never };

export function getConditionHref(
  condition: { slug: string; category?: string | null },
  context?: CareRouteContext,
) {
  if (context?.serviceSlug) {
    return `/care/services/${context.serviceSlug}/conditions/${condition.slug}`;
  }
  if (context?.programSlug) {
    return `/care/programs/${context.programSlug}/conditions/${condition.slug}`;
  }
  return `/care/${condition.category}/${condition.slug}`;
}

export function getTreatmentHref(treatment: { slug: string }) {
  return `/care/medications/${treatment.slug}`;
}
