import type { Metadata } from "next";
import { projectData } from "@/lib/work/project-data";
import CaseStudyClient from "./CaseStudyClient";

/**
 * Server shell. It exists so each case study can export its own metadata —
 * a "use client" page can't, which is why every case study previously
 * inherited the parent layout's static "Work | Vivekanand Choudhari".
 */

export function generateStaticParams() {
  // Derived from the data so a new case study is prerendered automatically.
  return Object.keys(projectData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData[slug];
  if (!project) {
    return { title: "Case Study" };
  }
  return {
    title: project.title,
    description: project.heroDesc,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.heroDesc,
      url: `/work/${slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}&category=${encodeURIComponent(project.category)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.heroDesc,
      images: [
        `/api/og?title=${encodeURIComponent(project.title)}&category=${encodeURIComponent(project.category)}`,
      ],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
