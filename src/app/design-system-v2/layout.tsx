import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Platform Design System | Vivekanand Choudhari",
  description: "Token-first design system supporting 10+ platforms including web, mobile, voice, and AR. Framework agnostic with Tailwind, Bootstrap, and Ant Design integration.",
  openGraph: {
    title: "Multi-Platform Design System | Vivekanand Choudhari",
    description: "Token-first design system supporting 10+ platforms. Includes Agentic AI patterns and Hybrid UI for B2B SaaS.",
    type: "website",
  },
};

export default function DesignSystemV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
