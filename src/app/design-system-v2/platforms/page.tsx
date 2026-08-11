"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Monitor,
  Mic,
  Glasses,
  Mail,
  Tv,
  Palette,
  Terminal,
  Package,
  ArrowLeft,
  Copy,
  Check,
  Code2,
  Eye,
} from "lucide-react";
import { designTokens, convertToWebTokens, convertToMobileTokens, convertToVoiceTokens } from "@/lib/design-system-v2";

type PlatformId = "web" | "mobile" | "desktop" | "voice" | "ar" | "email" | "iot" | "figma" | "cli" | "npm";

interface Platform {
  id: PlatformId;
  name: string;
  description: string;
  icon: typeof Globe;
  color: string;
  frameworks?: string[];
}

const platforms: Platform[] = [
  {
    id: "web",
    name: "Web",
    description: "CSS Variables, Tailwind, Bootstrap",
    icon: Globe,
    color: "text-blue-400",
    frameworks: ["Tailwind CSS", "Bootstrap 5", "Ant Design 5"],
  },
  {
    id: "mobile",
    name: "Mobile",
    description: "React Native, Flutter, SwiftUI",
    icon: Smartphone,
    color: "text-green-400",
    frameworks: ["React Native", "Flutter", "SwiftUI"],
  },
  {
    id: "desktop",
    name: "Desktop",
    description: "Electron, Tauri",
    icon: Monitor,
    color: "text-purple-400",
    frameworks: ["Electron", "Tauri"],
  },
  {
    id: "voice",
    name: "Voice UI",
    description: "Alexa, Google Assistant",
    icon: Mic,
    color: "text-pink-400",
    frameworks: ["Alexa Skills", "Google Actions"],
  },
  {
    id: "ar",
    name: "AR/Spatial",
    description: "Vision Pro, Quest",
    icon: Glasses,
    color: "text-cyan-400",
    frameworks: ["RealityKit", "Unity"],
  },
  {
    id: "email",
    name: "Email",
    description: "MJML, Inline CSS",
    icon: Mail,
    color: "text-orange-400",
    frameworks: ["MJML", "Inline CSS"],
  },
  {
    id: "iot",
    name: "IoT Kiosks",
    description: "Digital Signage, OOH",
    icon: Tv,
    color: "text-yellow-400",
    frameworks: ["Web Components"],
  },
  {
    id: "figma",
    name: "Figma",
    description: "Design Variables API",
    icon: Palette,
    color: "text-violet-400",
    frameworks: ["Variables Plugin"],
  },
  {
    id: "cli",
    name: "CLI Tools",
    description: "Token compiler, validators",
    icon: Terminal,
    color: "text-gray-400",
    frameworks: ["Node.js CLI"],
  },
  {
    id: "npm",
    name: "NPM Package",
    description: "Installable token library",
    icon: Package,
    color: "text-red-400",
    frameworks: ["@uxvivek/tokens"],
  },
];

export default function PlatformAdaptersPage() {
  const [activePlatform, setActivePlatform] = useState<PlatformId>("web");
  const [copied, setCopied] = useState(false);

  const platform = platforms.find((p) => p.id === activePlatform)!;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeExample = () => {
    switch (activePlatform) {
      case "web":
        return convertToWebTokens(designTokens);
      case "mobile":
        return JSON.stringify(convertToMobileTokens(designTokens), null, 2);
      case "voice":
        return JSON.stringify(convertToVoiceTokens(designTokens), null, 2);
      default:
        return "// Platform adapter coming soon...";
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
          <h1 className="text-4xl font-bold text-[#2B2B2B]">Platform Adapters</h1>
          <p className="mt-2 text-lg text-[#6B6B6B]">
            Same tokens → 10+ platform outputs. Single source of truth for all interfaces.
          </p>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="border-b border-[#E8E6E1] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-px">
            {platforms.map((p) => {
              const Icon = p.icon;
              const isActive = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`group relative flex min-w-[140px] flex-col items-center gap-2 border-b-2 px-4 py-4 transition-colors ${
                    isActive
                      ? "border-[#D4663E]"
                      : "border-transparent hover:border-[#E8E6E1]"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? p.color : "text-[#6B6B6B]"}`} />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-[#2B2B2B]" : "text-[#6B6B6B]"
                    }`}
                  >
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Platform Info */}
              <div className="mb-8 rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <div className="flex items-start gap-4">
                  {(() => {
                    const Icon = platform.icon;
                    return <Icon className={`mt-1 h-8 w-8 ${platform.color}`} />;
                  })()}
                  <div className="flex-1">
                    <h2 className="mb-2 text-2xl font-bold text-[#2B2B2B]">{platform.name}</h2>
                    <p className="mb-4 text-[#6B6B6B]">{platform.description}</p>
                    {platform.frameworks && (
                      <div className="flex flex-wrap gap-2">
                        {platform.frameworks.map((fw) => (
                          <span
                            key={fw}
                            className="rounded-full border border-[#E8E6E1] bg-[#FAFAF8] px-3 py-1 text-sm text-[#4B4B4B]"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Live Preview */}
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-semibold text-[#2B2B2B]">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </h3>
                  </div>

                  <div className="rounded-xl border border-[#E8E6E1] bg-[#F5F5F3] p-6">
                    {activePlatform === "web" && (
                      <div className="space-y-4">
                        <button className="rounded-lg bg-[#1D65AF] px-4 py-2 font-medium text-white hover:bg-[#165499]">
                          Primary Button
                        </button>
                        <div className="rounded-lg border border-gray-300 bg-white p-4">
                          <div className="mb-2 text-sm font-semibold text-gray-900">Card Component</div>
                          <p className="text-sm text-gray-600">Card body content goes here.</p>
                          <button className="mt-4 text-sm font-medium text-[#1D65AF]">Action</button>
                        </div>
                        <input
                          type="text"
                          placeholder="Input field"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                        />
                      </div>
                    )}
                    {activePlatform === "mobile" && (
                      <div className="mx-auto w-48 rounded-3xl border-4 border-gray-800 bg-white p-4">
                        <div className="mb-2 text-center text-xs text-gray-500">9:41</div>
                        <div className="space-y-3">
                          <div className="rounded-lg bg-[#1D65AF] py-2 text-center text-sm font-medium text-white">
                            Button
                          </div>
                          <div className="rounded-lg border border-gray-300 p-3">
                            <div className="text-xs font-semibold text-gray-900">Card</div>
                            <div className="text-xs text-gray-600">Content</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activePlatform === "voice" && (
                      <div className="space-y-4 font-mono text-sm">
                        <div className="flex gap-2">
                          <div className="text-violet-400">Alexa:</div>
                          <div className="text-gray-300">"Welcome to the app"</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-blue-400">User:</div>
                          <div className="text-gray-300">"Show me orders"</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-violet-400">Alexa:</div>
                          <div className="text-gray-300">"You have 3 pending orders..."</div>
                        </div>
                      </div>
                    )}
                    {!["web", "mobile", "voice"].includes(activePlatform) && (
                      <div className="text-center text-sm text-[#6B6B6B]">
                        Interactive preview coming soon...
                      </div>
                    )}
                  </div>
                </div>

                {/* Token Mapping */}
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-semibold text-[#2B2B2B]">
                      <Code2 className="h-5 w-5" />
                      Token Mapping
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#E8E6E1] bg-[#F5F5F3] p-4">
                      <div className="mb-2 text-xs font-medium text-[#6B6B6B]">Primary Color</div>
                      <div className="text-sm text-[#2B2B2B]">color.brand.primary.600</div>
                      <div className="mt-2 text-xs text-[#6B6B6B]">→ #1D65AF</div>
                    </div>

                    {activePlatform === "web" && (
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-[#6B6B6B]">CSS Variable:</span>
                          <code className="ml-2 text-[#D4663E]">--color-primary-600</code>
                        </div>
                        <div>
                          <span className="text-[#6B6B6B]">Tailwind:</span>
                          <code className="ml-2 text-[#D4663E]">bg-primary-600</code>
                        </div>
                      </div>
                    )}
                    {activePlatform === "mobile" && (
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-[#6B6B6B]">React Native:</span>
                          <code className="ml-2 text-[#D4663E]">colors.primary[600]</code>
                        </div>
                        <div>
                          <span className="text-[#6B6B6B]">SwiftUI:</span>
                          <code className="ml-2 text-[#D4663E]">Color(.primary600)</code>
                        </div>
                      </div>
                    )}
                    {activePlatform === "voice" && (
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-[#6B6B6B]">Emphasis:</span>
                          <code className="ml-2 text-[#D4663E]">&lt;emphasis level="strong"&gt;</code>
                        </div>
                        <div>
                          <span className="text-[#6B6B6B]">Volume:</span>
                          <code className="ml-2 text-[#D4663E]">&lt;prosody volume="loud"&gt;</code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Code Export */}
              <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-[#2B2B2B]">Code Export</h3>
                  <button
                    onClick={() => handleCopy(getCodeExample())}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-[#FAFAF8] px-4 py-2 text-sm text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
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

                <pre className="overflow-x-auto rounded-xl border border-[#E8E6E1] bg-[#F5F5F3] p-4 text-sm">
                  <code className="text-[#4B4B4B]">{getCodeExample()}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="border-t border-[#E8E6E1] bg-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">Why Multi-Platform Matters</h2>
          <div className="space-y-4 text-[#4B4B4B]">
            <p>
              <strong className="text-[#2B2B2B]">Single Source of Truth:</strong> Design decisions are stored
              as platform-agnostic tokens in JSON. Each platform adapter translates these tokens into
              native formats (CSS variables, Swift structs, SSML attributes).
            </p>
            <p>
              <strong className="text-[#2B2B2B]">Consistency Across Platforms:</strong> When you change
              <code className="mx-1 rounded bg-[#F5F5F3] px-1 text-[#D4663E]">color.primary.600</code> from
              #1D65AF to #2563EB, it updates automatically across web, mobile, voice, and all other platforms.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">Future-Proof:</strong> As new platforms emerge (AR glasses,
              wearables, car interfaces), you can add a new adapter without touching existing platform code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
