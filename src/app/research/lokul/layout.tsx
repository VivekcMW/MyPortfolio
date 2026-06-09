import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lokul Research — Hyperlocal Neighborhood Economy Platform",
  description:
    "A comprehensive deep-dive into Lokul — the hyperlocal neighborhood platform for urban India that replaces fragmented WhatsApp groups, MyGate apps, and classifieds with a single trusted community OS for Indian neighborhoods. Architecture, product evolution (v1→v2→v3), personas, market analysis, design decisions, and roadmap.",
  alternates: {
    canonical: "/research/lokul",
  },
  openGraph: {
    title: "Lokul — The 200-Meter Economy Platform",
    description:
      "Full research document: hyperlocal market thesis, architecture, 42-model schema, 90+ screens, peer economy design decisions, and the v3 national infrastructure vision.",
    url: "/research/lokul",
    images: [
      {
        url: "/api/og?title=Lokul%20%E2%80%94%20The%20200-Meter%20Economy%20Platform&category=Research",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokul — The 200-Meter Economy Platform",
    description:
      "Full research document: hyperlocal market thesis, architecture, 42-model schema, 90+ screens, peer economy design decisions, and the v3 national infrastructure vision.",
    images: ["/api/og?title=Lokul%20%E2%80%94%20The%20200-Meter%20Economy%20Platform&category=Research"],
  },
};

export default function LokulResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
