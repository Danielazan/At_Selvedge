// "use client"
// import { useRef, useState, useEffect, Suspense } from "react"
// import { Canvas } from "@react-three/fiber"
// import { Environment, ContactShadows } from "@react-three/drei"
// import gsap from "gsap"
// import * as THREE from 'three'
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { Suit } from "./Models/Suit"

// gsap.registerPlugin(ScrollTrigger)

// const COLORS = ["#3a3a30", "#c9a227", "#4c6b57", "#8a8060"]
// const PATTERNS = ["69", "512", "08", "10", "112", "238"]

// export default function Intro() {
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const modelGroupRef = useRef<THREE.Group>(null)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const [activeColor, setActiveColor] = useState(0)
//   const [activePattern, setActivePattern] = useState(0)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       if (!sectionRef.current || !contentRef.current) return

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=120%",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       })

//       tl.from(
//         contentRef.current.querySelectorAll("[data-anim]"),
//         { opacity: 0, y: 30, stagger: 0.05, duration: 0.4 },
//         0
//       )

//       if (modelGroupRef.current) {
//         tl.from(modelGroupRef.current.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 0.4 }, 0)
//         tl.from(modelGroupRef.current.rotation, { y: -Math.PI, duration: 0.6 }, 0)
//         tl.to(modelGroupRef.current.rotation, { y: Math.PI * 0.6, duration: 0.6 }, 0.4)
//         tl.to(modelGroupRef.current.rotation, { y: Math.PI * 1.4, duration: 0.4 }, 1.0)
//         tl.to(modelGroupRef.current.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.4 }, 1.0)
//       }

//       tl.to(contentRef.current, { opacity: 0, y: -20, duration: 0.3 }, 1.0)
//     }, sectionRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#e7e5e0]">
//       <div
//         className="absolute inset-0 opacity-40"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle at 20% 30%, transparent 0, transparent 40px, rgba(0,0,0,0.04) 41px), radial-gradient(circle at 80% 70%, transparent 0, transparent 60px, rgba(0,0,0,0.04) 61px)",
//           backgroundSize: "300px 300px",
//         }}
//       />

//       <Canvas className="absolute inset-0" camera={{ position: [0, 0.3, 3.2], fov: 40 }} shadows>
//             <ambientLight intensity={0.7} />
//             <spotLight position={[3, 5, 4]} intensity={1.4} angle={0.4} penumbra={0.6} castShadow />
//             <Environment preset="studio" />

//             <group ref={modelGroupRef}>
//                 <Suspense fallback={null}>
//                 <Suit />
//                 </Suspense>
//             </group>

//             <ContactShadows position={[0, -0.6, 0]} opacity={0.4} blur={2.5} far={2} />
//         </Canvas>

//       <div
//         ref={contentRef}
//         className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 pointer-events-none"
//       >
//         <div data-anim className="flex items-center justify-between text-black/80 pointer-events-auto">
//           <div className="flex items-center gap-4">
//             <span className="text-lg font-bold tracking-wide">
//               SELVEDGE<sup className="text-xs align-super">®</sup>
//             </span>
//             <span className="hidden md:inline text-xs text-black/40">Original. Not for retail.</span>
//           </div>
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-60">
//             <path d="M12 2L22 20H2L12 2Z" stroke="currentColor" strokeWidth="1.5" />
//           </svg>
//           <div className="flex items-center gap-4 text-xs">
//             <span>Day</span>
//             <div className="w-9 h-5 rounded-full bg-black/20 relative">
//               <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white" />
//             </div>
//             <span>Night</span>
//             <span className="ml-4 cursor-pointer">Exit</span>
//           </div>
//         </div>

//         <div data-anim className="text-center select-none">
//           <p className="text-black/20 text-5xl md:text-7xl font-bold tracking-tight">Chest Rig</p>
//           <p className="text-black/30 italic text-sm mt-1">\ Night Vision Device \</p>
//           <h2 className="text-black text-4xl md:text-6xl font-bold mt-2">Night Vision</h2>
//         </div>

//         <div className="flex items-end justify-between pointer-events-auto">
//           <div data-anim className="flex flex-col gap-3 text-xs md:text-sm tracking-wide">
//             <button className="text-left text-black/40">←</button>
//             <span className="text-black/30">NIGHT VISION</span>
//             <span className="text-black/50">LENSES</span>
//             <span className="text-black font-semibold">| CAMO</span>
//             <span className="text-black/50">MOUNTS</span>
//             <span className="text-black/50">J-ARM</span>
//             <span className="text-black/50">FLIP-UP</span>
//             <span className="text-black/50">IR FILTERS</span>
//           </div>

//           <div data-anim className="text-right text-xs md:text-sm">
//             <p className="text-black/40 tracking-wide">NIGHT VISION / CAMO</p>
//             <h3 className="text-black text-xl md:text-2xl font-semibold mt-1 mb-4">Customization</h3>

//             <p className="text-black/40 mb-2">SELECT COLOR</p>
//             <div className="flex gap-2 justify-end mb-4">
//               {COLORS.map((c, i) => (
//                 <button
//                   key={c}
//                   onClick={() => setActiveColor(i)}
//                   className="w-6 h-6 rounded-full border-2 transition-transform"
//                   style={{
//                     backgroundColor: c,
//                     borderColor: activeColor === i ? "#000" : "transparent",
//                     transform: activeColor === i ? "scale(1.15)" : "scale(1)",
//                   }}
//                 />
//               ))}
//             </div>

//             <p className="text-black/40 mb-2">SELECT PATTERN</p>
//             <div className="grid grid-cols-3 gap-2 justify-end mb-4">
//               {PATTERNS.map((p, i) => (
//                 <button
//                   key={p}
//                   onClick={() => setActivePattern(i)}
//                   className={`px-3 py-1 rounded-full border text-xs ${
//                     activePattern === i ? "bg-black text-white border-black" : "border-black/20 text-black/60"
//                   }`}
//                 >
//                   {p}
//                 </button>
//               ))}
//             </div>

//             <p className="text-black/40 mb-4">
//               Open Guides <span className="text-black">Y</span> / N
//             </p>

//             <div className="flex justify-end gap-3">
//               <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
//                 🔖
//               </button>
//               <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
//                 🛒
//               </button>
//             </div>
//           </div>
//         </div>

//         <div data-anim className="flex items-center justify-between text-xs md:text-sm text-black/40 pointer-events-auto mt-4">
//           <span>/</span>
//           <div className="flex gap-6">
//             <span>EQUIPMENT</span>
//             <span className="text-black font-semibold">CUSTOMIZE</span>
//             <span>THE FINALS</span>
//             <span>THANK YOU</span>
//           </div>
//           <span>MUTE</span>
//         </div>
//       </div>
//     </section>
//   )
// }



// "use client"
// import { useRef, useState, useEffect, Suspense } from "react"
// import { Canvas } from "@react-three/fiber"
// import { Environment, ContactShadows } from "@react-three/drei"
// import gsap from "gsap"
// import * as THREE from 'three'
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { Suit } from "./Models/Suit"

// gsap.registerPlugin(ScrollTrigger)

// const COLORS = ["#3a3a30", "#c9a227", "#4c6b57", "#8a8060"]
// const PATTERNS = ["69", "512", "08", "10", "112", "238"]

// /* Rendered inside <Canvas> — its effect fires only after modelGroupRef's
//    group has actually mounted in the R3F tree, so the ref is never null here. */
// // function SuitDirector({
// //   modelGroupRef,
// //   sectionRef,
// //   contentRef,
// // }: {
// //   modelGroupRef: React.RefObject<THREE.Group | null>
// //   sectionRef: React.RefObject<HTMLDivElement | null>
// //   contentRef: React.RefObject<HTMLDivElement | null>
// // }) {
// //   useEffect(() => {
// //     if (!modelGroupRef.current || !sectionRef.current || !contentRef.current) return

// //     const ctx = gsap.context(() => {
// //       const tl = gsap.timeline({
// //         scrollTrigger: {
// //           trigger: sectionRef.current!,
// //           start: "top top",
// //           end: "+=120%",
// //           scrub: 1,
// //           pin: true,
// //           anticipatePin: 1,
// //         },
// //       })

// //       tl.from(
// //         contentRef.current!.querySelectorAll("[data-anim]"),
// //         { opacity: 0, y: 30, stagger: 0.05, duration: 0.4 },
// //         0
// //       )

// //       tl.from(modelGroupRef.current!.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 0.4 }, 0)
// //       tl.from(modelGroupRef.current!.rotation, { y: -Math.PI, duration: 0.6 }, 0)
// //       tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 0.6, duration: 0.6 }, 0.4)
// //       tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 1.4, duration: 0.4 }, 1.0)
// //       tl.to(modelGroupRef.current!.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.4 }, 1.0)

// //       tl.to(contentRef.current!, { opacity: 0, y: -20, duration: 0.3 }, 1.0)
// //     })

// //     return () => ctx.revert()
// //   }, [modelGroupRef, sectionRef, contentRef])


// //   return null
// // }

// function SuitDirector({
//   modelGroupRef,
//   sectionRef,
//   contentRef,
// }: {
//   modelGroupRef: React.RefObject<THREE.Group | null>
//   sectionRef: React.RefObject<HTMLDivElement | null>
//   contentRef: React.RefObject<HTMLDivElement | null>
// }) {
//   useEffect(() => {
//     if (!modelGroupRef.current || !sectionRef.current || !contentRef.current) return

//     const ctx = gsap.context(() => {
//     //   const tl = gsap.timeline({
//     //     scrollTrigger: {
//     //       trigger: sectionRef.current!,
//     //       start: "top top",
//     //       end: "+=120%",
//     //       scrub: 1,
//     //       pin: true,
//     //       anticipatePin: 1,
//     //     },
//     //   })

//     //   tl.from(
//     //     contentRef.current!.querySelectorAll("[data-anim]"),
//     //     { opacity: 0, y: 30, stagger: 0.05, duration: 0.4 },
//     //     0
//     //   )

//     //   tl.from(modelGroupRef.current!.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 0.4 }, 0)
//     //   tl.from(modelGroupRef.current!.rotation, { y: -Math.PI, duration: 0.6 }, 0)
//     //   tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 0.6, duration: 0.6 }, 0.4)
//     //   tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 1.4, duration: 0.4 }, 1.0)
//     //   tl.to(modelGroupRef.current!.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.4 }, 1.0)

//     //   tl.to(contentRef.current!, { opacity: 0, y: -20, duration: 0.3 }, 1.0)
//     // })

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current!,
//         start: "top top",
//         end: "+=50%",        // was +=120%
//         scrub: 1,
//         pin: true,
//         anticipatePin: 1,
//       },
//     })

//     tl.from(
//       contentRef.current!.querySelectorAll("[data-anim]"),
//       { opacity: 0, y: 30, stagger: 0.05, duration: 0.4 },
//       0
//     )

//     tl.from(modelGroupRef.current!.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 0.4 }, 0)
//     tl.from(modelGroupRef.current!.rotation, { y: -Math.PI, duration: 0.6 }, 0)
//     tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 0.6, duration: 0.6 }, 0.4)
//     // tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 1.4, duration: 0.4 }, 1.0)
//     // tl.to(modelGroupRef.current!.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.4 }, 1.0)

//     // // fade-out moved later & shortened, so it lands right at unpin instead
//     // // of eating a big chunk of scroll on its own
//     // tl.to(contentRef.current!, { opacity: 0, y: -20, duration: 0.15 }, 1.25)

//   })

//     ScrollTrigger.refresh()

//     return () => ctx.revert()
//   }, [modelGroupRef, sectionRef, contentRef])

//   return null
// }

// // export default SuitDirector
// export default function Intro() {
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const modelGroupRef = useRef<THREE.Group>(null)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const [activeColor, setActiveColor] = useState(0)
//   const [activePattern, setActivePattern] = useState(0)

//   return (
//     <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#e7e5e0]">
//       <div
//         className="absolute inset-0 opacity-40"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle at 20% 30%, transparent 0, transparent 40px, rgba(0,0,0,0.04) 41px), radial-gradient(circle at 80% 70%, transparent 0, transparent 60px, rgba(0,0,0,0.04) 61px)",
//           backgroundSize: "300px 300px",
//         }}
//       />

//       <Canvas className="absolute inset-0" camera={{ position: [0, 0.3, 3.2], fov: 40 }} shadows>
//         <ambientLight intensity={0.7} />
//         <spotLight position={[3, 5, 4]} intensity={1.4} angle={0.4} penumbra={0.6} castShadow />
//         <Environment preset="studio" />

//         <group ref={modelGroupRef}>
//           <Suspense fallback={null}>
//             <Suit />
//           </Suspense>
//         </group>

//         <ContactShadows position={[0, -0.6, 0]} opacity={0.4} blur={2.5} far={2} />

//         <SuitDirector
//           modelGroupRef={modelGroupRef}
//           sectionRef={sectionRef}
//           contentRef={contentRef}
//         />
//       </Canvas>

//       {/* rest of the overlay JSX (header, title, sidebar, customization panel, footer) unchanged */}
//       <div
//         ref={contentRef}
//         className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 pointer-events-none"
//       >
//         <div data-anim className="flex items-center justify-between text-black/80 pointer-events-auto">
//           <div className="flex items-center gap-4">
//             <span className="text-lg font-bold tracking-wide">
//               SELVEDGE<sup className="text-xs align-super">®</sup>
//             </span>
//             <span className="hidden md:inline text-xs text-black/40">Original. Not for retail.</span>
//           </div>
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-60">
//             <path d="M12 2L22 20H2L12 2Z" stroke="currentColor" strokeWidth="1.5" />
//           </svg>
//           <div className="flex items-center gap-4 text-xs">
//             <span>Day</span>
//             <div className="w-9 h-5 rounded-full bg-black/20 relative">
//               <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white" />
//             </div>
//             <span>Night</span>
//             <span className="ml-4 cursor-pointer">Exit</span>
//           </div>
//         </div>

//         <div data-anim className="text-center select-none">
//           <p className="text-black/20 text-5xl md:text-7xl font-bold tracking-tight">Chest Rig</p>
//           <p className="text-black/30 italic text-sm mt-1">\ Night Vision Device \</p>
//           <h2 className="text-black text-4xl md:text-6xl font-bold mt-2">Night Vision</h2>
//         </div>

//         <div className="flex items-end justify-between pointer-events-auto">
//           <div data-anim className="flex flex-col gap-3 text-xs md:text-sm tracking-wide">
//             <button className="text-left text-black/40">←</button>
//             <span className="text-black/30">NIGHT VISION</span>
//             <span className="text-black/50">LENSES</span>
//             <span className="text-black font-semibold">| CAMO</span>
//             <span className="text-black/50">MOUNTS</span>
//             <span className="text-black/50">J-ARM</span>
//             <span className="text-black/50">FLIP-UP</span>
//             <span className="text-black/50">IR FILTERS</span>
//           </div>

//           <div data-anim className="text-right text-xs md:text-sm">
//             <p className="text-black/40 tracking-wide">NIGHT VISION / CAMO</p>
//             <h3 className="text-black text-xl md:text-2xl font-semibold mt-1 mb-4">Customization</h3>

//             <p className="text-black/40 mb-2">SELECT COLOR</p>
//             <div className="flex gap-2 justify-end mb-4">
//               {COLORS.map((c, i) => (
//                 <button
//                   key={c}
//                   onClick={() => setActiveColor(i)}
//                   className="w-6 h-6 rounded-full border-2 transition-transform"
//                   style={{
//                     backgroundColor: c,
//                     borderColor: activeColor === i ? "#000" : "transparent",
//                     transform: activeColor === i ? "scale(1.15)" : "scale(1)",
//                   }}
//                 />
//               ))}
//             </div>

//             <p className="text-black/40 mb-2">SELECT PATTERN</p>
//             <div className="grid grid-cols-3 gap-2 justify-end mb-4">
//               {PATTERNS.map((p, i) => (
//                 <button
//                   key={p}
//                   onClick={() => setActivePattern(i)}
//                   className={`px-3 py-1 rounded-full border text-xs ${activePattern === i ? "bg-black text-white border-black" : "border-black/20 text-black/60"
//                     }`}
//                 >
//                   {p}
//                 </button>
//               ))}
//             </div>

//             <p className="text-black/40 mb-4">
//               Open Guides <span className="text-black">Y</span> / N
//             </p>

//             <div className="flex justify-end gap-3">
//               <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
//                 🔖
//               </button>
//               <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
//                 🛒
//               </button>
//             </div>
//           </div>
//         </div>

//         <div data-anim className="flex items-center justify-between text-xs md:text-sm text-black/40 pointer-events-auto mt-4">
//           <span>/</span>
//           <div className="flex gap-6">
//             <span>EQUIPMENT</span>
//             <span className="text-black font-semibold">CUSTOMIZE</span>
//             <span>THE FINALS</span>
//             <span>THANK YOU</span>
//           </div>
//           <span>MUTE</span>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"
import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, ContactShadows } from "@react-three/drei"
import gsap from "gsap"
import * as THREE from 'three'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Suit } from "./Models/Suit"
import { onScrollHandoffReady } from '@/Components/scrollBus'


gsap.registerPlugin(ScrollTrigger)

const COLORS = ["#3a3a30", "#c9a227", "#4c6b57", "#8a8060"]
const PATTERNS = ["69", "512", "08", "10", "112", "238"]

// function SuitDirector({
//   modelGroupRef,
//   sectionRef,
//   contentRef,
// }: {
//   modelGroupRef: React.RefObject<THREE.Group | null>
//   sectionRef: React.RefObject<HTMLDivElement | null>
//   contentRef: React.RefObject<HTMLDivElement | null>
// }) {
//   useEffect(() => {
//     if (!modelGroupRef.current || !sectionRef.current || !contentRef.current) return

//     const unsubscribe = onScrollHandoffReady(() => {
//     // move the existing gsap.context(...) pin-creation logic here
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current!,
//           start: "top top",
//           end: "+=60%",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },


//       })

//       // ENTRANCE (0% - 40% of scroll): content and model fade/slide/rotate in
//       tl.from(
//         contentRef.current!.querySelectorAll("[data-anim]"),
//         { opacity: 0, y: 30, stagger: 0.05, duration: 0.4 },
//         0
//       )

//       tl.from(modelGroupRef.current!.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 0.4 }, 0)
//       tl.from(modelGroupRef.current!.rotation, { y: -Math.PI, duration: 0.6 }, 0)
//       tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 0.6, duration: 0.6 }, 0.4)

//       // SETTLE (40% - 70%): hold — user reads/interacts with content

//       // EXIT (70% - 100%): graceful fade out and scale down before unpin
//       tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 1.4, duration: 0.3 }, 0.7)
//       tl.to(modelGroupRef.current!.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.3 }, 0.7)
//       tl.to(contentRef.current!, { opacity: 0, y: -20, duration: 0.3 }, 0.7)
//     })

//     // Refresh after a frame to ensure correct pin spacer height now that DOM is settled
//     requestAnimationFrame(() => ScrollTrigger.refresh())
//     })




//     return () => { unsubscribe(); /* ctx.revert() */ }
//   }, [modelGroupRef, sectionRef, contentRef])



//   return null
// }

function SuitDirector({
  modelGroupRef,
  sectionRef,
  contentRef,
}: {
  modelGroupRef: React.RefObject<THREE.Group | null>
  sectionRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
}) {
  useEffect(() => {
    if (!modelGroupRef.current || !sectionRef.current || !contentRef.current) return

    let ctx: gsap.Context | null = null

    const unsubscribe = onScrollHandoffReady(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: "+=60%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Suit + content are ALREADY fully visible the instant this pin
        // engages — LandModel has just finished fading to black immediately
        // before this, so hiding things here (opacity 0 / scaled down /
        // rotated away) reproduced that same black frame a second time,
        // with nothing to look at until the user scrolled further.
        // Only continuous motion lives in this timeline now, no reveal.

        // SETTLE (0% - 70%): gentle continuous rotation while the user reads
        tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 0.6, duration: 0.7, ease: "none" }, 0)

        // EXIT (70% - 100%): graceful fade out and scale down before unpin
        tl.to(modelGroupRef.current!.rotation, { y: Math.PI * 1.4, duration: 0.3 }, 0.7)
        tl.to(modelGroupRef.current!.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.3 }, 0.7)
        tl.to(contentRef.current!, { opacity: 0, y: -20, duration: 0.3 }, 0.7)
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => {
      unsubscribe()
      ctx?.revert()
    }
  }, [modelGroupRef, sectionRef, contentRef])

  return null
}

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const modelGroupRef = useRef<THREE.Group>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeColor, setActiveColor] = useState(0)
  const [activePattern, setActivePattern] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#e7e5e0] z-10"
      style={{ marginTop: '-100vh' }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, transparent 0, transparent 40px, rgba(0,0,0,0.04) 41px), radial-gradient(circle at 80% 70%, transparent 0, transparent 60px, rgba(0,0,0,0.04) 61px)",
          backgroundSize: "300px 300px",
        }}
      />

      {/* <Canvas className="absolute inset-0" camera={{ position: [0, 0.3, 3.2], fov: 40 }} shadows> */}

      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0.3, 3.2], fov: 40 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <spotLight position={[3, 5, 4]} intensity={1.4} angle={0.4} penumbra={0.6} castShadow />
        <Environment preset="studio" />

        <group ref={modelGroupRef}>
          <Suspense fallback={null}>
            <Suit />
          </Suspense>
        </group>

        <ContactShadows position={[0, -0.6, 0]} opacity={0.4} blur={2.5} far={2} />

        <SuitDirector
          modelGroupRef={modelGroupRef}
          sectionRef={sectionRef}
          contentRef={contentRef}
        />
      </Canvas>

      {/* Overlay UI */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 pointer-events-none"
      >
        <div data-anim className="flex items-center justify-between text-black/80 pointer-events-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold tracking-wide">
              SELVEDGE<sup className="text-xs align-super">®</sup>
            </span>
            <span className="hidden md:inline text-xs text-black/40">Original. Not for retail.</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-60">
            <path d="M12 2L22 20H2L12 2Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="flex items-center gap-4 text-xs">
            <span>Day</span>
            <div className="w-9 h-5 rounded-full bg-black/20 relative">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white" />
            </div>
            <span>Night</span>
            <span className="ml-4 cursor-pointer">Exit</span>
          </div>
        </div>

        <div data-anim className="text-center select-none">
          <p className="text-black/20 text-5xl md:text-7xl font-bold tracking-tight">Chest Rig</p>
          <p className="text-black/30 italic text-sm mt-1">\ Night Vision Device \</p>
          <h2 className="text-black text-4xl md:text-6xl font-bold mt-2">Night Vision</h2>
        </div>

        <div className="flex items-end justify-between pointer-events-auto">
          <div data-anim className="flex flex-col gap-3 text-xs md:text-sm tracking-wide">
            <button className="text-left text-black/40">←</button>
            <span className="text-black/30">NIGHT VISION</span>
            <span className="text-black/50">LENSES</span>
            <span className="text-black font-semibold">| CAMO</span>
            <span className="text-black/50">MOUNTS</span>
            <span className="text-black/50">J-ARM</span>
            <span className="text-black/50">FLIP-UP</span>
            <span className="text-black/50">IR FILTERS</span>
          </div>

          <div data-anim className="text-right text-xs md:text-sm">
            <p className="text-black/40 tracking-wide">NIGHT VISION / CAMO</p>
            <h3 className="text-black text-xl md:text-2xl font-semibold mt-1 mb-4">Customization</h3>

            <p className="text-black/40 mb-2">SELECT COLOR</p>
            <div className="flex gap-2 justify-end mb-4">
              {COLORS.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(i)}
                  className="w-6 h-6 rounded-full border-2 transition-transform"
                  style={{
                    backgroundColor: c,
                    borderColor: activeColor === i ? "#000" : "transparent",
                    transform: activeColor === i ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <p className="text-black/40 mb-2">SELECT PATTERN</p>
            <div className="grid grid-cols-3 gap-2 justify-end mb-4">
              {PATTERNS.map((p, i) => (
                <button
                  key={p}
                  onClick={() => setActivePattern(i)}
                  className={`px-3 py-1 rounded-full border text-xs ${activePattern === i ? "bg-black text-white border-black" : "border-black/20 text-black/60"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <p className="text-black/40 mb-4">
              Open Guides <span className="text-black">Y</span> / N
            </p>

            <div className="flex justify-end gap-3">
              <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
                🔖
              </button>
              <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
                🛒
              </button>
            </div>
          </div>
        </div>

        <div data-anim className="flex items-center justify-between text-xs md:text-sm text-black/40 pointer-events-auto mt-4">
          <span>/</span>
          <div className="flex gap-6">
            <span>EQUIPMENT</span>
            <span className="text-black font-semibold">CUSTOMIZE</span>
            <span>THE FINALS</span>
            <span>THANK YOU</span>
          </div>
          <span>MUTE</span>
        </div>
      </div>
    </section>
  )
}