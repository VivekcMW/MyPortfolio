import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process — From Idea to Shipped",
  description:
    "The full method: PRD → research → psychology mapping → the Paradigm Gate (agentic vs hybrid vs traditional vs zero-UI) → flows → system → ship. Demonstrated end-to-end on a generative AI product for millions of daily users.",
  openGraph: {
    title: "Process — From Idea to Shipped",
    description:
      "Same research, four interface futures. A complete product design method demonstrated on an AI workspace assistant.",
    images: [
      {
        url: "/api/og?title=From%20Idea%20to%20Shipped&category=The%20Process",
        width: 1200,
        height: 630,
        alt: "Process — From Idea to Shipped",
      },
    ],
  },
  alternates: { canonical: "/process" },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
