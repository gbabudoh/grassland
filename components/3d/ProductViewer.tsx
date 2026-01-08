"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SneakerModel } from "./SneakerModel";

export default function ProductViewer() {
  return (
    <div className="h-[500px] w-full cursor-grab active:cursor-grabbing sm:h-[600px]">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 25 }}
      >
        <Suspense fallback={null}>
          <SneakerModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
