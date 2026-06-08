import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SupportTip } from "@/components/SupportTip";

export const metadata: Metadata = {
  title: "Leave a Tip | William Samorey",
  description:
    "A dedicated tipping page for guests who want to thank William Samorey after a live performance.",
};

export default function TipPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        eyebrow="Thank You"
        title="Leave a tip for William."
        copy="This page is being prepared as the direct tipping home for live song requests and performances."
      />

      <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <Reveal className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
              Payment Setup
            </p>
            <h2 className="font-display text-4xl leading-[1.05] text-ivory text-balance sm:text-5xl">
              Choose an optional support option.
            </h2>
            <p className="mt-7 text-lg leading-8 text-ivory-muted">
              Tips are never required, but they are always appreciated when a
              performance or request makes the moment feel more personal.
            </p>
            <SupportTip
              title="Payment Options"
              description="Choose your preferred payment app to send a tip."
              secondaryDescription="Tips are always optional and appreciated."
              className="mt-8"
              includeDisclosure={false}
              showPlaceholderOptions
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/music#songs"
                className="inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
              >
                Return to Songs
              </Link>
              <Link
                href="/about#bio"
                className="inline-flex min-h-12 items-center justify-center border border-gold/35 px-6 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition hover:border-gold hover:bg-gold/10"
              >
                Meet Will
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
