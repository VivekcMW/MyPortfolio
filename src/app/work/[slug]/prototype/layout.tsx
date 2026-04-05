import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prototype Preview",
};

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
