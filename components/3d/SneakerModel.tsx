"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Stage, PresentationControls } from "@react-three/drei";
import { useRef, Suspense, memo } from "react";
import type { Group } from "three";

export const SneakerModel = memo(function SneakerModel() {
  const modelRef = useRef<Group>(null);

  // Continuous 360-degree rotation
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Rotate by a constant speed
      modelRef.current.rotation.y += delta * 0.5;
      // Maintain a slight subtle sway on X for cinematic feel
      modelRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <Suspense fallback={null}>
      <PresentationControls
        global
        snap
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Stage adjustCamera intensity={0.5} environment="city" shadows={false}>
            {/* A more "premium" looking placeholder group */}
            <group ref={modelRef} dispose={null}>
              {/* Sole */}
              <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.4, 4.2]} />
                <meshStandardMaterial color="#E5E5E5" roughness={0.1} />
              </mesh>
              {/* Body */}
              <mesh position={[0, 0, 0.2]} castShadow receiveShadow>
                <boxGeometry args={[1.4, 1.2, 3.8]} />
                <meshStandardMaterial color="#706D6D" metalness={0.6} roughness={0.2} />
              </mesh>
              {/* Detail accent */}
              <mesh position={[0, 0.2, 1]} castShadow receiveShadow>
                <boxGeometry args={[1.45, 0.1, 1]} />
                <meshStandardMaterial color="#F9EACF" emissive="#F9EACF" emissiveIntensity={0.2} />
              </mesh>
            </group>
          </Stage>
        </Float>
      </PresentationControls>
    </Suspense>
  );
});

// Preload assets - commented out until a model is provided
// useGLTF.preload("/models/sneaker.glb");
