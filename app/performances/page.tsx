import type { Metadata } from "next";
import { Ensembles } from "@/components/Ensembles";
import { PageIntro } from "@/components/PageIntro";
import { PerformanceMarketing } from "@/components/PerformanceMarketing";
import { UpcomingPerformances } from "@/components/UpcomingPerformances";
import { WeddingPackagesAvailability } from "@/components/WeddingPackagesAvailability";

export const metadata: Metadata = {
  title: "Live Violin Performances | Weddings, Events, and Concerts",
  description:
    "Plan live violin music with William Samorey for weddings, ceremonies, private events, concerts, and special gatherings.",
  alternates: {
    canonical: "/performances",
  },
};

export default function PerformancesPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="performance"
        eyebrow="Performances"
        title="Live violin music shaped for ceremonies, gatherings, concerts, and celebration."
        copy="Explore wedding and event music, package options, ensemble formats, and upcoming opportunities to hear William perform live."
      />
      <PerformanceMarketing />
      <WeddingPackagesAvailability />
      <Ensembles />
      <UpcomingPerformances />
    </main>
  );
}
