import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on design systems, AdTech, AI-powered workflows, and the future of digital experiences by Vivekanand Choudhari.",
  openGraph: {
    title: "Blog — Vivekanand Choudhari",
    description:
      "Insights on design systems, AdTech, AI-powered workflows, and the future of digital experiences.",
    images: [
      {
        url: "/api/og?title=Insights%20%26%20Ideas&category=Blog",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Vivekanand Choudhari",
    description:
      "Insights on design systems, AdTech, AI-powered workflows, and the future of digital experiences.",
    images: ["/api/og?title=Insights%20%26%20Ideas&category=Blog"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
