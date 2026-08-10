import type { Metadata } from "next";
import { DonateContent } from "@/components/DonateContent";

export const metadata: Metadata = {
  title: "Support William Samorey | Tips and Performance Thanks",
  description:
    "Support William Samorey after a live performance or song request with optional tip and appreciation options.",
  alternates: {
    canonical: "/donate",
  },
};

export default function DonatePage() {
  return <DonateContent />;
}
