import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craft — Interaction Studies",
  description:
    "Small, focused interaction studies — each demo pairs a live micro-interaction with the psychology principle that makes it work and the code behind it.",
  openGraph: {
    title: "Craft — Interaction Studies",
    description:
      "Live micro-interactions paired with the psychology principles that make them work.",
    images: [
      {
        url: "/api/og?title=Craft&category=Interaction%20Studies",
        width: 1200,
        height: 630,
        alt: "Craft — Interaction Studies",
      },
    ],
  },
  alternates: { canonical: "/craft" },
};

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}
