"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, FileText, Send, Sparkles, Code2, Trophy } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function HeroSection() {
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);
  const isLoaded = usePortfolioStore((state) => state.isLoaded);

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex flex-col justify-between px-6 sm:px-12 pt-32 pb-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/8 to-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Tagline & Status Chip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center space-x-2.5 text-xs uppercase tracking-widest text-[#0A0A0A]/70 font-semibold"
        >
          <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-sm shadow-blue-500/50" />
          <span>Full-Stack & Mobile Engineer — Chennai, India</span>
        </motion.div>

        {/* Live Availability Chip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-xs font-semibold tracking-tight shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
          <span>{PORTFOLIO_CONTENT.brand.availability}</span>
        </motion.div>
      </div>

      {/* Main Giant Headline with Electric Blue Gradient Accent */}
      <div className="my-auto py-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-[#0A0A0A] leading-[0.92] select-none">
          <span className="inline-block mr-3 sm:mr-6">Hi,</span>
          <span className="inline-block mr-3 sm:mr-6">I&apos;m</span>
          <span className="inline-block bg-gradient-to-r from-[#0A0A0A] via-[#2563EB] to-[#4F46E5] bg-clip-text text-transparent">
            Muthu
          </span>
          <br className="hidden sm:inline" />
          <span className="inline-block bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0A0A0A] bg-clip-text text-transparent sm:ml-0">
            Krishnan.
          </span>
        </h1>

        {/* Editorial Sub-Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 sm:mt-8 max-w-2xl text-lg sm:text-xl lg:text-2xl text-[#0A0A0A]/80 font-normal leading-relaxed tracking-tight"
        >
          {PORTFOLIO_CONTENT.brand.subHeadline}
        </motion.p>

        {/* Key Live Achievements Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 flex flex-wrap items-center gap-2.5"
        >
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>4+ Client Deliveries</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
            <span className="text-indigo-600 font-bold">₹</span>
            <span>1.15L Peak Client Contract</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-purple-600" />
            <span>4x College Hackathon Winner</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2563EB] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 transition-all duration-300"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span>Explore Projects</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={PORTFOLIO_CONTENT.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2.5 px-6 py-3.5 rounded-full border border-[#0A0A0A]/20 bg-white/80 backdrop-blur-sm text-[#0A0A0A] text-xs uppercase tracking-widest font-semibold hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-white shadow-xs transition-all duration-200"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <FileText className="w-4 h-4 text-[#0A0A0A]/70 group-hover:text-[#2563EB] transition-colors" />
            <span>Download Resume</span>
          </a>

          <a
            href="#contact"
            className="group flex items-center space-x-2 px-5 py-3.5 text-[#0A0A0A]/75 hover:text-[#2563EB] text-xs uppercase tracking-widest font-semibold transition-colors"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <Send className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Contact Me</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Divider & Scroll prompt */}
      <div className="border-t border-[#0A0A0A]/10 pt-6 flex items-center justify-between text-xs uppercase tracking-widest text-[#0A0A0A]/50">
        <span className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span>INTERACTIVE 3D EXPERIENCE</span>
        </span>
        <span className="font-mono">01 // 07</span>
      </div>
    </section>
  );
}
