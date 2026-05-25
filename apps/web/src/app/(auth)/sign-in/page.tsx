import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";

export const metadata: Metadata = {
  title: "Sign In | RiseUp Studio",
  robots: { index: false },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const { callbackUrl } = await searchParams;

  if (session?.user) {
    redirect(callbackUrl ?? "/studio");
  }

  async function handleGoogleSignIn() {
    "use server";
    await signIn("google", { redirectTo: callbackUrl ?? "/studio" });
  }

  return (
    <div className="min-h-screen bg-brand-warm-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="inline-block">
            <Image
              src="/images/brand/riseup-logo-dark-nobg.png"
              alt="RiseUp"
              width={160}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </a>
          <p
            className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-deep-slate"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Studio
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-soft px-8 py-10">
          <h1
            className="text-xl font-bold text-foreground text-center mb-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Sign in to access RiseUp Studio
          </p>

          <form action={handleGoogleSignIn}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground leading-relaxed">
            Access is restricted to authorized team members.
            <br />
            Contact your administrator if you need access.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a
            href="/"
            className="hover:text-brand-action transition-colors underline underline-offset-2"
          >
            ← Back to riseupwv.com
          </a>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.584-1.5636-5.036-3.7104H.957v2.3318C2.4382 15.9832 5.4818 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.5955.1023-1.1745.282-1.71V4.9582H.957A8.996 8.996 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.957 4.9582L3.964 7.29C4.672 5.1636 6.656 3.5795 9 3.5795Z"
        fill="#EA4335"
      />
    </svg>
  );
}
