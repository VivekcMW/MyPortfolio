"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Package,
  Palette,
  FileJson,
  FileCode,
  Code2,
  Check,
  Copy,
  Terminal,
  Paintbrush,
} from "lucide-react";

type ExportFormat = "npm" | "figma" | "json" | "css" | "scss" | "tailwind";

const exportOptions: {
  id: ExportFormat;
  name: string;
  description: string;
  icon: typeof Package;
  installCmd?: string;
  fileSize: string;
  recommended?: boolean;
}[] = [
  {
    id: "npm",
    name: "NPM Package",
    description: "Install via package manager for JavaScript/TypeScript projects",
    icon: Package,
    installCmd: "npm install @uxvivek/design-tokens",
    fileSize: "124 KB",
    recommended: true,
  },
  {
    id: "figma",
    name: "Figma Plugin",
    description: "Import tokens directly into Figma as variables",
    icon: Paintbrush,
    fileSize: "Token file",
  },
  {
    id: "json",
    name: "JSON Tokens",
    description: "Raw token data for custom tooling and pipelines",
    icon: FileJson,
    fileSize: "48 KB",
  },
  {
    id: "css",
    name: "CSS Variables",
    description: "Ready-to-use CSS custom properties",
    icon: FileCode,
    fileSize: "32 KB",
  },
  {
    id: "scss",
    name: "SCSS Variables",
    description: "Sass/SCSS variables and mixins",
    icon: FileCode,
    fileSize: "36 KB",
  },
  {
    id: "tailwind",
    name: "Tailwind Config",
    description: "Drop-in tailwind.config.js theme object",
    icon: Code2,
    fileSize: "28 KB",
  },
];

export default function DownloadCenterPage() {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("npm");
  const [copied, setCopied] = useState(false);

  const format = exportOptions.find((f) => f.id === selectedFormat)!;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeExample = () => {
    switch (selectedFormat) {
      case "npm":
        return `import { designTokens } from '@uxvivek/design-tokens';\n\nconst primaryColor = designTokens.color.brand.primary[600];\nconsole.log(primaryColor); // "#1D65AF"`;
      case "json":
        return JSON.stringify(
          {
            color: {
              brand: {
                primary: {
                  600: "#1D65AF",
                },
              },
            },
            typography: {
              fontSize: {
                base: "16px",
              },
            },
          },
          null,
          2
        );
      case "css":
        return `:root {\n  --color-primary-600: #1D65AF;\n  --font-size-base: 16px;\n  --spacing-4: 16px;\n  --radius-lg: 8px;\n}`;
      case "scss":
        return `$color-primary-600: #1D65AF;\n$font-size-base: 16px;\n$spacing-4: 16px;\n$radius-lg: 8px;\n\n@mixin button-primary {\n  background: $color-primary-600;\n  border-radius: $radius-lg;\n  padding: $spacing-4;\n}`;
      case "tailwind":
        return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: {\n          600: '#1D65AF',\n        },\n      },\n      fontSize: {\n        base: '16px',\n      },\n    },\n  },\n};`;
      default:
        return "// Format preview";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="border-b border-[#E8E6E1] bg-white pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <Link
            href="/design-system-v2"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#6B6B6B] transition-colors hover:text-[#2B2B2B]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to DS Lab
          </Link>
          <h1 className="text-4xl font-bold text-[#2B2B2B]">Download Design Tokens</h1>
          <p className="mt-2 text-lg text-[#6B6B6B]">
            Get the tokens in your preferred format — NPM, Figma, JSON, CSS, SCSS, or Tailwind.
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {exportOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedFormat === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedFormat(option.id)}
                  className={`rounded-2xl border p-6 text-left transition-all ${
                    isSelected
                      ? "border-[#D4663E] bg-[#D4663E]/5 shadow-lg"
                      : "border-[#E8E6E1] bg-white hover:border-[#2D3561]/30 hover:shadow-md"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8E6E1] bg-[#FAFAF8]">
                      <Icon className={`h-6 w-6 ${isSelected ? "text-[#D4663E]" : "text-[#2D3561]"}`} />
                    </div>
                    {option.recommended && (
                      <span className="rounded-full bg-[#D4663E] px-2 py-0.5 text-xs font-medium text-white">
                        Recommended
                      </span>
                    )}
                  </div>
                  
                  <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">{option.name}</h3>
                  <p className="mb-4 text-sm text-[#6B6B6B]">{option.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                    <span>{option.fileSize}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[#D4663E]">
                        <Check className="h-3 w-3" />
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Installation & Preview */}
      <div className="border-t border-[#E8E6E1] bg-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Installation */}
          {format.installCmd && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-[#2B2B2B]">Installation</h2>
              <div className="flex items-center gap-3 rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-4">
                <Terminal className="h-5 w-5 text-[#6B6B6B]" />
                <code className="flex-1 text-sm text-[#2B2B2B]">{format.installCmd}</code>
                <button
                  onClick={() => handleCopy(format.installCmd!)}
                  className="rounded-lg border border-[#E8E6E1] bg-white px-3 py-1.5 text-sm text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Code Preview */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#2B2B2B]">Usage Example</h2>
              <button
                onClick={() => handleCopy(getCodeExample())}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-4 py-2 text-sm text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <pre className="overflow-x-auto rounded-xl border border-[#E8E6E1] bg-[#F5F5F3] p-6 text-sm">
              <code className="text-[#4B4B4B]">{getCodeExample()}</code>
            </pre>
          </div>

          {/* Download Button */}
          <div className="mt-8 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#D4663E] px-8 py-4 font-medium text-white transition-colors hover:bg-[#B85330]">
              <Download className="h-5 w-5" />
              Download {format.name}
            </button>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="border-t border-[#E8E6E1] bg-[#F5F5F3] py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">What&apos;s Included</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-3 font-semibold text-[#2B2B2B]">Token Categories</h3>
              <ul className="space-y-2 text-sm text-[#4B4B4B]">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Colors (brand, semantic, neutral)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Typography (fonts, sizes, weights)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Spacing (margin, padding scales)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Border radius & shadows
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Motion & transitions
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-3 font-semibold text-[#2B2B2B]">Platform Support</h3>
              <ul className="space-y-2 text-sm text-[#4B4B4B]">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Web (CSS, React, Vue, Svelte)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Mobile (React Native, Flutter)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Desktop (Electron, Tauri)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Voice UI (Alexa, Google)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D4663E]" />
                  Email (MJML, inline CSS)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#2D3561]/20 bg-[#2D3561]/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Palette className="h-5 w-5 text-[#2D3561]" />
              <h3 className="font-semibold text-[#2B2B2B]">Need Help?</h3>
            </div>
            <p className="text-sm text-[#6B6B6B]">
              Check the{" "}
              <Link href="/design-system-v2" className="font-medium text-[#D4663E] hover:underline">
                full documentation
              </Link>
              {" "}or explore{" "}
              <Link href="/design-system-v2/platforms" className="font-medium text-[#D4663E] hover:underline">
                platform adapters
              </Link>
              {" "}for integration examples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
