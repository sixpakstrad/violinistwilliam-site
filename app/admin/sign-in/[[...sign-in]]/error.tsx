"use client";

import Link from "next/link";
import { useEffect } from "react";

type AdminSignInErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminSignInError({
  error,
  reset,
}: AdminSignInErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isClientTrustError = error.message?.includes("needs_client_trust");

  return (
    <main className="min-h-screen bg-espresso px-5 py-28 text-ivory sm:px-8 lg:px-16">
      <section className="mx-auto max-w-3xl border border-ivory/10 bg-[#2f251f] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-gold">
          Admin Sign In
        </p>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
          {isClientTrustError
            ? "Clerk needs a browser trust check."
            : "The sign-in screen needs a refresh."}
        </h1>
        <p className="mt-5 text-base leading-8 text-ivory-muted">
          {isClientTrustError
            ? "The admin area is still protected. Clerk is asking this browser to complete an extra trust verification before continuing."
            : "Something interrupted the secure sign-in flow. Try reopening the sign-in screen."}
        </p>
        {isClientTrustError ? (
          <div className="mt-6 border border-gold/35 bg-black/20 p-5 text-sm leading-7 text-ivory-muted">
            In the Clerk dashboard, check the security settings for Client
            Trust, bot protection, or attack protection. For local testing, that
            trust challenge may need to be turned off or Clerk may need a newer
            supported flow. Multi-factor authentication can still remain enabled
            in Clerk.
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="border border-gold bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-espresso transition hover:bg-ivory"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-ivory/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-ivory transition hover:border-gold hover:text-gold"
          >
            Back to website
          </Link>
        </div>
      </section>
    </main>
  );
}
