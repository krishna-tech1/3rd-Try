"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function HeroMonogram() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Base slow rotation
    const time = state.clock.getElapsedTime();
    const idleRotY = Math.sin(time * 0.4) * 0.15;
    const idleRotX = Math.cos(time * 0.3) * 0.08;

    // Cursor tilt with spring damping
    const cursorTiltX = -state.pointer.y * 0.35;
    const cursorTiltY = state.pointer.x * 0.45;

    // Scroll-driven transform:
    // Keep 3D off the central text areas:
    // In Hero (progress ~0), centered.
    // In About / Projects / Skills (progress 0.1 - 0.8), shift right into margin and push deeper in Z
    const isHero = scrollProgress < 0.12;
    const targetX = isHero ? 0 : 2.4;
    const targetY = isHero ? 0 : -0.2 - scrollProgress * 1.5;
    const targetZ = isHero ? 0 : -2.0;
    const scrollRotY = scrollProgress * Math.PI * 1.8;
    const scrollScale = isHero ? 1 : Math.max(0.48, 0.8 - scrollProgress * 0.3);

    easing.dampE(
      groupRef.current.rotation,
      [idleRotX + cursorTiltX, idleRotY + cursorTiltY + scrollRotY, 0],
      0.25,
      delta
    );

    easing.damp3(
      groupRef.current.position,
      [targetX, targetY, targetZ],
      0.25,
      delta
    );

    easing.damp(
      groupRef.current.scale,
      "x",
      scrollScale,
      0.25,
      delta
    );
    easing.damp(
      groupRef.current.scale,
      "y",
      scrollScale,
      0.25,
      delta
    );
    easing.damp(
      groupRef.current.scale,
      "z",
      scrollScale,
      0.25,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Glass & Chrome Material */}
      <meshPhysicalMaterial
        attach="material"
        color="#ffffff"
        roughness={0.1}
        metalness={0.15}
        transmission={0.92}
        ior={1.5}
        thickness={1.1}
        specularIntensity={1.0}
        specularColor="#ffffff"
        clearcoat={1.0}
        clearcoatRoughness={0.08}
        transparent
        opacity={0.96}
      />

      {/* "M" Letterform */}
      <group position={[-0.8, 0, 0]}>
        {/* Left vertical pillar */}
        <mesh position={[-0.55, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 2.0, 0.28]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Left diagonal */}
        <mesh
          position={[-0.275, 0.28, 0]}
          rotation={[0, 0, -Math.PI / 4.8]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 1.35, 0.26]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Right diagonal */}
        <mesh
          position={[0.275, 0.28, 0]}
          rotation={[0, 0, Math.PI / 4.8]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 1.35, 0.26]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Right vertical pillar */}
        <mesh position={[0.55, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 2.0, 0.28]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>
      </group>

      {/* "K" Letterform */}
      <group position={[0.8, 0, 0]}>
        {/* Vertical stem */}
        <mesh position={[-0.45, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 2.0, 0.28]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Top diagonal arm */}
        <mesh
          position={[0.1, 0.48, 0]}
          rotation={[0, 0, -Math.PI / 3.4]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 1.25, 0.26]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Bottom diagonal arm */}
        <mesh
          position={[0.18, -0.48, 0]}
          rotation={[0, 0, Math.PI / 3.3]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 1.28, 0.26]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.15}
            transmission={0.92}
            ior={1.5}
            thickness={1.1}
            clearcoat={1}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Core Electric Blue Floating Orb within K */}
        <mesh position={[0.15, 0.05, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            color="#2563EB"
            roughness={0.2}
            metalness={0.8}
            emissive="#2563EB"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}
