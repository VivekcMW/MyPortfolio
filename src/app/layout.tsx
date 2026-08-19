import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    default: "Vivekanand Choudhari — Senior UI/UX Designer & AI Product Designer | Portfolio",
    template: "%s | Vivekanand Choudhari",
  },
  description:
    "Vivekanand Choudhari: Senior UI/UX Designer & AI Product Designer in Bengaluru, India. 9+ years designing AI-powered products, agentic interfaces, and programmatic DOOH platforms for 1M+ users. Expert in UX research, design systems, OpenRTB, and design engineering. Portfolio of B2B SaaS, AdTech, Healthcare, Construction, and IoT solutions.",
  keywords: [
    // Name variations for search
    "Vivekanand Choudhari",
    "Vivekanand Choudhari UX Designer",
    "Vivekanand Choudhari Product Designer",
    "Vivekanand Choudhari Portfolio",
    "Vivekanand Choudhari Bengaluru",
    "Vivekanand Choudhari India",
    // Job titles and roles
    "Senior UI/UX Designer",
    "UX Design Lead",
    "Product Design Leader",
    "Design Strategist",
    "AI Product Designer",
    "UI/UX Designer",
    "Design Engineering",
    // Specializations
    "Agentic UI Design",
    "AI Interface Design",
    "Conversational AI Design",
    "AI Product Design",
    "Machine Learning UX",
    "LLM Product Design",
    // DOOH & AdTech
    "Programmatic DOOH",
    "Digital Out of Home",
    "DOOH Platform Design",
    "OpenRTB 2.6",
    "DSP Design",
    "SSP Integration",
    "AdTech UX",
    "Programmatic Advertising",
    "RTB Platform",
    "IAB Standards",
    // Product Design
    "0-to-1 Product Design",
    "Product Discovery",
    "UX Strategy",
    "End-to-End Product Design",
    // Design Systems & Engineering
    "Design Systems",
    "Component Libraries",
    "Design Tokens",
    "Frontend Design",
    "React Designer",
    "TypeScript UX",
    "Figma Expert",
    // Industries
    "B2B SaaS Design",
    "Enterprise UX",
    "Healthcare UX",
    "Construction Tech",
    "IoT Dashboard Design",
    "Big Data Visualization",
    // Methods & Frameworks
    "Design Thinking",
    "User Research",
    "Contextual Inquiry",
    "Jobs to be Done",
    "Behavioral Psychology",
    "Lean UX",
    // Location
    "UX Designer Bengaluru",
    "Product Designer Bangalore",
    "India AI Product Designer",
  ],
  authors: [
    {
      name: "Vivekanand Choudhari",
      url: SITE_URL,
    },
  ],
  creator: "Vivekanand Choudhari",
  publisher: "Vivekanand Choudhari",
  category: "Design & Technology",
  openGraph: {
    title: "Vivekanand Choudhari — Senior UI/UX Designer & AI Product Designer | Portfolio",
    description:
      "9+ years designing AI-powered products, agentic interfaces, and programmatic DOOH platforms for 1M+ users. Expert in UX research, design systems, OpenRTB, and design engineering. Portfolio featuring B2B SaaS, AdTech, Healthcare, Construction, and IoT solutions.",
    url: SITE_URL,
    images: [
      {
        url: "/api/og?title=Senior%20UI%2FUX%20Designer%20%26%20AI%20Product%20Designer&category=Portfolio",
        width: 1200,
        height: 630,
        alt: "Vivekanand Choudhari — Senior UI/UX Designer & AI Product Designer in Bengaluru, India",
      },
    ],
    siteName: "Vivekanand Choudhari Portfolio",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vivekanand",
    creator: "@vivekanand",
    title: "Vivekanand Choudhari — Senior UI/UX Designer & AI Product Designer",
    description:
      "9+ years designing AI-powered products, agentic interfaces, and programmatic DOOH platforms for 1M+ users. Portfolio of B2B SaaS, AdTech, Healthcare, and IoT solutions.",
    images: [
      "/api/og?title=Senior%20UI%2FUX%20Designer%20%26%20AI%20Product%20Designer&category=Portfolio",
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
  // Enhanced Person schema for Google and AI search engines
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vivekanand Choudhari",
    alternateName: ["Vivekanand", "Vivek Choudhari"],
    url: SITE_URL,
    image: `${SITE_URL}/api/og?title=Vivekanand%20Choudhari&category=Portfolio`,
    jobTitle: "Senior UI/UX Designer & AI Product Designer",
    worksFor: {
      "@type": "Organization",
      name: "Moving Walls",
      sameAs: "https://www.movingwalls.com",
    },
    description:
      "Design leader with 9+ years across AdTech, Construction Cloud, Healthcare, AIOps, IIoT, and Big Data. Specializes in AI-powered products, agentic interfaces, programmatic DOOH platforms, and design systems. Leads UX and design systems across a 7-product programmatic DOOH portfolio.",
    email: "vivekanand.design@gmail.com",
    telephone: "+919071933517",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    nationality: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "UI/UX Design",
      "AI Product Design",
      "Agentic UI",
      "Conversational Interfaces",
      "Large Language Models (LLM) UX",
      "Programmatic DOOH",
      "OpenRTB 2.6",
      "IAB Taxonomies",
      "DSP / SSP Ecosystems",
      "Real-Time Bidding",
      "Design Systems",
      "Component Libraries",
      "Design Tokens",
      "UX Strategy",
      "Design Leadership",
      "User Research",
      "Contextual Inquiry",
      "Jobs to be Done (JTBD)",
      "Behavioral Psychology",
      "Frontend Engineering",
      "React",
      "TypeScript",
      "Figma",
      "Design Engineering",
      "B2B SaaS Design",
      "Enterprise UX",
      "AdTech",
      "Healthcare UX",
      "Construction Tech",
      "IoT Dashboards",
      "Data Visualization",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "UX Designer",
      occupationLocation: {
        "@type": "City",
        name: "Bengaluru",
      },
      skills: [
        "User Experience Design",
        "UI Design",
        "AI Product Design",
        "Design Systems",
        "Frontend Development",
        "User Research",
        "Interaction Design",
        "Visual Design",
        "Prototyping",
        "Design Thinking",
      ],
      experienceRequirements: "9+ years",
    },
    sameAs: [
      "https://www.linkedin.com/in/vivekanand-choudhari-817829118/",
      "https://github.com/vivekanandchoudhari",
      "https://dribbble.com/VivekanandChoudhari",
      "https://www.behance.net/vivekanand6f29C",
      SITE_URL,
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Manipal Institute of Technology",
      },
    ],
  };

  // Professional Service schema
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Vivekanand Choudhari - UI/UX & AI Product Design Consulting",
    description:
      "Expert UI/UX and AI product design services for B2B SaaS, AdTech, Healthcare, and Enterprise platforms. Specializing in agentic interfaces, design systems, and 0-to-1 product design.",
    provider: {
      "@type": "Person",
      name: "Vivekanand Choudhari",
    },
    areaServed: ["IN", "US", "SG", "Global"],
    serviceType: [
      "UX Design",
      "UI Design",
      "AI Product Design",
      "Design Systems",
      "User Research",
      "Interaction Design",
      "Design Engineering",
    ],
    url: SITE_URL,
  };

  // FAQ schema for common queries
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Vivekanand Choudhari do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vivekanand Choudhari is a Senior UI/UX Designer and AI Product Designer with 9+ years of experience designing AI-powered products, agentic interfaces, and programmatic DOOH platforms for over 1 million users. He specializes in UX strategy, design systems, and user research.",
        },
      },
      {
        "@type": "Question",
        name: "What is Vivekanand Choudhari's expertise?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vivekanand specializes in AI product design, agentic UI, programmatic DOOH (Digital Out-of-Home advertising), OpenRTB 2.6, design systems, user research, interaction design, and design engineering. He has expertise across AdTech, Healthcare, Construction, IoT, and B2B SaaS industries.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Vivekanand Choudhari located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vivekanand Choudhari is based in Bengaluru (Bangalore), Karnataka, India, and works with clients globally.",
        },
      },
      {
        "@type": "Question",
        name: "What industries has Vivekanand Choudhari worked in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vivekanand has worked across multiple industries including AdTech/DOOH, Healthcare (EHR platforms), Construction Tech (Cloud-based construction management), IoT & Big Data (industrial monitoring), AIOps, and Entertainment (OTT streaming platforms).",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Vivekanand Choudhari?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Vivekanand Choudhari via email at vivekanand.design@gmail.com, phone/WhatsApp at +919071933517, or through his website contact form at " + SITE_URL + "/contact",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Verification tags for search consoles */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        {/* Geo-targeting for local search */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
      </head>
      <body className="min-h-full flex flex-col grain">
        {/* Multiple JSON-LD schemas for comprehensive SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <div className="relative overflow-x-clip">
            <SmoothScroll />
            <ScrollProgress />
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
