"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollVelocity = usePortfolioStore((state) => state.scrollVelocity);
  const x = useMotionValue(0);

  // Dynamic speed reacting to scroll velocity
  useAnimationFrame((_, delta) => {
    const baseSpeed = -0.06;
    const velocityFactor = Math.abs(scrollVelocity) * 0.0003;
    const currentSpeed = (baseSpeed - velocityFactor) * delta;

    let newX = x.get() + currentSpeed;
    // Loop reset
    if (newX <= -50) {
      newX = 0;
    }
    x.set(newX);
  });

  const marqueeItems = [...PORTFOLIO_CONTENT.marquee, ...PORTFOLIO_CONTENT.marquee];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden border-y border-[#0A0A0A]/10 bg-white/70 backdrop-blur-xs py-4 sm:py-5 select-none"
    >
      <motion.div
        className="flex whitespace-nowrap space-x-8 sm:space-x-12"
        style={{ x: `${x.get()}%` }}
      >
        {marqueeItems.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0A0A0A]/80 hover:text-[#2563EB] transition-colors"
          >
            <span>{tech}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
