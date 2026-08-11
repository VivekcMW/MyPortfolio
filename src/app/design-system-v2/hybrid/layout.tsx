import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hybrid UI Demo | Multi-Platform Design System",
  description: "Three density modes (relaxed, default, compact) for B2B SaaS applications. Auto-detection based on user behavior patterns.",
  openGraph: {
    title: "Hybrid UI Demo | Multi-Platform Design System",
    description: "See how density modes adapt UI for novice vs power users with live demo.",
    type: "website",
  },
};

export default function HybridUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
