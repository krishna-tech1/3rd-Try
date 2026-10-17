"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

interface ProjectDistortionPlaneProps {
  position?: [number, number, number];
  isHovered?: boolean;
}

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Gentle wave ripple across plane on hover
    float wave = sin(pos.x * 3.5 + uTime * 2.5) * cos(pos.y * 3.5 + uTime * 2.0) * 0.08 * uHover;
    pos.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uAccent;

  void main() {
    vec2 uv = vUv;

    // Subtle distortion wave
    float distortion = sin(uv.y * 12.0 + uTime * 2.0) * 0.02 * uHover;
    uv.x += distortion;

    // Dynamic graphic gradient
    vec3 baseColor = mix(uColorA, uColorB, uv.y + uv.x * 0.2);
    
    // Grid lines / Editorial accents
    float gridX = step(0.98, fract(uv.x * 8.0));
    float gridY = step(0.98, fract(uv.y * 8.0));
    float grid = max(gridX, gridY) * 0.12 * (1.0 + uHover * 0.5);

    vec3 finalColor = mix(baseColor, uAccent, grid);
    
    // Slight vignette
    float dist = distance(uv, vec2(0.5));
    finalColor *= smoothstep(0.8, 0.2, dist);

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

export function ProjectDistortionPlane({
  position = [0, 0, 0],
  isHovered = false,
}: ProjectDistortionPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color("#0A0A0A") },
      uColorB: { value: new THREE.Color("#1E293B") },
      uAccent: { value: new THREE.Color("#2563EB") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    easing.damp(
      materialRef.current.uniforms.uHover,
      "value",
      isHovered ? 1.0 : 0.0,
      0.2,
      delta
    );
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2.4, 1.5, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
