// "use client"
// import * as THREE from "three"

// import { useRef, useState, useEffect, Suspense } from 'react'
// import { Canvas, useThree } from '@react-three/fiber'
// import { OrbitControls, Environment, Bounds, Center } from '@react-three/drei'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { HouseMdel } from './HouseModel'
// import { JacketModel, ShirtModel, PantsModel, ShoesModel, CoatModel } from './SmallerModels'
// import { markScrollHandoffReady } from '@/Components/scrollBus'

// gsap.registerPlugin(ScrollTrigger)

// /* ------------------------------------------------------------------ */
// /* STAGE 1 — plays automatically on load, no scroll involved. */
// function AutoIntro({
//   buildingRef,
//   onIntroComplete,
// }: {
//   buildingRef: React.RefObject<THREE.Group | null>
//   onIntroComplete: () => void
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
//       onComplete: onIntroComplete,
//     })

//     // Phase 1 — Reveal
//     tl.to(camera.position, { x: 0, y: 25, z: 40, duration: 3 }, 0)
//     const lookAt1 = { x: 0, y: 10, z: 0 }
//     tl.to(lookAt1, { x: 0, y: 10, z: 0, duration: 3, onUpdate: () => camera.lookAt(lookAt1.x, lookAt1.y, lookAt1.z) }, 0)
//     tl.to(building.position, { x: 0, y: 5, z: -23, duration: 3 }, 0)
//     tl.to(building.scale, { x: 1.9, y: 1.9, z: 1.9, duration: 3 }, 0)
//     tl.to(building.rotation, { y: 1.06, duration: 3 }, 0)

//     // Phase 2 — Zoom In
//     tl.to(camera.position, { x: 15, y: 8, z: 27, duration: 2.5 }, 3)
//     const lookAt2 = { x: -4.9, y: 7, z: 4.7 }
//     tl.to(lookAt2, { x: 0, y: 8, z: 0, duration: 1.5, onUpdate: () => camera.lookAt(lookAt2.x, lookAt2.y, lookAt2.z) }, 3)
//     tl.to(building.position, { x: -8.5, y: 12.7, z: -19.6, duration: 2.5 }, 3)
//     tl.to(building.scale, { x: 3.2, y: 3.2, z: 3.2, duration: 2.5 }, 3)
//     tl.to(building.rotation, { y: 2.11, x: 0, duration: 2.5 }, 3)

//     return () => { tl.kill() }
//   }, [camera, buildingRef, onIntroComplete])

//   return null
// }

// /* ------------------------------------------------------------------ */
// /* STAGE 2 — scroll-scrubbed handoff into the next section.
//    Only mounts once the intro AND the hero content's own fade-in
//    have both finished, so the user never scrolls past unrevealed
//    content into the transition.

//    Motion: a quick early beat of rotate-RIGHT + rise-a-little,
//    then the rest of the scroll range is dominated by a continuous
//    zoom-in that carries through to the dissolve. */
// function ScrollHandoff({
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

//     // Starting point = exactly where AutoIntro's phase 2 ended.
//     const startCam = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
//     const startPos = { x: building.position.x, y: building.position.y, z: building.position.z }
//     const startScale = building.scale.x
//     const startRotY = building.rotation.y

//     const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

//     // ---- Early beat (0 -> 0.25): rotate RIGHT, rise a little ----
//     tl.to(building.rotation, { y: startRotY + 0.55, duration: 0.25 }, 0)
//     tl.to(building.position, { y: startPos.y + 2.5, duration: 0.25 }, 0)
//     const lookAtA = { x: 0, y: 9, z: 0 }
//     tl.to(lookAtA, {
//       x: 0, y: 9.5, z: 0, duration: 0.25,
//       onUpdate: () => camera.lookAt(lookAtA.x, lookAtA.y, lookAtA.z),
//     }, 0)
//     tl.to(camera.position, { x: startCam.x - 3, y: startCam.y + 1, z: startCam.z - 3, duration: 0.25 }, 0)

//     // ---- Continuous zoom (0.25 -> 1): dominant motion for the ----
//     // ---- rest of the scroll, carrying straight through to the ----
//     // ---- dissolve into the next section.
//     tl.to(building.scale, {
//       x: startScale * 5, y: startScale * 5, z: startScale * 5,
//       duration: 0.75, ease: 'power1.in',
//     }, 0.25)
//     tl.to(building.position, { y: startPos.y + 22, duration: 0.75, ease: 'power1.in' }, 0.25)
//     tl.to(camera.position, { z: startCam.z - 20, duration: 0.75, ease: 'power1.in' }, 0.25)
//     tl.to(building.rotation, { y: startRotY + 0.9, duration: 0.75 }, 0.25) // keep drifting right

//     const st = ScrollTrigger.create({
//       trigger: containerRef.current,
//       start: 'top top',
//       end: '+=100%',
//       scrub: 1,
//       pin: true,
//       anticipatePin: 1,
//       onUpdate: (self) => {
//         tl.progress(self.progress)
//         onProgress(self.progress)
//       },
//     })

//     // ✅ add this — forces lenis.resize() via LenisProvider's "refresh" listener,
//     // now that this (the last) pin actually exists in the DOM
//     // requestAnimationFrame(() => ScrollTrigger.refresh())
//     requestAnimationFrame(() => {
//       markScrollHandoffReady()
//       ScrollTrigger.refresh()

//     })


//     return () => {
//       st.kill()
//       tl.kill()
//     }
//   }, [camera, buildingRef, containerRef, onProgress])

//   return null
// }

// /* ------------------------------------------------------------------ */
// /* ProductImage — the big static photo layer that dominates each card,
//    matching the reference design's product photography. `bleed` (in %)
//    inflates the image past the card's own box so it crops tight or
//    off-edge against the panel border (the "photo spilling past the
//    glass" look seen in ATELION / MAIVON), while the card's own
//    overflow-hidden clips it cleanly at the rounded border. */
// function ProductImage({
//   src,
//   position = 'center',
//   bleed = 0,
// }: {
//   src: string
//   position?: string
//   bleed?: number
// }) {
//   const size = 100 + bleed
//   const offset = -(bleed / 2)
//   return (
//     <div
//       className="absolute pointer-events-none"
//       style={{
//         top: `${offset}%`,
//         left: `${offset}%`,
//         width: `${size}%`,
//         height: `${size}%`,
//         backgroundImage: `url(${src})`,
//         backgroundSize: 'cover',
//         backgroundPosition: position,
//       }}
//     />
//   )
// }

// /* ------------------------------------------------------------------ */
// /* ModelThumb — the SMALL rendered 3D-model accent badge. In the
//    reference, the 3D element (spool of thread on SELVÉ, etc.) is a
//    small secondary circular accent near the text block — never the
//    card's dominant visual. The big product photo (ProductImage above)
//    carries that job instead. */
// function ModelThumb({
//   top,
//   left,
//   size,
//   children,
// }: {
//   top: string
//   left: string
//   size: string
//   children: React.ReactNode
// }) {
//   return (
//     <div
//       className="absolute z-[2] rounded-full border border-amber-400/40 bg-black/40 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none"
//       style={{ top, left, width: size, aspectRatio: '1 / 1' }}
//     >
//       <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
//         <Suspense fallback={null}>
//           <ambientLight intensity={0.7} />
//           <spotLight position={[3, 5, 3]} intensity={1} angle={0.5} penumbra={0.6} />
//           <Environment preset="city" />
//           <Bounds fit clip observe margin={1.4}>
//             <Center>{children}</Center>
//           </Bounds>
//           <OrbitControls
//             enableZoom={false}
//             autoRotate
//             autoRotateSpeed={2.5}
//             minPolarAngle={Math.PI / 2.5}
//             maxPolarAngle={Math.PI / 1.5}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* ClothingCard — glass panel, big product photo, small 3D-model
//    accent, and text — always LEFT-ALIGNED / TOP-ANCHORED (including
//    the hero card), matching every card in the reference design. Only
//    the type scale differs between hero and compact variants, never
//    the alignment. */
// function ClothingCard({
//   delay,
//   isVisible,
//   children,
//   sizeClassName = 'w-36 h-48 md:w-44 md:h-56',
//   houseName,
//   category,
//   tagline,
//   variant = 'compact',
//   mainImageSrc,
//   mainImagePosition = 'center',
//   mainImageBleed = 0,
//   modelThumbTop = '14%',
//   modelThumbLeft = '8%',
//   modelThumbSize,
// }: {
//   delay: number
//   isVisible: boolean
//   children: React.ReactNode
//   sizeClassName?: string
//   houseName?: string
//   category?: string
//   tagline?: string
//   variant?: 'hero' | 'compact'
//   /** Path under /public, e.g. '/images/products/selve-denim.jpg' */
//   mainImageSrc?: string
//   /** CSS background-position, e.g. 'right center', 'bottom center' */
//   mainImagePosition?: string
//   /** % oversize so the photo bleeds/crops against the panel edge */
//   mainImageBleed?: number
//   modelThumbTop?: string
//   modelThumbLeft?: string
//   modelThumbSize?: string
// }) {
//   const hasContent = Boolean(houseName)
//   const isHero = variant === 'hero'
//   const thumbSize = modelThumbSize ?? (isHero ? '15%' : '22%')

//   return (
//     <div
//       className={`${sizeClassName} relative overflow-hidden rounded-[10px] transition-all duration-700 ease-out ${
//         isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
//       }`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {/* Glass panel — bounded exactly to the card, sits behind everything.
//           Warm charcoal gradient (not pure black) so it reads as backlit
//           glass rather than a flat overlay, plus a fine amber hairline
//           border and a soft ambient shadow to lift it off the backdrop. */}
//       <div className="absolute inset-0 rounded-[10px] bg-gradient-to-b from-[#2a2420]/70 via-[#171310]/80 to-black/90 border border-amber-400/20 shadow-[0_12px_40px_rgba(0,0,0,0.55)]" />

//       {/* Subtle top sheen — a thin lighter band along the upper edge to
//           suggest a glass/acrylic panel catching light, as in the reference. */}
//       <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-[10px] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none z-[1]" />

//       {/* Big product photograph — the dominant visual on every card,
//           positioned/bled per-card to match the reference's asymmetric
//           product placement (right-heavy, bottom-heavy, cropped, etc). */}
//       {mainImageSrc && (
//         <ProductImage src={mainImageSrc} position={mainImagePosition} bleed={mainImageBleed} />
//       )}

//       {/* Small rendered 3D-model accent — secondary, circular, sits
//           near the text block, distinct from the big product photo. */}
//       <ModelThumb top={modelThumbTop} left={modelThumbLeft} size={thumbSize}>
//         {children}
//       </ModelThumb>

//       {/* Text content — z-10, always above the photo/model layers,
//           always left-aligned and top-anchored per the reference. */}
//       {hasContent && (
//         <div
//           className={`
//             relative z-10 flex flex-col items-start text-left pointer-events-none
//             ${isHero ? 'pt-7 md:pt-8 px-6 md:px-7' : 'pt-3.5 md:pt-4 px-3.5 md:px-4'}
//           `}
//         >
//           <span
//             className={`
//               flex items-center justify-center rounded-full border border-amber-400/50 text-amber-400 font-serif tracking-wide
//               ${isHero ? 'w-9 h-9 md:w-10 md:h-10 text-xs md:text-sm mb-3.5' : 'w-6 h-6 md:w-7 md:h-7 text-[8px] md:text-[9px] mb-2'}
//             `}
//           >
//             AS
//           </span>

//           <h3
//             className={`
//               text-white font-serif tracking-tight leading-none
//               ${isHero ? 'text-3xl md:text-4xl lg:text-[2.75rem]' : 'text-base md:text-lg lg:text-xl'}
//             `}
//           >
//             {houseName}
//           </h3>

//           {category && (
//             <p
//               className={`
//                 text-amber-400/90 uppercase font-medium whitespace-nowrap
//                 ${isHero ? 'text-[11px] md:text-xs tracking-[0.3em] mt-2.5' : 'text-[8px] md:text-[9px] tracking-[0.18em] mt-1'}
//               `}
//             >
//               {category}
//             </p>
//           )}

//           {isHero && <div className="w-10 h-px bg-amber-400/50 mt-4 mb-4" />}

//           {tagline && (
//             <p
//               className={`
//                 text-white/75 leading-snug
//                 ${isHero ? 'text-sm md:text-base max-w-[75%]' : 'text-[11px] md:text-xs mt-1.5 max-w-[90%]'}
//               `}
//             >
//               {tagline}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }


// /* ------------------------------------------------------------------ */
// /* Desktop mosaic — absolutely positioned cards inside a relative
//    frame with a LOCKED aspect ratio (measured from the reference at
//    ~1.55 : 1, width : height), so the whole grid scales as one unit
//    instead of the cards drifting out of proportion at different
//    viewport widths.

//    Card geometry was measured directly off the reference layout as
//    fractions of that frame:

//      • SELVÉ   — left 0%,  top 5%,  width 38%, height 95%  (bottom @ 100%)
//      • ATELION — left 41%, top 0%,  width 30%, height 41%  (bottom @ 41%)
//      • LURÈ    — left 41%, top 46%, width 30%, height 54%  (bottom @ 100%)
//      • MAIVON  — left 74%, top 40%, width 26%, height 60%  (bottom @ 100%)

//    That gives a consistent 3% horizontal gutter between columns, a 5%
//    vertical gutter between ATELION and LURÈ, and SELVÉ, LURÈ and MAIVON
//    all sharing the same floor line, matching the reference.

//    Per-card photo placement / bleed and 3D-thumb placement are tuned
//    to mirror the reference's asymmetric product photography:
//      • SELVÉ   — denim photo bottom-anchored, filling the lower ~2/3;
//                  small spool thumb top-left, beside the text.
//      • ATELION — jacket photo right-heavy with generous bleed so it
//                  crops off the card's right edge, mannequin-bust style;
//                  small thumb tucked at the left, mid-height.
//      • LURÈ    — bottle photo centered-low; small thumb bottom-left.
//      • MAIVON  — vase/candle photo right-heavy with bleed; small thumb
//                  bottom-left, mirroring ATELION's placement above it. */
// function ClothingMosaic({ isVisible }: { isVisible: boolean }) {
//   return (
//     <div
//       className="relative shrink-0"
//       style={{
//         width: 'clamp(560px, 46vw, 860px)',
//         aspectRatio: '1.55 / 1',
//       }}
//     >
//       {/* SELVÉ — hero card: left-aligned text/divider up top, denim
//           photo bottom-anchored filling the lower portion, small spool
//           thumbnail beside the icon. */}
//       <div className="absolute" style={{ left: '0%', top: '5%', width: '38%', height: '95%' }}>
//         <ClothingCard
//           delay={0}
//           isVisible={isVisible}
//           sizeClassName="w-full h-full"
//           variant="hero"
//           houseName="SELVÉ"
//           category="Denim House"
//           tagline="Cut from the original."
//           mainImageSrc="/imgs/mat.png"
//           mainImagePosition="center 85%"
//           mainImageBleed={6}
//           modelThumbTop="8%"
//           modelThumbLeft="8%"
//           modelThumbSize="15%"
//         >
//           <JacketModel />
//         </ClothingCard>
//       </div>

//       {/* ATELION — top-right, jacket photo cropped right-heavy against
//           the panel edge, small thumb at the left mid-height. */}
//       <div className="absolute" style={{ left: '41%', top: '0%', width: '30%', height: '41%' }}>
//         <ClothingCard
//           delay={150}
//           isVisible={isVisible}
//           sizeClassName="w-full h-full"
//           variant="compact"
//           houseName="ATELION"
//           category="Fashion House"
//           tagline="Dressed with intention."
//           mainImageSrc="/imgs/cloth.png"
//           mainImagePosition="right center"
//           mainImageBleed={12}
//           modelThumbTop="48%"
//           modelThumbLeft="4%"
//           modelThumbSize="26%"
//         >
//           <ShirtModel />
//         </ClothingCard>
//       </div>

//       {/* LURÈ — directly beneath ATELION, same column and width,
//           bottle photo centered-low, thumb bottom-left. */}
//       <div className="absolute" style={{ left: '41%', top: '46%', width: '30%', height: '54%' }}>
//         <ClothingCard
//           delay={300}
//           isVisible={isVisible}
//           sizeClassName="w-full h-full"
//           variant="compact"
//           houseName="LURÈ"
//           category="Beauty House"
//           tagline="Nature. Refined."
//           mainImageSrc="/imgs/perfume.png"
//           mainImagePosition="center 55%"
//           mainImageBleed={4}
//           modelThumbTop="66%"
//           modelThumbLeft="8%"
//           modelThumbSize="22%"
//         >
//           <PantsModel />
//         </ClothingCard>
//       </div>

//       {/* MAIVON — far-right column, the tallest of the three compacts,
//           vase/candle photo cropped right-heavy, thumb bottom-left. */}
//       <div className="absolute" style={{ left: '74%', top: '40%', width: '26%', height: '60%' }}>
//         <ClothingCard
//           delay={450}
//           isVisible={isVisible}
//           sizeClassName="w-full h-full"
//           variant="compact"
//           houseName="MAIVON"
//           category="Home House"
//           tagline="Where craft comes home."
//           mainImageSrc="/imgs/house .png"
//           mainImagePosition="right 60%"
//           mainImageBleed={10}
//           modelThumbTop="64%"
//           modelThumbLeft="6%"
//           modelThumbSize="24%"
//         >
//           <ShoesModel />
//         </ClothingCard>
//       </div>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// // Time (ms) it takes for all hero content — title, cards, button —
// // to finish fading/sliding in after introDone flips true. Computed
// // from the longest transition below: button delay 600ms + duration
// // 700ms = 1300ms. Rounded up with a little headroom.
// const CONTENT_REVEAL_MS = 1500

// export default function LandModel() {
//   const buildingRef = useRef<THREE.Group>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [introDone, setIntroDone] = useState(false)
//   const [readyForScroll, setReadyForScroll] = useState(false)
//   const [progress, setProgress] = useState(0)

//   // Hero content appears immediately once the model's intro
//   // animation finishes — no scroll dependency.
//   const showContent = introDone

//   // The scroll-driven handoff only takes over once that content
//   // has actually finished appearing, so it's never possible to
//   // scroll into the transition before everything has shown up.
//   useEffect(() => {
//     if (!introDone) return
//     const timer = setTimeout(() => setReadyForScroll(true), CONTENT_REVEAL_MS)
//     return () => clearTimeout(timer)
//   }, [introDone])

//   const dissolving = progress > 0.92
//   const fadeOpacity = dissolving ? 1 - (progress - 0.92) / 0.08 : 1

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-screen overflow-hidden z-20"
//       style={{ pointerEvents: fadeOpacity <= 0.02 ? 'none' : 'auto' }}
//     >
//       <div
//         style={{ opacity: Math.max(fadeOpacity, 0) }}
//         className="absolute inset-0 bg-black"
//       >
//         <Canvas
//           className="absolute inset-0"
//           shadows
//           camera={{ fov: 50, near: 0.1, far: 1000 }}
//           gl={{ alpha: false }}
//         >
//           <color attach="background" args={['#000000']} />
//           {!introDone && (
//             <AutoIntro
//               buildingRef={buildingRef}
//               onIntroComplete={() => setIntroDone(true)}
//             />
//           )}
//           {readyForScroll && (
//             <ScrollHandoff
//               buildingRef={buildingRef}
//               containerRef={containerRef}
//               onProgress={setProgress}
//             />
//           )}

//           <ambientLight intensity={0.3} />
//           <directionalLight
//             position={[50, 80, 30]}
//             intensity={1.5}
//             castShadow
//             shadow-mapSize-width={2048}
//             shadow-mapSize-height={2048}
//           />
//           <pointLight position={[-20, 30, -20]} intensity={0.5} color="#aaccff" />

//           <group ref={buildingRef}>
//             <HouseMdel />
//           </group>
//         </Canvas>

//         {/*
//           Content layer.
//           - Mobile (< md): stacked & centered — label, heading, button,
//             then cards wrap in a row below (same as the original layout).
//           - Desktop (>= md): two columns — text block left-aligned on
//             the left, asymmetric card mosaic on the right — matching
//             the reference design.

//           Background: the lobby/entrance photo (place it in /public,
//           e.g. /public/images/atelier-entrance.jpg, and update the path
//           below to match) sits behind this div's content as a CSS
//           background — NOT touching the Canvas/HouseMdel underneath.
//           A dark gradient is layered on top of the image in the same
//           background-image so the text stays readable without needing
//           extra overlay elements.
//         */}
//         <div
//           className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-8 px-6 md:px-16 lg:px-24 pointer-events-none bg-cover bg-center"
//           style={{
//             backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.2) 75%), linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%), url('/images/atelier-entrance.jpg')`,
//           }}
//         >

//           {/* Decorative section-progress rail — purely visual, matches
//               the thin dot/line indicator running down the left edge
//               of the reference design. */}
//           <div
//             className={`
//               hidden lg:flex flex-col items-center gap-3 self-center shrink-0
//               transition-opacity duration-1000 ease-out
//               ${showContent ? 'opacity-100' : 'opacity-0'}
//             `}
//           >
//             <span className="w-2 h-2 rounded-full bg-amber-400" />
//             <span className="w-px h-10 bg-white/20" />
//             <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
//             <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
//           </div>

//           {/* Left column — text content */}
//           <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md md:max-w-lg lg:max-w-xl shrink md:shrink-[2]">
//             <p
//               className={`
//                 order-1 text-amber-400 text-xs md:text-sm tracking-[0.3em] uppercase font-medium
//                 transition-all duration-1000 ease-out
//                 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//               `}
//             >
//               Crafted for those who know
//             </p>

//             <h1
//               className={`
//                 order-2 mt-4 text-white font-serif font-normal leading-[1.15] tracking-tight
//                 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl
//                 transition-all duration-1000 ease-out
//                 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//               `}
//             >
//               Every masterpiece begins with a single{' '}
//               <span className="italic text-amber-400">thread</span>.
//             </h1>

//             <div
//               className={`
//                 order-3 mt-6 w-12 h-px bg-amber-400/60
//                 transition-all duration-1000 ease-out
//                 ${showContent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
//               `}
//             />

//             <p
//               className={`
//                 order-4 mt-6 text-white/60 text-base md:text-lg leading-relaxed max-w-sm md:max-w-md
//                 transition-all duration-1000 ease-out
//                 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//               `}
//               style={{ transitionDelay: '150ms' }}
//             >
//               From heritage to innovation. From Africa to the world. A luxury
//               house built on craftsmanship, precision, and timeless design.
//             </p>

//             <button
//               className={`
//                 order-5 mt-8 flex items-center gap-3
//                 pointer-events-auto cursor-pointer group
//                 transition-all duration-700 ease-out
//                 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
//               `}
//               style={{ transitionDelay: '600ms' }}
//             >
//               <span
//                 className="
//                   flex items-center justify-center w-11 h-11 rounded-full
//                   border border-amber-400/50 text-amber-400
//                   transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400
//                 "
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </span>
//               <span className="text-amber-400 text-xs md:text-sm tracking-[0.25em] uppercase font-medium">
//                 Enter The House
//               </span>
//             </button>

//             {/* Mobile-only card row — hidden on desktop, where the
//                 mosaic (below) takes over instead. Same photo/thumb
//                 treatment as the desktop mosaic cards, just at the
//                 default compact card size. */}
//             <div
//               className={`
//                 order-6 flex md:hidden flex-wrap justify-center gap-3 mt-8
//                 transition-all duration-1000 ease-out
//                 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
//               `}
//             >
//               <ClothingCard
//                 delay={0}
//                 isVisible={showContent}
//                 houseName="SELVÉ"
//                 category="Denim House"
//                 mainImageSrc="/images/products/selve-denim.jpg"
//                 mainImagePosition="center 85%"
//                 mainImageBleed={6}
//               >
//                 <JacketModel />
//               </ClothingCard>
//               <ClothingCard
//                 delay={120}
//                 isVisible={showContent}
//                 houseName="ATELION"
//                 category="Fashion House"
//                 mainImageSrc="/images/products/atelion-jacket.jpg"
//                 mainImagePosition="right center"
//                 mainImageBleed={12}
//               >
//                 <ShirtModel />
//               </ClothingCard>
//               <ClothingCard
//                 delay={240}
//                 isVisible={showContent}
//                 houseName="LURÈ"
//                 category="Beauty House"
//                 mainImageSrc="/images/products/lure-perfume.jpg"
//                 mainImagePosition="center 55%"
//                 mainImageBleed={4}
//               >
//                 <PantsModel />
//               </ClothingCard>
//               <ClothingCard
//                 delay={360}
//                 isVisible={showContent}
//                 houseName="MAIVON"
//                 category="Home House"
//                 mainImageSrc="/images/products/maivon-vase.jpg"
//                 mainImagePosition="right 60%"
//                 mainImageBleed={10}
//               >
//                 <ShoesModel />
//               </ClothingCard>
//               <ClothingCard delay={480} isVisible={showContent}>
//                 <CoatModel />
//               </ClothingCard>
//             </div>
//           </div>

//           {/* Right column — desktop-only asymmetric mosaic */}
//           <div className="hidden md:block pointer-events-auto shrink-0">
//             <ClothingMosaic isVisible={showContent} />
//           </div>
//         </div>
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
import Navbar from "@/Components/Navbar/Navbar"

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
/* STAGE 2 — scroll-scrubbed handoff into the next section. */
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

    // ---- Continuous zoom (0.25 -> 1): dominant motion for the rest of the scroll ----
    tl.to(building.scale, {
      x: startScale * 5, y: startScale * 5, z: startScale * 5,
      duration: 0.75, ease: 'power1.in',
    }, 0.25)
    tl.to(building.position, { y: startPos.y + 22, duration: 0.75, ease: 'power1.in' }, 0.25)
    tl.to(camera.position, { z: startCam.z - 20, duration: 0.75, ease: 'power1.in' }, 0.25)
    tl.to(building.rotation, { y: startRotY + 0.9, duration: 0.75 }, 0.25)

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,
      pinSpacing: false, // <--- KEY FIX: REMOVES THE EMPTY SPACER
      anticipatePin: 1,
      onUpdate: (self) => {
        tl.progress(self.progress)
        onProgress(self.progress)
      },
    })

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

/* ------------------------------------------------------------------ */
/* ProductImage — unchanged */
function ProductImage({
  src,
  position = 'center',
  bleed = 0,
}: {
  src: string
  position?: string
  bleed?: number
}) {
  const size = 100 + bleed
  const offset = -(bleed / 2)
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${offset}%`,
        left: `${offset}%`,
        width: `${size}%`,
        height: `${size}%`,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: position,
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ModelThumb — unchanged */
function ModelThumb({
  top,
  left,
  size,
  children,
}: {
  top: string
  left: string
  size: string
  children: React.ReactNode
}) {
  return (
    <div
      className="absolute z-[2] rounded-full border border-amber-400/40 bg-black/40 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none"
      style={{ top, left, width: size, aspectRatio: '1 / 1' }}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <spotLight position={[3, 5, 3]} intensity={1} angle={0.5} penumbra={0.6} />
          <Environment preset="city" />
          <Bounds fit clip observe margin={1.4}>
            <Center>{children}</Center>
          </Bounds>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ClothingCard — unchanged */
function ClothingCard({
  delay,
  isVisible,
  children,
  sizeClassName = 'w-36 h-48 md:w-44 md:h-56',
  houseName,
  category,
  tagline,
  variant = 'compact',
  mainImageSrc,
  mainImagePosition = 'center',
  mainImageBleed = 0,
  modelThumbTop = '14%',
  modelThumbLeft = '8%',
  modelThumbSize,
}: {
  delay: number
  isVisible: boolean
  children: React.ReactNode
  sizeClassName?: string
  houseName?: string
  category?: string
  tagline?: string
  variant?: 'hero' | 'compact'
  mainImageSrc?: string
  mainImagePosition?: string
  mainImageBleed?: number
  modelThumbTop?: string
  modelThumbLeft?: string
  modelThumbSize?: string
}) {
  const hasContent = Boolean(houseName)
  const isHero = variant === 'hero'
  const thumbSize = modelThumbSize ?? (isHero ? '15%' : '22%')

  return (
    <div
      className={`${sizeClassName} relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        filter:
          'drop-shadow(0 28px 34px rgba(0,0,0,0.55)) drop-shadow(0 10px 14px rgba(0,0,0,0.45))',
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-[10px]">
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-b from-[#2a2420]/70 via-[#171310]/80 to-black/90 border border-amber-400/25" />
        <div className="absolute inset-[3px] rounded-[8px] border border-white/[0.06] pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-amber-200/35 via-white/10 to-transparent pointer-events-none z-[1]" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none z-[1]" />
        <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-[10px] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none z-[1]" />
        <div className="absolute -top-1/4 left-[8%] w-[18%] h-[150%] rotate-[14deg] bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent pointer-events-none z-[1]" />
        
        {mainImageSrc && (
          <ProductImage src={mainImageSrc} position={mainImagePosition} bleed={mainImageBleed} />
        )}

        <ModelThumb top={modelThumbTop} left={modelThumbLeft} size={thumbSize}>
          {children}
        </ModelThumb>

        {hasContent && (
          <div
            className={`
              relative z-10 flex flex-col items-start text-left pointer-events-none
              ${isHero ? 'pt-7 md:pt-8 px-6 md:px-7' : 'pt-3.5 md:pt-4 px-3.5 md:px-4'}
            `}
          >
            <span
              className={`
                flex items-center justify-center rounded-full border border-amber-400/50 text-amber-400 font-serif tracking-wide
                ${isHero ? 'w-9 h-9 md:w-10 md:h-10 text-xs md:text-sm mb-3.5' : 'w-6 h-6 md:w-7 md:h-7 text-[8px] md:text-[9px] mb-2'}
              `}
            >
              AS
            </span>

            <h3
              className={`
                text-white font-serif tracking-tight leading-none
                ${isHero ? 'text-3xl md:text-4xl lg:text-[2.75rem]' : 'text-base md:text-lg lg:text-xl'}
              `}
            >
              {houseName}
            </h3>

            {category && (
              <p
                className={`
                  text-amber-400/90 uppercase font-medium whitespace-nowrap
                  ${isHero ? 'text-[11px] md:text-xs tracking-[0.3em] mt-2.5' : 'text-[8px] md:text-[9px] tracking-[0.18em] mt-1'}
                `}
              >
                {category}
              </p>
            )}

            {isHero && <div className="w-10 h-px bg-amber-400/50 mt-4 mb-4" />}

            {tagline && (
              <p
                className={`
                  text-white/75 leading-snug
                  ${isHero ? 'text-sm md:text-base max-w-[75%]' : 'text-[11px] md:text-xs mt-1.5 max-w-[90%]'}
                `}
              >
                {tagline}
              </p>
            )}
          </div>
        )}

        {hasContent && (
          <div
            className={`
              absolute z-10 flex items-center gap-1.5 pointer-events-auto cursor-pointer group/explore
              ${isHero ? 'bottom-5 right-5 md:bottom-6 md:right-6' : 'bottom-3 right-3 md:bottom-3.5 md:right-3.5'}
            `}
          >
            <span
              className={`
                text-amber-400 uppercase font-medium tracking-[0.2em]
                transition-colors duration-200 group-hover/explore:text-amber-300
                ${isHero ? 'text-[10px] md:text-[11px]' : 'text-[8px] md:text-[9px]'}
              `}
            >
              Explore
            </span>
            <svg
              width={isHero ? 12 : 9}
              height={isHero ? 12 : 9}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-amber-400 transition-transform duration-200 group-hover/explore:translate-x-0.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ClothingMosaic — unchanged */
function ClothingMosaic({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: 'clamp(560px, 46vw, 860px)',
        aspectRatio: '1.55 / 1',
      }}
    >
      <div className="absolute" style={{ left: '0%', top: '5%', width: '38%', height: '95%' }}>
        <ClothingCard
          delay={0}
          isVisible={isVisible}
          sizeClassName="w-full h-full"
          variant="hero"
          houseName="SELVÉ"
          category="Denim House"
          tagline="Cut from the original."
          mainImageSrc="/imgs/mat.png"
          mainImagePosition="center 85%"
          mainImageBleed={6}
          modelThumbTop="8%"
          modelThumbLeft="8%"
          modelThumbSize="15%"
        >
          <JacketModel />
        </ClothingCard>
      </div>

      <div className="absolute" style={{ left: '41%', top: '0%', width: '30%', height: '41%' }}>
        <ClothingCard
          delay={150}
          isVisible={isVisible}
          sizeClassName="w-full h-full"
          variant="compact"
          houseName="ATELION"
          category="Fashion House"
          tagline="Dressed with intention."
          mainImageSrc="/imgs/cloth.png"
          mainImagePosition="right center"
          mainImageBleed={12}
          modelThumbTop="48%"
          modelThumbLeft="4%"
          modelThumbSize="26%"
        >
          <ShirtModel />
        </ClothingCard>
      </div>

      <div className="absolute" style={{ left: '41%', top: '46%', width: '30%', height: '54%' }}>
        <ClothingCard
          delay={300}
          isVisible={isVisible}
          sizeClassName="w-full h-full"
          variant="compact"
          houseName="LURÈ"
          category="Beauty House"
          tagline="Nature. Refined."
          mainImageSrc="/imgs/perfume.png"
          mainImagePosition="center 55%"
          mainImageBleed={4}
          modelThumbTop="66%"
          modelThumbLeft="8%"
          modelThumbSize="22%"
        >
          <PantsModel />
        </ClothingCard>
      </div>

      <div className="absolute" style={{ left: '74%', top: '40%', width: '26%', height: '60%' }}>
        <ClothingCard
          delay={450}
          isVisible={isVisible}
          sizeClassName="w-full h-full"
          variant="compact"
          houseName="MAIVON"
          category="Home House"
          tagline="Where craft comes home."
          mainImageSrc="/imgs/house.png"
          mainImagePosition="right 60%"
          mainImageBleed={10}
          modelThumbTop="64%"
          modelThumbLeft="6%"
          modelThumbSize="24%"
        >
          <ShoesModel />
        </ClothingCard>
      </div>
    </div>
  )
}

const CONTENT_REVEAL_MS = 1500

export default function LandModel() {
  const buildingRef = useRef<THREE.Group>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [introDone, setIntroDone] = useState(false)
  const [readyForScroll, setReadyForScroll] = useState(false)
  const [progress, setProgress] = useState(0)

  const showContent = introDone

  useEffect(() => {
    if (!introDone) return
    const timer = setTimeout(() => setReadyForScroll(true), CONTENT_REVEAL_MS)
    return () => clearTimeout(timer)
  }, [introDone])

  const dissolving = progress > 0.92
  const fadeOpacity = dissolving ? 1 - (progress - 0.92) / 0.08 : 1
  // Gapless Handoff: Calculate dynamic Z-Index.
  // If opacity is too low (fade complete), drop Z-Index to 0 so Philosophy can take over.
  const containerZIndex = fadeOpacity <= 0.02 ? 0 : 20;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ 
        pointerEvents: fadeOpacity <= 0.02 ? 'none' : 'auto',
        zIndex: containerZIndex // <--- Handoff logic
      }}
    >
      {/* <Navbar /> */}
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

        <div
          className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-8 px-6 md:px-16 lg:px-24 pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.2) 75%), linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%), url('/images/atelier-entrance.jpg')`,
          }}
        >
          <div
            className={`
              hidden lg:flex flex-col items-center gap-3 self-center shrink-0
              transition-opacity duration-1000 ease-out
              ${showContent ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-px h-10 bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md md:max-w-lg lg:max-w-xl shrink md:shrink-[2]">
            <p
              className={`
                order-1 text-amber-400 text-xs md:text-sm tracking-[0.3em] uppercase font-medium
                transition-all duration-1000 ease-out
                ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              Crafted for those who know
            </p>

            <h1
              className={`
                order-2 mt-4 text-white font-serif font-normal leading-[1.15] tracking-tight
                text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl
                transition-all duration-1000 ease-out
                ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              Every masterpiece begins with a single{' '}
              <span className="italic text-amber-400">thread</span>.
            </h1>

            <div
              className={`
                order-3 mt-6 w-12 h-px bg-amber-400/60
                transition-all duration-1000 ease-out
                ${showContent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
              `}
            />

            <p
              className={`
                order-4 mt-6 text-white/60 text-base md:text-lg leading-relaxed max-w-sm md:max-w-md
                transition-all duration-1000 ease-out
                ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: '150ms' }}
            >
              From heritage to innovation. From Africa to the world. A luxury
              house built on craftsmanship, precision, and timeless design.
            </p>

            <button
              className={`
                order-5 mt-8 flex items-center gap-3
                pointer-events-auto cursor-pointer group
                transition-all duration-700 ease-out
                ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '600ms' }}
            >
              <span
                className="
                  flex items-center justify-center w-11 h-11 rounded-full
                  border border-amber-400/50 text-amber-400
                  transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400
                "
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-amber-400 text-xs md:text-sm tracking-[0.25em] uppercase font-medium">
                Enter The House
              </span>
            </button>

            <div
              className={`
                order-6 flex md:hidden flex-wrap justify-center gap-3 mt-8
                transition-all duration-1000 ease-out
                ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <ClothingCard
                delay={0}
                isVisible={showContent}
                houseName="SELVÉ"
                category="Denim House"
                mainImageSrc="/imgs/mat.png"
                mainImagePosition="center 85%"
                mainImageBleed={6}
              >
                <JacketModel />
              </ClothingCard>
              <ClothingCard
                delay={120}
                isVisible={showContent}
                houseName="ATELION"
                category="Fashion House"
                mainImageSrc="/imgs/cloth.png"
                mainImagePosition="right center"
                mainImageBleed={12}
              >
                <ShirtModel />
              </ClothingCard>
              <ClothingCard
                delay={240}
                isVisible={showContent}
                houseName="LURÈ"
                category="Beauty House"
                mainImageSrc="/imgs/perfume.png"
                mainImagePosition="center 55%"
                mainImageBleed={4}
              >
                <PantsModel />
              </ClothingCard>
              <ClothingCard
                delay={360}
                isVisible={showContent}
                houseName="MAIVON"
                category="Home House"
                mainImageSrc="/imgs/house.png"
                mainImagePosition="right 60%"
                mainImageBleed={10}
              >
                <ShoesModel />
              </ClothingCard>
              <ClothingCard delay={480} isVisible={showContent}>
                <CoatModel />
              </ClothingCard>
            </div>
          </div>

          <div className="hidden md:block pointer-events-auto shrink-0">
            <ClothingMosaic isVisible={showContent} />
          </div>
        </div>
      </div>
    </div>
  )
}