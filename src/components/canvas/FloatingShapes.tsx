"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  speed?: number;
  scale?: number;
  children: React.ReactNode;
}

function FloatingItem({
  position,
  color,
  roughness = 0.2,
  metalness = 0.5,
  speed = 1.5,
  scale = 1,
  children,
}: ShapeProps) {
  return (
    <Float
      speed={speed}
      rotationIntensity={1.4}
      floatIntensity={1.2}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh position={position} scale={scale} castShadow receiveShadow>
        {children}
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Parallax floating shapes with scroll progress
    const targetY = scrollProgress * 1.8;
    easing.damp3(
      groupRef.current.position,
      [0, targetY, 0],
      0.3,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      {/* Torus - Accent Electric Blue */}
      <FloatingItem
        position={[2.8, -1.0, -1.8]}
        color="#2563EB"
        metalness={0.7}
        roughness={0.2}
        speed={1.8}
        scale={0.5}
      >
        <torusGeometry args={[0.55, 0.18, 16, 32]} />
      </FloatingItem>

      {/* Icosahedron - Satin White */}
      <FloatingItem
        position={[-2.8, -0.6, -1.6]}
        color="#F8FAFC"
        metalness={0.1}
        roughness={0.3}
        speed={1.4}
        scale={0.55}
      >
        <icosahedronGeometry args={[0.6, 0]} />
      </FloatingItem>

      {/* Sphere - Pure Near-Black */}
      <FloatingItem
        position={[2.9, -2.6, -2.0]}
        color="#0A0A0A"
        metalness={0.9}
        roughness={0.15}
        speed={2.0}
        scale={0.45}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
      </FloatingItem>

      {/* Rounded Cube - Glass/White */}
      <FloatingItem
        position={[-2.9, -3.0, -1.8]}
        color="#FFFFFF"
        metalness={0.2}
        roughness={0.1}
        speed={1.6}
        scale={0.5}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
      </FloatingItem>

      {/* Octahedron - Electric Blue Accent */}
      <FloatingItem
        position={[-2.7, -4.8, -2.0]}
        color="#2563EB"
        metalness={0.8}
        roughness={0.15}
        speed={2.2}
        scale={0.45}
      >
        <octahedronGeometry args={[0.55, 0]} />
      </FloatingItem>

      {/* Torus Knot - Crisp White */}
      <FloatingItem
        position={[2.8, -5.2, -1.8]}
        color="#F1F5F9"
        metalness={0.3}
        roughness={0.2}
        speed={1.5}
        scale={0.38}
      >
        <torusKnotGeometry args={[0.45, 0.12, 64, 16]} />
      </FloatingItem>
    </group>
  );
}
