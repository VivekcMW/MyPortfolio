import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framework Comparison | Multi-Platform Design System",
  description: "Compare how the same design tokens translate to Tailwind CSS, Bootstrap 5, and Ant Design 5. Single source, multiple frameworks.",
  openGraph: {
    title: "Framework Comparison | Multi-Platform Design System",
    description: "See design tokens rendered in Tailwind, Bootstrap, and Ant Design side-by-side with live token controls.",
    type: "website",
  },
};

export default function FrameworkComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
