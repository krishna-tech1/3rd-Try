"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/content";

export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative px-6 sm:px-12 py-24 sm:py-32 max-w-7xl mx-auto"
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#0A0A0A]/10 pb-4 mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50">
          EXPERIENCE // 04
        </span>
        <span className="text-xs uppercase tracking-widest text-[#2563EB] font-mono font-semibold">
          CAREER TIMELINE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Headline */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A]">
              Engineering Journey.
            </h2>
            <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">
              From early freelance client deliveries to full-time engineering and product ownership across web, mobile, and databases.
            </p>

            <div className="pt-4 hidden lg:block">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-900 block">
                  Current Status
                </span>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Software Engineer at MaestroMinds & accepting high-impact freelance/remote contracts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Vertical Timeline with Scroll Drawn Line */}
        <div className="lg:col-span-8 relative pl-8 sm:pl-12">
          {/* Background Static Line */}
          <div className="absolute top-0 bottom-0 left-2.5 sm:left-3.5 w-[2px] bg-[#0A0A0A]/8" />

          {/* Animated Scroll-Drawn Glowing Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-2.5 sm:left-3.5 w-[2px] bg-gradient-to-b from-[#2563EB] to-[#4F46E5] shadow-sm shadow-blue-500/50 origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {PORTFOLIO_CONTENT.experience.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-white/90 backdrop-blur-md rounded-3xl border border-[#0A0A0A]/10 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#2563EB]/40 hover:shadow-[0_10px_35px_rgba(37,99,235,0.06)] transition-all group"
              >
                {/* Glowing Node Bullet */}
                <div className="absolute -left-[42px] sm:-left-[58px] top-7 w-5 h-5 rounded-full bg-white border-2 border-[#2563EB] group-hover:scale-125 transition-transform flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#0A0A0A]/8">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-base sm:text-lg text-[#0A0A0A]">
                        {item.role}
                      </span>
                      <span className="text-xs text-[#0A0A0A]/60 block font-medium">
                        {item.company}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#0A0A0A]/5 text-[#2563EB] border border-[#2563EB]/20">
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
