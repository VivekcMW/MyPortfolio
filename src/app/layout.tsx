import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import CommandPalette from "@/components/CommandPalette";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vivekanand Choudhari — Lead Design Engineer",
    template: "%s | Vivekanand Choudhari",
  },
  description:
    "Lead UI/UX Design Engineer crafting world-class products across AdTech, Healthcare, IoT, and OTT platforms. Turning complex data into elegant experiences.",
  keywords: [
    "Vivekanand Choudhari",
    "Design Engineer",
    "UI UX Designer",
    "AdTech",
    "Moving Walls",
    "OOH DOOH",
    "Portfolio",
  ],
  authors: [{ name: "Vivekanand Choudhari" }],
  openGraph: {
    title: "Vivekanand Choudhari — Lead Design Engineer",
    description:
      "Crafting world-class products across AdTech, Healthcare, IoT, and OTT.",
    url: "https://vivekanand.dev",
    siteName: "Vivekanand Choudhari",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivekanand Choudhari — Lead Design Engineer",
    description:
      "Crafting world-class products across AdTech, Healthcare, IoT, and OTT.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">
        <CursorGlow />
        <CommandPalette />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
