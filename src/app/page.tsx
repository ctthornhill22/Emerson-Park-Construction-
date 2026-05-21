import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const processSteps = [
  {
    number: "01",
    title: "Take the Style Quiz",
    description:
      "Our 15-minute Home Style Discovery Quiz identifies your architectural direction, finish preferences, and lifestyle priorities before we ever meet.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Personalized Discovery Meeting",
    description:
      "We arrive prepared — with a presentation built around your quiz results, your lot, and your lifestyle. No generic pitches.",
    icon: "🗺️",
  },
  {
    number: "03",
    title: "Design Direction",
    description:
      "Together we refine the architectural direction, floor plan, and finish package into a clear, buildable vision for your home.",
    icon: "📐",
  },
  {
    number: "04",
    title: "Build Your Home",
    description:
      "We break ground with a clear direction, skilled trades, and a team that communicates every step of the way.",
    icon: "🏗️",
  },
];

const services = [
  {
    title: "Custom New Construction",
    description:
      "Build the home you've always imagined — from the ground up, on your lot, to your specifications.",
    icon: "🏡",
  },
  {
    title: "Design-Build Process",
    description:
      "We guide you through style discovery, architectural direction, floor plan, and finish selections before a nail is driven.",
    icon: "📐",
  },
  {
    title: "Spec & Semi-Custom Homes",
    description:
      "Quality-built homes available now — or customize a current build to fit your lifestyle.",
    icon: "🏘️",
  },
  {
    title: "Renovations & Additions",
    description:
      "Expand, update, or transform your existing home with the same level of care and craftsmanship.",
    icon: "🔨",
  },
  {
    title: "Outdoor Living & Pool Planning",
    description:
      "We design the outdoor experience from day one — lanai, pool, kitchen, and indoor-outdoor flow.",
    icon: "🌊",
  },
  {
    title: "Full Project Management",
    description:
      "One point of contact, transparent communication, and every trade coordinated under one roof.",
    icon: "📋",
  },
];

const stats = [
  { value: "200+", label: "Homes Built" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5★", label: "Average Rating" },
];

const styleCards = [
  { name: "Warm Modern", gradient: "from-amber-700 to-stone-500" },
  { name: "Modern Farmhouse", gradient: "from-slate-700 to-slate-400" },
  { name: "Coastal Contemporary", gradient: "from-sky-600 to-cyan-300" },
  { name: "Mediterranean", gradient: "from-orange-700 to-amber-500" },
  { name: "Organic Modern", gradient: "from-stone-600 to-stone-400" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-[#1C1A15] overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#9B6B38] rounded-full animate-pulse" />
              <span className="text-[#9B6B38] text-sm font-medium">
                Custom New Home Builder · Ocala, FL
              </span>
            </div>

            <h1 className="font-display font-bold text-[#F5EFE4] text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">
              Start With Style.<br />
              <span className="text-[#9B6B38]">Build With Confidence.</span>
            </h1>

            <p className="text-[#F5EFE4]/60 text-lg sm:text-xl leading-relaxed mb-4 max-w-xl">
              Most builders ask for your budget first. We ask about your
              style. Our Home Style Discovery Quiz identifies your
              architectural direction before we ever sit down together —
              so every meeting is personalized to you.
            </p>

            <p className="text-[#F5EFE4]/40 text-sm mb-10">
              Free · 10–15 minutes · No obligation
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Take the Style Quiz
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 border border-[#F5EFE4]/20 hover:border-[#F5EFE4]/40 text-[#F5EFE4] font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200"
              >
                See How We Work
              </a>
            </div>
          </div>

          {/* Style preview floating cards */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
            {styleCards.map((card, i) => (
              <div
                key={card.name}
                className={`relative w-48 h-14 rounded-lg overflow-hidden opacity-${80 - i * 12}`}
                style={{ transform: `translateX(${i * 8}px)` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient}`}/>
                <div className="absolute inset-0 bg-black/20"/>
                <div className="relative h-full flex items-center px-4">
                  <span className="text-white font-display font-semibold text-sm">{card.name}</span>
                </div>
              </div>
            ))}
            <div className="text-[#F5EFE4]/30 text-xs text-center mt-1">+ 5 more styles</div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#2A271F] border-t border-[#F5EFE4]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-[#9B6B38] text-2xl sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-[#F5EFE4]/60 text-xs sm:text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ FEATURE */}
      <section className="py-20 md:py-28 bg-[#F5EFE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
                Our Unique Approach
              </span>
              <h2 className="font-display font-bold text-[#1C1A15] text-4xl md:text-5xl mt-2 mb-6 leading-tight">
                Style First.<br />Budget Second.
              </h2>
              <p className="text-[#78716C] text-lg leading-relaxed mb-6">
                Most builders start with a budget conversation. We start with{" "}
                <strong className="text-[#3D3226]">your vision</strong>. Our Home Style Discovery Quiz
                helps you identify your architectural direction, interior finish
                preferences, and lifestyle priorities before we ever sit down
                together.
              </p>
              <p className="text-[#78716C] leading-relaxed mb-8">
                When you come to your discovery meeting, we arrive prepared —
                with a personalized presentation built around your results, not
                a generic portfolio pitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold px-7 py-3.5 rounded-lg transition-colors"
                >
                  Take the Free Quiz
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quiz preview card */}
            <div className="bg-[#1C1A15] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-1">
                Home Style Discovery Quiz
              </div>
              <p className="text-[#F5EFE4]/60 text-sm mb-6">
                Which exterior homes are you most drawn to?
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Warm Modern", gradient: "from-amber-700 to-stone-500", emoji: "🏡" },
                  { label: "Modern Farmhouse", gradient: "from-slate-700 to-slate-400", emoji: "🌾" },
                  { label: "Coastal Contemporary", gradient: "from-sky-600 to-cyan-300", emoji: "🌊" },
                  { label: "Mediterranean", gradient: "from-orange-700 to-amber-500", emoji: "🌿" },
                ].map((s) => (
                  <div key={s.label} className={`relative rounded-lg overflow-hidden border-2 border-[#EDE5D4]/20 h-20`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-40`}/>
                    <div className="relative h-full flex flex-col items-center justify-center gap-1 p-2">
                      <div className="text-lg">{s.emoji}</div>
                      <div className="text-white font-display font-semibold text-xs text-center leading-tight">
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[#F5EFE4]/30 text-xs mb-4">
                <span>Question 1 of 20+ visual questions</span>
                <span>Free · 10–15 min</span>
              </div>
              <div className="h-1 bg-[#F5EFE4]/10 rounded-full">
                <div className="h-full w-1/12 bg-[#9B6B38] rounded-full"/>
              </div>
              <Link
                href="/quiz"
                className="mt-5 block text-center bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold py-3 rounded-lg transition-colors text-sm"
              >
                Start the Quiz →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 md:py-28 bg-[#1C1A15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
              Our Process
            </span>
            <h2 className="font-display font-bold text-[#F5EFE4] text-4xl md:text-5xl mt-2">
              From Quiz to Keys
            </h2>
            <p className="text-[#F5EFE4]/50 text-lg mt-4 max-w-xl mx-auto">
              A clear, structured process from your first click to move-in day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#F5EFE4]/10 z-0 -translate-x-3"/>
                )}
                <div className="relative bg-[#F5EFE4]/5 border border-[#F5EFE4]/10 rounded-xl p-6 hover:border-[#9B6B38]/30 transition-colors">
                  <div className="font-display font-bold text-[#9B6B38]/30 text-4xl leading-none mb-3">
                    {step.number}
                  </div>
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <h3 className="font-display font-bold text-[#F5EFE4] text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#F5EFE4]/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-[#FDFAF5] font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Start With the Style Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
              What We Build
            </span>
            <h2 className="font-display font-bold text-[#1C1A15] text-4xl md:text-5xl mt-2">
              Our Services
            </h2>
            <p className="text-[#78716C] text-lg mt-4 max-w-xl mx-auto">
              From custom new builds to renovations — built right, built to last.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-7 hover:border-[#9B6B38]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-display font-bold text-[#1C1A15] text-xl mb-2 group-hover:text-[#9B6B38] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#78716C] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 bg-[#EDE5D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-display font-bold text-[#1C1A15] text-4xl md:text-5xl mt-2 mb-6">
                Craftsmen Who Communicate
              </h2>
              <p className="text-[#78716C] text-lg leading-relaxed mb-6">
                Emerson Park Construction was built on a simple belief: every
                client deserves honest communication, skilled tradespeople, and
                a home they are proud to live in.
              </p>
              <p className="text-[#78716C] leading-relaxed mb-8">
                We specialize in custom new construction and design-build
                projects in the Ocala area. Our style-first approach means
                your home is designed around your vision — not a spec sheet.
              </p>
              <ul className="space-y-3 text-[#3D3226]">
                {[
                  "Fully licensed, insured, and bonded",
                  "Style-first discovery process — not budget-first",
                  "Transparent pricing with no hidden surprises",
                  "Direct communication with your project manager",
                  "Warranty on all completed work",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9B6B38] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-[#1C1A15] rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center px-8">
                  <div className="text-6xl mb-4">🏗️</div>
                  <p className="text-[#F5EFE4]/50 text-sm">Project photos coming soon</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#9B6B38] rounded-xl px-6 py-4 shadow-xl">
                <div className="font-display font-bold text-white text-3xl">15+</div>
                <div className="text-white/80 text-sm">Years in Business</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ CTA BANNER */}
      <section className="py-16 bg-[#9B6B38]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-4">
            Don't Know Where to Start?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            The Style Quiz takes 10–15 minutes and gives you a clear
            architectural direction, interior finish guidance, and a
            personalized discovery meeting — all free.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-[#FDFAF5] hover:bg-white text-[#9B6B38] font-bold text-base px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Take the Free Style Quiz
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-28 bg-[#1C1A15]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#9B6B38] text-sm font-semibold uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="font-display font-bold text-[#F5EFE4] text-4xl md:text-5xl mt-2 mb-6">
            Ready to Talk?
          </h2>
          <p className="text-[#F5EFE4]/60 text-lg mb-10">
            Whether you want to take the quiz first or jump straight into a
            conversation — we&apos;re here when you&apos;re ready.
          </p>

          <div className="bg-[#F5EFE4]/5 border border-[#F5EFE4]/10 rounded-2xl p-8 md:p-10 text-left mb-8">
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#F5EFE4]/70 text-sm mb-1.5">First Name</label>
                  <input type="text" placeholder="Jane" className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"/>
                </div>
                <div>
                  <label className="block text-[#F5EFE4]/70 text-sm mb-1.5">Last Name</label>
                  <input type="text" placeholder="Smith" className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"/>
                </div>
              </div>
              <div>
                <label className="block text-[#F5EFE4]/70 text-sm mb-1.5">Email</label>
                <input type="email" placeholder="jane@example.com" className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"/>
              </div>
              <div>
                <label className="block text-[#F5EFE4]/70 text-sm mb-1.5">Phone</label>
                <input type="tel" placeholder="(555) 000-0000" className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"/>
              </div>
              <div>
                <label className="block text-[#F5EFE4]/70 text-sm mb-1.5">Tell us about your project</label>
                <textarea rows={4} placeholder="I'm looking to build a custom home on my lot in Ocala…" className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors resize-none"/>
              </div>
              <button type="submit" className="w-full bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold py-4 rounded-lg transition-colors duration-200 text-base">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#F5EFE4]/50 text-sm">
            <a href="mailto:info@buildemersonpark.com" className="flex items-center gap-2 hover:text-[#9B6B38] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              info@buildemersonpark.com
            </a>
            <span className="hidden sm:block">•</span>
            <a href="tel:+15550000000" className="flex items-center gap-2 hover:text-[#9B6B38] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              (555) 000-0000
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
