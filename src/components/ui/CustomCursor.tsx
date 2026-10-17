"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function CustomCursor() {
  const { cursorVariant, cursorText, isMobile } = usePortfolioStore();
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer trailing circle
  const springRing = { damping: 30, stiffness: 300, mass: 0.6 };
  const smoothRingX = useSpring(cursorX, springRing);
  const smoothRingY = useSpring(cursorY, springRing);

  // Fast springs for inner precision dot
  const springDot = { damping: 40, stiffness: 600, mass: 0.2 };
  const smoothDotX = useSpring(cursorX, springDot);
  const smoothDotY = useSpring(cursorY, springDot);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasPointer(mediaQuery.matches);

    const handlePointerMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!hasPointer || isMobile || !isVisible) {
    return null;
  }

  const isProject = cursorVariant === "project";
  const isHover = cursorVariant === "hover";

  return (
    <>
      {/* Outer Magnetic Trailing Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          width: isProject ? 76 : isHover ? 44 : 28,
          height: isProject ? 76 : isHover ? 44 : 28,
          backgroundColor: isProject
            ? "rgba(37, 99, 235, 0.95)"
            : isHover
            ? "rgba(37, 99, 235, 0.12)"
            : "transparent",
          border: isProject
            ? "1px solid rgba(255, 255, 255, 0.4)"
            : isHover
            ? "1.5px solid rgba(37, 99, 235, 0.6)"
            : "1px solid rgba(10, 10, 10, 0.25)",
          boxShadow: isProject
            ? "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
            : "none",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {isProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="uppercase tracking-widest text-[10px] font-bold text-white font-mono"
          >
            {cursorText || "VIEW"}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Center Dot */}
      {!isProject && (
        <motion.div
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 rounded-full bg-[#2563EB]"
          style={{
            x: smoothDotX,
            y: smoothDotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHover ? 0 : 1,
            opacity: isHover ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </>
  );
}
