import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Designer. Builder. Product Scaler. 8+ years of experience crafting products across AdTech, Healthcare, IoT, and OTT platforms.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Designer. Builder. Product Scaler.",
    description:
      "8+ years of experience crafting products across AdTech, Healthcare, IoT, and OTT platforms.",
    url: "/about",
    images: [
      {
        url: "/api/og?title=About%20Me&category=Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Designer. Builder. Product Scaler.",
    description:
      "8+ years of experience crafting products across AdTech, Healthcare, IoT, and OTT platforms.",
    images: ["/api/og?title=About%20Me&category=Portfolio"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
