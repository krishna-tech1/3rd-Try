"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, GraduationCap, Clock, Award, Briefcase } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/content";

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const bioWords = PORTFOLIO_CONTENT.about.bio.split(" ");

  const STAT_COLORS = [
    { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
    { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
    { text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative px-6 sm:px-12 py-24 sm:py-32 max-w-7xl mx-auto"
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#0A0A0A]/10 pb-4 mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50">
          ABOUT // 02
        </span>
        <span className="text-xs uppercase tracking-widest text-[#2563EB] font-mono font-semibold">
          PROFILE & STATS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="lg:sticky lg:top-28 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A] leading-tight">
              Engineering robust{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] bg-clip-text text-transparent">
                web & mobile
              </span>{" "}
              products from idea to production.
            </h2>

            {/* Quick Bio Info Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#0A0A0A]/10 shadow-xs flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] block">
                    BCA — Final Year
                  </span>
                  <span className="text-xs text-[#0A0A0A]/60 block">
                    Avichi College of Arts and Science (2024–2027)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#0A0A0A]/10 shadow-xs flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] block">
                    Chennai, India (UTC +5:30)
                  </span>
                  <span className="text-xs text-[#0A0A0A]/60 block">
                    Available for Remote & Freelance Contracts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Bento Column: Word-by-word reveal & Colored Stats */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Story Container with Frosted Glass & Border */}
          <div className="rounded-3xl bg-white/90 backdrop-blur-md p-8 sm:p-10 border border-[#0A0A0A]/10 shadow-[0_10px_40px_rgba(37,99,235,0.04)] space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold block">
              ENGINEERING PHILOSOPHY
            </span>

            <div className="text-lg sm:text-xl lg:text-2xl font-normal text-[#0A0A0A]/90 leading-relaxed tracking-tight">
              {bioWords.map((word, index) => {
                const start = index / bioWords.length;
                const end = start + 1 / bioWords.length;
                return (
                  <WordReveal
                    key={index}
                    word={word}
                    range={[start, end]}
                    progress={scrollYProgress}
                  />
                );
              })}
            </div>
          </div>

          {/* 4 Colored Stat Counters Bento Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {PORTFOLIO_CONTENT.about.stats.map((stat, idx) => {
              const theme = STAT_COLORS[idx % STAT_COLORS.length];
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border ${theme.border} p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow space-y-2`}
                >
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter ${theme.text} font-mono`}>
                    {stat.value}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[#0A0A0A]/70 font-semibold leading-snug">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WordReveal({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: any;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <span className="relative inline-block mr-2">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}
