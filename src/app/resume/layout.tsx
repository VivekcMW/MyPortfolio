import type { Metadata } from "next";

export const metadata: Metadata = {
  // Bare "Resume" — the root layout's `%s | Vivekanand Choudhari` template adds the
  // name. Baking it in here produced "Resume — Vivekanand Choudhari | Vivekanand
  // Choudhari". The openGraph/twitter titles below are NOT templated, so they keep
  // the full form for social cards.
  title: "Resume",
  description:
    "Senior UI/UX Designer & AI Product Designer. 9+ years building B2B SaaS and AI platforms. Expertise in UX strategy, design systems, agentic UI, and design leadership.",
  openGraph: {
    title: "Resume — Vivekanand Choudhari",
    description:
      "Senior UI/UX Designer & AI Product Designer. 9+ years building B2B SaaS and AI platforms.",
    url: "https://uxvivek.netlify.app/resume",
    type: "profile",
    images: [
      {
        url: "https://uxvivek.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vivekanand Choudhari — Product Design Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Vivekanand Choudhari",
    description:
      "Senior UI/UX Designer & AI Product Designer. 9+ years building B2B SaaS and AI platforms.",
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
