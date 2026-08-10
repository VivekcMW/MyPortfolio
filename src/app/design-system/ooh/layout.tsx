import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OOH Advertising — Design System",
  description:
    "A movement-first design system for Out-of-Home advertising. Energy Blue palette, DOOH components, audience-driven patterns.",
  openGraph: {
    title: "OOH Advertising Design System",
    description:
      "Blueprint for digital out-of-home advertising interfaces — brand identity, design tokens, component catalog, and DOOH patterns.",
    url: "/design-system/ooh",
    siteName: "Vivekanand Choudhari",
    locale: "en_US",
    type: "website",
  },
};

export default function OOHLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
