"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-transform duration-300"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5">
        <nav className="flex items-center justify-between backdrop-blur-md bg-white/75 border border-[#0A0A0A]/8 rounded-full px-5 py-3 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
          {/* MK Monogram Logo */}
          <a
            href="#hero"
            className="flex items-center space-x-2.5 group"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-xs tracking-tighter group-hover:bg-[#2563EB] transition-colors">
              MK
            </div>
            <span className="font-semibold text-sm tracking-tight hidden sm:inline text-[#0A0A0A]">
              Muthu Krishnan
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-widest text-[#0A0A0A]/70 font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#2563EB] transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Pill Button */}
          <div className="flex items-center space-x-3">
            <a
              href="#contact"
              className="text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Contact
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0A0A0A] hover:text-[#2563EB] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-6 bg-white border border-[#0A0A0A]/10 rounded-2xl shadow-xl p-6 flex flex-col space-y-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-semibold text-[#0A0A0A] hover:text-[#2563EB] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-full bg-[#0A0A0A] text-white"
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
