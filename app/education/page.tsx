import type { Metadata } from "next";
import { EducationContent } from "@/components/EducationContent";
import { PageIntro } from "@/components/PageIntro";
import { readPublishedPageIntro } from "@/lib/supabasePageIntros";

export const metadata: Metadata = {
  title: "Education | William Samorey",
  description:
    "Private violin lessons with William Samorey, including how to start lessons, lesson pricing, virtual lesson options, and teaching philosophy.",
  alternates: {
    canonical: "/education",
  },
};

export default async function EducationPage() {
  const pageIntro = await readPublishedPageIntro("education");

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="education"
        content={pageIntro}
        eyebrow="Education"
        title="Private violin lessons shaped around sound, patience, and progress."
        copy="A practical teaching home for beginners, advancing students, adult players, and families building a thoughtful musical routine."
      />

      <EducationContent />
    </main>
  );
}
