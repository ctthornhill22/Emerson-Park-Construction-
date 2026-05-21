import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Home Style Discovery Quiz",
  description:
    "Take our free Home Style Discovery Quiz and find out your architectural direction, interior finish preferences, and lifestyle priorities — before you ever break ground.",
};

const steps = [
  {
    number: "01",
    title: "Take the Quiz",
    description:
      "Answer visual questions about style, finishes, and lifestyle. Takes about 10–15 minutes.",
  },
  {
    number: "02",
    title: "Get Your Results",
    description:
      "Receive a personalized design direction — your architectural style, finish package, and style blend.",
  },
  {
    number: "03",
    title: "Schedule a Discovery Meeting",
    description:
      "Sit down with our team. We'll come prepared with a presentation built around your results.",
  },
  {
    number: "04",
    title: "Build Your Home",
    description:
      "Move into design and construction with a clear direction, a trusted team, and no guesswork.",
  },
];

const styles = [
  { name: "Warm Modern", code: "WM", gradient: "from-amber-700 to-stone-500", description: "Clean massing, warm wood, large glass" },
  { name: "Modern Farmhouse", code: "MF", gradient: "from-slate-700 to-slate-400", description: "Gabled roofs, approachable luxury" },
  { name: "New Traditional", code: "TR", gradient: "from-zinc-700 to-zinc-400", description: "Symmetry, timelessness, resale strength" },
  { name: "Coastal Contemporary", code: "CC", gradient: "from-sky-600 to-cyan-300", description: "Light palette, pool lifestyle, open living" },
  { name: "Modern Mediterranean", code: "MS", gradient: "from-orange-700 to-amber-500", description: "Arches, texture, courtyard character" },
  { name: "Organic Modern", code: "OM", gradient: "from-stone-600 to-stone-400", description: "Natural materials, quiet luxury" },
  { name: "Modern Cottage", code: "MC", gradient: "from-rose-600 to-stone-400", description: "Character, warmth, intimate luxury" },
  { name: "Modern Barn", code: "MB", gradient: "from-stone-800 to-stone-600", description: "Volume, utility, dramatic presence" },
  { name: "Mountain Modern", code: "MM", gradient: "from-stone-700 to-zinc-500", description: "Rustic materials, dramatic form" },
  { name: "Modern Prairie", code: "MP", gradient: "from-amber-900 to-stone-600", description: "Horizontal massing, calm privacy" },
];

export default function QuizIntroPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1C1A15] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9B6B38]" />
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#9B6B38] rounded-full animate-pulse"/>
            <span className="text-[#9B6B38] text-sm font-medium">Free — No Obligation</span>
          </div>

          <h1 className="font-display font-bold text-[#F5EFE4] text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
            Discover the Style of<br />
            <span className="text-[#9B6B38]">Your New Home</span>
          </h1>

          <p className="text-[#F5EFE4]/70 text-lg sm:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
            Our Home Style Discovery Quiz helps you identify your architectural
            direction, finish preferences, and lifestyle priorities — so your
            builder can prepare a truly personalized design direction before
            your first meeting.
          </p>

          <p className="text-[#F5EFE4]/40 text-sm mb-10">
            76 visual questions · 10–15 minutes · Personalized results
          </p>

          <Link
            href="/quiz/discover"
            className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-lg px-10 py-5 rounded-lg transition-colors duration-200"
          >
            Start the Quiz
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-[#FDFAF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">How It Works</span>
            <h2 className="font-display font-bold text-[#1C1A15] text-4xl mt-2">From Quiz to Keys</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-5xl font-display font-bold text-[#9B6B38]/20 mb-3 leading-none">
                  {step.number}
                </div>
                <h3 className="font-display font-bold text-[#1C1A15] text-lg mb-2">{step.title}</h3>
                <p className="text-[#78716C] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Preview */}
      <section className="py-20 md:py-28 bg-[#EDE5D4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">10 Architectural Directions</span>
            <h2 className="font-display font-bold text-[#1C1A15] text-4xl mt-2">Which One Speaks to You?</h2>
            <p className="text-[#78716C] text-lg mt-4 max-w-xl mx-auto">
              The quiz identifies your primary style direction and up to two supporting influences.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {styles.map((style) => (
              <div key={style.code} className="relative rounded-xl overflow-hidden group">
                <div className={`bg-gradient-to-br ${style.gradient} aspect-square flex flex-col items-center justify-center p-4 text-center transition-transform duration-300 group-hover:scale-105`}>
                  <div className="font-display font-bold text-white/20 text-3xl mb-1">{style.code}</div>
                  <div className="font-display font-bold text-white text-sm leading-tight">{style.name}</div>
                  <div className="text-white/60 text-xs mt-1 leading-tight hidden sm:block">{style.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1C1A15] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[#F5EFE4] text-4xl mb-4">
            Ready to Find Your Style?
          </h2>
          <p className="text-[#F5EFE4]/60 text-lg mb-8">
            Free, no pressure, no obligation. Just clarity on what you want — before you ever sit down with a builder.
          </p>
          <Link
            href="/quiz/discover"
            className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-lg px-10 py-5 rounded-lg transition-colors duration-200"
          >
            Take the Quiz — It&apos;s Free
          </Link>
        </div>
      </section>
    </>
  );
}
