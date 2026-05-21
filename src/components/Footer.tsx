import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1A15] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#9B6B38] rounded flex items-center justify-center font-bold text-white text-lg">
                EP
              </div>
              <div>
                <div className="font-display font-bold text-white leading-tight">
                  Emerson Park
                </div>
                <div className="text-[#9B6B38] text-xs tracking-widest uppercase">
                  Construction
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Quality residential and commercial construction, renovation, and
              remodeling. Built right. Built to last.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9B6B38] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {["Services", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-[#9B6B38] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9B6B38] mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="mailto:info@buildemersonpark.com"
                  className="hover:text-[#9B6B38] transition-colors"
                >
                  info@buildemersonpark.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1-555-000-0000"
                  className="hover:text-[#9B6B38] transition-colors"
                >
                  (555) 000-0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Emerson Park Construction. All
            rights reserved.
          </p>
          <p>Licensed &bull; Insured &bull; Bonded</p>
        </div>
      </div>
    </footer>
  );
}
