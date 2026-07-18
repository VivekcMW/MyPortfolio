export function generateStaticParams() {
  return [
    { slug: "mw-activate" },
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
