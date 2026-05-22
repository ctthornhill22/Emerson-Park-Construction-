"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1A15]/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#9B6B38] rounded flex items-center justify-center font-display font-bold text-white text-lg leading-none">
            EP
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[#F5EFE4] text-base leading-tight tracking-wide">
              Emerson Park
            </span>
            <span className="text-[#9B6B38] text-xs font-medium tracking-widest uppercase">
              Design &amp; Construction
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#F5EFE4]/70 hover:text-[#9B6B38] text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/quiz"
          className="hidden md:inline-flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          Take the Style Quiz
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F5EFE4] p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1C1A15] border-t border-white/10 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-[#F5EFE4]/70 hover:text-[#9B6B38] text-base font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            Take the Style Quiz
          </Link>
        </div>
      )}
    </header>
  );
}
