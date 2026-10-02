import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { RatesContent } from "@/components/RatesContent";
import { readPublishedPricing } from "@/lib/supabaseSiteContent";

export const metadata: Metadata = {
  title: "Wedding Violin Rates and Packages | William Samorey",
  description:
    "Review wedding violin package details, event music pricing guidance, ensemble options, and custom quote information.",
  alternates: {
    canonical: "/rates",
  },
};

export default async function RatesPage() {
  const pricing = await readPublishedPricing();

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="rates"
        eyebrow="Rates"
        title="Wedding packages shaped around timing, location, and musical scope."
        copy="Pricing below reflects one performer/person. Additional performers, custom requests, and travel details can be quoted after the event date and location are known."
      />

      <RatesContent pricing={pricing} />
    </main>
  );
}
