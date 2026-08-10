import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow AI search engines and crawlers
      {
        userAgent: [
          "GPTBot", // OpenAI ChatGPT
          "ChatGPT-User",
          "Google-Extended", // Google Bard/Gemini
          "anthropic-ai", // Claude
          "Claude-Web",
          "PerplexityBot", // Perplexity AI
          "YouBot", // You.com
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
