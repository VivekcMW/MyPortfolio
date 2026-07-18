export function generateStaticParams() {
  return [
    { slug: "mw-activate" },
    { slug: "mw-cinema" },
    { slug: "mw-posterops" },
    { slug: "ai-strategy" },
    { slug: "nocode-platform" },
    { slug: "ehr-platform" },
    { slug: "construction-ai" },
    { slug: "iot-dashboard" },
    { slug: "ott-platform" },
  ];
}

export default function WorkSlugLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
