import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My AI",
  description:
    "Explore the AI ecosystem powering my work — coding agents, automation pipelines, and creative tools I use daily.",
  alternates: {
    canonical: "/my-ai",
  },
  openGraph: {
    title: "My AI Stack — Vivekanand Choudhari",
    description: "The AI ecosystem powering my work — coding agents, automation pipelines, and creative tools.",
    url: "/my-ai",
    images: [
      {
        url: "/api/og?title=My%20AI%20Stack&category=Tools",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My AI Stack — Vivekanand Choudhari",
    description: "The AI ecosystem powering my work — coding agents, automation pipelines, and creative tools.",
    images: ["/api/og?title=My%20AI%20Stack&category=Tools"],
  },
};

export default function MyAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
