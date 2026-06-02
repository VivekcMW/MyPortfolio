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
  return <BlogPostClient slug={params.slug} />;
}
