import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { CMS_CACHE_TAG } from "@/lib/cms/content-source";

export const runtime = "nodejs";

function getProvidedSecret(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;

  return (
    request.headers.get("x-revalidate-secret") ??
    bearerToken ??
    request.nextUrl.searchParams.get("secret")
  );
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not configured." }, { status: 500 });
  }

  if (getProvidedSecret(request) !== configuredSecret) {
    return NextResponse.json({ message: "Invalid revalidation secret." }, { status: 401 });
  }

  revalidateTag(CMS_CACHE_TAG, { expire: 0 });

  return NextResponse.json({
    revalidated: true,
    tag: CMS_CACHE_TAG,
    revalidatedAt: new Date().toISOString(),
  });
}
