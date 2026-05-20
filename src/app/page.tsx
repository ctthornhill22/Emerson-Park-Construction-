import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: "🏠",
    title: "New Construction",
    description:
      "Custom homes and new builds from the ground up, designed to your specifications and built with precision.",
  },
  {
    icon: "🔨",
    title: "Renovations & Remodeling",
    description:
      "Transform your existing space with expert kitchen, bathroom, basement, and whole-home renovations.",
  },
  {
    icon: "🏢",
    title: "Commercial Build-Outs",
    description:
      "Office spaces, retail fit-outs, and light commercial construction delivered on time and on budget.",
  },
  {
    icon: "🪟",
    title: "Additions & Extensions",
    description:
      "Room additions, second stories, and structural expansions that integrate seamlessly with your home.",
  },
  {
    icon: "🔧",
    title: "Repair & Restoration",
    description:
      "Structural repairs, storm damage restoration, and deferred maintenance handled with craftsmanship.",
  },
  {
    icon: "🏗️",
    title: "Project Management",
    description:
      "Full-service general contracting — we coordinate every trade so your project runs smoothly.",
  },
];

const stats = [
  { value: "200+", label: "Projects Completed" },
  { value: "15+", label: "Years of Experience" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5★", label: "Average Rating" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-[#1a2744] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c8922a]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#c8922a]/20 border border-[#c8922a]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#c8922a] rounded-full" />
              <span className="text-[#c8922a] text-sm font-medium">
                Licensed &bull; Insured &bull; Bonded
              </span>
            </div>

            <h1 className="font-display font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">
              Built Right.
              <br />
              <span className="text-[#c8922a]">Built to Last.</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              Emerson Park Construction delivers quality residential and
              commercial construction you can trust — from custom new builds to
              expert renovations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#c8922a] hover:bg-[#e0a83c] text-white font-semibold text-base px-8 py-4 rounded transition-colors duration-200"
              >
                Get a Free Estimate
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-base px-8 py-4 rounded transition-colors duration-200"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#253560] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-[#c8922a] text-2xl sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#c8922a] text-sm font-semibold uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="font-display font-bold text-[#1a2744] text-4xl md:text-5xl mt-2">
              Our Services
            </h2>
            <p className="text-zinc-500 text-lg mt-4 max-w-xl mx-auto">
              From foundation to finish, we handle every phase of your
              construction project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group border border-zinc-100 rounded-xl p-7 hover:shadow-lg hover:border-[#c8922a]/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-display font-bold text-[#1a2744] text-xl mb-2 group-hover:text-[#c8922a] transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[#c8922a] text-sm font-semibold uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-display font-bold text-[#1a2744] text-4xl md:text-5xl mt-2 mb-6">
                Craftsmanship You Can Count On
              </h2>
              <p className="text-zinc-600 text-lg leading-relaxed mb-6">
                Emerson Park Construction was founded on a simple belief: every
                client deserves honest communication, skilled tradespeople, and
                results they&apos;re proud of.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-8">
                Whether you&apos;re building your dream home, expanding your
                business, or restoring a property — our team brings decades of
                combined experience and an unwavering commitment to quality to
                every job site.
              </p>
              <ul className="space-y-3 text-zinc-700">
                {[
                  "Fully licensed, insured, and bonded",
                  "Transparent pricing — no hidden fees",
                  "Direct communication with your project manager",
                  "Warranty on all completed work",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#c8922a] mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Placeholder image area */}
            <div className="relative">
              <div className="aspect-[4/3] bg-[#1a2744] rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center px-8">
                  <div className="text-6xl mb-4">🏗️</div>
                  <p className="text-white/50 text-sm">
                    Project photos coming soon
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#c8922a] rounded-xl px-6 py-4 shadow-xl">
                <div className="font-display font-bold text-white text-3xl">
                  15+
                </div>
                <div className="text-white/80 text-sm">Years in Business</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 md:py-28 bg-[#1a2744]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#c8922a] text-sm font-semibold uppercase tracking-widest">
            Get Started
          </span>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mt-2 mb-6">
            Ready to Build?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Contact us today for a free, no-obligation estimate. We&apos;ll
            discuss your project, your timeline, and your budget — and build a
            plan that works for you.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 text-left">
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c8922a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c8922a] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c8922a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c8922a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1.5">
                  Tell us about your project
                </label>
                <textarea
                  rows={4}
                  placeholder="I'm looking to renovate my kitchen and add a bathroom..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c8922a] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c8922a] hover:bg-[#e0a83c] text-white font-semibold py-4 rounded-lg transition-colors duration-200 text-base"
              >
                Send My Request
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
            <a
              href="mailto:info@buildemersonpark.com"
              className="flex items-center gap-2 hover:text-[#c8922a] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@buildemersonpark.com
            </a>
            <span className="hidden sm:block">•</span>
            <a
              href="tel:+15550000000"
              className="flex items-center gap-2 hover:text-[#c8922a] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
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
