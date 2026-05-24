"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export function AutoGoogleSignIn({ callbackUrl }: { callbackUrl: string }) {
  useEffect(() => {
    signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className="min-h-screen bg-brand-warm-white flex flex-col items-center justify-center gap-4">
      <Image
        src="/images/brand/riseup-logo-dark-nobg.png"
        alt="RiseUp"
        width={160}
        height={48}
        priority
        className="h-10 w-auto"
      />
      <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>
        Signing you in…
      </p>
    </div>
  );
}
