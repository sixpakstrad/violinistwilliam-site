import { Ensembles } from "@/components/Ensembles";
import { PageIntro } from "@/components/PageIntro";

export default function GroupsPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="groups"
        eyebrow="Groups"
        title="Ensemble options scaled to the room, the guest list, and the feeling."
        copy="From solo violin to string quartet, each format offers a different level of intimacy, depth, and resonance."
      />
      <Ensembles />
    </main>
  );
}
