"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Stage, PresentationControls } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

export function SneakerModel() {
  const modelRef = useRef<THREE.Group>(null);

  // Simple rotation animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      modelRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
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
            <group ref={modelRef}>
              {/* Sole */}
              <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[1.5, 0.4, 4.2]} />
                <meshStandardMaterial color="#E5E5E5" roughness={0.1} />
              </mesh>
              {/* Body */}
              <mesh position={[0, 0, 0.2]}>
                <boxGeometry args={[1.4, 1.2, 3.8]} />
                <meshStandardMaterial color="#706D6D" metalness={0.6} roughness={0.2} />
              </mesh>
              {/* Detail accent */}
              <mesh position={[0, 0.2, 1]}>
                <boxGeometry args={[1.45, 0.1, 1]} />
                <meshStandardMaterial color="#F9EACF" emissive="#F9EACF" emissiveIntensity={0.2} />
              </mesh>
            </group>
          </Stage>
        </Float>
      </PresentationControls>
    </Suspense>
  );
}

// Preload assets - commented out until a model is provided
// useGLTF.preload("/models/sneaker.glb");
