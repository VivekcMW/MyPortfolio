import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Vivekanand Choudhari — Lead Design Engineer with 8+ years of experience across AdTech, Healthcare, IoT, and OTT.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Vivekanand Choudhari",
    description:
      "Lead Design Engineer with 8+ years of experience across AdTech, Healthcare, IoT, and OTT.",
    url: "/about",
    images: [
      {
        url: "/api/og?title=About%20Vivekanand%20Choudhari&category=Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Vivekanand Choudhari",
    description:
      "Lead Design Engineer with 8+ years of experience across AdTech, Healthcare, IoT, and OTT.",
    images: ["/api/og?title=About%20Vivekanand%20Choudhari&category=Portfolio"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
