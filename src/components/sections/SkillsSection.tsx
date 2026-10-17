"use client";

import { motion } from "framer-motion";
import { Layers, Server, Database, Smartphone, Cpu, Wrench, CheckCircle } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const CATEGORY_CONFIG: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    badgeBg: string;
    border: string;
    dotColor: string;
  }
> = {
  Frontend: {
    icon: Layers,
    color: "text-blue-600",
    badgeBg: "bg-blue-50/70 text-blue-800",
    border: "border-blue-200/80 hover:border-blue-400",
    dotColor: "bg-blue-600",
  },
  Backend: {
    icon: Server,
    color: "text-emerald-600",
    badgeBg: "bg-emerald-50/70 text-emerald-800",
    border: "border-emerald-200/80 hover:border-emerald-400",
    dotColor: "bg-emerald-600",
  },
  Database: {
    icon: Database,
    color: "text-indigo-600",
    badgeBg: "bg-indigo-50/70 text-indigo-800",
    border: "border-indigo-200/80 hover:border-indigo-400",
    dotColor: "bg-indigo-600",
  },
  Mobile: {
    icon: Smartphone,
    color: "text-purple-600",
    badgeBg: "bg-purple-50/70 text-purple-800",
    border: "border-purple-200/80 hover:border-purple-400",
    dotColor: "bg-purple-600",
  },
  "AI & Automation": {
    icon: Cpu,
    color: "text-cyan-600",
    badgeBg: "bg-cyan-50/70 text-cyan-800",
    border: "border-cyan-200/80 hover:border-cyan-400",
    dotColor: "bg-cyan-600",
  },
  "Other & Tools": {
    icon: Wrench,
    color: "text-amber-600",
    badgeBg: "bg-amber-50/70 text-amber-800",
    border: "border-amber-200/80 hover:border-amber-400",
    dotColor: "bg-amber-600",
  },
};

export function SkillsSection() {
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);

  return (
    <section
      id="skills"
      className="relative px-6 sm:px-12 py-24 sm:py-32 max-w-7xl mx-auto"
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#0A0A0A]/10 pb-4 mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50">
          SKILLS & STACK // 05
        </span>
        <span className="text-xs uppercase tracking-widest text-[#2563EB] font-mono font-semibold">
          PRODUCTION-GRADE CAPABILITIES
        </span>
      </div>

      <div className="space-y-4 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A]">
          Technical Arsenal.
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#0A0A0A]/70 leading-relaxed">
          Full-cycle development capabilities spanning modern reactive frontends, cloud backends, Flutter mobile apps, and Python AI automation.
        </p>
      </div>

      {/* Colorful Grouped Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {PORTFOLIO_CONTENT.skills.map((category, idx) => {
          const config = CATEGORY_CONFIG[category.area] || CATEGORY_CONFIG.Frontend;
          const Icon = config.icon;

          return (
            <motion.div
              key={category.area}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`bg-white/95 backdrop-blur-md border ${config.border} rounded-3xl p-7 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)] transition-all group flex flex-col justify-between`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#0A0A0A]/8">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${config.badgeBg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-[#0A0A0A]">
                      {category.area}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0A0A0A]/40 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Skill Badges with Color Accents */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      className="px-3 py-2 rounded-xl bg-white border border-[#0A0A0A]/10 text-xs font-semibold text-[#0A0A0A] hover:border-[#2563EB] hover:text-[#2563EB] shadow-xs cursor-default flex items-center space-x-2"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-5 mt-5 border-t border-[#0A0A0A]/6 flex items-center justify-between text-[11px] font-mono text-[#0A0A0A]/50">
                <span className="flex items-center space-x-1">
                  <CheckCircle className={`w-3.5 h-3.5 ${config.color}`} />
                  <span>VERIFIED</span>
                </span>
                <span className="uppercase tracking-widest">ACTIVE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
