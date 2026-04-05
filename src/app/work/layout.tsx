import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and detailed project breakdowns by Vivekanand Choudhari.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
