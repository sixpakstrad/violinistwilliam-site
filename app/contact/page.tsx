import { Inquiry } from "@/components/Inquiry";
import { PageIntro } from "@/components/PageIntro";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="contact"
        eyebrow="Contact / Inquire"
        title="Choose the right conversation for the music, lesson, or instrument care you need."
        copy="Use the inquiry forms below to share performance details, teaching goals, or bow and instrument care questions."
      />
      <Inquiry />
    </main>
  );
}
