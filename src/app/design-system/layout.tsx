import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Systems Lab",
  description:
    "An interactive showcase of multi-domain design systems — OOH Advertising, Data Science, AI Applications, Design Engineering, FinTech, and Consumer. Explore color palettes, typography, components, and design research.",
  openGraph: {
    title: "Design Systems Lab",
    description:
      "Six domain-specific design systems with interactive palette switching, component previews, and research documentation.",
    url: "/design-system",
    siteName: "Vivekanand Choudhari",
    locale: "en_US",
    type: "website",
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
