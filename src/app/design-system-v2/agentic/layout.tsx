import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic UI Patterns | Multi-Platform Design System",
  description: "AI-first interaction patterns grounded in cognitive psychology. Proactive suggestions, conversational forms, contextual actions, and more.",
  openGraph: {
    title: "Agentic UI Patterns | Multi-Platform Design System",
    description: "5 interactive demos showing how to design UI for AI-powered products with psychology-backed patterns.",
    type: "website",
  },
};

export default function AgenticUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
