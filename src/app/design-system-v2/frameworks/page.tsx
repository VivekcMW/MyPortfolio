"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Palette, Square, Type as TypeIcon, Code2, CheckCircle } from "lucide-react";

type ComponentType = "button" | "card" | "form" | "badge" | "table" | "modal";

interface TokenControls {
  primaryColor: string;
  borderRadius: number;
  fontSize: number;
}

const defaultTokens: TokenControls = {
  primaryColor: "#1D65AF",
  borderRadius: 8,
  fontSize: 16,
};

const components: { id: ComponentType; name: string; icon: typeof Code2 }[] = [
  { id: "button", name: "Buttons", icon: Square },
  { id: "card", name: "Cards", icon: Square },
  { id: "form", name: "Forms", icon: TypeIcon },
  { id: "badge", name: "Badges", icon: CheckCircle },
  { id: "table", name: "Tables", icon: Code2 },
  { id: "modal", name: "Modals", icon: Square },
];

export default function FrameworkComparisonPage() {
  const [tokens, setTokens] = useState<TokenControls>(defaultTokens);
  const [activeComponent, setActiveComponent] = useState<ComponentType>("button");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 29, g: 101, b: 175 };
  };

  const rgb = hexToRgb(tokens.primaryColor);

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
          <h1 className="text-4xl font-bold text-[#2B2B2B]">Framework Comparison</h1>
          <p className="mt-2 text-lg text-[#6B6B6B]">
            Same tokens → Tailwind CSS, Bootstrap 5, Ant Design 5. One design system, multiple frameworks.
          </p>
        </div>
      </div>

      {/* Token Controls */}
      <div className="border-b border-[#E8E6E1] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#2B2B2B]">
            <Palette className="h-5 w-5" />
            Live Token Controls
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Primary Color */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4B4B4B]">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={tokens.primaryColor}
                  onChange={(e) => setTokens({ ...tokens, primaryColor: e.target.value })}
                  className="h-10 w-16 cursor-pointer rounded border border-[#E8E6E1]"
                />
                <input
                  type="text"
                  value={tokens.primaryColor}
                  onChange={(e) => setTokens({ ...tokens, primaryColor: e.target.value })}
                  className="flex-1 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#2B2B2B]"
                />
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4B4B4B]">
                Border Radius: {tokens.borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={tokens.borderRadius}
                onChange={(e) => setTokens({ ...tokens, borderRadius: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4B4B4B]">
                Base Font Size: {tokens.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="20"
                value={tokens.fontSize}
                onChange={(e) => setTokens({ ...tokens, fontSize: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={() => setTokens(defaultTokens)}
            className="mt-4 rounded-lg border border-[#E8E6E1] bg-white px-4 py-2 text-sm text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Component Selector */}
      <div className="border-b border-[#E8E6E1] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-px">
            {components.map((comp) => {
              const Icon = comp.icon;
              const isActive = activeComponent === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveComponent(comp.id)}
                  className={`flex min-w-[120px] items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#D4663E] text-[#2B2B2B]"
                      : "border-transparent text-[#6B6B6B] hover:border-[#E8E6E1]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {comp.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Framework Comparison Grid */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tailwind CSS */}
            <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#2B2B2B]">Tailwind CSS</h3>
                <span className="rounded-full bg-[#38BDF8]/10 px-3 py-1 text-xs font-medium text-[#0EA5E9]">
                  Utility-First
                </span>
              </div>

              <div className="mb-6 space-y-4">
                {activeComponent === "button" && (
                  <>
                    <button
                      style={{
                        backgroundColor: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Primary Button
                    </button>
                    <button
                      style={{
                        borderColor: tokens.primaryColor,
                        color: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border-2 bg-white px-4 py-2 font-medium transition-colors hover:bg-gray-50"
                    >
                      Outline Button
                    </button>
                  </>
                )}
                {activeComponent === "card" && (
                  <div
                    style={{ borderRadius: `${tokens.borderRadius}px` }}
                    className="border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <h4
                      style={{ fontSize: `${tokens.fontSize + 2}px` }}
                      className="mb-2 font-semibold text-gray-900"
                    >
                      Card Title
                    </h4>
                    <p style={{ fontSize: `${tokens.fontSize}px` }} className="text-gray-600">
                      Card content with sample text to show typography.
                    </p>
                    <button
                      style={{
                        backgroundColor: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="mt-4 px-3 py-1.5 text-white"
                    >
                      Action
                    </button>
                  </div>
                )}
                {activeComponent === "form" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Text input"
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-[#1D65AF] focus:outline-none"
                    />
                    <select
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      <option>Select option</option>
                    </select>
                  </div>
                )}
                {activeComponent === "badge" && (
                  <div className="flex flex-wrap gap-2">
                    <span
                      style={{
                        backgroundColor: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="px-2 py-1 text-white"
                    >
                      Primary
                    </span>
                    <span
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="bg-gray-100 px-2 py-1 text-gray-700"
                    >
                      Default
                    </span>
                    <span
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="bg-green-100 px-2 py-1 text-green-700"
                    >
                      Success
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-[#F5F5F3] p-3">
                <code className="block text-xs text-[#4B4B4B]">
                  <div>className="bg-primary-600</div>
                  <div className="ml-4">text-white</div>
                  <div className="ml-4">rounded-lg</div>
                  <div className="ml-4">px-4 py-2"</div>
                </code>
              </div>
            </div>

            {/* Bootstrap 5 */}
            <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#2B2B2B]">Bootstrap 5</h3>
                <span className="rounded-full bg-[#7952B3]/10 px-3 py-1 text-xs font-medium text-[#7952B3]">
                  Component-Based
                </span>
              </div>

              <div className="mb-6 space-y-4">
                {activeComponent === "button" && (
                  <>
                    <button
                      style={{
                        backgroundColor: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border-0 px-4 py-2 font-medium text-white"
                    >
                      Primary Button
                    </button>
                    <button
                      style={{
                        borderColor: tokens.primaryColor,
                        color: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border-2 bg-transparent px-4 py-2 font-medium"
                    >
                      Outline Button
                    </button>
                  </>
                )}
                {activeComponent === "card" && (
                  <div
                    style={{ borderRadius: `${tokens.borderRadius}px` }}
                    className="border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="p-4">
                      <h4
                        style={{ fontSize: `${tokens.fontSize + 2}px` }}
                        className="mb-2 font-semibold text-gray-900"
                      >
                        Card Title
                      </h4>
                      <p style={{ fontSize: `${tokens.fontSize}px` }} className="text-gray-600">
                        Card content with sample text to show typography.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 p-3">
                      <button
                        style={{
                          backgroundColor: tokens.primaryColor,
                          borderRadius: `${tokens.borderRadius}px`,
                          fontSize: `${tokens.fontSize - 2}px`,
                        }}
                        className="border-0 px-3 py-1.5 text-white"
                      >
                        Action
                      </button>
                    </div>
                  </div>
                )}
                {activeComponent === "form" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Text input"
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    />
                    <select
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      <option>Select option</option>
                    </select>
                  </div>
                )}
                {activeComponent === "badge" && (
                  <div className="flex flex-wrap gap-2">
                    <span
                      style={{
                        backgroundColor: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="px-2 py-1 text-white"
                    >
                      Primary
                    </span>
                    <span
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="bg-gray-200 px-2 py-1 text-gray-700"
                    >
                      Default
                    </span>
                    <span
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="bg-green-200 px-2 py-1 text-green-800"
                    >
                      Success
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-[#F5F5F3] p-3">
                <code className="block text-xs text-[#4B4B4B]">
                  <div>class="btn btn-primary"</div>
                  <div className="ml-4">style="--bs-primary: {tokens.primaryColor}"</div>
                </code>
              </div>
            </div>

            {/* Ant Design 5 */}
            <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#2B2B2B]">Ant Design 5</h3>
                <span className="rounded-full bg-[#1890FF]/10 px-3 py-1 text-xs font-medium text-[#1890FF]">
                  Enterprise
                </span>
              </div>

              <div className="mb-6 space-y-4">
                {activeComponent === "button" && (
                  <>
                    <button
                      style={{
                        backgroundColor: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border-0 px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Primary Button
                    </button>
                    <button
                      style={{
                        borderColor: tokens.primaryColor,
                        color: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border bg-white px-4 py-2 font-medium"
                    >
                      Default Button
                    </button>
                  </>
                )}
                {activeComponent === "card" && (
                  <div
                    style={{ borderRadius: `${tokens.borderRadius}px` }}
                    className="border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="border-b border-gray-200 px-4 py-3">
                      <h4
                        style={{ fontSize: `${tokens.fontSize + 2}px` }}
                        className="font-semibold text-gray-900"
                      >
                        Card Title
                      </h4>
                    </div>
                    <div className="p-4">
                      <p style={{ fontSize: `${tokens.fontSize}px` }} className="text-gray-600">
                        Card content with sample text to show typography.
                      </p>
                      <button
                        style={{
                          color: tokens.primaryColor,
                          fontSize: `${tokens.fontSize - 2}px`,
                        }}
                        className="mt-3 border-0 bg-transparent p-0 font-medium"
                      >
                        Action
                      </button>
                    </div>
                  </div>
                )}
                {activeComponent === "form" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Text input"
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors hover:border-[#1D65AF]"
                    />
                    <select
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize}px`,
                      }}
                      className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      <option>Select option</option>
                    </select>
                  </div>
                )}
                {activeComponent === "badge" && (
                  <div className="flex flex-wrap gap-2">
                    <span
                      style={{
                        backgroundColor: `${tokens.primaryColor}15`,
                        color: tokens.primaryColor,
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="px-2 py-1"
                    >
                      Primary
                    </span>
                    <span
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="bg-gray-100 px-2 py-1 text-gray-600"
                    >
                      Default
                    </span>
                    <span
                      style={{
                        borderRadius: `${tokens.borderRadius}px`,
                        fontSize: `${tokens.fontSize - 2}px`,
                      }}
                      className="bg-green-50 px-2 py-1 text-green-600"
                    >
                      Success
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-[#F5F5F3] p-3">
                <code className="block text-xs text-[#4B4B4B]">
                  <div>&lt;Button type="primary"&gt;</div>
                  <div className="ml-4">Primary Button</div>
                  <div>&lt;/Button&gt;</div>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="border-t border-[#E8E6E1] bg-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">Framework Agnostic Design</h2>
          <div className="space-y-4 text-[#4B4B4B]">
            <p>
              <strong className="text-[#2B2B2B]">One Token Layer, Three Frameworks:</strong> Design decisions
              live in JSON tokens. Each framework adapter translates these tokens into native conventions —
              Tailwind utilities, Bootstrap CSS variables, or Ant Design theme config.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">No Vendor Lock-In:</strong> If your team migrates from
              Bootstrap to Tailwind, your design system stays intact. Only the adapter changes.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">Consistent UX Across Teams:</strong> Different teams can use
              different frameworks while maintaining visual consistency. Marketing uses Tailwind, product uses
              Ant Design, internal tools use Bootstrap — same brand, same tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
