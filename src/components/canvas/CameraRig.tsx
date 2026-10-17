"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function CameraRig() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const isMobile = usePortfolioStore((state) => state.isMobile);

  // Preset 3D camera waypoints for sections:
  // 0: Hero, 0.25: About, 0.5: Projects, 0.75: Skills, 1.0: Contact
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 5.0),       // Hero: centered, medium-close
        new THREE.Vector3(1.3, -0.3, 4.2),  // About: slight pan right
        new THREE.Vector3(-0.4, -0.6, 3.6), // Projects: close-up dynamic
        new THREE.Vector3(-1.2, 0.2, 4.4),  // Skills: pan left
        new THREE.Vector3(0, 0.4, 4.0),     // Contact: high centered
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const targetPoint = useRef(new THREE.Vector3(0, 0, 0));
  const cameraPosition = useRef(new THREE.Vector3(0, 0, 5.0));

  useFrame((state, delta) => {
    // If mobile, keep camera stationary and centered for maximum performance
    if (isMobile) {
      easing.damp3(state.camera.position, [0, 0, 5.2], 0.25, delta);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Normalized progress [0, 1] clamped
    const t = Math.min(Math.max(scrollProgress, 0), 1);
    const pointOnSpline = curve.getPointAt(t);

    // Subtle cursor parallax
    const parallaxX = state.pointer.x * 0.4;
    const parallaxY = state.pointer.y * 0.3;

    cameraPosition.current.set(
      pointOnSpline.x + parallaxX,
      pointOnSpline.y + parallaxY,
      pointOnSpline.z
    );

    // Smooth camera position damping
    easing.damp3(
      state.camera.position,
      [cameraPosition.current.x, cameraPosition.current.y, cameraPosition.current.z],
      0.3,
      delta
    );

    // Smooth look-at target damping
    const lookTargetX = pointOnSpline.x * 0.2 + parallaxX * 0.2;
    const lookTargetY = pointOnSpline.y * 0.2 + parallaxY * 0.2;
    easing.damp3(
      targetPoint.current,
      [lookTargetX, lookTargetY, 0],
      0.3,
      delta
    );

    state.camera.lookAt(targetPoint.current);
  });

  return null;
}
