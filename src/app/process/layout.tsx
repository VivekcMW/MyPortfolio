import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process — From Idea to Shipped",
  description:
    "The full method: signal & framing → design brief → research → psychology mapping → architecture & flows → UI & system → validate, ship, loop. Every stage links to real shipped work.",
  openGraph: {
    title: "Process — From Idea to Shipped",
    description:
      "A 7-stage product design method — every stage gated, every stage demonstrated in real shipped work.",
    images: [
      {
        url: "/api/og?title=From%20Idea%20to%20Shipped&category=The%20Process",
        width: 1200,
        height: 630,
        alt: "Process — From Idea to Shipped",
      },
    ],
  },
  alternates: { canonical: "/process" },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
