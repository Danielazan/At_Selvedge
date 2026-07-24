"use client"

/**
 * PersistentCloth
 * ------------------------------------------------------------------
 * Single persistent R3F Canvas + single mounted <G_cloth /> instance
 * that relays between Philosophy.tsx (the "African Craft" pillar) and
 * FourHouses.tsx (the "ATELION" card), following the same relay
 * pattern already used for LandModel → Philosophy (see scrollBus.ts).
 *
 * How it works
 * ------------------------------------------------------------------
 * - This Canvas is fixed, full-viewport, transparent, pointer-events
 *   disabled. It never unmounts and never reloads the GLTF.
 * - Philosophy / FourHouses no longer render their own mini-canvas
 *   for the cloth. Instead they render a <ClothAnchor id="..." />
 *   placeholder div with identical sizing/background styling, and
 *   this component measures that div's screen rect every frame.
 * - While the user is outside the transition zone, the cloth is
 *   simply projected onto whichever anchor is "active" (t === 0 or
 *   t === 1), so it scrolls naturally with the page exactly like a
 *   docked thumbnail would.
 * - Inside the transition zone (#philosophy-fourhouses-bridge),
 *   GSAP ScrollTrigger drives a 0→1 progress value. We interpolate
 *   between the two anchors in screen space, push the model toward
 *   the camera mid-scroll (the "hero" bulge) so it dominates the
 *   viewport, and apply a single smooth ~150° rotation — no
 *   continuous spin, fully reversible.
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import { G_cloth } from "@/Components/Hero/SmallerModels"

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/* Anchor registry — sections register a DOM element; this component  */
/* reads their live bounding rects every frame.                       */
/* ------------------------------------------------------------------ */
export type ClothAnchorId = "philosophy-craft" | "fourhouses-atelion"

const anchorEls: Partial<Record<ClothAnchorId, HTMLElement>> = {}

export function registerClothAnchor(id: ClothAnchorId, el: HTMLElement | null) {
  if (el) anchorEls[id] = el
  else delete anchorEls[id]
}

type Rect = { x: number; y: number; w: number; h: number }

function rectOf(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }
}

/** Unproject a screen-space point onto a plane at world-space z === depth */
function screenToWorld(camera: THREE.PerspectiveCamera, sx: number, sy: number, depth: number) {
  const ndcX = (sx / window.innerWidth) * 2 - 1
  const ndcY = -(sy / window.innerHeight) * 2 + 1
  const vector = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera)
  const dir = vector.sub(camera.position).normalize()
  const distance = (depth - camera.position.z) / dir.z
  return camera.position.clone().add(dir.multiplyScalar(distance))
}

/**
 * How many world-units wide a DOM rect of the given pixel width appears
 * at a given world-space depth, for THIS camera. Measured directly via
 * two unprojected points rather than guessed — so it's correct no
 * matter what FOV / camera distance you use, and no matter how big or
 * small the raw model geometry is.
 */
function anchorWorldWidth(camera: THREE.PerspectiveCamera, rect: Rect, depth: number) {
  const left = screenToWorld(camera, rect.x - rect.w / 2, rect.y, depth)
  const right = screenToWorld(camera, rect.x + rect.w / 2, rect.y, depth)
  return left.distanceTo(right)
}

/* ------------------------------------------------------------------ */
/* Inner — the actual GLTF, centered on its own bounding box so that   */
/* position/scale set on the parent group behave predictably no       */
/* matter what raw offset/size the source mesh was authored at.       */
/* ------------------------------------------------------------------ */
function CenteredCloth({ onMeasured }: { onMeasured: (naturalMaxDim: number) => void }) {
  const innerRef = useRef<THREE.Group>(null)
  const measuredRef = useRef(false)

  // Measure once, on the frame after the geometry has actually mounted
  // (Suspense above this has already resolved the GLTF by the time we
  // get here, so one frame is enough — no polling needed).
  useFrame(() => {
    if (measuredRef.current || !innerRef.current) return
    const box = new THREE.Box3().setFromObject(innerRef.current)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim > 0 && Number.isFinite(maxDim)) {
      measuredRef.current = true
      onMeasured(maxDim)
    }
  })

  return (
    <group ref={innerRef}>
      <Center>
        <G_cloth />
      </Center>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Rig — lives inside the Canvas, owns the one persistent cloth group */
/* ------------------------------------------------------------------ */
function ClothRig() {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0) // 0 = docked in Philosophy, 1 = docked in FourHouses
  const naturalMaxDimRef = useRef(0) // raw model size in its own units, measured once
  const [ready, setReady] = useState(false)
  const { camera } = useThree()

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

  useFrame(() => {
    const group = groupRef.current
    if (!group || !naturalMaxDimRef.current) return

    const craftEl = anchorEls["philosophy-craft"]
    const atelionEl = anchorEls["fourhouses-atelion"]
    if (!craftEl || !atelionEl) {
      group.visible = false
      return
    }
    group.visible = true

    const t = progressRef.current
    const start = rectOf(craftEl)
    const end = rectOf(atelionEl)
    const perspCam = camera as THREE.PerspectiveCamera

    // Hero bulge — 0 at both ends, peaks mid-transition, so the cloth
    // pushes toward the camera and dominates the viewport, then eases
    // back for a natural two-phase arrival into FourHouses.
    const heroCurve = Math.sin(Math.PI * t)

    const dockedDepth = 0
    const heroDepth = 2.4
    const depth = dockedDepth + heroCurve * heroDepth

    const sx = THREE.MathUtils.lerp(start.x, end.x, t)
    const sy = THREE.MathUtils.lerp(start.y, end.y, t)
    const worldPos = screenToWorld(perspCam, sx, sy, depth)
    group.position.copy(worldPos)

    // Real measured anchor sizes (world units, at this camera + depth),
    // not a guessed pixel constant.
    const startWorldWidth = anchorWorldWidth(perspCam, start, depth)
    const endWorldWidth = anchorWorldWidth(perspCam, end, depth)
    const dockedWorldWidth = THREE.MathUtils.lerp(startWorldWidth, endWorldWidth, t)

    // Grow beyond the docked size during the hero moment so it visibly
    // dominates the viewport, then ease back down for arrival.
    const HERO_GROWTH = 2.4
    const targetWorldWidth = dockedWorldWidth * (1 + heroCurve * HERO_GROWTH)

    const scale = targetWorldWidth / naturalMaxDimRef.current
    group.scale.setScalar(scale)

    // A single smooth ~150° hero rotation, plus a gentle tilt/roll that
    // only appears during the hero moment (heroCurve), not at rest.
    const rotY = THREE.MathUtils.lerp(0, Math.PI * (150 / 180), t)
    group.rotation.set(heroCurve * 0.16, rotY, heroCurve * 0.09)
  })

  return (
    <group ref={groupRef} visible={false} scale={0.0001}>
      <CenteredCloth
        onMeasured={(maxDim) => {
          naturalMaxDimRef.current = maxDim
          setReady(true)
        }}
      />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Root export — one Canvas, mounted once in app/page.tsx             */
/* ------------------------------------------------------------------ */
export default function PersistentClothCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[35]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.9} />
        <spotLight position={[3, 5, 3]} intensity={1.15} angle={0.5} penumbra={0.6} />
        <pointLight position={[-3, 2, -2]} intensity={0.35} color="#D9B67A" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ClothRig />
        </Suspense>
      </Canvas>
    </div>
  )
}