import { getAllPosts } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getAllPosts().find((p) => p.slug === params.slug);
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        keywords: post.tags.join(", "),
        author: {
          "@type": "Person",
          name: "Vivekanand Choudhari",
          url: "https://vivekanand.dev",
        },
        mainEntityOfPage: `https://vivekanand.dev/blog/${post.slug}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient slug={params.slug} />
    </>
  );
}
