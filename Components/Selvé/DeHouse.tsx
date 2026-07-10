// "use client"

// import React, { useRef, useEffect, useState, Suspense, useMemo } from "react"
// import { Canvas, useFrame } from "@react-three/fiber"
// import { Environment, ContactShadows, Center, useGLTF } from "@react-three/drei"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import * as THREE from "three"
// import {
//   Play,
//   Menu,
//   Search,
// //   Instagram,
// //   Facebook,
//   Mail,
//   Lock,
//   Headphones,
//   Globe,
//   ChevronDown,
//   ArrowRight,
//   Diamond,
//   Fingerprint,
//   Target,
//   Grid3X3,
//   Loader2,
// } from "lucide-react"

// /* ------------------------------------------------------------------ */
// //  GSAP Setup
// /* ------------------------------------------------------------------ */
// gsap.registerPlugin(ScrollTrigger)

// /* ------------------------------------------------------------------ */
// //  3D Suit Model (extracted from Intro.tsx / Models/Suit.tsx)
// /* ------------------------------------------------------------------ */
// type GLTFResult = {
//   nodes: Record<string, THREE.Mesh>
//   materials: Record<string, THREE.Material>
// }

// function SuitModel() {
//   const { nodes, materials } = useGLTF(
//     "/Models/SelvéModels/modelsuit.glb"
//   ) as unknown as GLTFResult

//   return (
//     <Center>
//       <group dispose={null}>
//         <group scale={0.001}>
//           <group scale={10}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Denim_Raw_FRONT_53505_0.geometry}
//               material={materials.Denim_Raw_FRONT_53505}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Denim_Raw_FRONT_53500_0.geometry}
//               material={materials.Denim_Raw_FRONT_53500}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Cotton_40s_Stretch_Poplin_FRONT_53480_0.geometry}
//               material={materials.Cotton_40s_Stretch_Poplin_FRONT_53480}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Rib_1X1_486gsm_FRONT_53510_0.geometry}
//               material={materials.Rib_1X1_486gsm_FRONT_53510}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Wool_Melton_FRONT_53490_0.geometry}
//               material={materials.Wool_Melton_FRONT_53490}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Denim_Raw_FRONT_53495_0.geometry}
//               material={materials.Denim_Raw_FRONT_53495}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Cloth_Cotton_Sateen_FRONT_53485_0.geometry}
//               material={materials.Cotton_Sateen_FRONT_53485}
//             />
//           </group>
//         </group>
//       </group>
//     </Center>
//   )
// }
// useGLTF.preload("/Models/SelvéModels/modelsuit.glb")

// /* ------------------------------------------------------------------ */
// //  Gentle auto-rotation wrapper for the hero suit
// /* ------------------------------------------------------------------ */
// function RotatingSuit({ speed = 0.15 }) {
//   const groupRef = useRef<THREE.Group>(null)

//   useFrame((_, delta) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += delta * speed
//     }
//   })

//   return (
//     <group ref={groupRef}>
//       <SuitModel />
//     </group>
//   )
// }

// /* ------------------------------------------------------------------ */
// //  Pinterest Icon (Lucide doesn't ship one)
// /* ------------------------------------------------------------------ */
// const PinterestIcon = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
//   </svg>
// )

// /* ------------------------------------------------------------------ */
// //  Main Page Component
// /* ------------------------------------------------------------------ */
// export default function DeHouse() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const navRef = useRef<HTMLElement>(null)
//   const heroRef = useRef<HTMLDivElement>(null)
//   const headlineRef = useRef<HTMLDivElement>(null)
//   const sidebarRef = useRef<HTMLDivElement>(null)
//   const housesRef = useRef<HTMLDivElement>(null)
//   const footerRef = useRef<HTMLElement>(null)
//   const [modelLoaded, setModelLoaded] = useState(false)

//   /* ---------- Entrance & Scroll Animations ---------- */
//   useEffect(() => {
//     const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
//     if (prefersReduced) return

//     const ctx = gsap.context(() => {
//       // Nav reveal
//       gsap.from(navRef.current, {
//         y: -40,
//         opacity: 0,
//         duration: 1.2,
//         ease: "power3.out",
//         delay: 0.1,
//       })

//       // Hero headline staggered rise
//       if (headlineRef.current) {
//         const lines = headlineRef.current.querySelectorAll(".headline-line")
//         gsap.from(lines, {
//           y: 80,
//           opacity: 0,
//           duration: 1.6,
//           stagger: 0.12,
//           ease: "power3.out",
//           delay: 0.4,
//         })
//       }

//       // Subtitle + body fade
//       gsap.from(".hero-sub", {
//         y: 30,
//         opacity: 0,
//         duration: 1.2,
//         ease: "power2.out",
//         delay: 0.9,
//       })

//       // Right sidebar items
//       if (sidebarRef.current) {
//         const items = sidebarRef.current.querySelectorAll(".sidebar-item")
//         gsap.from(items, {
//           x: 50,
//           opacity: 0,
//           duration: 1.2,
//           stagger: 0.15,
//           ease: "power2.out",
//           delay: 1.0,
//         })
//       }

//       // Scroll-triggered house cards
//       if (housesRef.current) {
//         const cards = housesRef.current.querySelectorAll(".house-card")
//         gsap.from(cards, {
//           scrollTrigger: {
//             trigger: housesRef.current,
//             start: "top 85%",
//             toggleActions: "play none none reverse",
//           },
//           y: 100,
//           opacity: 0,
//           duration: 1.2,
//           stagger: 0.12,
//           ease: "power3.out",
//         })
//       }

//       // Footer reveal
//       if (footerRef.current) {
//         gsap.from(footerRef.current.querySelectorAll(".footer-col"), {
//           scrollTrigger: {
//             trigger: footerRef.current,
//             start: "top 90%",
//           },
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: "power2.out",
//         })
//       }
//     }, containerRef)

//     return () => ctx.revert()
//   }, [])

//   /* ---------- Derived Data ---------- */
//   const pillars = useMemo(
//     () => [
//       {
//         num: "01",
//         title: "Craft",
//         desc: "Timeless techniques, masterful execution.",
//         icon: Grid3X3,
//       },
//       {
//         num: "02",
//         title: "Precision",
//         desc: "Every detail considered. Nothing overlooked.",
//         icon: Target,
//       },
//       {
//         num: "03",
//         title: "Identity",
//         desc: "African heritage. Global vision.",
//         icon: Fingerprint,
//       },
//       {
//         num: "04",
//         title: "Luxury",
//         desc: "Quality you can feel. Stories you can wear.",
//         icon: Diamond,
//       },
//     ],
//     []
//   )

//   const houses = useMemo(
//     () => [
//       {
//         name: "Selvé",
//         subtitle: "Denim House",
//         desc: "Cut from the original.",
//         bg: "https://images.unsplash.com/photo-1542272617-08f086302542?w=800&q=80",
//         accent: "border-indigo-500/20",
//         overlay: "from-indigo-950/60",
//       },
//       {
//         name: "Atelion",
//         subtitle: "Fashion House",
//         desc: "Dressed with intention.",
//         bg: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
//         accent: "border-stone-500/20",
//         overlay: "from-stone-900/60",
//       },
//       {
//         name: "Lurè",
//         subtitle: "Beauty House",
//         desc: "Nature. Refined.",
//         bg: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
//         accent: "border-amber-500/20",
//         overlay: "from-amber-950/60",
//       },
//       {
//         name: "Maivon",
//         subtitle: "Home House",
//         desc: "Where craft comes home.",
//         bg: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=800&q=80",
//         accent: "border-orange-500/20",
//         overlay: "from-orange-950/60",
//       },
//     ],
//     []
//   )

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full min-h-screen bg-[#030305] text-[#e8e6e1] overflow-x-hidden selection:bg-[#c9a227] selection:text-[#030305]"
//     >
//       {/* --- Font Injection --- */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
//         .font-elegant { font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-12px); }
//         }
//         .animate-float-slow { animation: float 6s ease-in-out infinite; }
//         .animate-float-medium { animation: float 5s ease-in-out infinite; }
//         .animate-float-fast { animation: float 4s ease-in-out infinite; }
//       `}</style>

//       {/* ===================== NAVIGATION ===================== */}
//       <nav
//         ref={navRef}
//         className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 md:py-8 backdrop-blur-xl bg-[#030305]/70 border-b border-white/[0.04]"
//       >
//         {/* Logo Lockup */}
//         <div className="flex flex-col">
//           <span className="text-[11px] md:text-[13px] tracking-[0.25em] font-light text-[#c9a227] uppercase font-elegant">
//             Atelier Selvedge
//           </span>
//           <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mt-0.5">
//             A Pan-African Luxury House
//           </span>
//         </div>

//         {/* Center Links */}
//         <div className="hidden lg:flex items-center gap-10 text-[11px] tracking-[0.18em] uppercase font-medium">
//           {["The House", "The Four Houses", "Journal", "About", "Contact"].map(
//             (item, idx) => (
//               <a
//                 key={item}
//                 href="#"
//                 className={`relative group transition-colors duration-300 ${
//                   idx === 0 ? "text-white" : "text-white/50 hover:text-white"
//                 }`}
//               >
//                 {item}
//                 <span
//                   className={`absolute -bottom-1 left-0 h-px bg-[#c9a227] transition-all duration-300 ${
//                     idx === 0 ? "w-full" : "w-0 group-hover:w-full"
//                   }`}
//                 />
//               </a>
//             )
//           )}
//         </div>

//         {/* Utilities */}
//         <div className="flex items-center gap-6 md:gap-8">
//           <button className="hidden md:block text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300">
//             Search
//           </button>
//           <button className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300">
//             <span className="hidden md:inline">Menu</span>
//             <Menu className="w-4 h-4" strokeWidth={1.5} />
//           </button>
//         </div>
//       </nav>

//       {/* ===================== HERO SECTION ===================== */}
//       <section
//         ref={heroRef}
//         className="relative w-full min-h-screen flex items-center pt-28 md:pt-32 pb-16 overflow-hidden"
//       >
//         {/* Ambient background glow */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(201,162,39,0.06),transparent_50%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(201,162,39,0.03),transparent_40%)]" />

//         {/* Decorative gold rings (simulating the light rings in the reference) */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-[#c9a227]/[0.07] pointer-events-none" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-[#c9a227]/[0.05] pointer-events-none animate-float-slow" />

//         <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
//           {/* --- Left: Copy --- */}
//           <div className="lg:col-span-5 xl:col-span-4 space-y-8 md:space-y-10">
//             <div className="hero-sub space-y-1">
//               <p className="text-[10px] md:text-[11px] tracking-[0.3em] text-[#c9a227] uppercase font-medium">
//                 It Begins With Intention
//               </p>
//             </div>

//             <div ref={headlineRef} className="space-y-1">
//               <h1 className="font-elegant text-5xl md:text-7xl lg:text-[5.5rem] xl:text-8xl font-light leading-[0.92] tracking-tight">
//                 <span className="headline-line block">Every masterpiece</span>
//                 <span className="headline-line block">begins with</span>
//                 <span className="headline-line block">
//                   a single{" "}
//                   <em className="text-[#c9a227] font-elegant italic">thread.</em>
//                 </span>
//               </h1>
//             </div>

//             <div className="hero-sub w-12 h-px bg-[#c9a227]/40" />

//             <p className="hero-sub text-sm md:text-base text-white/50 leading-[1.7] max-w-md font-light">
//               From heritage to innovation.
//               <br />
//               From Africa to the world.
//               <br />
//               This is the selvedge edge.
//             </p>

//             <button className="hero-sub group flex items-center gap-4 mt-2">
//               <span className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#c9a227] group-hover:bg-[#c9a227]/10 transition-all duration-500">
//                 <Play className="w-3.5 h-3.5 fill-white/80 text-white/80 group-hover:fill-[#c9a227] group-hover:text-[#c9a227] transition-colors duration-500" />
//               </span>
//               <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 group-hover:text-[#c9a227] transition-colors duration-300 font-medium">
//                 Watch The Film
//               </span>
//             </button>
//           </div>

//           {/* --- Center: 3D Suit Canvas --- */}
//           <div className="lg:col-span-5 xl:col-span-6 relative h-[45vh] md:h-[60vh] lg:h-[75vh]">
//             {!modelLoaded && (
//               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 text-white/30">
//                 <Loader2 className="w-6 h-6 animate-spin" />
//                 <span className="text-[10px] tracking-[0.2em] uppercase">Loading Atelier</span>
//               </div>
//             )}

//             <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: modelLoaded ? 1 : 0 }}>
//               <Canvas
//                 className="absolute inset-0"
//                 camera={{ position: [0, 0.2, 3.0], fov: 42, near: 0.1, far: 100 }}
//                 shadows
//                 dpr={[1, 2]} /* high-res retina support */
//                 gl={{ antialias: true, alpha: true }}
//               >
//                 <color attach="background" args={["#030305"]} />
//                 <fog attach="fog" args={["#030305", 4, 10]} />

//                 <ambientLight intensity={0.3} />
//                 <spotLight
//                   position={[4, 6, 4]}
//                   intensity={1.4}
//                   angle={0.35}
//                   penumbra={0.7}
//                   castShadow
//                   color="#fff8ee"
//                   shadow-mapSize-width={2048}
//                   shadow-mapSize-height={2048}
//                 />
//                 <pointLight position={[-3, 2, -3]} intensity={0.6} color="#c9a227" />
//                 <pointLight position={[2, -1, 2]} intensity={0.3} color="#4c6b57" />

//                 <Environment preset="studio" environmentIntensity={0.4} />

//                 <Suspense fallback={null}>
//                   <group
//                     onPointerOver={() => document.body.style.cursor = "grab"}
//                     onPointerOut={() => document.body.style.cursor = "default"}
//                   >
//                     <RotatingSuit speed={0.12} />
//                   </group>
//                   <ContactShadows
//                     position={[0, -0.55, 0]}
//                     opacity={0.25}
//                     blur={2.8}
//                     far={1.5}
//                     color="#c9a227"
//                     width={2}
//                     height={2}
//                   />
//                 </Suspense>

//                 {/* Invisible plane to catch shadows if needed */}
//                 <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.56, 0]} receiveShadow>
//                   <planeGeometry args={[10, 10]} />
//                   <shadowMaterial transparent opacity={0.15} />
//                 </mesh>
//               </Canvas>
//             </div>

//             {/* Floating gold particles */}
//             <div className="absolute inset-0 pointer-events-none">
//               {[...Array(8)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`absolute w-1 h-1 rounded-full bg-[#c9a227]/30 ${
//                     i % 3 === 0 ? "animate-float-fast" : i % 3 === 1 ? "animate-float-medium" : "animate-float-slow"
//                   }`}
//                   style={{
//                     left: `${15 + i * 10}%`,
//                     top: `${20 + (i % 4) * 18}%`,
//                     animationDelay: `${i * 0.7}s`,
//                     width: `${3 + (i % 3)}px`,
//                     height: `${3 + (i % 3)}px`,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* --- Right: Pillars --- */}
//           <div
//             ref={sidebarRef}
//             className="lg:col-span-2 xl:col-span-2 flex lg:flex-col items-start lg:items-end gap-6 lg:gap-10 lg:border-l lg:border-white/[0.06] lg:pl-8 py-2"
//           >
//             {pillars.map((item) => (
//               <div
//                 key={item.num}
//                 className="sidebar-item group flex lg:flex-row-reverse items-start gap-4 lg:text-right cursor-default"
//               >
//                 <div className="hidden lg:flex flex-col items-end gap-2 mt-1">
//                   <span className="text-[10px] text-[#c9a227]/80 tracking-[0.15em] font-medium">
//                     {item.num}
//                   </span>
//                   <span className="w-6 h-px bg-white/10 group-hover:w-10 group-hover:bg-[#c9a227] transition-all duration-500" />
//                 </div>
//                 <div className="space-y-1.5">
//                   <div className="flex items-center lg:justify-end gap-2">
//                     <item.icon
//                       className="w-4 h-4 text-[#c9a227]/60 group-hover:text-[#c9a227] transition-colors duration-300"
//                       strokeWidth={1.5}
//                     />
//                     <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/80 group-hover:text-white font-medium transition-colors duration-300">
//                       {item.title}
//                     </h3>
//                   </div>
//                   <p className="text-[10px] md:text-[11px] text-white/35 leading-relaxed max-w-[170px] group-hover:text-white/50 transition-colors duration-300">
//                     {item.desc}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
//           <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">
//             Scroll to Discover
//           </span>
//           <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
//             <div className="w-1 h-1.5 bg-white/40 rounded-full animate-bounce" />
//           </div>
//         </div>
//       </section>

//       {/* ===================== FOUR HOUSES ===================== */}
//       <section ref={housesRef} className="relative w-full py-6 md:py-8 px-6 md:px-12 lg:px-16 bg-[#030305]">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
//           {/* Philosophy Card */}
//           <div className="house-card group relative aspect-[4/5] md:aspect-auto lg:aspect-[4/5] bg-[#08080c] border border-white/[0.04] p-6 md:p-8 flex flex-col justify-between overflow-hidden hover:border-[#c9a227]/20 transition-colors duration-500">
//             <div className="relative z-10">
//               <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#c9a227]/20 flex items-center justify-center mb-8 group-hover:border-[#c9a227]/40 group-hover:scale-105 transition-all duration-500">
//                 <span className="text-[#c9a227] font-elegant text-lg md:text-xl tracking-widest">
//                   A
//                   <span className="text-[10px] align-top ml-0.5">S</span>
//                 </span>
//               </div>
//               <p className="text-sm md:text-[15px] text-white/60 leading-[1.7] font-light">
//                 Four distinct houses.
//                 <br />
//                 One shared commitment
//                 <br />
//                 to exceptional craft
//                 <br />
//                 and conscious creation.
//               </p>
//             </div>
//             <a
//               href="#"
//               className="relative z-10 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#c9a227] mt-6 group-hover:gap-4 transition-all duration-300 font-medium"
//             >
//               Discover Our Philosophy
//               <ArrowRight className="w-3 h-3" strokeWidth={2} />
//             </a>
//             {/* Hover sheen */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#c9a227]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
//           </div>

//           {/* House Cards */}
//           {houses.map((house) => (
//             <div
//               key={house.name}
//               className={`house-card group relative aspect-[4/5] overflow-hidden border ${house.accent} bg-[#050508] hover:border-white/10 transition-colors duration-500`}
//             >
//               {/* Background Image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
//                 style={{ backgroundImage: `url(${house.bg})` }}
//               />
//               {/* Gradient overlays */}
//               <div className={`absolute inset-0 bg-gradient-to-t ${house.overlay} via-[#030305]/70 to-[#030305]/30`} />
//               <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/40 to-transparent" />

//               {/* Content */}
//               <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
//                 <div className="space-y-1 mb-3">
//                   <h3 className="font-elegant text-2xl md:text-3xl text-white/90 group-hover:text-white transition-colors duration-300">
//                     {house.name}
//                   </h3>
//                   <p className="text-[10px] tracking-[0.2em] uppercase text-[#c9a227]/80 font-medium">
//                     {house.subtitle}
//                   </p>
//                 </div>
//                 <p className="text-xs md:text-sm text-white/40 mb-5 font-light group-hover:text-white/60 transition-colors duration-300">
//                   {house.desc}
//                 </p>
//                 <a
//                   href="#"
//                   className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300 group/link font-medium"
//                 >
//                   Explore {house.name}
//                   <ArrowRight
//                     className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300"
//                     strokeWidth={2}
//                   />
//                 </a>
//               </div>

//               {/* Top accent line */}
//               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===================== FOOTER ===================== */}
//       <footer
//         ref={footerRef}
//         className="relative w-full border-t border-white/[0.04] bg-[#020205] px-6 md:px-12 lg:px-16 py-10 md:py-14"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-10">
//           {/* Copyright */}
//           <div className="footer-col space-y-1.5">
//             <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
//               © 2025 Atelier Selvedge
//             </p>
//             <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
//               All Rights Reserved
//             </p>
//           </div>

//           {/* Shipping */}
//           <div className="footer-col flex items-start gap-3">
//             <Globe className="w-4 h-4 text-[#c9a227]/40 mt-0.5 shrink-0" strokeWidth={1.5} />
//             <div>
//               <h4 className="text-[11px] tracking-[0.15em] uppercase text-white/60 mb-1 font-medium">
//                 Worldwide Shipping
//               </h4>
//               <p className="text-[10px] text-white/25 leading-relaxed">
//                 Complimentary on orders over $500
//               </p>
//             </div>
//           </div>

//           {/* Payments */}
//           <div className="footer-col flex items-start gap-3">
//             <Lock className="w-4 h-4 text-[#c9a227]/40 mt-0.5 shrink-0" strokeWidth={1.5} />
//             <div>
//               <h4 className="text-[11px] tracking-[0.15em] uppercase text-white/60 mb-1 font-medium">
//                 Secure Payments
//               </h4>
//               <p className="text-[10px] text-white/25 leading-relaxed">
//                 Encrypted and protected
//               </p>
//             </div>
//           </div>

//           {/* Service */}
//           <div className="footer-col flex items-start gap-3">
//             <Headphones className="w-4 h-4 text-[#c9a227]/40 mt-0.5 shrink-0" strokeWidth={1.5} />
//             <div>
//               <h4 className="text-[11px] tracking-[0.15em] uppercase text-white/60 mb-1 font-medium">
//                 Exceptional Service
//               </h4>
//               <p className="text-[10px] text-white/25 leading-relaxed">
//                 Here for you, always
//               </p>
//             </div>
//           </div>

//           {/* Social */}
//           {/* <div className="footer-col flex items-start lg:justify-end gap-5">
//             <div className="hidden lg:flex flex-col items-end mr-2">
//               <span className="text-[10px] tracking-[0.15em] text-white/25 uppercase mb-2">
//                 Stay Connected
//               </span>
//             </div>
//             {[Instagram, Facebook, PinterestIcon, Mail].map((Icon, i) => (
//               <a
//                 key={i}
//                 href="#"
//                 className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[#c9a227] hover:border-[#c9a227]/30 hover:bg-[#c9a227]/5 transition-all duration-300"
//                 aria-label="Social link"
//               >
//                 <Icon className="w-3.5 h-3.5" />
//               </a>
//             ))}
//           </div> */}
//         </div>
//       </footer>
//     </div>
//   )
// }

"use client"

/**
 * AtelierSelvedgeHero
 * ------------------------------------------------------------------
 * Single drop-in component: top navigation, 3D cinematic hero,
 * "Four Houses" showcase, and footer for the Atelier Selvedge site.
 *
 * Usage (app/page.tsx):
 *   import AtelierSelvedgeHero from "@/Components/Hero/AtelierSelvedgeHero"
 *   export default function Home() {
 *     return <AtelierSelvedgeHero />
 *   }
 *
 * Notes:
 * - The 3D piece reuses the <Suit /> model from Components/Selvé/Models/Suit.tsx
 *   (same GLTF used in Intro.tsx). Adjust the import path below if you move
 *   this file to a different folder.
 * - Relies on gsap + @gsap/ScrollTrigger (already a project dependency),
 *   @react-three/fiber + @react-three/drei, and next/font/google.
 * - This component renders its own <Suspense> boundary for the model, so it
 *   can be dropped in above or below your existing LenisProvider/ScrollTrigger
 *   setup without conflicts — it calls ScrollTrigger.refresh() once mounted.
 * ------------------------------------------------------------------
 */

import React, { useEffect, useRef, useState, Suspense, useCallback } from "react"
import { Playfair_Display, Inter } from "next/font/google"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, ContactShadows } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

// Reuse the exact model used in Intro.tsx
import { Suit } from "../Selvé/Models/Suit"

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/* Fonts                                                                */
/* ------------------------------------------------------------------ */

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-ui",
})

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const GOLD = "#C9A227"
const GOLD_SOFT = "#E4C567"
const NAVY_DEEP = "#070B14"
const NAVY = "#0A0F1C"
const NAVY_SOFT = "#101627"

/* ------------------------------------------------------------------ */
/* Small inline icon set (stroke-based, minimal, consistent weight)    */
/* ------------------------------------------------------------------ */

const Icon = {
  Play: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
    </svg>
  ),
  Craft: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M3 3h18v18H3V3zm4 0v18M15 3v18M3 9h18M3 15h18"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  ),
  Precision: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </svg>
  ),
  Identity: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 3.5c3.6 0 6.5 2.7 6.5 7 0 5-2.4 8.7-3.6 10M8.4 20.2c1-1.8 2-4.6 2-8.2a1.6 1.6 0 013.2 0c0 1-.06 1.9-.16 2.7M5.9 17.3c.5-1.6.9-3.6.9-5.8a5.2 5.2 0 0110.4 0c0 .8-.03 1.5-.08 2.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  ),
  Luxury: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 9l4.5-5.5h9L21 9l-9 11.5L3 9z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3 9h18M9 3.5L7 9l5 11.5L17 9l-2-5.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  Chevron: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Arrow: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3 12h18M12 3c2.6 2.6 4 5.7 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.7-4-9s1.4-6.4 4-9z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  Lock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  Headset: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.1" />
      <rect x="3" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.1" />
      <rect x="17" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  Instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  ),
  Facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M14 21v-7.5h2.5l.5-3H14V8.3c0-.87.24-1.46 1.5-1.46H17V4.14C16.7 4.1 15.8 4 14.7 4c-2.3 0-3.9 1.4-3.9 4v2.5H8.5v3H10.8V21H14z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Pinterest: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M9.5 18c.6-1.8 1.4-4.8 1.9-6.7M12 12c-.4-1.7.5-3.2 2.2-3.2 1.4 0 2.3 1 2.3 2.5 0 1.9-1.1 3.8-2.7 3.8-.8 0-1.4-.5-1.6-1.1"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.2 6.5L12 12.5l7.8-6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  Menu: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const NAV_LINKS = ["The House", "The Four Houses", "Journal", "About", "Contact"]

const PILLARS = [
  { key: "01", title: "Craft", copy: "Timeless techniques, masterful execution.", Icon: Icon.Craft },
  { key: "02", title: "Precision", copy: "Every detail considered. Nothing overlooked.", Icon: Icon.Precision },
  { key: "03", title: "Identity", copy: "African heritage. Global vision.", Icon: Icon.Identity },
  { key: "04", title: "Luxury", copy: "Quality you can feel. Stories you can wear.", Icon: Icon.Luxury },
]

const HOUSES = [
  {
    name: "SELVÉ",
    tag: "DENIM HOUSE",
    copy: "Cut from the original.",
    bar: "#3E6FB0",
    glow: "rgba(62,111,176,0.28)",
    swatch: "denim",
  },
  {
    name: "ATELION",
    tag: "FASHION HOUSE",
    copy: "Dressed with intention.",
    bar: "#3F8F63",
    glow: "rgba(63,143,99,0.26)",
    swatch: "jacket",
  },
  {
    name: "LURÈ",
    tag: "BEAUTY HOUSE",
    copy: "Nature. Refined.",
    bar: "#B5473C",
    glow: "rgba(181,71,60,0.28)",
    swatch: "bottle",
  },
  {
    name: "MAIVON",
    tag: "HOME HOUSE",
    copy: "Where craft comes home.",
    bar: "#C9A227",
    glow: "rgba(201,162,39,0.28)",
    swatch: "vase",
  },
] as const

const FOOTER_PROMISES = [
  { Icon: Icon.Globe, title: "Worldwide shipping", copy: "Complimentary on orders over $500" },
  { Icon: Icon.Lock, title: "Secure payments", copy: "Encrypted and protected" },
  { Icon: Icon.Headset, title: "Exceptional service", copy: "Here for you, always" },
]

/* ------------------------------------------------------------------ */
/* Decorative swatches used on the Four Houses cards (no external      */
/* product photography required — simple, consistent line-art)         */
/* ------------------------------------------------------------------ */

function HouseSwatch({ kind, color }: { kind: string; color: string }) {
  if (kind === "denim") {
    return (
      <svg viewBox="0 0 160 200" className="h-full w-full">
        <rect x="18" y="14" width="124" height="172" rx="6" fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M42 14v172M118 14v172" stroke={color} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 6" />
        <rect x="66" y="60" width="28" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.2" />
        <circle cx="80" cy="77" r="2.6" fill={color} />
      </svg>
    )
  }
  if (kind === "jacket") {
    return (
      <svg viewBox="0 0 160 200" className="h-full w-full">
        <path
          d="M55 32L80 20l25 12 20 14-10 20-10-6v98H60V72l-10 6-10-20 15-30z"
          fill="none"
          stroke={color}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M80 20v18" stroke={color} strokeWidth="1.1" />
      </svg>
    )
  }
  if (kind === "bottle") {
    return (
      <svg viewBox="0 0 160 200" className="h-full w-full">
        <rect x="66" y="24" width="28" height="16" rx="2" fill="none" stroke={color} strokeWidth="1.2" />
        <path d="M70 40h20l8 14v104a6 6 0 01-6 6H68a6 6 0 01-6-6V54l8-14z" fill="none" stroke={color} strokeWidth="1.3" />
        <line x1="62" y1="90" x2="98" y2="90" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 160 200" className="h-full w-full">
      <path
        d="M64 30c0 12 10 14 10 26v90a10 10 0 0010 10h-8a10 10 0 01-10-10V56c0-12-10-14-10-26a16 16 0 0132 0"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <ellipse cx="118" cy="150" rx="14" ry="18" fill="none" stroke={color} strokeWidth="1.2" />
      <path d="M118 132v-6M112 128l6-6 6 6" stroke={color} strokeWidth="1" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 3D piece — reuses <Suit /> and gently auto-rotates + drifts          */
/* ------------------------------------------------------------------ */

function RotatingSuit({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  const t = useRef(0)
  useFrame((_, delta) => {
    t.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18
      groupRef.current.position.y = Math.sin(t.current * 0.6) * 0.05
    }
  })
  return (
    <group ref={groupRef}>
      <Suit />
    </group>
  )
}

function SceneRig() {
  const { invalidate } = useThree()
  useEffect(() => {
    invalidate()
  }, [invalidate])
  return null
}

function HeroModel({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 0.3, 3.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.65} />
      <spotLight position={[3, 5, 4]} intensity={1.6} angle={0.45} penumbra={0.6} castShadow />
      <spotLight position={[-4, 2, -3]} intensity={0.5} color={GOLD_SOFT} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <RotatingSuit groupRef={groupRef} />
      </Suspense>
      <ContactShadows position={[0, -0.62, 0]} opacity={0.45} blur={2.6} far={2.2} />
      <SceneRig />
    </Canvas>
  )
}

/* ------------------------------------------------------------------ */
/* Gold decorative rings behind the model                              */
/* ------------------------------------------------------------------ */

function GoldRings() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        className="hero-ring absolute h-[420px] w-[420px] rounded-full border md:h-[560px] md:w-[560px]"
        style={{ borderColor: "rgba(201,162,39,0.35)" }}
      />
      <div
        className="hero-ring-reverse absolute h-[330px] w-[330px] rounded-full border-t border-r md:h-[440px] md:w-[440px]"
        style={{ borderColor: "rgba(228,197,103,0.45)" }}
      />
      <div
        className="hero-ring absolute h-[260px] w-[260px] rounded-full border-b border-dashed md:h-[350px] md:w-[350px]"
        style={{ borderColor: "rgba(201,162,39,0.22)", animationDuration: "38s" }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Circular "AS · Four Houses · One Vision" badge (curved text via SVG) */
/* ------------------------------------------------------------------ */

function FourHousesBadge() {
  return (
    <div className="relative h-32 w-32 shrink-0 md:h-36 md:w-36">
      <svg viewBox="0 0 200 200" className="badge-spin absolute inset-0 h-full w-full">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="1 6" />
        <text fill={GOLD} fontSize="11.5" letterSpacing="3.5" fontFamily="var(--font-sans-ui)">
          <textPath href="#badge-circle" startOffset="0%">
            FOUR HOUSES • ONE VISION •
          </textPath>
        </text>
      </svg>
      <div
        className="absolute inset-[18%] flex items-center justify-center rounded-full"
        style={{ border: `1px solid rgba(201,162,39,0.5)` }}
      >
        <span className="font-display text-lg tracking-wide text-[color:var(--gold)] md:text-xl">AS</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

function NavBar({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      data-anim="nav"
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-colors duration-500 md:px-10 ${
        scrolled ? "bg-[color:var(--navy-deep)]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="leading-tight">
        <p className="font-display text-lg tracking-[0.12em] text-[#F3EFE6] md:text-xl">
          ATELIER
          <br />
          SELVEDGE
        </p>
        <p className="mt-1 text-[10px] tracking-[0.28em] text-[color:var(--gold)]">
          A PAN-AFRICAN LUXURY HOUSE
        </p>
      </div>

      <nav className="hidden items-center gap-9 lg:flex">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href="#"
            className={`nav-link relative text-[11px] font-medium tracking-[0.18em] text-white/70 transition-colors hover:text-white ${
              i === 0 ? "text-white" : ""
            }`}
          >
            {link.toUpperCase()}
            {i === 0 && (
              <span className="absolute -bottom-2 left-0 h-px w-full bg-[color:var(--gold)]" />
            )}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6 text-[11px] tracking-[0.18em] text-white/80">
        <button className="hidden items-center gap-2 hover:text-[color:var(--gold)] sm:flex" aria-label="Search">
          <Icon.Search className="h-3.5 w-3.5" />
          SEARCH
        </button>
        <button className="flex items-center gap-2 hover:text-[color:var(--gold)]" aria-label="Menu">
          MENU
          <Icon.Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Hero section                                                        */
/* ------------------------------------------------------------------ */

function Hero() {
  const modelGroupRef = useRef<THREE.Group | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from('[data-anim="nav"]', { y: -24, opacity: 0, duration: 0.7 }, 0.1)
        .from('[data-anim="eyebrow"]', { y: 16, opacity: 0, duration: 0.6 }, 0.35)
        .from(
          '[data-anim="headline-line"]',
          { y: 34, opacity: 0, duration: 0.85, stagger: 0.12 },
          0.45
        )
        .from('[data-anim="body-copy"]', { y: 16, opacity: 0, duration: 0.6 }, 0.9)
        .from('[data-anim="watch-btn"]', { y: 12, opacity: 0, duration: 0.5 }, 1.05)
        .from(
          '[data-anim="pillar"]',
          { x: 24, opacity: 0, duration: 0.55, stagger: 0.12 },
          0.55
        )
        .from('[data-anim="scroll-cue"]', { opacity: 0, duration: 0.6 }, 1.3)

      if (modelGroupRef.current) {
        gsap.from(modelGroupRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1.4, ease: "power3.out", delay: 0.3 })
        gsap.from(modelGroupRef.current.rotation, { y: -Math.PI * 0.7, duration: 1.6, ease: "power3.out", delay: 0.3 })
      }

      ScrollTrigger.refresh()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[color:var(--navy-deep)] pt-28"
    >
      {/* ambient texture */}
      <div className="pointer-events-none absolute inset-0 hero-noise" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.10),transparent_60%)]" />

      <div className="relative mx-auto grid w-full max-w-[1680px] flex-1 grid-cols-1 items-center gap-8 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_auto]">
        {/* Left — copy */}
        <div className="relative z-10 max-w-md pb-16 lg:pb-0">
          <p data-anim="eyebrow" className="mb-5 text-[11px] tracking-[0.32em] text-[color:var(--gold)]">
            IT BEGINS WITH INTENTION
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.08] text-[#F3EFE6] sm:text-[3.1rem] md:text-[3.4rem]">
            <span data-anim="headline-line" className="block">
              Every masterpiece
            </span>
            <span data-anim="headline-line" className="block">
              begins with
            </span>
            <span data-anim="headline-line" className="block">
              a single <em className="text-[color:var(--gold)] not-italic font-display italic">thread.</em>
            </span>
          </h1>

          <div className="my-6 h-px w-14 bg-[color:var(--gold)]/60" />

          <p data-anim="body-copy" className="max-w-sm text-[15px] leading-relaxed text-white/60">
            From heritage to innovation.
            <br />
            From Africa to the world.
            <br />
            This is the selvedge edge.
          </p>

          <button
            data-anim="watch-btn"
            className="group mt-9 flex items-center gap-3 text-[11px] tracking-[0.2em] text-white/80 transition-colors hover:text-[color:var(--gold)]"
          >
            <Icon.Play className="h-9 w-9 shrink-0 text-[color:var(--gold)] transition-transform group-hover:scale-110" />
            WATCH THE FILM
          </button>
        </div>

        {/* Center — 3D model */}
        <div className="relative z-0 order-first h-[420px] w-full sm:h-[520px] lg:order-none lg:h-[640px]">
          <GoldRings />
          <HeroModel groupRef={modelGroupRef} />
        </div>

        {/* Right — pillars */}
        <div className="relative z-10 flex flex-row gap-8 pb-14 lg:flex-col lg:gap-8 lg:pb-0 lg:pl-4">
          {PILLARS.map((p) => (
            <div key={p.key} data-anim="pillar" className="flex items-start gap-3 border-b border-white/5 pb-4 last:border-none lg:w-64">
              <p.Icon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" />
              <div>
                <p className="text-[12.5px] font-semibold tracking-[0.14em] text-white/90">
                  {p.title.toUpperCase()}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-white/45">{p.copy}</p>
              </div>
            </div>
          ))}

          {/* numbered rail */}
          <div className="pointer-events-none absolute -right-4 top-0 hidden h-full flex-col items-center justify-between py-1 text-[10px] tracking-[0.1em] text-white/30 xl:flex">
            {PILLARS.map((p, i) => (
              <span key={p.key} className={i === 0 ? "font-semibold text-[color:var(--gold)]" : ""}>
                {p.key}
              </span>
            ))}
            <span className="h-14 w-px bg-white/15" />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div data-anim="scroll-cue" className="relative z-10 flex flex-col items-center gap-3 pb-8">
        <p className="text-[10px] tracking-[0.3em] text-white/40">SCROLL TO DISCOVER</p>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Four Houses section                                                 */
/* ------------------------------------------------------------------ */

function HouseCard({ house }: { house: (typeof HOUSES)[number] }) {
  return (
    <a
      href="#"
      data-anim="house-card"
      className="house-card group relative flex flex-1 flex-col overflow-hidden bg-[color:var(--navy-soft)] transition-transform duration-500 hover:-translate-y-1.5"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.05)` }}
    >
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: house.bar }} />

      <div className="flex items-start justify-between px-6 pt-6">
        <div>
          <h3 className="font-display text-2xl tracking-wide text-[#F3EFE6]">{house.name}</h3>
          <p className="mt-1 text-[10px] tracking-[0.22em] text-white/40">{house.tag}</p>
        </div>
      </div>

      <div className="relative mt-4 flex h-40 items-center justify-center px-10 opacity-90 transition-transform duration-500 group-hover:scale-105 sm:h-48">
        <div
          className="absolute inset-8 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundColor: house.glow, opacity: 0.5 }}
        />
        <div className="relative h-full w-28">
          <HouseSwatch kind={house.swatch} color={house.bar} />
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between px-6 pb-6">
        <p className="max-w-[10rem] text-[13px] leading-snug text-white/55">{house.copy}</p>
        <span className="flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.14em] text-[color:var(--gold)]">
          EXPLORE {house.name}
          <Icon.Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  )
}

function FourHouses() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="houses-intro"]', {
        opacity: 0,
        x: -20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      })
      gsap.from('[data-anim="house-card"]', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[color:var(--navy)] px-6 py-10 md:px-10"
    >
      <div className="mx-auto flex max-w-[1680px] flex-col gap-8 lg:flex-row lg:items-stretch">
        <div data-anim="houses-intro" className="flex shrink-0 items-center gap-5 lg:w-72">
          <FourHousesBadge />
          <div>
            <p className="text-[13px] leading-relaxed text-white/55">
              Four distinct houses.
              <br />
              One shared commitment
              <br />
              to exceptional craft
              <br />
              and conscious creation.
            </p>
            <a
              href="#"
              className="mt-3 inline-flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.16em] text-[color:var(--gold)] hover:opacity-80"
            >
              DISCOVER OUR PHILOSOPHY
              <Icon.Arrow className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {HOUSES.map((house) => (
            <HouseCard key={house.name} house={house} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[color:var(--navy-deep)] px-6 py-6 md:px-10">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-[11px] leading-relaxed tracking-[0.06em] text-white/45">
          © 2025 ATELIER SELVEDGE
          <br className="lg:hidden" /> ALL RIGHTS RESERVED
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-10">
          {FOOTER_PROMISES.map(({ Icon: PIcon, title, copy }) => (
            <div key={title} className="flex items-center gap-3">
              <PIcon className="h-5 w-5 shrink-0 text-white/50" />
              <div>
                <p className="text-[12px] font-medium tracking-[0.04em] text-white/80">{title}</p>
                <p className="text-[11px] text-white/40">{copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[10px] tracking-[0.22em] text-white/40">STAY CONNECTED</p>
          <div className="flex items-center gap-3">
            {[Icon.Instagram, Icon.Facebook, Icon.Pinterest, Icon.Mail].map((SocialIcon, i) => (
              <a
                key={i}
                href="#"
                className="footer-social flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <SocialIcon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Root component                                                       */
/* ------------------------------------------------------------------ */

export default function AtelierSelvedgeHero() {
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 24)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  return (
    <div
      className={`${display.variable} ${sans.variable} relative w-full bg-[color:var(--navy-deep)]`}
      style={
        {
          "--gold": GOLD,
          "--gold-soft": GOLD_SOFT,
          "--navy-deep": NAVY_DEEP,
          "--navy": NAVY,
          "--navy-soft": NAVY_SOFT,
          fontFamily: "var(--font-sans-ui)",
        } as React.CSSProperties
      }
    >
      <NavBar scrolled={scrolled} />
      <Hero />
      <FourHouses />
      <Footer />

      <style jsx global>{`
        .font-display {
          font-family: var(--font-display);
        }
        .hero-noise {
          background-image: radial-gradient(circle at 18% 28%, rgba(201, 162, 39, 0.07) 0, transparent 42px),
            radial-gradient(circle at 82% 68%, rgba(201, 162, 39, 0.06) 0, transparent 60px),
            radial-gradient(circle at 60% 15%, rgba(255, 255, 255, 0.04) 0, transparent 30px);
          background-size: 340px 340px, 460px 460px, 260px 260px;
        }
        .hero-ring {
          animation: spin-slow 26s linear infinite;
        }
        .hero-ring-reverse {
          animation: spin-slow-reverse 20s linear infinite;
        }
        .badge-spin {
          animation: spin-slow 34s linear infinite;
        }
        .scroll-dot {
          animation: bounce-chevron 1.6s ease-in-out infinite;
        }
        .nav-link {
          padding-bottom: 2px;
        }
        .house-card {
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .house-card:hover {
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 20px 40px -20px rgba(0, 0, 0, 0.6);
        }
        .footer-social:hover {
          transform: translateY(-2px);
        }

        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes bounce-chevron {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(6px);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ring,
          .hero-ring-reverse,
          .badge-spin,
          .scroll-dot {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}