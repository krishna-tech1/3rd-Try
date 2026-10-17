"use client";

import { ArrowUp } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Footer() {
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#0A0A0A]/10 bg-white px-6 sm:px-12 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#0A0A0A]/8">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-xs tracking-tighter">
            MK
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-[#0A0A0A] block">
              {PORTFOLIO_CONTENT.brand.name}
            </span>
            <span className="text-xs text-[#0A0A0A]/50 block">
              Full-Stack & Mobile Engineer • Chennai, India
            </span>
          </div>
        </div>

        {/* Status notice */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#0A0A0A]/60 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{PORTFOLIO_CONTENT.brand.availability}</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#0A0A0A] hover:text-[#2563EB] transition-colors"
        >
          <span>Back to Top</span>
          <div className="w-7 h-7 rounded-full border border-[#0A0A0A]/15 flex items-center justify-center hover:border-[#2563EB]">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest text-[#0A0A0A]/40 font-mono">
        <span>© 2026 Muthu Krishnan A. All rights reserved.</span>
        <span>Designed with White & Electric Blue Minimalist Editorial Aesthetic</span>
      </div>
    </footer>
  );
}
