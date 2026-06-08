import { PageIntro } from "@/components/PageIntro";
import { RatesContent } from "@/components/RatesContent";

export default function RatesPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="rates"
        eyebrow="Rates"
        title="Wedding packages shaped around timing, location, and musical scope."
        copy="Pricing below reflects one performer/person. Additional performers, custom requests, and travel details can be quoted after the event date and location are known."
      />

      <RatesContent />
    </main>
  );
}
