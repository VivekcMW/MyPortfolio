import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forma Research — Manifest-Driven UI Infrastructure",
  description:
    "A comprehensive deep-dive into Forma — the open-core infrastructure platform that lets SaaS companies ship one product that feels custom-built for every user. Architecture, research methodology, design decisions, personas, market analysis, and real-world use cases across CRM, Healthcare, Science, and Big SaaS.",
  alternates: {
    canonical: "/research/forma",
  },
  openGraph: {
    title: "Forma — The Infrastructure for Malleable Software",
    description:
      "Full research document: architecture, 360-domain taxonomy, component catalog, personas, market study, and real use cases.",
    url: "/research/forma",
    images: [
      {
        url: "/api/og?title=Forma%20%E2%80%94%20Infrastructure%20for%20Malleable%20Software&category=Research",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forma — The Infrastructure for Malleable Software",
    description:
      "Full research document: architecture, 360-domain taxonomy, component catalog, personas, market study, and real use cases.",
    images: ["/api/og?title=Forma%20%E2%80%94%20Infrastructure%20for%20Malleable%20Software&category=Research"],
  },
};

export default function FormaResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
