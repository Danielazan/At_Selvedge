"use client"

/**
 * SharedScene
 * ------------------------------------------------------------------
 * Single persistent React Three Fiber Canvas that owns exactly one
 * renderer, one scene, one camera, and one lighting setup.
 *
 * All 3D models are mounted here once and never unmount. Visibility
 * and transforms are controlled by SceneOrchestrator.
 *
 * The SharedScene is mounted at the root level (app/page.tsx) and
 * persists for the entire page lifetime.
 * ------------------------------------------------------------------
 */

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { SceneOrchestrator } from "./SceneOrchestrator"

export function SharedScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <Canvas
        shadows
        camera={{ fov: 50, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
        className="!absolute inset-0"
      >
        <color attach="background" args={["#000000"]} />
        <Environment preset="city" />
        <SceneOrchestrator />
      </Canvas>
    </div>
  )
}