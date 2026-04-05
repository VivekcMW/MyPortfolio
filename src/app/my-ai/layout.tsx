import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My AI",
  description:
    "Explore the AI ecosystem powering my work — coding agents, automation pipelines, and creative tools I use daily.",
};

export default function MyAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
