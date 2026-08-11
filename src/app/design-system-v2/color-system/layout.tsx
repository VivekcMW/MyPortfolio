import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color System | Multi-Platform Design System",
  description:
    "Psychology-grounded color decisions backed by contrast math, perceptual uniformity, and 10 years of shipped products. WCAG AAA compliance, colorblind-safe palettes, and semantic color mapping.",
  openGraph: {
    title: "Color System | Vivekanand Choudhari",
    description:
      "Color is psychology made visual — explore the principles, contrast matrix, and validation framework behind every color decision.",
    type: "website",
  },
};

export default function ColorSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
