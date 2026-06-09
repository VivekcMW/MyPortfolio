import type { Metadata } from "next";
import { DM_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import StatusBar from "@/components/StatusBar";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vivekanand.dev"),
  title: {
    default: "Designer. Builder. Product Scaler. — Portfolio",
    template: "%s | Portfolio",
  },
  description:
    "A design engineer who designs systems, builds products, and scales them to millions. 8+ years crafting products across AdTech, Healthcare, IoT, and OTT platforms.",
  keywords: [
    "Design Engineer",
    "UI UX Designer",
    "Product Designer",
    "Frontend Engineer",
    "Design Systems",
    "AdTech",
    "Moving Walls",
    "OOH DOOH",
    "Portfolio",
  ],
  openGraph: {
    title: "Designer. Builder. Product Scaler.",
    description:
      "A design engineer who designs systems, builds products, and scales them to millions.",
    url: "https://vivekanand.dev",
    images: [
      {
        url: "/api/og?title=Designer.%20Builder.%20Scaler.&category=Portfolio",
        width: 1200,
        height: 630,
        alt: "Designer. Builder. Product Scaler. — Portfolio",
      },
    ],
    siteName: "Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Designer. Builder. Product Scaler.",
    description:
      "A design engineer who designs systems, builds products, and scales them to millions.",
    images: ["/api/og?title=Designer.%20Builder.%20Scaler.&category=Portfolio"],
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
  return (
    <html
      lang="en"
      className={`        ${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">
        <div className="relative overflow-x-clip">
          <SmoothScroll />
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
          <StatusBar />
        </div>
      </body>
    </html>
  );
}
