"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const setIsLoaded = usePortfolioStore((state) => state.setIsLoaded);

  useEffect(() => {
    // Smooth 0 -> 100 counter
    const startTime = Date.now();
    const duration = 1600; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setIsLoaded(true);
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [setIsLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-[#0A0A0A] p-8 sm:p-12 select-none"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top header indicator */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-[#0A0A0A]/60">
            <span>Muthu Krishnan A</span>
            <span className="hidden sm:inline font-mono">Chennai, India</span>
          </div>

          {/* Central MK Monogram Draw-In */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer minimal square frame */}
              <motion.rect
                x="4"
                y="4"
                width="112"
                height="112"
                stroke="#0A0A0A"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {/* 'M' Letterform path */}
              <motion.path
                d="M 28 84 L 28 36 L 46 64 L 64 36 L 64 84"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />

              {/* 'K' Letterform path with electric blue accent dot */}
              <motion.path
                d="M 76 36 L 76 84 M 98 36 L 76 60 L 98 84"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.15 }}
              />
              <motion.circle
                cx="76"
                cy="60"
                r="3.5"
                fill="#2563EB"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              />
            </svg>

            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-[#0A0A0A]/50">
                Full-Stack & Mobile Engineer
              </span>
            </div>
          </div>

          {/* Bottom numeric ticker */}
          <div className="w-full flex items-baseline justify-between border-t border-[#0A0A0A]/10 pt-4">
            <span className="text-xs uppercase tracking-widest text-[#0A0A0A]/60 font-mono">
              INITIALIZING
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tighter">
              {progress}
              <span className="text-sm font-normal text-[#2563EB] ml-0.5">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
