/**
 * /quiz — Three-Stage Style Quiz intro page
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Home Style Discovery Quiz",
  description:
    "Take our free three-stage Home Style Discovery Quiz. Receive a custom AI exterior rendering, a personalized interior mood board, and a cost estimate range — before you ever sit down with us.",
};

const stages = [
  {
    number: "01",
    label: "Exterior Discovery",
    questions: "11 visual questions",
    deliverable: "AI exterior rendering sent to your inbox",
    gradient: "from-amber-700 to-stone-500",
    icon: "🏡",
  },
  {
    number: "02",
    label: "Interior Discovery",
    questions: "10 visual questions",
    deliverable: "Personalized interior mood board sent to your inbox",
    gradient: "from-teal-700 to-cyan-400",
    icon: "🪵",
  },
  {
    number: "03",
    label: "Project Details",
    questions: "Project scope + contact",
    deliverable: "Complete design profile with cost estimate range",
    gradient: "from-zinc-700 to-zinc-400",
    icon: "📋",
  },
];

const archStyles = [
  { name: "Warm Modern",            code: "WM", gradient: "from-amber-700 to-stone-500" },
  { name: "Modern Farmhouse",       code: "MF", gradient: "from-slate-700 to-slate-400" },
  { name: "New Traditional",        code: "TR", gradient: "from-zinc-700 to-zinc-400" },
  { name: "Coastal Contemporary",   code: "CC", gradient: "from-sky-600 to-cyan-300" },
  { name: "Contemporary Mediterranean", code: "MS", gradient: "from-orange-700 to-amber-500" },
  { name: "Organic Modern",         code: "OM", gradient: "from-stone-600 to-stone-400" },
  { name: "Modern Cottage",         code: "MC", gradient: "from-rose-600 to-stone-400" },
  { name: "Modern Barn",            code: "MB", gradient: "from-stone-800 to-stone-600" },
  { name: "Mountain Modern",        code: "MM", gradient: "from-stone-700 to-zinc-500" },
  { name: "Modern Prairie",         code: "MP", gradient: "from-amber-900 to-stone-600" },
];

export default function QuizIntroPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[#1C1A15] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9B6B38]" />
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#9B6B38] rounded-full animate-pulse" />
            <span className="text-[#9B6B38] text-sm font-medium">Free · No Obligation · 3 Stages</span>
          </div>

          <h1 className="font-display font-bold text-[#F5EFE4] text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
            Discover the Style of<br />
            <span className="text-[#9B6B38]">Your New Home</span>
          </h1>

          <p className="text-[#F5EFE4]/70 text-lg sm:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
            Our three-stage Home Style Discovery Quiz identifies your architectural direction,
            interior finish preferences, and project scope — then delivers a custom AI rendering,
            a personalized mood board, and a cost estimate range directly to your inbox.
          </p>

          <p className="text-[#F5EFE4]/40 text-sm mb-10">
            21 visual questions · 10–15 minutes · 3 deliverables sent to your inbox
          </p>

          <Link
            href="/quiz/discover"
            className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-lg px-10 py-5 rounded-lg transition-colors duration-200"
          >
            Begin the Quiz
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Three Stages ── */}
      <section className="py-20 md:py-28 bg-[#FDFAF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="font-display font-bold text-[#1C1A15] text-4xl mt-2">
              Three Stages. Three Deliverables.
            </h2>
            <p className="text-[#78716C] text-lg mt-4 max-w-xl mx-auto">
              Each stage ends with something valuable sent directly to your inbox —
              before you ever sit down with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <div key={stage.number} className="relative">
                {i < stages.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-[#EDE5D4] z-0 -translate-x-6" />
                )}
                <div className="relative bg-white border border-[#EDE5D4] rounded-2xl p-7 hover:border-[#9B6B38]/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stage.gradient} flex items-center justify-center text-white font-display font-bold text-sm`}>
                      {stage.number}
                    </div>
                    <div className="text-2xl">{stage.icon}</div>
                  </div>
                  <h3 className="font-display font-bold text-[#1C1A15] text-xl mb-1">
                    {stage.label}
                  </h3>
                  <p className="text-[#78716C] text-sm mb-4">{stage.questions}</p>
                  <div className="border-t border-[#EDE5D4] pt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#9B6B38] mb-1">
                      You receive
                    </p>
                    <p className="text-[#3D3226] text-sm leading-relaxed">
                      {stage.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/quiz/discover"
              className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Start Stage 1 — Exterior Discovery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10 Architectural Styles ── */}
      <section className="py-20 md:py-28 bg-[#EDE5D4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
              10 Architectural Directions
            </span>
            <h2 className="font-display font-bold text-[#1C1A15] text-4xl mt-2">
              Which One Speaks to You?
            </h2>
            <p className="text-[#78716C] text-lg mt-4 max-w-xl mx-auto">
              The quiz identifies your primary style direction and your supporting influences —
              then generates an AI rendering in that direction.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {archStyles.map((style) => (
              <div key={style.code} className="relative rounded-xl overflow-hidden group cursor-default">
                <div className={`bg-gradient-to-br ${style.gradient} aspect-square flex flex-col items-center justify-center p-4 text-center transition-transform duration-300 group-hover:scale-105`}>
                  <div className="font-display font-bold text-white/20 text-3xl mb-1">{style.code}</div>
                  <div className="font-display font-bold text-white text-sm leading-tight">{style.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-[#1C1A15] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[#F5EFE4] text-4xl mb-4">
            Ready to Discover Your Style?
          </h2>
          <p className="text-[#F5EFE4]/60 text-lg mb-8">
            Free. No pressure. No obligation. Just clarity on what you want —
            delivered to your inbox before you ever sit down with a builder.
          </p>
          <Link
            href="/quiz/discover"
            className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-lg px-10 py-5 rounded-lg transition-colors duration-200"
          >
            Take the Quiz — It&apos;s Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
