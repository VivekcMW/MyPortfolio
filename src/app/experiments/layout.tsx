import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments & Use Cases",
  description:
    "A curated collection of hands-on experiments, technical explorations, and real-world use cases — from AI agents and automation pipelines to design system prototypes and full-stack proofs-of-concept.",
  alternates: {
    canonical: "/experiments",
  },
  openGraph: {
    title: "Experiments & Use Cases — The Lab",
    description:
      "A curated collection of hands-on experiments, technical explorations, and real-world use cases.",
    url: "/experiments",
    images: [
      {
        url: "/api/og?title=Experiments%20%26%20Use%20Cases&category=Lab",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiments & Use Cases — The Lab",
    description:
      "A curated collection of hands-on experiments, technical explorations, and real-world use cases.",
    images: ["/api/og?title=Experiments%20%26%20Use%20Cases&category=Lab"],
  },
};

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
