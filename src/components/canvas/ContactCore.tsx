"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function ContactCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Only fully visible when approaching Contact section (progress > 0.82)
    const inContact = scrollProgress > 0.8;
    const targetScale = inContact ? 1 : 0.001;

    easing.damp(groupRef.current.scale, "x", targetScale, 0.3, delta);
    easing.damp(groupRef.current.scale, "y", targetScale, 0.3, delta);
    easing.damp(groupRef.current.scale, "z", targetScale, 0.3, delta);

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.8;
      ringRef.current.rotation.y += delta * 1.2;
    }

    // React to pointer
    const targetX = state.pointer.x * 0.5 + 1.2;
    const targetY = -state.pointer.y * 0.4 - 0.2;
    easing.damp3(groupRef.current.position, [targetX, targetY, 0.5], 0.2, delta);
  });

  return (
    <group ref={groupRef} position={[1.2, -0.2, 0.5]} scale={0.001}>
      {/* Central Glass Sphere */}
      <mesh castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.2}
          transmission={0.9}
          ior={1.5}
          thickness={1.0}
          clearcoat={1}
        />
      </mesh>

      {/* Orbiting Chrome Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.55, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Electric Blue Core Glow */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>
    </group>
  );
}
