import type { Metadata } from "next";
import { DonateContent } from "@/components/DonateContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/donate",
  },
};

export default function DonatePage() {
  return <DonateContent />;
}
