import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import StatusBar from "@/components/StatusBar";
import BackToTop from "@/components/BackToTop";
import MotionProvider from "@/components/MotionProvider";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Fraunces: Display serif for hero headlines
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

// Syne: Geometric sans for labels/metadata
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vivekanand Choudhari — Senior Lead UX Designer & AI Product Manager",
    template: "%s | Vivekanand Choudhari",
  },
  description:
    "Product design leader with 9+ years building B2B SaaS and AI platforms for over a million users. Currently owning design strategy and product definition across a 7-product programmatic DOOH portfolio at Moving Walls — MW Activate (pDOOH DSP), MW Cinema (IMS), MW PosterOps (closed-loop OOH), and the Hybrid / Agentic UI roadmap through 2027.",
  keywords: [
    "AI Product Manager",
    "Senior Lead UX Designer",
    "Agentic UI Design",
    "AI Product Design",
    "Programmatic DOOH",
    "OpenRTB 2.6",
    "DSP SSP Integrations",
    "PRD Authoring",
    "Design Systems",
    "Design Engineer",
    "AdTech",
    "Moving Walls",
    "OOH DOOH",
    "Portfolio",
  ],
  openGraph: {
    title: "Vivekanand Choudhari — Senior Lead UX Designer & AI Product Manager",
    description:
      "9+ years designing AI, agentic, and programmatic DOOH products used by over a million people. Design leadership, PRDs, roadmaps, and design systems that ship.",
    url: SITE_URL,
    images: [
      {
        url: "/api/og?title=Senior%20Lead%20UX%20Designer%20%26%20AI%20Product%20Manager&category=Portfolio",
        width: 1200,
        height: 630,
        alt: "Vivekanand Choudhari — Senior Lead UX Designer & AI Product Manager",
      },
    ],
    siteName: "Vivekanand Choudhari",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivekanand Choudhari — Senior Lead UX Designer & AI Product Manager",
    description:
      "9+ years designing AI, agentic, and programmatic DOOH products used by over a million people.",
    images: [
      "/api/og?title=Senior%20Lead%20UX%20Designer%20%26%20AI%20Product%20Manager&category=Portfolio",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vivekanand Choudhari",
    url: SITE_URL,
    jobTitle: "Senior Lead UX Designer & AI Product Manager",
    description:
      "Product design leader with 9+ years across AdTech, Construction Cloud, Healthcare, AIOps, IIoT, and Big Data. Owns design strategy and product definition across a 7-product programmatic DOOH portfolio at Moving Walls.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Product Management",
      "AI Product Design",
      "Agentic UI",
      "Programmatic DOOH",
      "OpenRTB 2.6",
      "IAB Taxonomies",
      "DSP / SSP Ecosystems",
      "Design Systems",
      "PRD Authoring",
      "Roadmapping (RICE)",
      "Design Leadership",
      "Frontend Engineering",
    ],
    sameAs: [
      "https://www.linkedin.com/in/vivekanand-choudhari-817829118/",
      "https://github.com/vivekanandchoudhari",
      "https://dribbble.com/VivekanandChoudhari",
      "https://www.behance.net/vivekanand6f29C",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <div className="relative overflow-x-clip">
            <SmoothScroll />
            <ScrollProgress />
            <CursorGlow />
            <Navbar />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <BackToTop />
            <StatusBar />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
