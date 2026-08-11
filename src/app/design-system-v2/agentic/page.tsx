"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Lightbulb,
  LayoutDashboard,
  Settings,
  Brain,
  Check,
  X,
  Send,
  ChevronRight,
} from "lucide-react";

type PatternId = "proactive" | "conversational" | "contextual" | "adaptive" | "defaults";

interface Pattern {
  id: PatternId;
  name: string;
  tagline: string;
  icon: typeof Sparkles;
  psychology: string;
  whenToUse: string[];
  example: string;
}

const patterns: Pattern[] = [
  {
    id: "proactive",
    name: "Proactive Suggestions",
    tagline: "AI anticipates user needs before they ask",
    icon: Lightbulb,
    psychology: "Prospective Memory",
    whenToUse: [
      "User is about to make a mistake",
      "Better option exists for their goal",
      "Time-sensitive opportunity",
    ],
    example: "Suggesting a template before user starts from scratch",
  },
  {
    id: "conversational",
    name: "Conversational Forms",
    tagline: "Natural language replaces traditional form fields",
    icon: MessageSquare,
    psychology: "Reduced Cognitive Load",
    whenToUse: [
      "Complex multi-step wizards",
      "Users unfamiliar with domain",
      "Mobile-first experiences",
    ],
    example: "Chatbot collects shipping info instead of 12-field form",
  },
  {
    id: "contextual",
    name: "Contextual Actions",
    tagline: "Actions appear based on user's current task",
    icon: Sparkles,
    psychology: "Recognition over Recall",
    whenToUse: [
      "User is deep in a workflow",
      "Actions vary by context",
      "Reducing navigation overhead",
    ],
    example: "Share button appears when user hovers over chart",
  },
  {
    id: "adaptive",
    name: "Adaptive Dashboard",
    tagline: "Layout changes based on user behavior patterns",
    icon: LayoutDashboard,
    psychology: "Habit Formation",
    whenToUse: [
      "Power users vs novices",
      "Varied use cases per role",
      "High information density",
    ],
    example: "Most-viewed widgets move to top automatically",
  },
  {
    id: "defaults",
    name: "Intelligent Defaults",
    tagline: "Pre-filled values learned from user history",
    icon: Settings,
    psychology: "Default Effect",
    whenToUse: [
      "Repetitive data entry",
      "Configuration wizards",
      "Onboarding flows",
    ],
    example: "Order form remembers last shipping address",
  },
];

export default function AgenticUIPage() {
  const [activePattern, setActivePattern] = useState<PatternId>("proactive");
  const [demoState, setDemoState] = useState<Record<string, any>>({
    proactive: { showSuggestion: false },
    conversational: { messages: [] },
    contextual: { hoveredItem: null },
    adaptive: { layout: "default" },
    defaults: { formData: {} },
  });

  const pattern = patterns.find((p) => p.id === activePattern)!;

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
          <h1 className="text-4xl font-bold text-[#2B2B2B]">Agentic UI Patterns</h1>
          <p className="mt-2 text-lg text-[#6B6B6B]">
            5 AI-first interaction patterns grounded in cognitive psychology for next-gen products.
          </p>
        </div>
      </div>

      {/* Pattern Selector */}
      <div className="border-b border-[#E8E6E1] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-px">
            {patterns.map((p) => {
              const Icon = p.icon;
              const isActive = activePattern === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePattern(p.id)}
                  className={`flex min-w-[180px] flex-col items-start gap-1 border-b-2 px-4 py-3 text-left transition-colors ${
                    isActive
                      ? "border-[#D4663E]"
                      : "border-transparent hover:border-[#E8E6E1]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#D4663E]" : "text-[#6B6B6B]"}`} />
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-[#2B2B2B]" : "text-[#6B6B6B]"
                      }`}
                    >
                      {p.name}
                    </span>
                  </div>
                  <span className="text-xs text-[#6B6B6B]">{p.tagline}</span>
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
              key={activePattern}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {/* Live Demo */}
              <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold text-[#2B2B2B]">Interactive Demo</h2>
                
                <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-6">
                  {/* Proactive Suggestions Demo */}
                  {activePattern === "proactive" && (
                    <div className="space-y-4">
                      <div className="rounded-lg border border-[#E8E6E1] bg-white p-4">
                        <div className="mb-2 text-sm font-medium text-[#2B2B2B]">Create New Document</div>
                        <textarea
                          className="w-full rounded-lg border border-[#E8E6E1] bg-white p-3 text-sm text-[#2B2B2B] focus:border-[#D4663E] focus:outline-none"
                          rows={4}
                          placeholder="Start typing..."
                          onFocus={() =>
                            setDemoState({ ...demoState, proactive: { showSuggestion: true } })
                          }
                        />
                      </div>
                      
                      <AnimatePresence>
                        {demoState.proactive?.showSuggestion && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-3 rounded-lg border border-[#D4663E]/30 bg-[#D4663E]/5 p-4"
                          >
                            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[#D4663E]" />
                            <div className="flex-1">
                              <div className="mb-1 text-sm font-medium text-[#2B2B2B]">
                                Try a template?
                              </div>
                              <div className="mb-3 text-xs text-[#6B6B6B]">
                                Based on your project type, we recommend the "Product Brief" template
                              </div>
                              <div className="flex gap-2">
                                <button className="rounded-lg bg-[#D4663E] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#B85330]">
                                  Use Template
                                </button>
                                <button
                                  onClick={() =>
                                    setDemoState({ ...demoState, proactive: { showSuggestion: false } })
                                  }
                                  className="rounded-lg border border-[#E8E6E1] bg-white px-3 py-1.5 text-xs font-medium text-[#2B2B2B] hover:bg-[#F5F5F3]"
                                >
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Conversational Form Demo */}
                  {activePattern === "conversational" && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2D3561]/10">
                          <Sparkles className="h-4 w-4 text-[#2D3561]" />
                        </div>
                        <div className="flex-1 rounded-lg bg-white p-3 text-sm text-[#4B4B4B]">
                          Hi! I'll help you set up your shipping preferences. Where should we send your orders?
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <div className="max-w-[80%] rounded-lg bg-[#D4663E] p-3 text-sm text-white">
                          123 Main St, San Francisco, CA 94102
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6B6B6B]/10">
                          <span className="text-xs font-medium text-[#6B6B6B]">You</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2D3561]/10">
                          <Check className="h-4 w-4 text-[#2D3561]" />
                        </div>
                        <div className="flex-1 rounded-lg bg-white p-3 text-sm text-[#4B4B4B]">
                          Got it! Should I save this as your default address?
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Type your reply..."
                          className="flex-1 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#2B2B2B] focus:border-[#D4663E] focus:outline-none"
                        />
                        <button className="rounded-lg bg-[#D4663E] p-2 text-white hover:bg-[#B85330]">
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Contextual Actions Demo */}
                  {activePattern === "contextual" && (
                    <div className="space-y-4">
                      <div className="text-sm text-[#6B6B6B]">Hover over items to see contextual actions</div>
                      
                      {["Q1 Revenue", "User Growth", "Churn Rate"].map((item, i) => (
                        <div
                          key={item}
                          onMouseEnter={() =>
                            setDemoState({ ...demoState, contextual: { hoveredItem: i } })
                          }
                          onMouseLeave={() =>
                            setDemoState({ ...demoState, contextual: { hoveredItem: null } })
                          }
                          className="group relative rounded-lg border border-[#E8E6E1] bg-white p-4 transition-shadow hover:shadow-md"
                        >
                          <div className="mb-1 text-sm font-medium text-[#2B2B2B]">{item}</div>
                          <div className="text-2xl font-bold text-[#2D3561]">
                            {i === 0 ? "$2.4M" : i === 1 ? "+12%" : "3.2%"}
                          </div>
                          
                          <AnimatePresence>
                            {demoState.contextual?.hoveredItem === i && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute right-4 top-4 flex gap-2"
                              >
                                <button className="rounded-lg border border-[#E8E6E1] bg-white p-2 text-[#2B2B2B] shadow-sm hover:bg-[#F5F5F3]">
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Adaptive Dashboard Demo */}
                  {activePattern === "adaptive" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#6B6B6B]">Dashboard adapts to your usage</span>
                        <button
                          onClick={() =>
                            setDemoState({
                              ...demoState,
                              adaptive: {
                                layout: demoState.adaptive?.layout === "default" ? "adapted" : "default",
                              },
                            })
                          }
                          className="rounded-lg border border-[#E8E6E1] bg-white px-3 py-1.5 text-xs font-medium text-[#2B2B2B] hover:bg-[#F5F5F3]"
                        >
                          Toggle Layout
                        </button>
                      </div>
                      
                      <div className="grid gap-3">
                        {demoState.adaptive?.layout === "adapted" ? (
                          <>
                            <div className="rounded-lg border border-[#D4663E]/30 bg-[#D4663E]/5 p-4">
                              <div className="mb-1 flex items-center gap-2">
                                <div className="text-sm font-medium text-[#2B2B2B]">Orders</div>
                                <span className="rounded-full bg-[#D4663E] px-2 py-0.5 text-xs text-white">
                                  Most Used
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-[#2D3561]">1,284</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-lg border border-[#E8E6E1] bg-white p-3">
                                <div className="text-xs text-[#6B6B6B]">Revenue</div>
                                <div className="text-lg font-bold text-[#2B2B2B]">$45.2K</div>
                              </div>
                              <div className="rounded-lg border border-[#E8E6E1] bg-white p-3">
                                <div className="text-xs text-[#6B6B6B]">Users</div>
                                <div className="text-lg font-bold text-[#2B2B2B]">2,418</div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-lg border border-[#E8E6E1] bg-white p-3">
                                <div className="text-xs text-[#6B6B6B]">Revenue</div>
                                <div className="text-lg font-bold text-[#2B2B2B]">$45.2K</div>
                              </div>
                              <div className="rounded-lg border border-[#E8E6E1] bg-white p-3">
                                <div className="text-xs text-[#6B6B6B]">Orders</div>
                                <div className="text-lg font-bold text-[#2B2B2B]">1,284</div>
                              </div>
                            </div>
                            <div className="rounded-lg border border-[#E8E6E1] bg-white p-3">
                              <div className="text-xs text-[#6B6B6B]">Users</div>
                              <div className="text-lg font-bold text-[#2B2B2B]">2,418</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Intelligent Defaults Demo */}
                  {activePattern === "defaults" && (
                    <div className="space-y-4">
                      <div className="text-sm text-[#6B6B6B]">Form pre-filled from your history</div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-[#4B4B4B]">
                            Shipping Address
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value="123 Main St, San Francisco, CA 94102"
                              readOnly
                              className="w-full rounded-lg border border-[#E8E6E1] bg-[#F5F5F3] px-3 py-2 pr-20 text-sm text-[#2B2B2B]"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-[#D4663E]/10 px-2 py-0.5 text-xs font-medium text-[#D4663E]">
                              Auto-filled
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="mb-1 block text-xs font-medium text-[#4B4B4B]">
                            Payment Method
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value="•••• •••• •••• 4242"
                              readOnly
                              className="w-full rounded-lg border border-[#E8E6E1] bg-[#F5F5F3] px-3 py-2 pr-20 text-sm text-[#2B2B2B]"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-[#D4663E]/10 px-2 py-0.5 text-xs font-medium text-[#D4663E]">
                              Last used
                            </span>
                          </div>
                        </div>

                        <button className="w-full rounded-lg bg-[#D4663E] px-4 py-2 text-sm font-medium text-white hover:bg-[#B85330]">
                          Place Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pattern Info */}
              <div className="space-y-6">
                {/* Psychology Principle */}
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#2D3561]" />
                    <h3 className="font-semibold text-[#2B2B2B]">Psychology Principle</h3>
                  </div>
                  <div className="mb-2 text-lg font-medium text-[#2D3561]">{pattern.psychology}</div>
                  <p className="text-sm text-[#6B6B6B]">
                    {pattern.id === "proactive" &&
                      "Humans have limited prospective memory — we forget to remember. Proactive systems offload this cognitive burden."}
                    {pattern.id === "conversational" &&
                      "Natural language processing feels more human and requires less mental translation than form fields."}
                    {pattern.id === "contextual" &&
                      "Recognition (seeing options) is easier than recall (remembering what's possible). Context reduces memory load."}
                    {pattern.id === "adaptive" &&
                      "Repeated actions form habits. Systems that adapt to habits reduce friction and increase efficiency."}
                    {pattern.id === "defaults" &&
                      "People disproportionately stick with defaults. Smart defaults guide users toward better outcomes."}
                  </p>
                </div>

                {/* When to Use */}
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <h3 className="mb-3 font-semibold text-[#2B2B2B]">When to Use</h3>
                  <ul className="space-y-2">
                    {pattern.whenToUse.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#4B4B4B]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D4663E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6">
                  <h3 className="mb-3 font-semibold text-[#2B2B2B]">Real-World Example</h3>
                  <p className="text-sm text-[#6B6B6B]">{pattern.example}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="border-t border-[#E8E6E1] bg-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">Designing for AI-First Products</h2>
          <div className="space-y-4 text-[#4B4B4B]">
            <p>
              <strong className="text-[#2B2B2B]">Psychology-Grounded:</strong> These patterns aren't trendy
              gimmicks — they're rooted in decades of cognitive science research on memory, decision-making,
              and habit formation.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">AI as Enabler, Not Replacement:</strong> Agentic UI doesn't
              replace human judgment. It reduces friction, surfaces better options, and handles tedious tasks —
              letting users focus on creative work.
            </p>
            <p>
              <strong className="text-[#2B2B2B]">Token-Driven Implementation:</strong> All these patterns use
              the same design token system. AI suggestion panels, conversational bubbles, and adaptive layouts
              share colors, spacing, and typography tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
