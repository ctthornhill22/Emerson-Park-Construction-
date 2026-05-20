"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2744]/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#c8922a] rounded flex items-center justify-center font-display font-bold text-white text-lg leading-none">
            EP
          </div>
          <div className="flex flex-col">
            <span className="font-display font-700 text-white text-base leading-tight tracking-wide">
              Emerson Park
            </span>
            <span className="text-[#c8922a] text-xs font-medium tracking-widest uppercase">
              Construction
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/80 hover:text-[#c8922a] text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[#c8922a] hover:bg-[#e0a83c] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors duration-200"
        >
          Get a Free Estimate
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1a2744] border-t border-white/10 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/80 hover:text-[#c8922a] text-base font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-[#c8922a] hover:bg-[#e0a83c] text-white font-semibold px-5 py-3 rounded transition-colors"
          >
            Get a Free Estimate
          </a>
        </div>
      )}
    </header>
  );
}
