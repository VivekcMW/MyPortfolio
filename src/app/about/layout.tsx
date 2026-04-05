import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Vivekanand Choudhari — Lead Design Engineer with 8+ years of experience across AdTech, Healthcare, IoT, and OTT.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
