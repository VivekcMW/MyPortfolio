import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Vivekanand Choudhari",
  description:
    "Senior Lead UX Designer & AI Product Manager. 9+ years building B2B SaaS and AI platforms. Expertise in product strategy, design systems, agentic UI, and design leadership.",
  openGraph: {
    title: "Resume — Vivekanand Choudhari",
    description:
      "Senior Lead UX Designer & AI Product Manager. 9+ years building B2B SaaS and AI platforms.",
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
      "Senior Lead UX Designer & AI Product Manager. 9+ years building B2B SaaS and AI platforms.",
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
