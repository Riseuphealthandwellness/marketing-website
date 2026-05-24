import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID ?? "k23sgnrq";
const SANITY_API_VERSION = "v2021-06-07";

export async function GET(req: NextRequest) {
  const { searchParams, origin: reqOrigin } = req.nextUrl;
  const studioOrigin = searchParams.get("origin");

  const session = await auth();

  // Not signed in — skip the manual sign-in page, auto-trigger Google OAuth directly
  if (!session?.user) {
    const callbackUrl = `/api/auth/sanity-login${studioOrigin ? `?origin=${encodeURIComponent(studioOrigin)}` : ""}`;
    const signInUrl = new URL("/sign-in", reqOrigin);
    signInUrl.searchParams.set("provider", "google");
    signInUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(signInUrl);
  }

  const robotToken = process.env.SANITY_AUTH_TOKEN;
  if (!robotToken) {
    console.error("SANITY_AUTH_TOKEN is not set");
    return NextResponse.redirect(new URL("/sign-in?error=Configuration", reqOrigin));
  }

  // Exchange the authenticated user for a Sanity session claim URL
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/auth/thirdParty/session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${robotToken}`,
      },
      body: JSON.stringify({
        userId: session.user.email,
        userFullName: session.user.name ?? session.user.email,
        userRole: process.env.SANITY_AUTH_ROLE ?? "editor",
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("Sanity session exchange failed:", res.status, body);
    return NextResponse.redirect(new URL("/sign-in?error=SanitySession", reqOrigin));
  }

  const { endUserClaimUrl } = (await res.json()) as { endUserClaimUrl: string };

  // Sanity will redirect the user back to studioOrigin after the session is claimed
  const claimUrl = new URL(endUserClaimUrl);
  if (studioOrigin) {
    claimUrl.searchParams.set("origin", studioOrigin);
  }

  return NextResponse.redirect(claimUrl);
}
