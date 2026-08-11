"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Sliders,
  Eye,
  Zap,
  Users,
  Package,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

type DensityMode = "relaxed" | "default" | "compact";

const densityModes: {
  id: DensityMode;
  name: string;
  description: string;
  spacing: number;
  fontSize: number;
  bestFor: string;
}[] = [
  {
    id: "relaxed",
    name: "Relaxed",
    description: "Generous whitespace, larger touch targets",
    spacing: 24,
    fontSize: 16,
    bestFor: "Novice users, occasional use, mobile-first",
  },
  {
    id: "default",
    name: "Default",
    description: "Balanced spacing and information density",
    spacing: 16,
    fontSize: 14,
    bestFor: "General use, mixed user base",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Tight spacing, maximum information per screen",
    spacing: 12,
    fontSize: 13,
    bestFor: "Power users, data-heavy workflows, desktop",
  },
];

const orders = [
  { id: "ORD-001", customer: "Acme Corp", amount: "$2,480", status: "Shipped", date: "2026-08-10" },
  { id: "ORD-002", customer: "TechStart", amount: "$1,250", status: "Processing", date: "2026-08-11" },
  { id: "ORD-003", customer: "Global Inc", amount: "$5,890", status: "Delivered", date: "2026-08-09" },
  { id: "ORD-004", customer: "StartupXYZ", amount: "$890", status: "Pending", date: "2026-08-11" },
];

export default function HybridUIPage() {
  const [densityMode, setDensityMode] = useState<DensityMode>("default");

  const mode = densityModes.find((m) => m.id === densityMode)!;

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
          <h1 className="text-4xl font-bold text-[#2B2B2B]">Hybrid UI Demo</h1>
          <p className="mt-2 text-lg text-[#6B6B6B]">
            Three density modes for B2B SaaS — solving the novice vs power user problem.
          </p>
        </div>
      </div>

      {/* Density Mode Selector */}
      <div className="border-b border-[#E8E6E1] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[#2D3561]" />
            <h2 className="text-lg font-semibold text-[#2B2B2B]">Select Density Mode</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {densityModes.map((mode) => {
              const isActive = densityMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setDensityMode(mode.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-[#D4663E] bg-[#D4663E]/5"
                      : "border-[#E8E6E1] bg-white hover:border-[#2D3561]/30"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-[#2B2B2B]">{mode.name}</span>
                    {isActive && (
                      <div className="h-2 w-2 rounded-full bg-[#D4663E]" />
                    )}
                  </div>
                  <p className="mb-2 text-sm text-[#6B6B6B]">{mode.description}</p>
                  <div className="text-xs text-[#6B6B6B]">Best for: {mode.bestFor}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-[#2D3561]/20 bg-[#2D3561]/5 p-4">
            <div className="mb-1 text-sm font-medium text-[#2B2B2B]">Current Settings</div>
            <div className="flex gap-4 text-xs text-[#6B6B6B]">
              <span>Spacing: {mode.spacing}px</span>
              <span>•</span>
              <span>Font Size: {mode.fontSize}px</span>
              <span>•</span>
              <span>Line Height: {mode.fontSize * 1.5}px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#2B2B2B]">Orders Dashboard</h2>
              <p className="text-sm text-[#6B6B6B]">Watch the UI reflow as you change density modes</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2">
              <Eye className="h-4 w-4 text-[#6B6B6B]" />
              <span className="text-sm text-[#6B6B6B]">{mode.name} Mode Active</span>
            </div>
          </div>

          <motion.div
            key={densityMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[#E8E6E1] bg-white shadow-sm"
          >
            {/* Header */}
            <div
              style={{
                padding: `${mode.spacing}px`,
                fontSize: `${mode.fontSize + 2}px`,
              }}
              className="flex items-center justify-between border-b border-[#E8E6E1]"
            >
              <h3 className="font-semibold text-[#2B2B2B]">Recent Orders</h3>
              <button className="rounded-lg border border-[#E8E6E1] bg-[#FAFAF8] px-3 py-1.5 text-sm text-[#2B2B2B] hover:bg-[#F5F5F3]">
                Export
              </button>
            </div>

            {/* Stats */}
            <div
              style={{ padding: `${mode.spacing}px`, gap: `${mode.spacing}px` }}
              className="grid border-b border-[#E8E6E1] md:grid-cols-3"
            >
              {[
                { label: "Total Orders", value: "1,284", icon: Package },
                { label: "Revenue", value: "$45.2K", icon: Zap },
                { label: "Customers", value: "892", icon: Users },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    style={{
                      padding: `${mode.spacing / 2}px`,
                      fontSize: `${mode.fontSize}px`,
                    }}
                    className="rounded-lg border border-[#E8E6E1]"
                  >
                    <div className="mb-1 flex items-center gap-2 text-[#6B6B6B]">
                      <Icon className="h-4 w-4" />
                      <span style={{ fontSize: `${mode.fontSize - 2}px` }}>{stat.label}</span>
                    </div>
                    <div style={{ fontSize: `${mode.fontSize + 8}px` }} className="font-bold text-[#2B2B2B]">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div style={{ padding: `${mode.spacing}px` }}>
              <div className="space-y-2">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      padding: `${mode.spacing}px`,
                      fontSize: `${mode.fontSize}px`,
                    }}
                    className="flex items-center justify-between rounded-lg border border-[#E8E6E1] bg-[#FAFAF8] transition-colors hover:bg-[#F5F5F3]"
                  >
                    <div className="flex flex-1 items-center gap-4">
                      <div className="font-medium text-[#2B2B2B]">{order.id}</div>
                      <div className="text-[#6B6B6B]">{order.customer}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium text-[#2B2B2B]">{order.amount}</div>
                      <div
                        style={{
                          padding: `${mode.spacing / 3}px ${mode.spacing / 2}px`,
                          fontSize: `${mode.fontSize - 2}px`,
                        }}
                        className={`rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </div>
                      <button className="text-[#6B6B6B] hover:text-[#2B2B2B]">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auto-Detection Logic */}
      <div className="border-t border-[#E8E6E1] bg-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">Auto-Detection Logic</h2>
          
          <div className="space-y-4">
            <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">Relaxed Mode Triggers</h3>
              <ul className="space-y-2 text-sm text-[#4B4B4B]">
                <li>• First-time user (0-7 days since signup)</li>
                <li>• Mobile device detected</li>
                <li>• Touch-only input (no mouse)</li>
                <li>• Low session frequency (&lt; 2 logins/week)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">Compact Mode Triggers</h3>
              <ul className="space-y-2 text-sm text-[#4B4B4B]">
                <li>• High session frequency (&gt; 10 logins/week)</li>
                <li>• Desktop with large screen (&gt; 1440px width)</li>
                <li>• Keyboard shortcuts used frequently</li>
                <li>• Opens 5+ records per session (power user pattern)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">Default Mode</h3>
              <p className="text-sm text-[#4B4B4B]">
                All users not matching relaxed or compact criteria. Manual override always available
                in user settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="border-t border-[#E8E6E1] bg-[#F5F5F3] py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">Solving the Novice vs Power User Problem</h2>
          <div className="space-y-4 text-[#4B4B4B]">
            <p>
              <strong className="text-[#2B2B2B]">The Problem:</strong> B2B SaaS products serve both novice users
              (need guidance, generous spacing) and power users (want efficiency, information density). One-size-fits-all
              UI frustrates both groups.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">The Solution:</strong> Adaptive density modes that switch
              automatically based on behavioral signals. Novices get breathing room, power users get speed.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">Token-Driven:</strong> All three modes use the same components
              and design tokens — only spacing and font size multipliers change. No duplicate component code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
