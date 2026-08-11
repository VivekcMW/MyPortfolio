import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Tokens | Multi-Platform Design System",
  description: "Download design tokens as NPM package, Figma plugin, JSON, CSS, SCSS, or Tailwind config. Multiple export formats for every platform.",
  openGraph: {
    title: "Download Tokens | Multi-Platform Design System",
    description: "Get the design system in your preferred format: NPM, Figma, JSON, CSS, SCSS, or Tailwind.",
    type: "website",
  },
};

export default function DownloadCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
