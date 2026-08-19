import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Real Designs",
  description:
    "Real screens from shipped work — select a project to browse the actual designs, pulled straight from Figma.",
  openGraph: {
    title: "Portfolio — Real Designs",
    description: "Real screens from shipped work, browsable by project.",
    images: [
      {
        url: "/api/og?title=Portfolio&category=Real%20Designs",
        width: 1200,
        height: 630,
        alt: "Portfolio — Real Designs",
      },
    ],
  },
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
