import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and detailed project breakdowns by Vivekanand Choudhari.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Vivekanand Choudhari",
    description: "Case studies and detailed project breakdowns across AdTech, Healthcare, IoT, and OTT.",
    url: "/work",
    images: [
      {
        url: "/api/og?title=Selected%20Work%20%26%20Case%20Studies&category=Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Vivekanand Choudhari",
    description: "Case studies and detailed project breakdowns across AdTech, Healthcare, IoT, and OTT.",
    images: ["/api/og?title=Selected%20Work%20%26%20Case%20Studies&category=Portfolio"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
