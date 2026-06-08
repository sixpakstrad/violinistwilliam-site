import { Ensembles } from "@/components/Ensembles";
import { PageIntro } from "@/components/PageIntro";
import { PerformanceMarketing } from "@/components/PerformanceMarketing";
import { UpcomingPerformances } from "@/components/UpcomingPerformances";
import { WeddingPackagesAvailability } from "@/components/WeddingPackagesAvailability";

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
