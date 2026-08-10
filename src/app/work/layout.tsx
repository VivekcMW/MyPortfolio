import type { Metadata } from "next";

export const metadata: Metadata = {
  // A plain-string title here would clear the root layout's template for every
  // descendant, leaving case studies with a bare, suffix-less <title>. Restating
  // the template keeps /work/[slug] consistent with the rest of the site.
  title: {
    default: "Work",
    template: "%s | Vivekanand Choudhari",
  },
  description: "Case studies and detailed project breakdowns across AdTech, Healthcare, IoT, and OTT.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Selected Case Studies",
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
    title: "Work — Selected Case Studies",
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
