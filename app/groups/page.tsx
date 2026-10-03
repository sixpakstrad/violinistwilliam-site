import type { Metadata } from "next";
import { Ensembles } from "@/components/Ensembles";
import { PageIntro } from "@/components/PageIntro";
import { readPublishedPageIntro } from "@/lib/supabasePageIntros";

export const metadata: Metadata = {
  title: "String Ensembles | Solo Violin, Trio, and Quartet Options",
  description:
    "Explore live music ensemble options with William Samorey, from solo violin to string trio and quartet formats for events and weddings.",
  alternates: {
    canonical: "/groups",
  },
};

export default async function GroupsPage() {
  const pageIntro = await readPublishedPageIntro("groups");

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="groups"
        content={pageIntro}
        eyebrow="Groups"
        title="Ensemble options scaled to the room, the guest list, and the feeling."
        copy="From solo violin to string quartet, each format offers a different level of intimacy, depth, and resonance."
      />
      <Ensembles />
    </main>
  );
}
