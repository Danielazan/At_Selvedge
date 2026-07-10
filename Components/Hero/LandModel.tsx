/* ------------------------------------------------------------------ */
// The deva debug code for setting 3d models properly
/* ------------------------------------------------------------------ */

// "use client"
// import * as THREE from "three"
// import { useRef, useState, useEffect, useCallback } from 'react'
// import { Canvas, useThree, useFrame } from '@react-three/fiber'
// import { OrbitControls, TransformControls } from '@react-three/drei'
// import gsap from 'gsap'
// import { HouseMdel } from './HouseModel'
// import { useControls, button, Leva, folder } from 'leva'

// // ============================================================
// // HOW TO USE (read this first)
// // ============================================================
// // 1. In the "Debug Mode" panel, pick "Editing Phase" — which phase's
// //    numbers you're about to set (Initial, Phase 1, Phase 2, Phase 3).
// // 2. In the "Section" panel, pick WHAT you're setting for that phase:
// //    Camera Position, Model Position, Model Scale, Model Rotation, or
// //    Look At. Only ONE mouse control is active at a time, matching
// //    whatever you picked:
// //      - Camera Position -> drag/scroll orbits and zooms the camera.
// //      - Model Position / Scale / Rotation -> an on-screen gizmo
// //        (colored arrows/rings/boxes) appears ON the building —
// //        drag its handles to move/scale/rotate it. Orbiting is
// //        turned off in this mode so you can't do both at once.
// //      - Look At -> a small yellow wireframe ball appears — drag it
// //        to the point you want the camera aimed at. The camera keeps
// //        looking at it live so you can see the framing update.
// // 3. Click "Jump To Phase" to snap the scene to that phase's
// //    CURRENTLY SAVED values, so you're nudging from something
// //    real instead of a random spot.
// // 4. Adjust using the mouse control for your chosen section, then
// //    click "Apply To Phase" — this writes the value straight into
// //    that phase's fields in the Cinematic Config panel below.
// //    No copy-pasting needed.
// // 5. Repeat for every section of every phase.
// // 6. Click "Play This Phase" any time to preview just that phase.
// // 7. When everything looks right, click "Play Full Cinematic".
// // ============================================================

// type Vec3 = [number, number, number]
// type PhaseKey = 'initial' | 'phase1' | 'phase2' | 'phase3'
// type SectionKey = 'camera' | 'modelPosition' | 'modelScale' | 'modelRotation' | 'lookAt' | 'orbitStart' | 'orbitEnd'

// type CinematicConfig = {
//   initialCameraPos: Vec3
//   initialModelPos: Vec3
//   initialModelScale: number
//   initialLookAt: Vec3

//   p1_cameraPos: Vec3
//   p1_duration: number
//   p1_buildingRotY: number
//   p1_modelPos: Vec3
//   p1_modelScale: number
//   p1_lookAt: Vec3

//   p2_cameraPos: Vec3
//   p2_duration: number
//   p2_buildingRotY: number
//   p2_buildingRotX: number
//   p2_modelPos: Vec3
//   p2_modelScale: number
//   p2_lookAt: Vec3

//   p3_orbitRadius: number
//   p3_orbitStartAngle: number
//   p3_orbitEndAngle: number
//   p3_duration: number
//   p3_buildingTiltX: number
//   p3_modelPos: Vec3
//   p3_modelScale: number
//   p3_lookAt: Vec3
// }

// type SceneState = {
//   cameraPos: Vec3
//   modelPos: Vec3
//   modelScale: number
//   rotY: number
//   rotX: number
//   lookAt: Vec3
// }

// const round2 = (n: number) => Math.round(n * 100) / 100
// const v3 = (v: THREE.Vector3): Vec3 => [round2(v.x), round2(v.y), round2(v.z)]

// // Which mouse-editable sections exist for each phase (phase3 has no
// // static camera position — it's an orbit — so it gets orbit-specific
// // sections instead, and "initial" has no rotation at all).
// function sectionOptionsForPhase(phase: PhaseKey): Record<string, SectionKey> {
//   if (phase === 'initial') {
//     return {
//       'Camera Position': 'camera',
//       'Model Position': 'modelPosition',
//       'Model Scale': 'modelScale',
//       'Look At': 'lookAt',
//     }
//   }
//   if (phase === 'phase3') {
//     return {
//       'Orbit Start (from camera)': 'orbitStart',
//       'Orbit End (from camera)': 'orbitEnd',
//       'Model Position': 'modelPosition',
//       'Model Scale': 'modelScale',
//       'Model Tilt (rotation)': 'modelRotation',
//       'Orbit Center (look at)': 'lookAt',
//     }
//   }
//   return {
//     'Camera Position': 'camera',
//     'Model Position': 'modelPosition',
//     'Model Scale': 'modelScale',
//     'Model Rotation': 'modelRotation',
//     'Look At': 'lookAt',
//   }
// }

// // Reads the CURRENTLY SAVED values for a given phase directly out of
// // the config — used both to preview and as the "end" target of that
// // phase's animation.
// function getSavedState(cfg: CinematicConfig, phase: PhaseKey): SceneState {
//   if (phase === 'initial') {
//     return { cameraPos: cfg.initialCameraPos, modelPos: cfg.initialModelPos, modelScale: cfg.initialModelScale, rotY: 0, rotX: 0, lookAt: cfg.initialLookAt }
//   }
//   if (phase === 'phase1') {
//     return { cameraPos: cfg.p1_cameraPos, modelPos: cfg.p1_modelPos, modelScale: cfg.p1_modelScale, rotY: cfg.p1_buildingRotY, rotX: 0, lookAt: cfg.p1_lookAt }
//   }
//   if (phase === 'phase2') {
//     return { cameraPos: cfg.p2_cameraPos, modelPos: cfg.p2_modelPos, modelScale: cfg.p2_modelScale, rotY: cfg.p2_buildingRotY, rotX: cfg.p2_buildingRotX, lookAt: cfg.p2_lookAt }
//   }
//   // phase3 — approximate a camera position from the orbit's start angle, just for previewing
//   const cx = cfg.p3_lookAt[0] + cfg.p3_orbitRadius * Math.cos(cfg.p3_orbitStartAngle)
//   const cz = cfg.p3_lookAt[2] + cfg.p3_orbitRadius * Math.sin(cfg.p3_orbitStartAngle)
//   return { cameraPos: [cx, cfg.p3_lookAt[1], cz], modelPos: cfg.p3_modelPos, modelScale: cfg.p3_modelScale, rotY: cfg.p2_buildingRotY, rotX: cfg.p3_buildingTiltX, lookAt: cfg.p3_lookAt }
// }

// const PREV_PHASE: Record<Exclude<PhaseKey, 'initial'>, PhaseKey> = {
//   phase1: 'initial',
//   phase2: 'phase1',
//   phase3: 'phase2',
// }

// // ============================================================
// // SCENE CONTROLLER — lives inside the Canvas so it can access the
// // camera and 3D objects. Exposes actions to the parent (where the
// // Leva buttons live) through `actionsRef`.
// // ============================================================
// function SceneController({
//   buildingRef,
//   config,
//   setConfig,
//   actionsRef,
//   editingPhase,
//   editingSection,
//   statsElRef,
// }: {
//   buildingRef: React.RefObject<THREE.Group | null>
//   config: CinematicConfig
//   setConfig: (patch: Partial<CinematicConfig>) => void
//   actionsRef: React.MutableRefObject<any>
//   editingPhase: PhaseKey
//   editingSection: SectionKey
//   statsElRef: React.RefObject<HTMLDivElement | null>
// }) {
//   const camera = useThree((state) => state.camera)
//   const orbitRef = useRef<any>(null)
//   const lookAtHelperRef = useRef<THREE.Mesh>(null)
//   const [isPlaying, setIsPlaying] = useState(false)

//   const configRef = useRef(config)
//   configRef.current = config
//   const phaseRef = useRef(editingPhase)
//   phaseRef.current = editingPhase
//   const sectionRef = useRef(editingSection)
//   sectionRef.current = editingSection

//   const tweenBuilding = (target: SceneState, duration: number, tl: gsap.core.Timeline, pos: number | string = 0) => {
//     if (!buildingRef.current) return
//     const building = buildingRef.current
//     tl.to(building.position, { x: target.modelPos[0], y: target.modelPos[1], z: target.modelPos[2], duration }, pos)
//     tl.to(building.scale, { x: target.modelScale, y: target.modelScale, z: target.modelScale, duration }, pos)
//     tl.to(building.rotation, { y: target.rotY, x: target.rotX, duration }, pos)
//   }

//   const applyState = useCallback(
//     (state: SceneState) => {
//       if (!buildingRef.current) return
//       camera.position.set(...state.cameraPos)
//       buildingRef.current.position.set(...state.modelPos)
//       buildingRef.current.scale.setScalar(state.modelScale)
//       buildingRef.current.rotation.set(state.rotX, state.rotY, 0)
//       camera.lookAt(...state.lookAt)
//       lookAtHelperRef.current?.position.set(...state.lookAt)
//       if (orbitRef.current) {
//         orbitRef.current.target.set(...state.lookAt)
//         orbitRef.current.update()
//       }
//     },
//     [camera, buildingRef]
//   )

//   // --- Jump to a phase's current saved values ---
//   const jumpToPhase = (phase: PhaseKey) => {
//     applyState(getSavedState(configRef.current, phase))
//   }

//   // --- Write the current live value into the right config field(s) ---
//   const applyCurrentValue = (phase: PhaseKey, section: SectionKey) => {
//     const b = buildingRef.current
//     const helper = lookAtHelperRef.current
//     if (!b) return

//     const prefix = phase === 'initial' ? 'initial' : phase === 'phase1' ? 'p1' : phase === 'phase2' ? 'p2' : 'p3'

//     if (section === 'camera') {
//       const key = phase === 'initial' ? 'initialCameraPos' : phase === 'phase1' ? 'p1_cameraPos' : 'p2_cameraPos'
//       setConfig({ [key]: v3(camera.position) } as any)
//     } else if (section === 'modelPosition') {
//       const key = phase === 'initial' ? 'initialModelPos' : `${prefix}_modelPos`
//       setConfig({ [key]: v3(b.position) } as any)
//     } else if (section === 'modelScale') {
//       const key = phase === 'initial' ? 'initialModelScale' : `${prefix}_modelScale`
//       setConfig({ [key]: round2(b.scale.x) } as any)
//     } else if (section === 'modelRotation') {
//       if (phase === 'phase1') setConfig({ p1_buildingRotY: round2(b.rotation.y) })
//       else if (phase === 'phase2') setConfig({ p2_buildingRotY: round2(b.rotation.y), p2_buildingRotX: round2(b.rotation.x) })
//       else if (phase === 'phase3') setConfig({ p3_buildingTiltX: round2(b.rotation.x) })
//     } else if (section === 'lookAt' && helper) {
//       const key = phase === 'initial' ? 'initialLookAt' : `${prefix}_lookAt`
//       setConfig({ [key]: v3(helper.position) } as any)
//     } else if ((section === 'orbitStart' || section === 'orbitEnd') && helper) {
//       const center = helper.position
//       const dx = camera.position.x - center.x
//       const dz = camera.position.z - center.z
//       const radius = round2(Math.sqrt(dx * dx + dz * dz))
//       const angle = round2(Math.atan2(dz, dx))
//       if (section === 'orbitStart') setConfig({ p3_orbitRadius: radius, p3_orbitStartAngle: angle })
//       else setConfig({ p3_orbitRadius: radius, p3_orbitEndAngle: angle })
//     }
//   }

//   const logCurrentValue = (phase: PhaseKey, section: SectionKey) => {
//     const b = buildingRef.current
//     const helper = lookAtHelperRef.current
//     if (!b) return
//     console.log('%c--- CURRENT VALUE ---', 'color: #4ade80; font-weight: bold;')
//     if (section === 'camera') console.log('Camera Position:', v3(camera.position))
//     else if (section === 'modelPosition') console.log('Model Position:', v3(b.position))
//     else if (section === 'modelScale') console.log('Model Scale:', round2(b.scale.x))
//     else if (section === 'modelRotation') console.log('Rotation [x, y]:', [round2(b.rotation.x), round2(b.rotation.y)])
//     else if (section === 'lookAt' && helper) console.log('Look At:', v3(helper.position))
//     else if ((section === 'orbitStart' || section === 'orbitEnd') && helper) {
//       const dx = camera.position.x - helper.position.x
//       const dz = camera.position.z - helper.position.z
//       console.log('Orbit Radius:', round2(Math.sqrt(dx * dx + dz * dz)), '  Angle (radians):', round2(Math.atan2(dz, dx)))
//     }
//   }

//   // --- Playback (unchanged conceptually — start of a phase is the previous phase's saved end state) ---
//   const playSinglePhase = (phase: PhaseKey) => {
//     if (phase === 'initial') return
//     const cfg = configRef.current
//     const start = getSavedState(cfg, PREV_PHASE[phase])
//     const end = getSavedState(cfg, phase)
//     const duration = phase === 'phase1' ? cfg.p1_duration : phase === 'phase2' ? cfg.p2_duration : cfg.p3_duration
//     applyState(start)
//     setIsPlaying(true)

//     const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: () => setIsPlaying(false) })

//     if (phase === 'phase3') {
//       const angleProxy = { angle: cfg.p3_orbitStartAngle }
//       const center = cfg.p3_lookAt
//       tl.to(angleProxy, {
//         angle: cfg.p3_orbitEndAngle,
//         duration,
//         onUpdate: () => {
//           camera.position.x = center[0] + cfg.p3_orbitRadius * Math.cos(angleProxy.angle)
//           camera.position.z = center[2] + cfg.p3_orbitRadius * Math.sin(angleProxy.angle)
//           camera.lookAt(center[0], center[1], center[2])
//         },
//       }, 0)
//       tweenBuilding(end, duration, tl, 0)
//     } else {
//       tl.to(camera.position, { x: end.cameraPos[0], y: end.cameraPos[1], z: end.cameraPos[2], duration }, 0)
//       const lookAtProxy = { x: start.lookAt[0], y: start.lookAt[1], z: start.lookAt[2] }
//       tl.to(lookAtProxy, {
//         x: end.lookAt[0], y: end.lookAt[1], z: end.lookAt[2], duration,
//         onUpdate: () => camera.lookAt(lookAtProxy.x, lookAtProxy.y, lookAtProxy.z),
//       }, 0)
//       tweenBuilding(end, duration, tl, 0)
//     }
//   }

//   const playFullCinematic = () => {
//     const cfg = configRef.current
//     applyState(getSavedState(cfg, 'initial'))
//     setIsPlaying(true)
//     const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: () => setIsPlaying(false) })

//     const p1Start = getSavedState(cfg, 'initial')
//     const p1End = getSavedState(cfg, 'phase1')
//     tl.to(camera.position, { x: p1End.cameraPos[0], y: p1End.cameraPos[1], z: p1End.cameraPos[2], duration: cfg.p1_duration }, 0)
//     const p1LookAt = { x: p1Start.lookAt[0], y: p1Start.lookAt[1], z: p1Start.lookAt[2] }
//     tl.to(p1LookAt, {
//       x: p1End.lookAt[0], y: p1End.lookAt[1], z: p1End.lookAt[2], duration: cfg.p1_duration,
//       onUpdate: () => camera.lookAt(p1LookAt.x, p1LookAt.y, p1LookAt.z),
//     }, 0)
//     tweenBuilding(p1End, cfg.p1_duration, tl, 0)

//     const p2End = getSavedState(cfg, 'phase2')
//     tl.to(camera.position, { x: p2End.cameraPos[0], y: p2End.cameraPos[1], z: p2End.cameraPos[2], duration: cfg.p2_duration }, '>')
//     const p2LookAt = { x: p1End.lookAt[0], y: p1End.lookAt[1], z: p1End.lookAt[2] }
//     tl.to(p2LookAt, {
//       x: p2End.lookAt[0], y: p2End.lookAt[1], z: p2End.lookAt[2], duration: cfg.p2_duration,
//       onUpdate: () => camera.lookAt(p2LookAt.x, p2LookAt.y, p2LookAt.z),
//     }, '<')
//     tweenBuilding(p2End, cfg.p2_duration, tl, '<')

//     const angleProxy = { angle: cfg.p3_orbitStartAngle }
//     const center = cfg.p3_lookAt
//     tl.to(angleProxy, {
//       angle: cfg.p3_orbitEndAngle,
//       duration: cfg.p3_duration,
//       onUpdate: () => {
//         camera.position.x = center[0] + cfg.p3_orbitRadius * Math.cos(angleProxy.angle)
//         camera.position.z = center[2] + cfg.p3_orbitRadius * Math.sin(angleProxy.angle)
//         camera.lookAt(center[0], center[1], center[2])
//       },
//     }, '>')
//     const p3End = getSavedState(cfg, 'phase3')
//     tweenBuilding(p3End, cfg.p3_duration, tl, '<')
//   }

//   useEffect(() => {
//     actionsRef.current = { jumpToPhase, applyCurrentValue, logCurrentValue, playSinglePhase, playFullCinematic }
//   })

//   // Live readout of whatever the active section is
//   useFrame(() => {
//     if (!statsElRef.current || !buildingRef.current) return
//     const b = buildingRef.current
//     const section = sectionRef.current
//     let text = ''
//     if (section === 'camera' || section === 'orbitStart' || section === 'orbitEnd') {
//       const p = camera.position
//       text = `camera: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`
//     } else if (section === 'modelPosition') {
//       text = `model position: [${b.position.x.toFixed(2)}, ${b.position.y.toFixed(2)}, ${b.position.z.toFixed(2)}]`
//     } else if (section === 'modelScale') {
//       text = `model scale: ${b.scale.x.toFixed(2)}`
//     } else if (section === 'modelRotation') {
//       text = `rotation (rad): x=${b.rotation.x.toFixed(2)}  y=${b.rotation.y.toFixed(2)}`
//     } else if (section === 'lookAt' && lookAtHelperRef.current) {
//       const t = lookAtHelperRef.current.position
//       text = `look at: [${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}]`
//     }
//     statsElRef.current.textContent = text
//   })

//   const cameraModeActive = editingSection === 'camera' || editingSection === 'orbitStart' || editingSection === 'orbitEnd'
//   const showModelGizmo = editingSection === 'modelPosition' || editingSection === 'modelScale' || editingSection === 'modelRotation'

//   return (
//     <>
//       <OrbitControls ref={orbitRef} enabled={cameraModeActive && !isPlaying} makeDefault maxPolarAngle={Math.PI / 2 - 0.05} minDistance={1} maxDistance={300} />

//       {/* Gizmo for moving/scaling/rotating the building — only shown for the matching section */}
//       {showModelGizmo && buildingRef.current && (
//         <TransformControls
//           object={buildingRef.current}
//           mode={editingSection === 'modelPosition' ? 'translate' : editingSection === 'modelScale' ? 'scale' : 'rotate'}
//           showX={editingSection !== 'modelRotation' || editingPhase === 'phase2' || editingPhase === 'phase3'}
//           showY={editingSection !== 'modelRotation' || editingPhase !== 'phase3'}
//           showZ={editingSection !== 'modelRotation'}
//         />
//       )}

//       {/* Draggable look-at target — a small yellow wireframe ball, only shown in Look At mode */}
//       <mesh ref={lookAtHelperRef} visible={editingSection === 'lookAt'}>
//         <sphereGeometry args={[1, 16, 16]} />
//         <meshBasicMaterial color="yellow" wireframe />
//       </mesh>
//       {editingSection === 'lookAt' && lookAtHelperRef.current && (
//         <TransformControls object={lookAtHelperRef.current} mode="translate" />
//       )}
//     </>
//   )
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function LandModel() {
//   const buildingRef = useRef<THREE.Group>(null)
//   const actionsRef = useRef<any>({})
//   const statsElRef = useRef<HTMLDivElement>(null)

//   const { editingPhase } = useControls('Debug Mode', {
//     editingPhase: {
//       value: 'initial',
//       options: { Initial: 'initial', 'Phase 1 - Reveal': 'phase1', 'Phase 2 - Zoom In': 'phase2', 'Phase 3 - Orbit': 'phase3' },
//       label: 'Editing Phase',
//     },
//     'Jump To Phase': button((get) => actionsRef.current.jumpToPhase?.(get('Debug Mode.editingPhase'))),
//     'Play This Phase': button((get) => actionsRef.current.playSinglePhase?.(get('Debug Mode.editingPhase'))),
//     'Play Full Cinematic': button(() => actionsRef.current.playFullCinematic?.()),
//   })

//   // Section options depend on the phase, so this is a separate Leva
//   // call — it reads `editingPhase` from the hook above.
//   const { editingSection } = useControls('Section', {
//     editingSection: {
//       value: 'camera',
//       options: sectionOptionsForPhase(editingPhase as PhaseKey),
//       label: 'What to set',
//     },
//     'Apply To Phase': button((get) =>
//       actionsRef.current.applyCurrentValue?.(get('Debug Mode.editingPhase'), get('Section.editingSection'))
//     ),
//     'Log Current Value': button((get) =>
//       actionsRef.current.logCurrentValue?.(get('Debug Mode.editingPhase'), get('Section.editingSection'))
//     ),
//   })

//   const [config, setConfig] = useControls('Cinematic Config', () => ({
//     Initial: folder({
//       initialCameraPos: { value: [22, 102, 100] as Vec3, label: 'Camera Pos' },
//       initialModelPos: { value: [-30, 12, -100] as Vec3, label: 'Model Pos' },
//       initialModelScale: { value: 0.5, min: 0.1, max: 5, step: 0.1, label: 'Model Scale' },
//       initialLookAt: { value: [0, 10, 0] as Vec3, label: 'Camera Looks At' },
//     }, { collapsed: editingPhase !== 'initial' }),

//     'Phase 1 — Reveal': folder({
//       p1_cameraPos: { value: [0, 25, 40] as Vec3, label: 'Camera End Pos' },
//       p1_lookAt: { value: [0, 10, 0] as Vec3, label: 'Looks At' },
//       p1_buildingRotY: { value: 1.06, min: -Math.PI, max: Math.PI, step: 0.01, label: 'Building RotY' },
//       p1_modelPos: { value: [0, 5, -23] as Vec3, label: 'Model Pos' },
//       p1_modelScale: { value: 1.9, min: 0.1, max: 5, step: 0.1, label: 'Model Scale' },
//       p1_duration: { value: 3.0, min: 0.1, max: 10, step: 0.1, label: 'Duration (s)' },
//     }, { collapsed: editingPhase !== 'phase1' }),

//     'Phase 2 — Zoom In': folder({
//       p2_cameraPos: { value: [10, 12, 20] as Vec3, label: 'Camera End Pos' },
//       p2_lookAt: { value: [0, 8, 0] as Vec3, label: 'Looks At' },
//       p2_buildingRotY: { value: 2.2, min: -Math.PI, max: Math.PI, step: 0.01, label: 'Building RotY' },
//       p2_buildingRotX: { value: 0, min: -0.5, max: 0.5, step: 0.01, label: 'Building RotX (tilt)' },
//       p2_modelPos: { value: [0, 5, -23] as Vec3, label: 'Model Pos' },
//       p2_modelScale: { value: 2.4, min: 0.1, max: 5, step: 0.1, label: 'Model Scale' },
//       p2_duration: { value: 2.5, min: 0.1, max: 10, step: 0.1, label: 'Duration (s)' },
//     }, { collapsed: editingPhase !== 'phase2' }),

//     'Phase 3 — Orbit': folder({
//       p3_orbitRadius: { value: 25, min: 1, max: 200, step: 1, label: 'Orbit Radius' },
//       p3_orbitStartAngle: { value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01, label: 'Start Angle' },
//       p3_orbitEndAngle: { value: Math.PI * 2, min: -Math.PI * 4, max: Math.PI * 4, step: 0.01, label: 'End Angle' },
//       p3_lookAt: { value: [0, 8, 0] as Vec3, label: 'Orbit Center (looks at)' },
//       p3_buildingTiltX: { value: 0, min: -0.5, max: 0.5, step: 0.01, label: 'Building Tilt X' },
//       p3_modelPos: { value: [0, 5, -23] as Vec3, label: 'Model Pos' },
//       p3_modelScale: { value: 2.4, min: 0.1, max: 5, step: 0.1, label: 'Model Scale' },
//       p3_duration: { value: 8, min: 0.1, max: 30, step: 0.1, label: 'Duration (s)' },
//     }, { collapsed: editingPhase !== 'phase3' }),
//   }), [editingPhase]) as unknown as [CinematicConfig, (patch: Partial<CinematicConfig>) => void]

//   return (
//     <div className="relative w-full h-screen bg-black">
//       <Leva collapsed={false} />

//       <div
//         ref={statsElRef}
//         className="absolute bottom-4 left-4 z-10 bg-black/70 text-green-400 font-mono text-xs px-3 py-2 rounded pointer-events-none"
//       >
//         Pick a phase and section to begin
//       </div>

//       <Canvas shadows camera={{ position: [0, 3, 10], fov: 50, near: 0.1, far: 1000 }}>
//         <SceneController
//           buildingRef={buildingRef}
//           config={config}
//           setConfig={setConfig}
//           actionsRef={actionsRef}
//           editingPhase={editingPhase as PhaseKey}
//           editingSection={editingSection as SectionKey}
//           statsElRef={statsElRef}
//         />

//         <ambientLight intensity={0.3} />
//         <directionalLight
//           position={[50, 80, 30]}
//           intensity={1.5}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />

//         <group ref={buildingRef}>
//           <HouseMdel />
//         </group>
//       </Canvas>
//     </div>
//   )
// }


// "use client"
// import * as THREE from "three"
// import { useRef, useState, useEffect } from 'react'
// import { Canvas, useThree } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import gsap from 'gsap'
// import { HouseMdel } from './HouseModel'

// function CinematicDirector({
//   buildingRef,
//   onComplete,
// }: {
//   buildingRef: React.RefObject<THREE.Group | null>
//   onComplete: () => void
// }) {
//   const { camera } = useThree()

//   useEffect(() => {
//     if (!buildingRef.current) return
//     const building = buildingRef.current

//     // Initial state
//     camera.position.set(82, 367, 11)
//     building.position.set(0, 0.3, 0)
//     building.scale.setScalar(0.5)
//     building.rotation.set(0, 0, 0)
//     camera.lookAt(5, -4, 0)

//     const tl = gsap.timeline({
//       defaults: { ease: 'power2.inOut' },
//       onComplete,
//     })

//     // Phase 1 — Reveal (0s - 3s)
//     tl.to(camera.position, { x: 0, y: 25, z: 40, duration: 3 }, 0)
//     const lookAt1 = { x: 0, y: 10, z: 0 }
//     tl.to(lookAt1, { x: 0, y: 10, z: 0, duration: 3, onUpdate: () => camera.lookAt(lookAt1.x, lookAt1.y, lookAt1.z) }, 0)
//     tl.to(building.position, { x: 0, y: 5, z: -23, duration: 3 }, 0)
//     tl.to(building.scale, { x: 1.9, y: 1.9, z: 1.9, duration: 3 }, 0)
//     tl.to(building.rotation, { y: 1.06, duration: 3 }, 0)

//     // Phase 2 — Zoom In (3s - 5.5s)
//     tl.to(camera.position, { x: 15, y: 8, z: 27, duration: 2.5 }, 3)
//     const lookAt2 = { x: -4.9, y: 7, z: 4.7 }
//     tl.to(lookAt2, { x: 0, y: 8, z: 0, duration: 1.5, onUpdate: () => camera.lookAt(lookAt2.x, lookAt2.y, lookAt2.z) }, 3)
//     tl.to(building.position, { x: -8.5, y: 12.7, z:-19.6, duration: 2.5 }, 3)
//     tl.to(building.scale, { x: 3.2, y: 3.2, z: 3.2, duration: 2.5 }, 3)
//     tl.to(building.rotation, { y: 2.11, x: 0, duration: 2.5 }, 3)

//         return () => { tl.kill() }
//   }, [camera, buildingRef, onComplete])

//   return null
// }

// export default function LandModel() {
//   const buildingRef = useRef<THREE.Group>(null)
//   const [done, setDone] = useState(false)

//   return (
//     <div className="w-full h-screen bg-black">
//       <Canvas shadows camera={{ fov: 50, near: 0.1, far: 1000 }}>
//         {!done && (
//           <CinematicDirector
//             buildingRef={buildingRef}
//             onComplete={() => setDone(true)}
//           />
//         )}

//         {/* {done && (
//           <OrbitControls
//             target={[0, 8, 0]}
//             maxPolarAngle={Math.PI / 2 - 0.05}
//             minDistance={1}
//             maxDistance={300}
//           />
//         )} */}

//         <ambientLight intensity={0.3} />
//         <directionalLight
//           position={[50, 80, 30]}
//           intensity={1.5}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />

//         <group ref={buildingRef}>
//           <HouseMdel />
//         </group>
//       </Canvas>


//       {/* 2. Normal HTML text layered on top */}
//       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
//         <h1 
//           className={`
//             text-white text-5xl md:text-7xl font-bold tracking-tight text-center
//             transition-all duration-1000 ease-out
//             ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//           `}
//         >
//           Welcome Home
//         </h1>

//         <p 
//           className={`
//             mt-4 text-white/70 text-lg md:text-xl text-center max-w-md px-4
//             transition-all duration-1000 ease-out delay-300
//             ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//           `}
//         >
//           Experience architectural excellence in every dimension.
//         </p>

//         {/* CTA — pointer-events-auto makes it clickable through the overlay */}
//         <button 
//           className={`
//             mt-8 px-6 py-3 bg-white text-black font-medium rounded-full
//             pointer-events-auto cursor-pointer
//             transition-all duration-1000 ease-out delay-500
//             hover:scale-105 active:scale-95
//             ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//           `}
//         >
//           Explore
//         </button>
//       </div>
//     </div>
//   )
// }

/* ------------------------------------------------------------------ */
// Auto play when site opens
/* ------------------------------------------------------------------ */


// "use client"
// import * as THREE from "three"
// import { useRef, useState, useEffect, Suspense } from 'react'
// import { Canvas, useThree } from '@react-three/fiber'
// import { OrbitControls, Environment, Bounds, Center } from '@react-three/drei'
// import gsap from 'gsap'
// import { HouseMdel } from './HouseModel'
// import { JacketModel, ShirtModel, PantsModel, ShoesModel, CoatModel } from './SmallerModels'

// /* ------------------------------------------------------------------ */
// function CinematicDirector({
//   buildingRef,
//   onComplete,
// }: {
//   buildingRef: React.RefObject<THREE.Group | null>
//   onComplete: () => void
// }) {
//   const { camera } = useThree()

//   useEffect(() => {
//     if (!buildingRef.current) return
//     const building = buildingRef.current

//     camera.position.set(82, 367, 11)
//     building.position.set(0, 0.3, 0)
//     building.scale.setScalar(0.5)
//     building.rotation.set(0, 0, 0)
//     camera.lookAt(5, -4, 0)

//     const tl = gsap.timeline({
//       defaults: { ease: 'power2.inOut' },
//       onComplete,
//     })

//     tl.to(camera.position, { x: 0, y: 25, z: 40, duration: 3 }, 0)
//     const lookAt1 = { x: 0, y: 10, z: 0 }
//     tl.to(lookAt1, { x: 0, y: 10, z: 0, duration: 3, onUpdate: () => camera.lookAt(lookAt1.x, lookAt1.y, lookAt1.z) }, 0)
//     tl.to(building.position, { x: 0, y: 5, z: -23, duration: 3 }, 0)
//     tl.to(building.scale, { x: 1.9, y: 1.9, z: 1.9, duration: 3 }, 0)
//     tl.to(building.rotation, { y: 1.06, duration: 3 }, 0)

//     tl.to(camera.position, { x: 15, y: 8, z: 27, duration: 2.5 }, 3)
//     const lookAt2 = { x: -4.9, y: 7, z: 4.7 }
//     tl.to(lookAt2, { x: 0, y: 8, z: 0, duration: 1.5, onUpdate: () => camera.lookAt(lookAt2.x, lookAt2.y, lookAt2.z) }, 3)
//     tl.to(building.position, { x: -8.5, y: 12.7, z: -19.6, duration: 2.5 }, 3)
//     tl.to(building.scale, { x: 3.2, y: 3.2, z: 3.2, duration: 2.5 }, 3)
//     tl.to(building.rotation, { y: 2.11, x: 0, duration: 2.5 }, 3)

//     return () => { tl.kill() }
//   }, [camera, buildingRef, onComplete])

//   return null
// }


// function ClothingCard({
//   title,
//   delay,
//   isVisible,
//   children,
// }: {
//   title: string
//   delay: number
//   isVisible: boolean
//   children: React.ReactNode
// }) {
//   return (
//     <div
//       className={`
//         w-36 h-48 md:w-44 md:h-56 rounded-xl overflow-hidden 
//         bg-white/5 backdrop-blur-md border border-white/10 
//         flex flex-col
//         transition-all duration-700 ease-out
//         ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
//       `}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       <div className="flex-1 relative">
//         <Canvas
//           camera={{ position: [0, 0, 2.5], fov: 45 }}
//           className="absolute inset-0"
//           gl={{ antialias: true, alpha: true }}
//         >
//           <Suspense fallback={
//             <mesh>
//               <sphereGeometry args={[0.2, 12, 12]} />
//               <meshBasicMaterial color="#ffffff15" wireframe />
//             </mesh>
//           }>
//             <ambientLight intensity={0.6} />
//             <spotLight position={[3, 5, 3]} intensity={1.2} angle={0.4} penumbra={0.5} />
//             <Environment preset="city" />

//             {/* Bounds measures children's real bbox and fits the camera to it */}
//             <Bounds fit clip observe margin={1.2}>
//               <Center>
//                 {children}
//               </Center>
//             </Bounds>

//             <OrbitControls
//               enableZoom={false}
//               autoRotate
//               autoRotateSpeed={2}
//               minPolarAngle={Math.PI / 2.5}
//               maxPolarAngle={Math.PI / 1.5}
//             />
//           </Suspense>
//         </Canvas>
//       </div>

//       {/* <div className="p-2.5 text-center border-t border-white/10">
//         <p className="text-white text-xs md:text-sm font-medium">{title}</p>
//       </div> */}
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// export default function LandModel() {
//   const buildingRef = useRef<THREE.Group>(null)
//   const [done, setDone] = useState(false)
//   const [showClothing, setShowClothing] = useState(false)

//   useEffect(() => {
//     if (done) {
//       const timer = setTimeout(() => setShowClothing(true), 800)
//       return () => clearTimeout(timer)
//     }
//   }, [done])

//   return (
//     <div className="relative w-full h-screen bg-black overflow-hidden">
//       {/* Main house Canvas */}
//       <Canvas
//         className="absolute inset-0"
//         shadows
//         camera={{ fov: 50, near: 0.1, far: 1000 }}
//       >
//         {!done && (
//           <CinematicDirector
//             buildingRef={buildingRef}
//             onComplete={() => setDone(true)}
//           />
//         )}

//         {done && (
//           <OrbitControls
//             target={[0, 8, 0]}
//             maxPolarAngle={Math.PI / 2 - 0.05}
//             minDistance={1}
//             maxDistance={300}
//           />
//         )}

//         <ambientLight intensity={0.3} />
//         <directionalLight
//           position={[50, 80, 30]}
//           intensity={1.5}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />

//         <group ref={buildingRef}>
//           <HouseMdel />
//         </group>
//       </Canvas>

//       {/* Overlay */}
//       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">

//         {/* Hero text */}
//         <div
//           className={`
//             flex flex-col items-center text-center
//             transition-all duration-1000 ease-out
//             ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//           `}
//         >
//           <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
//             Atelier Selvedge
//           </h1>
//           <p className="mt-4 text-white/70 text-lg md:text-xl max-w-md px-4">
//             Crafted for those who know
//           </p>
//         </div>

//         {/* 5 Clothing cards */}
//         <div
//           className={`
//             flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-10 px-4
//             transition-all duration-1000 ease-out
//             ${showClothing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//           `}
//         >
//           <ClothingCard title="Leather Jacket" delay={0} isVisible={showClothing}>
//             <JacketModel />
//           </ClothingCard>

//           <ClothingCard title="Denim Shirt" delay={120} isVisible={showClothing}>
//             <ShirtModel />
//           </ClothingCard>

//           <ClothingCard title="Cargo Pants" delay={240} isVisible={showClothing}>
//             <PantsModel />
//           </ClothingCard>

//           <ClothingCard title="Sneakers" delay={360} isVisible={showClothing}>
//             <ShoesModel />
//           </ClothingCard>

//           <ClothingCard title="Wool Coat" delay={480} isVisible={showClothing}>
//             <CoatModel />
//           </ClothingCard>
//         </div>

//         {/* CTA */}
//         <button
//           className={`
//             mt-6 md:mt-8 px-8 py-3 bg-white text-black font-medium rounded-full
//             pointer-events-auto cursor-pointer
//             transition-all duration-700 ease-out
//             hover:scale-105 active:scale-95
//             ${showClothing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
//           `}
//           style={{ transitionDelay: '600ms' }}
//         >
//           View Collection
//         </button>
//       </div>
//     </div>
//   )
// }


/* ------------------------------------------------------------------ */
// Scroll and play animatoin code
/* ------------------------------------------------------------------ */

// "use client"
// import * as THREE from "three"
// import { useRef, useState, useEffect, Suspense } from 'react'
// import { Canvas, useThree } from '@react-three/fiber'
// import { OrbitControls, Environment, Bounds, Center } from '@react-three/drei'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { HouseMdel } from './HouseModel'
// import { JacketModel, ShirtModel, PantsModel, ShoesModel, CoatModel } from './SmallerModels'

// gsap.registerPlugin(ScrollTrigger)

// /* ------------------------------------------------------------------ */
// function CinematicDirector({
//   buildingRef,
//   containerRef,
//   onProgress,
// }: {
//   buildingRef: React.RefObject<THREE.Group | null>
//   containerRef: React.RefObject<HTMLDivElement | null>
//   onProgress: (p: number) => void
// }) {
//   const { camera } = useThree()

//   useEffect(() => {
//     if (!buildingRef.current || !containerRef.current) return
//     const building = buildingRef.current

//     camera.position.set(82, 367, 11)
//     building.position.set(0, 0.3, 0)
//     building.scale.setScalar(0.5)
//     building.rotation.set(0, 0, 0)
//     camera.lookAt(5, -4, 0)

//     // paused timeline — identical tweens, just no autoplay
//     const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

//     tl.to(camera.position, { x: 0, y: 25, z: 40, duration: 3 }, 0)
//     const lookAt1 = { x: 0, y: 10, z: 0 }
//     tl.to(lookAt1, { x: 0, y: 10, z: 0, duration: 3, onUpdate: () => camera.lookAt(lookAt1.x, lookAt1.y, lookAt1.z) }, 0)
//     tl.to(building.position, { x: 0, y: 5, z: -23, duration: 3 }, 0)
//     tl.to(building.scale, { x: 1.9, y: 1.9, z: 1.9, duration: 3 }, 0)
//     tl.to(building.rotation, { y: 1.06, duration: 3 }, 0)

//     tl.to(camera.position, { x: 15, y: 8, z: 27, duration: 2.5 }, 3)
//     const lookAt2 = { x: -4.9, y: 7, z: 4.7 }
//     tl.to(lookAt2, { x: 0, y: 8, z: 0, duration: 1.5, onUpdate: () => camera.lookAt(lookAt2.x, lookAt2.y, lookAt2.z) }, 3)
//     tl.to(building.position, { x: -8.5, y: 12.7, z: -19.6, duration: 2.5 }, 3)
//     tl.to(building.scale, { x: 3.2, y: 3.2, z: 3.2, duration: 2.5 }, 3)
//     tl.to(building.rotation, { y: 2.11, x: 0, duration: 2.5 }, 3)

//     const st = ScrollTrigger.create({
//       trigger: containerRef.current,
//       start: 'top top',
//       end: '+=250%',   // total scroll distance the intro consumes — tune this
//       scrub: 1,
//       pin: true,
//       onUpdate: (self) => {
//         tl.progress(self.progress)
//         onProgress(self.progress)
//       },
//     })

//     return () => {
//       st.kill()
//       tl.kill()
//     }
//   }, [camera, buildingRef, containerRef, onProgress])

//   return null
// }

// /* ------------------------------------------------------------------ */
// export default function LandModel() {
//   const buildingRef = useRef<THREE.Group>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [progress, setProgress] = useState(0)
//   const done = progress > 0.98
//   const showClothing = progress > 0.9

//   return (
//     <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
//       <Canvas className="absolute inset-0" shadows camera={{ fov: 50, near: 0.1, far: 1000 }}>
//         <CinematicDirector
//           buildingRef={buildingRef}
//           containerRef={containerRef}
//           onProgress={setProgress}
//         />

//         {done && (
//           <OrbitControls
//             target={[0, 8, 0]}
//             enableZoom={false}
//             maxPolarAngle={Math.PI / 2 - 0.05}
//           />
//         )}

//         <ambientLight intensity={0.3} />
//         <directionalLight position={[50, 80, 30]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
//         <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />

//         <group ref={buildingRef}>
//           <HouseMdel />
//         </group>
//       </Canvas>

//       {/* Overlay — same as before, just gated on the new done/showClothing */}
//       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
//         <div className={`flex flex-col items-center text-center transition-all duration-1000 ease-out ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">Atelier Selvedge</h1>
//           <p className="mt-4 text-white/70 text-lg md:text-xl max-w-md px-4">Crafted for those who know</p>
//         </div>

//         <div className={`flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-10 px-4 transition-all duration-1000 ease-out ${showClothing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           {/* cards unchanged */}
//         </div>

//         <button className={`mt-6 md:mt-8 px-8 py-3 bg-white text-black font-medium rounded-full pointer-events-auto cursor-pointer transition-all duration-700 ease-out hover:scale-105 active:scale-95 ${showClothing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
//           View Collection
//         </button>
//       </div>
//     </div>
//   )
// }


"use client"
import * as THREE from "three"

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Bounds, Center } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HouseMdel } from './HouseModel'
import { JacketModel, ShirtModel, PantsModel, ShoesModel, CoatModel } from './SmallerModels'
import { markScrollHandoffReady } from '@/Components/scrollBus'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/* STAGE 1 — plays automatically on load, no scroll involved. */
function AutoIntro({
  buildingRef,
  onIntroComplete,
}: {
  buildingRef: React.RefObject<THREE.Group | null>
  onIntroComplete: () => void
}) {
  const { camera } = useThree()

  useEffect(() => {
    if (!buildingRef.current) return
    const building = buildingRef.current

    camera.position.set(82, 367, 11)
    building.position.set(0, 0.3, 0)
    building.scale.setScalar(0.5)
    building.rotation.set(0, 0, 0)
    camera.lookAt(5, -4, 0)

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: onIntroComplete,
    })

    // Phase 1 — Reveal
    tl.to(camera.position, { x: 0, y: 25, z: 40, duration: 3 }, 0)
    const lookAt1 = { x: 0, y: 10, z: 0 }
    tl.to(lookAt1, { x: 0, y: 10, z: 0, duration: 3, onUpdate: () => camera.lookAt(lookAt1.x, lookAt1.y, lookAt1.z) }, 0)
    tl.to(building.position, { x: 0, y: 5, z: -23, duration: 3 }, 0)
    tl.to(building.scale, { x: 1.9, y: 1.9, z: 1.9, duration: 3 }, 0)
    tl.to(building.rotation, { y: 1.06, duration: 3 }, 0)

    // Phase 2 — Zoom In
    tl.to(camera.position, { x: 15, y: 8, z: 27, duration: 2.5 }, 3)
    const lookAt2 = { x: -4.9, y: 7, z: 4.7 }
    tl.to(lookAt2, { x: 0, y: 8, z: 0, duration: 1.5, onUpdate: () => camera.lookAt(lookAt2.x, lookAt2.y, lookAt2.z) }, 3)
    tl.to(building.position, { x: -8.5, y: 12.7, z: -19.6, duration: 2.5 }, 3)
    tl.to(building.scale, { x: 3.2, y: 3.2, z: 3.2, duration: 2.5 }, 3)
    tl.to(building.rotation, { y: 2.11, x: 0, duration: 2.5 }, 3)

    return () => { tl.kill() }
  }, [camera, buildingRef, onIntroComplete])

  return null
}

/* ------------------------------------------------------------------ */
/* STAGE 2 — scroll-scrubbed handoff into the next section.
   Only mounts once the intro AND the hero content's own fade-in
   have both finished, so the user never scrolls past unrevealed
   content into the transition.

   Motion: a quick early beat of rotate-RIGHT + rise-a-little,
   then the rest of the scroll range is dominated by a continuous
   zoom-in that carries through to the dissolve. */
function ScrollHandoff({
  buildingRef,
  containerRef,
  onProgress,
}: {
  buildingRef: React.RefObject<THREE.Group | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  onProgress: (p: number) => void
}) {
  const { camera } = useThree()

  useEffect(() => {
    if (!buildingRef.current || !containerRef.current) return
    const building = buildingRef.current

    // Starting point = exactly where AutoIntro's phase 2 ended.
    const startCam = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const startPos = { x: building.position.x, y: building.position.y, z: building.position.z }
    const startScale = building.scale.x
    const startRotY = building.rotation.y

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

    // ---- Early beat (0 -> 0.25): rotate RIGHT, rise a little ----
    tl.to(building.rotation, { y: startRotY + 0.55, duration: 0.25 }, 0)
    tl.to(building.position, { y: startPos.y + 2.5, duration: 0.25 }, 0)
    const lookAtA = { x: 0, y: 9, z: 0 }
    tl.to(lookAtA, {
      x: 0, y: 9.5, z: 0, duration: 0.25,
      onUpdate: () => camera.lookAt(lookAtA.x, lookAtA.y, lookAtA.z),
    }, 0)
    tl.to(camera.position, { x: startCam.x - 3, y: startCam.y + 1, z: startCam.z - 3, duration: 0.25 }, 0)

    // ---- Continuous zoom (0.25 -> 1): dominant motion for the ----
    // ---- rest of the scroll, carrying straight through to the ----
    // ---- dissolve into the next section.
    tl.to(building.scale, {
      x: startScale * 5, y: startScale * 5, z: startScale * 5,
      duration: 0.75, ease: 'power1.in',
    }, 0.25)
    tl.to(building.position, { y: startPos.y + 22, duration: 0.75, ease: 'power1.in' }, 0.25)
    tl.to(camera.position, { z: startCam.z - 20, duration: 0.75, ease: 'power1.in' }, 0.25)
    tl.to(building.rotation, { y: startRotY + 0.9, duration: 0.75 }, 0.25) // keep drifting right

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        tl.progress(self.progress)
        onProgress(self.progress)
      },
    })

    // ✅ add this — forces lenis.resize() via LenisProvider's "refresh" listener,
    // now that this (the last) pin actually exists in the DOM
    // requestAnimationFrame(() => ScrollTrigger.refresh())
    requestAnimationFrame(() => {
      markScrollHandoffReady()
      ScrollTrigger.refresh()

    })


    return () => {
      st.kill()
      tl.kill()
    }
  }, [camera, buildingRef, containerRef, onProgress])

  return null
}

function ClothingCard({
  delay,
  isVisible,
  children,
}: {
  delay: number
  isVisible: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`
        w-36 h-48 md:w-44 md:h-56 rounded-xl overflow-hidden
        bg-white/5 backdrop-blur-md border border-white/10
        flex flex-col
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} className="absolute inset-0" gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={
            <mesh>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshBasicMaterial color="#ffffff15" wireframe />
            </mesh>
          }>
            <ambientLight intensity={0.6} />
            <spotLight position={[3, 5, 3]} intensity={1.2} angle={0.4} penumbra={0.5} />
            <Environment preset="city" />
            <Bounds fit clip observe margin={1.2}>
              <Center>{children}</Center>
            </Bounds>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
// Time (ms) it takes for all hero content — title, cards, button —
// to finish fading/sliding in after introDone flips true. Computed
// from the longest transition below: button delay 600ms + duration
// 700ms = 1300ms. Rounded up with a little headroom.
const CONTENT_REVEAL_MS = 1500

export default function LandModel() {
  const buildingRef = useRef<THREE.Group>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [introDone, setIntroDone] = useState(false)
  const [readyForScroll, setReadyForScroll] = useState(false)
  const [progress, setProgress] = useState(0)

  // Hero content appears immediately once the model's intro
  // animation finishes — no scroll dependency.
  const showContent = introDone

  // The scroll-driven handoff only takes over once that content
  // has actually finished appearing, so it's never possible to
  // scroll into the transition before everything has shown up.
  useEffect(() => {
    if (!introDone) return
    const timer = setTimeout(() => setReadyForScroll(true), CONTENT_REVEAL_MS)
    return () => clearTimeout(timer)
  }, [introDone])

  const dissolving = progress > 0.92
  const fadeOpacity = dissolving ? 1 - (progress - 0.92) / 0.08 : 1

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden z-20"
      style={{ pointerEvents: fadeOpacity <= 0.02 ? 'none' : 'auto' }}
    >
      <div
        style={{ opacity: Math.max(fadeOpacity, 0) }}
        className="absolute inset-0 bg-black"
      >
        <Canvas
          className="absolute inset-0"
          shadows
          camera={{ fov: 50, near: 0.1, far: 1000 }}
          gl={{ alpha: false }}
        >
          <color attach="background" args={['#000000']} />
          {!introDone && (
            <AutoIntro
              buildingRef={buildingRef}
              onIntroComplete={() => setIntroDone(true)}
            />
          )}
          {readyForScroll && (
            <ScrollHandoff
              buildingRef={buildingRef}
              containerRef={containerRef}
              onProgress={setProgress}
            />
          )}

          <ambientLight intensity={0.3} />
          <directionalLight
            position={[50, 80, 30]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />

          <group ref={buildingRef}>
            <HouseMdel />
          </group>
        </Canvas>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div
            className={`
              flex flex-col items-center text-center
              transition-all duration-1000 ease-out
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
              Atelier Selvedge
            </h1>
            <p className="mt-4 text-white/70 text-lg md:text-xl max-w-md px-4">
              Crafted for those who know
            </p>
          </div>

          <div
            className={`
              flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-10 px-4
              transition-all duration-1000 ease-out
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <ClothingCard delay={0} isVisible={showContent}><JacketModel /></ClothingCard>
            <ClothingCard delay={120} isVisible={showContent}><ShirtModel /></ClothingCard>
            <ClothingCard delay={240} isVisible={showContent}><PantsModel /></ClothingCard>
            <ClothingCard delay={360} isVisible={showContent}><ShoesModel /></ClothingCard>
            <ClothingCard delay={480} isVisible={showContent}><CoatModel /></ClothingCard>
          </div>

          <button
            className={`
              mt-6 md:mt-8 px-8 py-3 bg-white text-black font-medium rounded-full
              pointer-events-auto cursor-pointer
              transition-all duration-700 ease-out
              hover:scale-105 active:scale-95
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '600ms' }}
          >
            View Collection
          </button>
        </div>
      </div>
    </div>
  )
}