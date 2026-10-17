"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { StudioLights } from "./StudioLights";
import { CameraRig } from "./CameraRig";
import { HeroMonogram } from "./HeroMonogram";
import { FloatingShapes } from "./FloatingShapes";
import { ContactCore } from "./ContactCore";
import { usePortfolioStore } from "@/store/usePortfolioStore";

function CanvasLoader() {
  return null;
}

export function SceneContainer() {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const setIsMobile = usePortfolioStore((state) => state.setIsMobile);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check mobile screen & reduced motion
    const checkEnvironment = () => {
      const mobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(mobile);
      if (mobile || reducedMotion) {
        setIsLowPower(true);
      }
    };

    checkEnvironment();
    window.addEventListener("resize", checkEnvironment);

    // Pause rendering when tab is hidden to conserve GPU/battery
    const handleVisibility = () => {
      if (document.hidden) {
        setFrameloop("never");
      } else {
        setFrameloop("always");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("resize", checkEnvironment);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [setIsMobile]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        // Keep pure transparent background so pure white editorial design shines through
        background: "transparent",
      }}
    >
      <Canvas
        shadows
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0, 5], fov: 42, near: 0.1, far: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<CanvasLoader />}>
          <StudioLights />
          <CameraRig />
          <HeroMonogram />
          {!isLowPower && <FloatingShapes />}
          {!isLowPower && <ContactCore />}
        </Suspense>
      </Canvas>
    </div>
  );
}
