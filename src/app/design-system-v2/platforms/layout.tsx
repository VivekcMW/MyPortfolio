import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Adapters | Multi-Platform Design System",
  description: "See how design tokens adapt across 10+ platforms: web, mobile, desktop, voice, AR, email, and IoT. Single source, multiple outputs.",
  openGraph: {
    title: "Platform Adapters | Multi-Platform Design System",
    description: "Design tokens adapted for web, mobile, voice UI, AR, and more platforms from a single source of truth.",
    type: "website",
  },
};

export default function PlatformAdaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
