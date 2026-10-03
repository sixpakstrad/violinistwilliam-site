import type { Metadata } from "next";
import { Ensembles } from "@/components/Ensembles";
import { PageIntro } from "@/components/PageIntro";
import { PerformanceMarketing } from "@/components/PerformanceMarketing";
import { UpcomingPerformances } from "@/components/UpcomingPerformances";
import { WeddingPackagesAvailability } from "@/components/WeddingPackagesAvailability";
import { readPublishedPageIntro } from "@/lib/supabasePageIntros";
import { readPublishedPricing } from "@/lib/supabaseSiteContent";

export const metadata: Metadata = {
  title: "Wedding & Event String Music | Minneapolis–St. Paul",
  description:
    "Live string music curated by William Samorey for weddings, ceremonies, cocktail hours, receptions, private events, and special gatherings throughout the Twin Cities and Midwest.",
  alternates: {
    canonical: "/weddings-and-events",
  },
};

export default async function WeddingsAndEventsPage() {
  const [pageIntro, pricing] = await Promise.all([
    readPublishedPageIntro("performance"),
    readPublishedPricing(),
  ]);

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="performance"
        content={pageIntro}
        eyebrow="Weddings & Events"
        title="Live string music, curated by William, for the moments you'll remember."
        copy="William offers and curates live music ranging from solo violin to chamber ensembles for weddings, celebrations, private events, and special gatherings."
      />
      <PerformanceMarketing />
      <WeddingPackagesAvailability pricing={pricing} />
      <Ensembles />
      <UpcomingPerformances />
    </main>
  );
}
