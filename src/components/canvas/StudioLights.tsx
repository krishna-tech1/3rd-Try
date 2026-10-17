"use client";

import { ContactShadows, Environment, Sparkles } from "@react-three/drei";

export function StudioLights() {
  return (
    <>
      {/* Studio HDRI Environment */}
      <Environment preset="studio" environmentIntensity={0.7} />

      {/* Floating Starlight Particles */}
      <Sparkles
        count={50}
        scale={9}
        size={2.8}
        speed={0.4}
        opacity={0.5}
        color="#2563EB"
      />
      <Sparkles
        count={25}
        scale={7}
        size={2.0}
        speed={0.3}
        opacity={0.4}
        color="#06B6D4"
      />

      {/* Primary Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Vibrant Electric Blue Rim Light */}
      <pointLight
        position={[3, -2, 2.5]}
        intensity={1.2}
        color="#2563EB"
        distance={10}
      />

      {/* Subtle Violet Accent Light */}
      <pointLight
        position={[-4, 3, 2]}
        intensity={0.8}
        color="#8B5CF6"
        distance={9}
      />

      {/* Soft Fill Light */}
      <directionalLight
        position={[-5, 4, -3]}
        intensity={0.5}
        color="#F8FAFC"
      />

      {/* Soft Contact Shadows on Ground */}
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.32}
        scale={8.5}
        blur={2.4}
        far={4.2}
        resolution={512}
        color="#0F172A"
      />

      {/* Ground plane */}
      <mesh
        position={[0, -1.61, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
    </>
  );
}
