import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About William Samorey | Violinist and Teacher",
  description:
    "Learn about William Samorey's violin performance, teaching, instrument care background, and Winspiration Studio in the Twin Cities and Midwest.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
