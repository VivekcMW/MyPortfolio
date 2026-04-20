import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "A living, interactive design system showcasing cross-domain adaptability across FinTech, HealthTech, ConTech, AdTech, SaaS, and Consumer applications.",
  openGraph: {
    title: "Design System | Vivekanand Choudhari",
    description:
      "One system, every domain. Explore an adaptive design system built for startups across industries.",
    images: [
      {
        url: "/api/og?title=Design%20System&category=Cross-Domain",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
