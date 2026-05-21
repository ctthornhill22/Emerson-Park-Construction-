"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ScoringResult } from "@/lib/quiz-scoring";
import type { ContactInfo } from "@/components/quiz/QuizFlow";

interface StoredResults {
  results: ScoringResult;
  contactInfo: ContactInfo;
}

const ARCH_GRADIENTS: Record<string, string> = {
  WM: "from-amber-700 to-stone-500",
  MF: "from-slate-700 to-slate-400",
  TR: "from-zinc-700 to-zinc-400",
  CC: "from-sky-600 to-cyan-300",
  MS: "from-orange-700 to-amber-500",
  OM: "from-stone-600 to-stone-400",
  MC: "from-rose-600 to-stone-400",
  MB: "from-stone-800 to-stone-600",
  MM: "from-stone-700 to-zinc-500",
  MP: "from-amber-900 to-stone-600",
};

const FINISH_GRADIENTS: Record<string, string> = {
  MCL: "from-zinc-600 to-zinc-300",
  WN: "from-amber-600 to-stone-400",
  CE: "from-zinc-500 to-zinc-300",
  CL: "from-sky-400 to-cyan-200",
  MT: "from-orange-600 to-amber-400",
  OS: "from-stone-500 to-stone-300",
  CTG: "from-rose-500 to-stone-300",
  RI: "from-stone-800 to-stone-500",
};

export default function QuizResultsPage() {
  const [data, setData] = useState<StoredResults | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("quizResults");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F5EFE4] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-5xl mb-4">🏡</div>
          <h2 className="font-display font-bold text-[#1C1A15] text-2xl mb-2">No results found</h2>
          <p className="text-[#78716C] mb-6 text-sm">
            It looks like you navigated here directly. Take the quiz to see your results.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  const { results, contactInfo } = data;
  const primaryGradient = ARCH_GRADIENTS[results.primaryArch.code] || "from-amber-700 to-stone-500";
  const secondaryGradient = ARCH_GRADIENTS[results.secondaryArch.code] || "from-stone-600 to-stone-400";
  const finishGradient = FINISH_GRADIENTS[results.primaryFinish.code] || "from-stone-500 to-stone-300";

  return (
    <div className="min-h-screen bg-[#F5EFE4]">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#1C1A15] border-b border-[#F5EFE4]/10">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9B6B38]"/>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-4">
            <svg className="w-4 h-4 text-[#9B6B38]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-[#9B6B38] text-sm font-medium">Your Results Are Ready</span>
          </div>

          <h1 className="font-display font-bold text-[#F5EFE4] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            {contactInfo.firstName ? `${contactInfo.firstName}'s` : "Your"} New Home Design Direction
          </h1>
          <p className="text-[#F5EFE4]/60 text-lg">
            A personalized style summary based on your selections
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Primary + Secondary Arch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${primaryGradient} opacity-20`}/>
            <div className="relative bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-6">
              <div className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-2">
                Primary Architectural Style
              </div>
              <div className="font-display font-bold text-[#1C1A15] text-3xl">
                {results.primaryArch.name}
              </div>
              <div className="text-[#78716C] text-xs mt-1 font-mono">{results.primaryArch.code}</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${secondaryGradient} opacity-15`}/>
            <div className="relative bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-6">
              <div className="text-[#78716C] text-xs font-semibold uppercase tracking-widest mb-2">
                Secondary Architectural Influence
              </div>
              <div className="font-display font-bold text-[#1C1A15] text-3xl">
                {results.secondaryArch.name}
              </div>
              <div className="text-[#78716C] text-xs mt-1 font-mono">{results.secondaryArch.code}</div>
            </div>
          </div>
        </div>

        {/* Interior Finish */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${finishGradient} opacity-10`}/>
          <div className="relative bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-6">
            <div className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-2">
              Interior Finish Direction
            </div>
            <div className="font-display font-bold text-[#1C1A15] text-2xl sm:text-3xl">
              {results.primaryFinish.name}
              {results.secondaryFinish.name && (
                <span className="text-[#78716C] font-normal"> with {results.secondaryFinish.name} accents</span>
              )}
            </div>
          </div>
        </div>

        {/* Style Blend */}
        <div className="bg-[#9B6B38] rounded-2xl p-6 sm:p-8">
          <div className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
            Your Style Blend
          </div>
          <div className="font-display font-bold text-white text-xl sm:text-2xl leading-tight">
            {results.styleBlend}
          </div>
        </div>

        {/* Summary paragraph */}
        <div className="bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-6 sm:p-8">
          <div className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-3">
            What This Means
          </div>
          <p className="text-[#3D3226] leading-relaxed">
            {results.styleSummary}
          </p>
          <p className="text-[#78716C] text-sm leading-relaxed mt-4">
            This tells us your home should feel <strong className="text-[#3D3226]">intentionally designed, not copied from a generic plan.</strong> Our team will prepare a personalized discovery presentation using this direction as the foundation.
          </p>
        </div>

        {/* Next step */}
        <div className="bg-[#1C1A15] border border-[#F5EFE4]/10 rounded-2xl p-6 sm:p-8 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="font-display font-bold text-[#F5EFE4] text-2xl mb-2">What Happens Next</h3>
          <p className="text-[#F5EFE4]/60 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            {contactInfo.email
              ? `We'll send your full style summary to ${contactInfo.email} and have someone from our team reach out to schedule your personalized discovery meeting.`
              : "Your results have been recorded. Contact us to schedule your personalized discovery meeting."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@buildemersonpark.com"
              className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#F5EFE4]/20 hover:border-[#F5EFE4]/40 text-[#F5EFE4] font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center pb-8">
          <Link
            href="/quiz/discover"
            className="text-[#78716C] hover:text-[#3D3226] text-sm transition-colors"
          >
            Retake the quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
