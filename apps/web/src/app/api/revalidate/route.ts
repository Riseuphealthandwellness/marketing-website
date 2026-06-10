import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { CMS_CACHE_TAG } from "@/lib/cms/content-source";

export const runtime = "nodejs";

const allowedOriginPatterns = [
  /^https:\/\/[a-z0-9-]+\.sanity\.studio$/i,
  /^http:\/\/localhost:\d+$/i,
  /^http:\/\/127\.0\.0\.1:\d+$/i,
];

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigin =
    origin && allowedOriginPatterns.some((pattern) => pattern.test(origin)) ? origin : null;

  return {
    ...(allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, content-type, x-revalidate-secret",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function getProvidedSecret(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;

  return (
    request.headers.get("x-revalidate-secret") ??
    bearerToken ??
    request.nextUrl.searchParams.get("secret")
  );
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function POST(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request);
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not configured." },
      { status: 500, headers: corsHeaders },
    );
  }

  if (getProvidedSecret(request) !== configuredSecret) {
    return NextResponse.json(
      { message: "Invalid revalidation secret." },
      { status: 401, headers: corsHeaders },
    );
  }

  revalidateTag(CMS_CACHE_TAG, { expire: 0 });

  return NextResponse.json({
    revalidated: true,
    tag: CMS_CACHE_TAG,
    revalidatedAt: new Date().toISOString(),
  }, { headers: corsHeaders });
}
