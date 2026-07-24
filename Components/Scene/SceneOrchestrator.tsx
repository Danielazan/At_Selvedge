"use client"

/**
 * SceneOrchestrator
 * ------------------------------------------------------------------
 * Manages all 3D content for the entire page.
 *
 * Responsibilities:
 * - CameraController: single camera orchestrated by GSAP/ScrollTrigger
 * - LightingController: shared lighting
 * - ModelRegistry: all models mounted once with visibility control
 * - TransitionManager: coordinates section transitions
 * - ClothRig: single persistent cloth with relay
 *
 * All models mount once and never unmount. Visibility is controlled
 * by the TransitionManager based on scroll position.
 * ------------------------------------------------------------------
 */

import { useRef, useEffect, useMemo, useCallback } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import { HouseMdel } from "@/Components/Hero/HouseModel"
import { Global, Inno, Perfumee, G_cloth } from "@/Components/Hero/SmallerModels"
import { registerClothAnchor, type ClothAnchorId } from "./PersistentCloth"

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type ModelId = "house" | "globe" | "inno" | "perfumee" | "cloth"

type TransitionPhase =
  | "landmodel"
  | "landmodel-philosophy-handoff"
  | "philosophy"
  | "philosophy-fourhouses-bridge"
  | "fourhouses"

/* ------------------------------------------------------------------ */
/* CameraController                                                    */
/* ------------------------------------------------------------------ */

function CameraController() {
  const { camera } = useThree()
  const phaseRef = useRef<TransitionPhase>("landmodel")

  const transitionTo = useCallback((phase: TransitionPhase) => {
    phaseRef.current = phase

    // Define camera positions for each phase
    const targets: Record<TransitionPhase, { position: THREE.Vector3; target: THREE.Vector3 }> = {
      landmodel: {
        position: new THREE.Vector3(82, 367, 11),
        target: new THREE.Vector3(5, -4, 0),
      },
      "landmodel-philosophy-handoff": {
        position: new THREE.Vector3(15, 8, 27),
        target: new THREE.Vector3(0, 8, 0),
      },
      philosophy: {
        position: new THREE.Vector3(0, 0.3, 3.2),
        target: new THREE.Vector3(0, 0, 0),
      },
      "philosophy-fourhouses-bridge": {
        position: new THREE.Vector3(0, 0.3, 3.2),
        target: new THREE.Vector3(0, 0, 0),
      },
      fourhouses: {
        position: new THREE.Vector3(0, 0.3, 3.2),
        target: new THREE.Vector3(0, 0, 0),
      },
    }

    const target = targets[phase]
    if (!target) return

    // Animate camera to target
    gsap.to(camera.position, {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
      duration: 1.5,
      ease: "power2.inOut",
    })

    const lookAtProxy = { x: 0, y: 0, z: 0 }
    gsap.to(lookAtProxy, {
      x: target.target.x,
      y: target.target.y,
      z: target.target.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(lookAtProxy.x, lookAtProxy.y, lookAtProxy.z)
      },
    })
  }, [camera])

  // Expose API to parent
  useEffect(() => {
    window.__cameraController = { transitionTo }
    return () => {
      delete window.__cameraController
    }
  }, [transitionTo])

  return null
}

/* ------------------------------------------------------------------ */
/* LightingController                                                  */
/* ------------------------------------------------------------------ */

function LightingController() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[50, 80, 30]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />
      <pointLight position={[3, 5, 3]} intensity={0.8} />
      <spotLight position={[3, 5, 3]} intensity={1.1} angle={0.5} penumbra={0.6} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* ModelRegistry                                                       */
/* ------------------------------------------------------------------ */

function ModelRegistry() {
  const modelVisibility = useRef<Record<ModelId, boolean>>({
    house: true,
    globe: false,
    inno: false,
    perfumee: false,
    cloth: true,
  })

  const showModel = useCallback((id: ModelId) => {
    modelVisibility.current[id] = true
  }, [])

  const hideModel = useCallback((id: ModelId) => {
    modelVisibility.current[id] = false
  }, [])

  const toggleModel = useCallback((id: ModelId, visible: boolean) => {
    modelVisibility.current[id] = visible
  }, [])

  // Expose API to parent
  useEffect(() => {
    window.__modelRegistry = { showModel, hideModel, toggleModel }
    return () => {
      delete window.__modelRegistry
    }
  }, [showModel, hideModel, toggleModel])

  return (
    <>
      {/* House - always visible during LandModel phase */}
      <group visible={modelVisibility.current.house}>
        <HouseMdel />
      </group>

      {/* Globe - visible during Philosophy */}
      <group visible={modelVisibility.current.globe}>
        <Global />
      </group>

      {/* Inno - visible during Philosophy */}
      <group visible={modelVisibility.current.inno}>
        <Inno />
      </group>

      {/* Perfumee - visible during FourHouses */}
      <group visible={modelVisibility.current.perfumee}>
        <Perfumee />
      </group>

      {/* Cloth - always visible, controlled by ClothRig */}
      <group visible={modelVisibility.current.cloth}>
        <ClothRig />
      </group>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* ClothRig                                                            */
/* ------------------------------------------------------------------ */

type Rect = { x: number; y: number; w: number; h: number }
const BASE_ANCHOR_WIDTH = 220

function rectOf(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }
}

function screenToWorld(
  camera: THREE.PerspectiveCamera,
  sx: number,
  sy: number,
  depth: number
) {
  const ndcX = (sx / window.innerWidth) * 2 - 1
  const ndcY = -(sy / window.innerHeight) * 2 + 1
  const vector = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera)
  const dir = vector.sub(camera.position).normalize()
  const distance = (depth - camera.position.z) / dir.z
  return camera.position.clone().add(dir.multiplyScalar(distance))
}

function ClothRig() {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)
  const { camera } = useThree()

  // Create transition controller
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: "#philosophy-fourhouses-bridge",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => st.kill()
    })

    return () => ctx.revert()
  }, [])

  // Render loop
  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    // Get anchor elements
    const craftEl = document.querySelector('[data-cloth-anchor="philosophy-craft"]') as HTMLElement | null
    const atelionEl = document.querySelector('[data-cloth-anchor="fourhouses-atelion"]') as HTMLElement | null

    if (!craftEl || !atelionEl) {
      group.visible = false
      return
    }

    group.visible = true

    const t = progressRef.current
    const start = rectOf(craftEl)
    const end = rectOf(atelionEl)
    const perspCam = camera as THREE.PerspectiveCamera

    // Hero bulge
    const heroCurve = Math.sin(Math.PI * t)

    const dockedDepth = 0
    const heroDepth = 2.4
    const depth = dockedDepth + heroCurve * heroDepth

    const sx = THREE.MathUtils.lerp(start.x, end.x, t)
    const sy = THREE.MathUtils.lerp(start.y, end.y, t)
    const worldPos = screenToWorld(perspCam, sx, sy, depth)
    group.position.copy(worldPos)

    const startScale = start.w / BASE_ANCHOR_WIDTH
    const endScale = end.w / BASE_ANCHOR_WIDTH
    const dockedScale = THREE.MathUtils.lerp(startScale, endScale, t)
    const heroBoost = Math.max(startScale, endScale) * 3.4
    group.scale.setScalar(dockedScale + heroCurve * heroBoost)

    const rotY = THREE.MathUtils.lerp(0, Math.PI * (150 / 180), t)
    group.rotation.set(heroCurve * 0.16, rotY, heroCurve * 0.09)
  })

  return (
    <group ref={groupRef} visible={false}>
      <G_cloth />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* TransitionManager                                                   */
/* ------------------------------------------------------------------ */

function TransitionManager() {
  const phaseRef = useRef<TransitionPhase>("landmodel")

  // Listen to scrollBus for transition triggers
  useEffect(() => {
    const onHandoffReady = () => {
      phaseRef.current = "landmodel-philosophy-handoff"
      // Trigger camera transition
      if (window.__cameraController) {
        window.__cameraController.transitionTo("landmodel-philosophy-handoff")
      }
      // Hide house, show philosophy models
      if (window.__modelRegistry) {
        window.__modelRegistry.toggleModel("house", false)
        window.__modelRegistry.toggleModel("globe", true)
        window.__modelRegistry.toggleModel("inno", true)
      }
    }

    const onTransitionReady = () => {
      phaseRef.current = "philosophy-fourhouses-bridge"
      if (window.__cameraController) {
        window.__cameraController.transitionTo("philosophy-fourhouses-bridge")
      }
      // Show perfumee
      if (window.__modelRegistry) {
        window.__modelRegistry.toggleModel("perfumee", true)
      }
    }

    // Subscribe to scrollBus events
    // (Assuming scrollBus provides these events)
    window.addEventListener("scrollHandoffReady", onHandoffReady)
    window.addEventListener("transitionReady", onTransitionReady)

    return () => {
      window.removeEventListener("scrollHandoffReady", onHandoffReady)
      window.removeEventListener("transitionReady", onTransitionReady)
    }
  }, [])

  return null
}

/* ------------------------------------------------------------------ */
/* SceneOrchestrator Root                                              */
/* ------------------------------------------------------------------ */

export function SceneOrchestrator() {
  return (
    <>
      <CameraController />
      <LightingController />
      <ModelRegistry />
      <TransitionManager />
    </>
  )
}

// TypeScript declaration for global APIs
declare global {
  interface Window {
    __cameraController?: {
      transitionTo: (phase: TransitionPhase) => void
    }
    __modelRegistry?: {
      showModel: (id: ModelId) => void
      hideModel: (id: ModelId) => void
      toggleModel: (id: ModelId, visible: boolean) => void
    }
  }
}