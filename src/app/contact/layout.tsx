import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for design engineering roles, product collaborations, and freelance opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Let's Work Together",
    description:
      "Get in touch for design engineering roles, product collaborations, and freelance opportunities.",
    url: "/contact",
    images: [
      {
        url: "/api/og?title=Get%20in%20Touch&category=Contact",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Let's Work Together",
    description:
      "Get in touch for design engineering roles, product collaborations, and freelance opportunities.",
    images: ["/api/og?title=Get%20in%20Touch&category=Contact"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
