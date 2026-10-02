import type { Metadata } from "next";
import { RepairPageContent } from "@/components/RepairPageContent";

export const metadata: Metadata = {
  title: "Bow Rehair, Repair, and Instrument Care | William Samorey",
  description:
    "Bow rehair, bow repair, setup, and instrument care for violin, viola, cello, bass, and period-instrument players.",
  alternates: {
    canonical: "/luthier-services",
  },
};

export default function LuthierServicesPage() {
  return <RepairPageContent />;
}
