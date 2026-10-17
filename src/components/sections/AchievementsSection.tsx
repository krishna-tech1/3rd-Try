"use client";

import { motion } from "framer-motion";
import { Trophy, Award, ShieldCheck, GraduationCap, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const ACHIEVEMENT_ICONS = [
  { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  { icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { icon: Award, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" },
  { icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
];

export function AchievementsSection() {
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);

  const allItems = [
    ...PORTFOLIO_CONTENT.achievements,
    {
      title: `${PORTFOLIO_CONTENT.education.degree} — Final Year`,
      category: "Education",
      description: `${PORTFOLIO_CONTENT.education.institution} (${PORTFOLIO_CONTENT.education.period})`,
    },
  ];

  return (
    <section
      id="achievements"
      className="relative px-6 sm:px-12 py-24 sm:py-32 max-w-7xl mx-auto"
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#0A0A0A]/10 pb-4 mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50">
          HONORS & CERTIFICATES // 06
        </span>
        <span className="text-xs uppercase tracking-widest text-[#2563EB] font-mono font-semibold">
          ACADEMIC & INDUSTRY HONORS
        </span>
      </div>

      <div className="space-y-4 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A]">
          Proven Track Record.
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#0A0A0A]/70 leading-relaxed">
          Competitive hackathon victories, formal enterprise certifications, and verified credentials.
        </p>
      </div>

      {/* Grid of Verified Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allItems.map((item, idx) => {
          const config = ACHIEVEMENT_ICONS[idx % ACHIEVEMENT_ICONS.length];
          const Icon = config.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className={`group bg-white/95 backdrop-blur-md border ${config.border} rounded-3xl p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_45px_rgba(37,99,235,0.08)] transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl ${config.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0A0A0A]/4 text-[#0A0A0A]/70">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#2563EB] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A0A0A]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0A0A0A]/8 flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-700 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>VERIFIED CREDENTIAL</span>
                </span>
                <div className="w-8 h-8 rounded-full border border-[#0A0A0A]/10 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
