export function generateStaticParams() {
  return [
    { slug: "nocode-platform" },
    { slug: "ehr-platform" },
    { slug: "iot-dashboard" },
    { slug: "ott-platform" },
  ];
}

export default function WorkSlugLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
