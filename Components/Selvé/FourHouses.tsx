// // "use client"

// // /**
// //  * FourHouses — Atelier Selvedge
// //  * ------------------------------------------------------------------
// //  * Self-contained section: floating pill navbar + "Four Houses" intro
// //  * copy + four house cards + a feature strip + a stitched quote bar.
// //  *
// //  * Usage:
// //  *   import FourHouses from "@/Components/Selvé/FourHouses"
// //  *   <FourHouses />
// //  *
// //  * Drop straight into a Next.js (app router) + Tailwind project. Uses
// //  * next/font/google for Playfair Display (serif/display) + Inter (ui).
// //  * ------------------------------------------------------------------
// //  */

// // import React, { Suspense } from "react"
// // import { Playfair_Display, Inter } from "next/font/google"
// // import Image from "next/image"
// // import { Canvas } from "@react-three/fiber"
// // import { Environment, Bounds, Center, OrbitControls } from "@react-three/drei"

// // // Import the specific 3D models
// // import { G_cloth, Perfumee } from "@/Components/Hero/SmallerModels"

// // const display = Playfair_Display({
// //   subsets: ["latin"],
// //   weight: ["400", "500", "600", "700"],
// //   style: ["normal", "italic"],
// //   variable: "--font-display",
// // })

// // const sans = Inter({
// //   subsets: ["latin"],
// //   weight: ["400", "500", "600"],
// //   variable: "--font-sans-ui",
// // })

// // /* ------------------------------------------------------------------ */
// // /* Tokens — exact palette                                             */
// // /* ------------------------------------------------------------------ */
// // const BG = "#08080B"
// // const BG_DEEP = "#111113"
// // const CARD = "#171717"
// // const ELEVATED = "#1F1F1F"
// // const BRONZE = "#2A221B"
// // const SHADOW = "#34281F"
// // const GOLD = "#D9B67A"
// // const GOLD_BRIGHT = "#E7C58A"
// // const GOLD_ANTIQUE = "#C89A55"
// // const GOLD_DARK = "#A97A42"
// // const GOLD_BORDER = "#B98A4E"
// // const WHITE = "#F5F3EE"
// // const SECONDARY = "#D7D2CA"
// // const MUTED = "#A29D95"
// // const DIVIDER = "#323232"
// // const GLASS = "rgba(8,8,11,0.55)"
// // const CARD_GLASS = "rgba(17,17,19,0.72)"

// // /* ------------------------------------------------------------------ */
// // /* Icons — inline, stroke-based, consistent weight (no icon deps)     */
// // /* ------------------------------------------------------------------ */
// // type IconProps = React.SVGProps<SVGSVGElement>

// // const IconSearch = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.3" />
// //     <path d="M15.3 15.3L21 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
// //   </svg>
// // )

// // const IconCoatButton = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
// //     <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
// //     <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
// //     <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
// //     <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
// //   </svg>
// // )

// // const IconPlay = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path d="M9 7.2v9.6l8-4.8-8-4.8z" fill="currentColor" />
// //   </svg>
// // )

// // /* House card feature icons */
// // const IconFabric = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 4 0M4 14c2-2 4-2 6 0s4 2 6 0 4-2 4 0"
// //       stroke="currentColor"
// //       strokeWidth="1.2"
// //       strokeLinecap="round"
// //     />
// //   </svg>
// // )
// // const IconTag = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M11 4.5H6.5A2 2 0 004.5 6.5V11a2 2 0 00.6 1.4l7 7a2 2 0 002.8 0l4.6-4.6a2 2 0 000-2.8l-7-7A2 2 0 0011 4.5z"
// //       stroke="currentColor"
// //       strokeWidth="1.15"
// //       strokeLinejoin="round"
// //     />
// //     <circle cx="8.75" cy="8.75" r="1.1" fill="currentColor" />
// //   </svg>
// // )
// // const IconTarget = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.1" />
// //     <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.1" />
// //     <circle cx="12" cy="12" r="0.9" fill="currentColor" />
// //   </svg>
// // )
// // const IconRuler = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M3.5 16.5l4-4M16.5 3.5l4 4L7 21l-4-4L16.5 3.5z"
// //       stroke="currentColor"
// //       strokeWidth="1.1"
// //       strokeLinejoin="round"
// //     />
// //     <path d="M14 6l2 2M11 9l2 2M8 12l2 2" stroke="currentColor" strokeWidth="1" />
// //   </svg>
// // )
// // const IconMaterial = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.1" />
// //     <path d="M4 14l4.5-4.5L12 13l3-3 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
// //   </svg>
// // )
// // const IconStatement = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path d="M12 2.5l2.4 6.8 7.1.2-5.7 4.3 2.1 6.9L12 16.6l-6 4.1 2.1-6.9-5.7-4.3 7.1-.2L12 2.5z" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" />
// //   </svg>
// // )
// // const IconBottle = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <rect x="9.5" y="3.5" width="5" height="3.2" rx="0.7" stroke="currentColor" strokeWidth="1.05" />
// //     <path d="M9.8 6.7h4.4l1.4 2.6v11a1.3 1.3 0 01-1.3 1.3H9.7a1.3 1.3 0 01-1.3-1.3v-11l1.4-2.6z" stroke="currentColor" strokeWidth="1.1" />
// //   </svg>
// // )
// // const IconDrop = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M12 3.5c2.4 3.2 6 7.6 6 11.3a6 6 0 11-12 0c0-3.7 3.6-8.1 6-11.3z"
// //       stroke="currentColor"
// //       strokeWidth="1.1"
// //     />
// //   </svg>
// // )
// // const IconSparkle = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"
// //       stroke="currentColor"
// //       strokeWidth="1.05"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // )
// // const IconDiamond = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path d="M3 9l4.5-5.5h9L21 9l-9 11.5L3 9z" stroke="currentColor" strokeWidth="1.05" />
// //     <path d="M3 9h18M9 3.5L7 9l5 11.5L17 9l-2-5.5" stroke="currentColor" strokeWidth="1.05" />
// //   </svg>
// // )
// // const IconHand = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M7.5 11V6a1.5 1.5 0 013 0v4M10.5 10V4.5a1.5 1.5 0 013 0V10M13.5 10.3V6a1.5 1.5 0 013 0v6.5M16.5 11.5V9a1.5 1.5 0 013 0v6c0 3.6-2.4 6-6 6h-2c-2.2 0-3.4-.7-4.6-2.2L4 14.8c-.6-.8-.4-1.8.4-2.3.7-.4 1.6-.2 2.1.4L7.5 14"
// //       stroke="currentColor"
// //       strokeWidth="1.05"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // )
// // const IconCup = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path d="M7 4h10v6a5 5 0 01-10 0V4z" stroke="currentColor" strokeWidth="1.1" />
// //     <path d="M7 5.5H4a1 1 0 00-1 1V8a3 3 0 003 3M17 5.5h3a1 1 0 011 1V8a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.05" />
// //     <path d="M12 15v3.5M9 20.5h6" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" />
// //   </svg>
// // )

// // /* Feature-strip icons */
// // const IconAfrica = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path
// //       d="M11.2 3.2c1 .3 1.6 1.1 2.4 1.1.9 0 1.3-.7 2.1-.5.9.2 1 1.3.6 2-.5.8-1.5 1-1.5 2 0 .9 1.1 1.1 1.5 2 .6 1.3-.2 2.4-.9 3.4-.6.9-.4 1.9-1 2.8-.5.8-1.5.9-1.9 1.8-.3.7.1 1.6-.5 2.1-.6.5-1.4.1-2-.2-.7-.4-1-1.3-1.8-1.5-.9-.2-1.6.5-2.5.4-1-.1-1.4-1.1-1.3-2 .1-.8.9-1.2.9-2 0-.9-1-1.1-1.2-2-.2-.9.5-1.6.5-2.5 0-1-1-1.4-1-2.4 0-1.1 1.1-2 2.2-2.5z"
// //       stroke="currentColor"
// //       strokeWidth="1"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // )
// // const IconShield = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <path d="M12 3.2l7 2.6v5.6c0 4.6-3 8-7 9.4-4-1.4-7-4.8-7-9.4V5.8l7-2.6z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
// //     <path d="M9 12l2.2 2.2L15.5 9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // )
// // const IconCompassTool = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <circle cx="7" cy="18" r="1.4" stroke="currentColor" strokeWidth="1.05" />
// //     <path d="M12 4l7 15h-4L12 9.5 9 15.5" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" />
// //     <path d="M12 4v3" stroke="currentColor" strokeWidth="1.05" />
// //   </svg>
// // )
// // const IconFlower = (p: IconProps) => (
// //   <svg viewBox="0 0 24 24" fill="none" {...p}>
// //     <circle cx="12" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
// //     <circle cx="12" cy="6.3" r="2.1" stroke="currentColor" strokeWidth="1" />
// //     <circle cx="12" cy="17.7" r="2.1" stroke="currentColor" strokeWidth="1" />
// //     <circle cx="6.3" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
// //     <circle cx="17.7" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
// //   </svg>
// // )

// // /* Bottom bar decorative icons */
// // const IconNeedle = (p: IconProps) => (
// //   <svg viewBox="0 0 240 40" fill="none" {...p}>
// //     <ellipse cx="16" cy="20" rx="7" ry="5.5" stroke="currentColor" strokeWidth="1.3" />
// //     <ellipse cx="16" cy="20" rx="2.6" ry="2" stroke="currentColor" strokeWidth="1" />
// //     <path d="M23 20h205" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
// //     <path d="M215 14l13 6-13 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // )

// // /* ------------------------------------------------------------------ */
// // /* Feature-strip data                                                 */
// // /* ------------------------------------------------------------------ */
// // const STRIP_ITEMS = [
// //   { Icon: IconAfrica, title: "PAN-AFRICAN ROOTS", copy: ["Inspired by heritage.", "Created for the world."] },
// //   { Icon: IconShield, title: "UNCOMPROMISING QUALITY", copy: ["The finest materials.", "The highest standards."] },
// //   { Icon: IconCompassTool, title: "INTENTIONAL DESIGN", copy: ["Every detail matters.", "Beauty with purpose."] },
// //   { Icon: IconFlower, title: "CULTURE INNOVATION", copy: ["Honoring tradition.", "Shaping the future."] },
// // ]

// // /* ------------------------------------------------------------------ */
// // /* House card data                                                    */
// // /* ------------------------------------------------------------------ */
// // type Feature = { Icon: React.ComponentType<IconProps>; title: string; desc: string }
// // type House = {
// //   num: string
// //   name: string
// //   category: string
// //   tagline: string[]
// //   swatch: "denim" | "jacket" | "bottle" | "vase"
// //   bar: string
// //   features: Feature[]
// //   imageSrc?: string // Optional, only for image-based houses
// // }

// // const HOUSES: House[] = [
// //   {
// //     num: "01",
// //     name: "SELVÉ",
// //     category: "DENIM HOUSE",
// //     tagline: ["The art of denim.", "Reimagined through", "heritage and innovation."],
// //     swatch: "denim",
// //     bar: GOLD,
// //     imageSrc: "/imgs/mat.png", // Uses Image fallback
// //     features: [
// //       { Icon: IconFabric, title: "PREMIUM FABRICS", desc: "Sourced globally. Woven to last." },
// //       { Icon: IconTag, title: "TIMELESS DESIGN", desc: "Classic silhouettes. Modern edge." },
// //       { Icon: IconTarget, title: "CRAFTED TO ENDURE", desc: "Built with intention. Made for generations." },
// //     ],
// //   },
// //   {
// //     num: "02",
// //     name: "ATELION",
// //     category: "FASHION HOUSE",
// //     tagline: ["Contemporary fashion.", "Tailored with precision.", "Defined by elegance."],
// //     swatch: "jacket", // Will trigger the G_cloth 3D model
// //     bar: GOLD_ANTIQUE,
// //     // Note: No imageSrc defined, it will use the 3D model
// //     features: [
// //       { Icon: IconRuler, title: "MODERN TAILORING", desc: "Precision cuts. Flawless fit." },
// //       { Icon: IconMaterial, title: "LUXURY MATERIALS", desc: "The finest fibers. Impeccable feel." },
// //       { Icon: IconStatement, title: "STATEMENT PIECES", desc: "Designed to be seen. Made to be remembered." },
// //     ],
// //   },
// //   {
// //     num: "03",
// //     name: "LURÈ",
// //     category: "BEAUTY HOUSE",
// //     tagline: ["Scents that evoke.", "Skincare that nurtures.", "Beauty that empowers."],
// //     swatch: "bottle", // Will trigger the Perfumee 3D model
// //     bar: GOLD_DARK,
// //     // Note: No imageSrc defined, it will use the 3D model
// //     features: [
// //       { Icon: IconBottle, title: "FINE FRAGRANCES", desc: "Curated with rare and refined notes." },
// //       { Icon: IconDrop, title: "SKINCARE RITUALS", desc: "Nourishing formulas. Rooted in nature." },
// //       { Icon: IconSparkle, title: "SENSORIAL EXPERIENCES", desc: "Luxury for the senses. Beyond the surface." },
// //     ],
// //   },
// //   {
// //     num: "04",
// //     name: "MAIVON",
// //     category: "HOME HOUSE",
// //     tagline: ["Spaces that inspire.", "Objects that last.", "Living with meaning."],
// //     swatch: "vase",
// //     bar: GOLD_BORDER,
// //     imageSrc: "/imgs/house.png", // Uses Image fallback
// //     features: [
// //       { Icon: IconDiamond, title: "CURATED OBJECTS", desc: "Handpicked. Timeless. Made with soul." },
// //       { Icon: IconHand, title: "ARTISAN CRAFT", desc: "Skilled hands. Honest materials." },
// //       { Icon: IconCup, title: "ELEVATED LIVING", desc: "Designed to transform everyday life." },
// //     ],
// //   },
// // ]

// // /* ------------------------------------------------------------------ */
// // /* House-card imagery — using 3D models for ATELION & LURÈ           */
// // /* ------------------------------------------------------------------ */

// // function ModelVisual({ kind, bar }: { kind: House["swatch"]; bar: string }) {
// //   // Determine which model to render based on the house
// //   let ModelComponent = null
// //   if (kind === "jacket") ModelComponent = G_cloth // ATELION
// //   else if (kind === "bottle") ModelComponent = Perfumee // LURÈ

// //   // If it's not ATELION or LURÈ, render the image fallback (for SELVÉ and MAIVON)
// //   if (!ModelComponent) {
// //     const houseData = HOUSES.find(h => h.swatch === kind)
// //     const imageSrc = houseData?.imageSrc || ""
    
// //     return (
// //       <div
// //         className="relative h-full w-full overflow-hidden"
// //         style={{
// //           background: `radial-gradient(120% 100% at 30% 0%, ${BRONZE} 0%, ${BG_DEEP} 55%, ${CARD} 100%)`,
// //         }}
// //       >
// //         <div className="absolute inset-0" style={{ background: `radial-gradient(60% 55% at 50% 40%, ${bar}22, transparent 70%)` }} />
// //         <div className="absolute inset-0 flex items-center justify-center">
// //           <Image src={imageSrc} alt={`${kind} product image`} fill className="object-contain p-4 drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]" priority />
// //         </div>
// //       </div>
// //     )
// //   }

// //   // Render the 3D Model for ATELION and LURÈ
// //   return (
// //     <div
// //       className="relative h-full w-full overflow-hidden"
// //       style={{
// //         background: `radial-gradient(120% 100% at 30% 0%, ${BRONZE} 0%, ${BG_DEEP} 55%, ${CARD} 100%)`,
// //       }}
// //     >
// //       <div className="absolute inset-0" style={{ background: `radial-gradient(60% 55% at 50% 40%, ${bar}22, transparent 70%)` }} />
      
// //       <div className="absolute inset-0 z-10 pointer-events-none">
// //         <Canvas
// //           camera={{ position: [0, 0, 2.5], fov: 45 }}
// //           gl={{ antialias: true, alpha: true }}
// //           className="w-full h-full"
// //         >
// //           <Suspense fallback={null}>
// //             <ambientLight intensity={0.8} />
// //             <spotLight position={[3, 5, 3]} intensity={1.1} angle={0.5} penumbra={0.6} />
// //             <Environment preset="city" />
            
// //             <Bounds fit clip observe margin={1.3}>
// //               <Center>
// //                 <ModelComponent />
// //               </Center>
// //             </Bounds>
            
// //             <OrbitControls
// //               enableZoom={false}
// //               enablePan={false}
// //               autoRotate
// //               autoRotateSpeed={7.5}
// //               minPolarAngle={Math.PI / 2.5}
// //               maxPolarAngle={Math.PI / 1.5}
// //             />
// //           </Suspense>
// //         </Canvas>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ------------------------------------------------------------------ */
// // /* Navbar                                                              */
// // /* ------------------------------------------------------------------ */
// // // function TopNav() {
// // //   const links = ["THE HOUSE", "FOUR HOUSES", "JOURNAL", "ABOUT", "CONTACT"]
// // //   return (
// // //     <nav className="relative mx-auto hidden w-full max-w-[1500px] items-center justify-between rounded-full border px-7 py-3.5 backdrop-blur-xl lg:flex"
// // //       style={{
// // //         background: `linear-gradient(180deg, rgba(23,23,23,0.9), rgba(8,8,11,0.96))`,
// // //         borderColor: `${GOLD}29`,
// // //         boxShadow: "0 16px 44px -20px rgba(0,0,0,0.7)",
// // //       }}
// // //     >
// // //       <div className="flex shrink-0 items-center gap-3">
// // //         <div className="flex h-11 w-11 items-center justify-center rounded-full border" style={{ borderColor: `${GOLD}66` }}>
// // //           <span className="text-[15px] tracking-[0.06em]" style={{ fontFamily: "var(--font-display)" }}>
// // //             <span style={{ color: WHITE }}>A</span>
// // //             <span style={{ color: GOLD }}>S</span>
// // //           </span>
// // //         </div>
// // //         <div className="leading-tight">
// // //           <p className="text-[13px] tracking-[0.16em]" style={{ fontFamily: "var(--font-display)", color: WHITE }}>
// // //             ATELIER SELVEDGE
// // //           </p>
// // //           <p className="mt-0.5 text-[9px] tracking-[0.28em]" style={{ color: GOLD }}>
// // //             A PAN-AFRICAN LUXURY HOUSE
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="flex items-center gap-9">
// // //         {links.map((label, i) => (
// // //           <button
// // //             key={label}
// // //             className="relative py-1 text-[11px] font-medium tracking-[0.18em] transition-colors duration-200"
// // //             style={{ color: i === 0 ? WHITE : "rgba(255,255,255,0.55)" }}
// // //           >
// // //             {label}
// // //             {i === 0 && (
// // //               <span className="absolute -bottom-1.5 left-1/2 h-px w-full -translate-x-1/2" style={{ background: `${GOLD}99` }}>
// // //                 <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: GOLD }} />
// // //               </span>
// // //             )}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       <div className="flex shrink-0 items-center gap-5">
// // //         <button className="flex items-center gap-2 text-[11px] tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.7)" }}>
// // //           SEARCH
// // //           <IconSearch className="h-3.5 w-3.5" />
// // //         </button>
// // //         <span className="h-4 w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
// // //         <button className="text-[11px] tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.7)" }}>
// // //           MENU
// // //         </button>
// // //         <button
// // //           className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
// // //           style={{ background: `radial-gradient(circle at 35% 30%, ${GOLD}, ${GOLD_DARK})`, color: BG }}
// // //         >
// // //           <IconCoatButton className="h-4.5 w-4.5" />
// // //         </button>
// // //       </div>
// // //     </nav>
// // //   )
// // // }

// // /* ------------------------------------------------------------------ */
// // /* Hero copy (left column)                                            */
// // /* ------------------------------------------------------------------ */
// // function HeroCopy() {
// //   return (
// //     <div className="relative flex max-w-[280px] shrink-0 flex-col pt-2 xl:max-w-[300px]">
// //       {/* decorative vertical stitch rail */}
// //       <div className="pointer-events-none absolute -left-8 top-16 hidden h-[210px] w-px flex-col items-center xl:flex">
// //         <span className="h-full w-px" style={{ background: `linear-gradient(180deg, ${GOLD}80, transparent)` }} />
// //       </div>
// //       <span className="pointer-events-none absolute -left-[35px] top-16 hidden h-1.5 w-1.5 rounded-full xl:block" style={{ background: GOLD }} />
// //       <span className="pointer-events-none absolute -left-[35px] top-[130px] hidden h-1 w-1 rounded-full xl:block" style={{ background: `${GOLD}80` }} />
// //       <span className="pointer-events-none absolute -left-[35px] top-[172px] hidden h-1 w-1 rounded-full xl:block" style={{ background: `${GOLD}50` }} />

// //       <p className="mb-4 text-[10.5px] tracking-[0.3em]" style={{ color: GOLD }}>
// //         FOUR DISTINCT EXPRESSIONS
// //       </p>

// //       <h2 className="font-display text-[2.5rem] leading-[1.1]" style={{ color: WHITE }}>
// //         <span className="block">One house.</span>
// //         <span className="block">Four worlds.</span>
// //         <span className="block italic" style={{ color: GOLD }}>
// //           Infinite
// //         </span>
// //         <span className="block">possibilities.</span>
// //       </h2>

// //       <div className="my-5 h-px w-10" style={{ background: `${GOLD}60` }} />

// //       <p className="max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
// //         Atelier Selvedge is expressed through four distinct houses — each with its own craft, purpose, and perspective on luxury.
// //       </p>
// //       <p className="mt-4 max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
// //         Different expressions. One standard of excellence.
// //       </p>

// //       <button className="group mt-8 flex items-center gap-3 text-left">
// //         <span
// //           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
// //           style={{ borderColor: `${GOLD}80`, color: GOLD }}
// //         >
// //           <IconPlay className="h-3 w-3" />
// //         </span>
// //         <span className="text-[11px] font-medium tracking-[0.2em]" style={{ color: GOLD }}>
// //           EXPLORE OUR FOUR HOUSES
// //         </span>
// //       </button>
// //     </div>
// //   )
// // }

// // /* ------------------------------------------------------------------ */
// // /* House card                                                          */
// // /* ------------------------------------------------------------------ */
// // function HouseCard({ house }: { house: House }) {
// //   return (
// //     <div
// //       className="flex flex-1 flex-col overflow-hidden rounded-[22px] border transition-transform duration-500 hover:-translate-y-1"
// //       style={{
// //         background: `linear-gradient(180deg, ${CARD_GLASS}, ${GLASS})`,
// //         borderColor: `${GOLD}22`,
// //         boxShadow: "0 24px 50px -28px rgba(0,0,0,0.7)",
// //       }}
// //     >
// //       {/* image / product photography / 3D model area */}
// //       <div className="relative h-[210px] shrink-0 xl:h-[230px]">
// //         <ModelVisual kind={house.swatch} bar={house.bar} />
// //         <div
// //           className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
// //           style={{ background: `linear-gradient(180deg, transparent, ${CARD})` }}
// //         />
// //       </div>

// //       {/* body */}
// //       <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
// //         <span className="font-display italic text-[19px] leading-none" style={{ color: GOLD }}>
// //           {house.num}
// //         </span>

// //         <h3 className="font-display mt-1 text-[27px] leading-none tracking-tight" style={{ color: WHITE }}>
// //           {house.name}
// //         </h3>
// //         <p className="mt-1.5 text-[10px] font-medium tracking-[0.22em]" style={{ color: GOLD }}>
// //           {house.category}
// //         </p>

// //         <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: SECONDARY }}>
// //           {house.tagline.map((line, i) => (
// //             <React.Fragment key={i}>
// //               {line}
// //               {i < house.tagline.length - 1 && <br />}
// //             </React.Fragment>
// //           ))}
// //         </p>

// //         <div className="my-4 h-px w-full" style={{ background: DIVIDER }} />

// //         <div className="flex flex-col gap-3.5">
// //           {house.features.map((f) => (
// //             <div key={f.title} className="flex items-start gap-3">
// //               <span
// //                 className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
// //                 style={{ borderColor: `${GOLD}45`, color: GOLD }}
// //               >
// //                 <f.Icon className="h-3.5 w-3.5" />
// //               </span>
// //               <div className="pt-0.5">
// //                 <p className="text-[10.5px] font-semibold tracking-[0.12em]" style={{ color: GOLD_BRIGHT }}>
// //                   {f.title}
// //                 </p>
// //                 <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: MUTED }}>
// //                   {f.desc}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ------------------------------------------------------------------ */
// // /* Feature strip                                                       */
// // /* ------------------------------------------------------------------ */
// // function FeatureStrip() {
// //   return (
// //     <div
// //       className="flex flex-col gap-6 rounded-[22px] border px-6 py-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8"
// //       style={{ background: `linear-gradient(180deg, ${CARD_GLASS}, ${GLASS})`, borderColor: `${GOLD}18` }}
// //     >
// //       {STRIP_ITEMS.map((item, i) => (
// //         <div key={item.title} className="flex items-center gap-4">
// //           <span
// //             className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
// //             style={{ borderColor: `${GOLD}55`, color: GOLD }}
// //           >
// //             <item.Icon className="h-5 w-5" />
// //           </span>
// //           <div>
// //             <p className="text-[11px] font-semibold tracking-[0.16em]" style={{ color: WHITE }}>
// //               {item.title}
// //             </p>
// //             <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: MUTED }}>
// //               {item.copy[0]}
// //               <br />
// //               {item.copy[1]}
// //             </p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }

// // /* ------------------------------------------------------------------ */
// // /* Stitched quote bar                                                 */
// // /* ------------------------------------------------------------------ */
// // function StitchBar() {
// //   return (
// //     <div className="relative flex items-center gap-6 px-2 py-4">
// //       <IconNeedle className="hidden h-6 w-[200px] shrink-0 md:block" style={{ color: `${GOLD}70` }} />

// //       <p className="font-display flex-1 text-center text-[15px] italic leading-relaxed" style={{ color: SECONDARY }}>
// //         <span style={{ color: GOLD }}>&ldquo;</span>Four expressions. One house.
// //         <br className="hidden sm:block" /> Different paths. Same pursuit of excellence.
// //         <span style={{ color: GOLD }}>&rdquo;</span>
// //       </p>

// //       {/* thread spool */}
// //       <div className="relative hidden h-14 w-14 shrink-0 items-center justify-center md:flex">
// //         <svg viewBox="0 0 100 100" className="h-full w-full">
// //           <rect x="10" y="18" width="80" height="64" rx="6" fill={SHADOW} stroke={GOLD_DARK} strokeWidth="1.5" />
// //           <ellipse cx="50" cy="50" rx="40" ry="30" fill={BRONZE} stroke={GOLD} strokeWidth="1.4" />
// //           {Array.from({ length: 8 }).map((_, i) => (
// //             <path
// //               key={i}
// //               d={`M${14 + i * 9} 22 Q50 ${18 + (i % 2) * 6} ${86 - i * 9} 78`}
// //               stroke={GOLD}
// //               strokeOpacity={0.55}
// //               strokeWidth="1"
// //               fill="none"
// //             />
// //           ))}
// //         </svg>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ------------------------------------------------------------------ */
// // /* Root component                                                      */
// // /* ------------------------------------------------------------------ */
// // export default function FourHouses() {
// //   return (
// //     <section
// //       className={`${display.variable} ${sans.variable} relative w-full px-5 py-8 md:px-8 lg:px-10`}
// //       style={
// //         {
// //           background: BG,
// //           fontFamily: "var(--font-sans-ui)",
// //         } as React.CSSProperties
// //       }
// //     >
// //       <div className="mx-auto flex max-w-[1500px] flex-col gap-8">
// //         {/* <TopNav /> */}

// //         <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-8">
// //           <div className="xl:pl-6">
// //             <HeroCopy />
// //           </div>

// //           <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// //             {HOUSES.map((house) => (
// //               <HouseCard key={house.num} house={house} />
// //             ))}
// //           </div>
// //         </div>

// //         <FeatureStrip />
// //         <StitchBar />
// //       </div>
// //     </section>
// //   )
// // }

// "use client"

// /**
//  * FourHouses — Atelier Selvedge
//  * ------------------------------------------------------------------
//  * Self-contained section: floating pill navbar + "Four Houses" intro
//  * copy + four house cards + a feature strip + a stitched quote bar.
//  *
//  * Usage:
//  *   import FourHouses from "@/Components/Selvé/FourHouses"
//  *   <FourHouses />
//  *
//  * Drop straight into a Next.js (app router) + Tailwind project. Uses
//  * next/font/google for Playfair Display (serif/display) + Inter (ui).
//  * ------------------------------------------------------------------
//  */

// import React, { Suspense, useEffect, useRef } from "react"
// import { Playfair_Display, Inter } from "next/font/google"
// import Image from "next/image"
// import { Canvas } from "@react-three/fiber"
// import { Environment, Bounds, Center, OrbitControls } from "@react-three/drei"

// // Import the specific 3D models
// import { G_cloth, Perfumee } from "@/Components/Hero/SmallerModels"
// import { markFourHousesReady } from "@/Components/scrollBus"

// const display = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   style: ["normal", "italic"],
//   variable: "--font-display",
// })

// const sans = Inter({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   variable: "--font-sans-ui",
// })

// /* ------------------------------------------------------------------ */
// /* Tokens — exact palette                                             */
// /* ------------------------------------------------------------------ */
// const BG = "#08080B"
// const BG_DEEP = "#111113"
// const CARD = "#171717"
// const ELEVATED = "#1F1F1F"
// const BRONZE = "#2A221B"
// const SHADOW = "#34281F"
// const GOLD = "#D9B67A"
// const GOLD_BRIGHT = "#E7C58A"
// const GOLD_ANTIQUE = "#C89A55"
// const GOLD_DARK = "#A97A42"
// const GOLD_BORDER = "#B98A4E"
// const WHITE = "#F5F3EE"
// const SECONDARY = "#D7D2CA"
// const MUTED = "#A29D95"
// const DIVIDER = "#323232"
// const GLASS = "rgba(8,8,11,0.55)"
// const CARD_GLASS = "rgba(17,17,19,0.72)"

// /* ------------------------------------------------------------------ */
// /* Icons — inline, stroke-based, consistent weight (no icon deps)     */
// /* ------------------------------------------------------------------ */
// type IconProps = React.SVGProps<SVGSVGElement>

// const IconSearch = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.3" />
//     <path d="M15.3 15.3L21 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//   </svg>
// )

// const IconCoatButton = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
//     <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
//     <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
//     <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
//     <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
//   </svg>
// )

// const IconPlay = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path d="M9 7.2v9.6l8-4.8-8-4.8z" fill="currentColor" />
//   </svg>
// )

// /* House card feature icons */
// const IconFabric = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 4 0M4 14c2-2 4-2 6 0s4 2 6 0 4-2 4 0"
//       stroke="currentColor"
//       strokeWidth="1.2"
//       strokeLinecap="round"
//     />
//   </svg>
// )
// const IconTag = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M11 4.5H6.5A2 2 0 004.5 6.5V11a2 2 0 00.6 1.4l7 7a2 2 0 002.8 0l4.6-4.6a2 2 0 000-2.8l-7-7A2 2 0 0011 4.5z"
//       stroke="currentColor"
//       strokeWidth="1.15"
//       strokeLinejoin="round"
//     />
//     <circle cx="8.75" cy="8.75" r="1.1" fill="currentColor" />
//   </svg>
// )
// const IconTarget = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.1" />
//     <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.1" />
//     <circle cx="12" cy="12" r="0.9" fill="currentColor" />
//   </svg>
// )
// const IconRuler = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M3.5 16.5l4-4M16.5 3.5l4 4L7 21l-4-4L16.5 3.5z"
//       stroke="currentColor"
//       strokeWidth="1.1"
//       strokeLinejoin="round"
//     />
//     <path d="M14 6l2 2M11 9l2 2M8 12l2 2" stroke="currentColor" strokeWidth="1" />
//   </svg>
// )
// const IconMaterial = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.1" />
//     <path d="M4 14l4.5-4.5L12 13l3-3 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
//   </svg>
// )
// const IconStatement = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path d="M12 2.5l2.4 6.8 7.1.2-5.7 4.3 2.1 6.9L12 16.6l-6 4.1 2.1-6.9-5.7-4.3 7.1-.2L12 2.5z" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" />
//   </svg>
// )
// const IconBottle = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <rect x="9.5" y="3.5" width="5" height="3.2" rx="0.7" stroke="currentColor" strokeWidth="1.05" />
//     <path d="M9.8 6.7h4.4l1.4 2.6v11a1.3 1.3 0 01-1.3 1.3H9.7a1.3 1.3 0 01-1.3-1.3v-11l1.4-2.6z" stroke="currentColor" strokeWidth="1.1" />
//   </svg>
// )
// const IconDrop = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M12 3.5c2.4 3.2 6 7.6 6 11.3a6 6 0 11-12 0c0-3.7 3.6-8.1 6-11.3z"
//       stroke="currentColor"
//       strokeWidth="1.1"
//     />
//   </svg>
// )
// const IconSparkle = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"
//       stroke="currentColor"
//       strokeWidth="1.05"
//       strokeLinejoin="round"
//     />
//   </svg>
// )
// const IconDiamond = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path d="M3 9l4.5-5.5h9L21 9l-9 11.5L3 9z" stroke="currentColor" strokeWidth="1.05" />
//     <path d="M3 9h18M9 3.5L7 9l5 11.5L17 9l-2-5.5" stroke="currentColor" strokeWidth="1.05" />
//   </svg>
// )
// const IconHand = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M7.5 11V6a1.5 1.5 0 013 0v4M10.5 10V4.5a1.5 1.5 0 013 0V10M13.5 10.3V6a1.5 1.5 0 013 0v6.5M16.5 11.5V9a1.5 1.5 0 013 0v6c0 3.6-2.4 6-6 6h-2c-2.2 0-3.4-.7-4.6-2.2L4 14.8c-.6-.8-.4-1.8.4-2.3.7-.4 1.6-.2 2.1.4L7.5 14"
//       stroke="currentColor"
//       strokeWidth="1.05"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// )
// const IconCup = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path d="M7 4h10v6a5 5 0 01-10 0V4z" stroke="currentColor" strokeWidth="1.1" />
//     <path d="M7 5.5H4a1 1 0 00-1 1V8a3 3 0 003 3M17 5.5h3a1 1 0 011 1V8a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.05" />
//     <path d="M12 15v3.5M9 20.5h6" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" />
//   </svg>
// )

// /* Feature-strip icons */
// const IconAfrica = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path
//       d="M11.2 3.2c1 .3 1.6 1.1 2.4 1.1.9 0 1.3-.7 2.1-.5.9.2 1 1.3.6 2-.5.8-1.5 1-1.5 2 0 .9 1.1 1.1 1.5 2 .6 1.3-.2 2.4-.9 3.4-.6.9-.4 1.9-1 2.8-.5.8-1.5.9-1.9 1.8-.3.7.1 1.6-.5 2.1-.6.5-1.4.1-2-.2-.7-.4-1-1.3-1.8-1.5-.9-.2-1.6.5-2.5.4-1-.1-1.4-1.1-1.3-2 .1-.8.9-1.2.9-2 0-.9-1-1.1-1.2-2-.2-.9.5-1.6.5-2.5 0-1-1-1.4-1-2.4 0-1.1 1.1-2 2.2-2.5z"
//       stroke="currentColor"
//       strokeWidth="1"
//       strokeLinejoin="round"
//     />
//   </svg>
// )
// const IconShield = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <path d="M12 3.2l7 2.6v5.6c0 4.6-3 8-7 9.4-4-1.4-7-4.8-7-9.4V5.8l7-2.6z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
//     <path d="M9 12l2.2 2.2L15.5 9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// )
// const IconCompassTool = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <circle cx="7" cy="18" r="1.4" stroke="currentColor" strokeWidth="1.05" />
//     <path d="M12 4l7 15h-4L12 9.5 9 15.5" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" />
//     <path d="M12 4v3" stroke="currentColor" strokeWidth="1.05" />
//   </svg>
// )
// const IconFlower = (p: IconProps) => (
//   <svg viewBox="0 0 24 24" fill="none" {...p}>
//     <circle cx="12" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
//     <circle cx="12" cy="6.3" r="2.1" stroke="currentColor" strokeWidth="1" />
//     <circle cx="12" cy="17.7" r="2.1" stroke="currentColor" strokeWidth="1" />
//     <circle cx="6.3" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
//     <circle cx="17.7" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
//   </svg>
// )

// /* Bottom bar decorative icons */
// const IconNeedle = (p: IconProps) => (
//   <svg viewBox="0 0 240 40" fill="none" {...p}>
//     <ellipse cx="16" cy="20" rx="7" ry="5.5" stroke="currentColor" strokeWidth="1.3" />
//     <ellipse cx="16" cy="20" rx="2.6" ry="2" stroke="currentColor" strokeWidth="1" />
//     <path d="M23 20h205" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//     <path d="M215 14l13 6-13 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// )

// /* ------------------------------------------------------------------ */
// /* Feature-strip data                                                 */
// /* ------------------------------------------------------------------ */
// const STRIP_ITEMS = [
//   { Icon: IconAfrica, title: "PAN-AFRICAN ROOTS", copy: ["Inspired by heritage.", "Created for the world."] },
//   { Icon: IconShield, title: "UNCOMPROMISING QUALITY", copy: ["The finest materials.", "The highest standards."] },
//   { Icon: IconCompassTool, title: "INTENTIONAL DESIGN", copy: ["Every detail matters.", "Beauty with purpose."] },
//   { Icon: IconFlower, title: "CULTURE INNOVATION", copy: ["Honoring tradition.", "Shaping the future."] },
// ]

// /* ------------------------------------------------------------------ */
// /* House card data                                                    */
// /* ------------------------------------------------------------------ */
// type Feature = { Icon: React.ComponentType<IconProps>; title: string; desc: string }
// type House = {
//   num: string
//   name: string
//   category: string
//   tagline: string[]
//   swatch: "denim" | "jacket" | "bottle" | "vase"
//   bar: string
//   features: Feature[]
//   imageSrc?: string // Optional, only for image-based houses
// }

// const HOUSES: House[] = [
//   {
//     num: "01",
//     name: "SELVÉ",
//     category: "DENIM HOUSE",
//     tagline: ["The art of denim.", "Reimagined through", "heritage and innovation."],
//     swatch: "denim",
//     bar: GOLD,
//     imageSrc: "/imgs/mat.png", // Uses Image fallback
//     features: [
//       { Icon: IconFabric, title: "PREMIUM FABRICS", desc: "Sourced globally. Woven to last." },
//       { Icon: IconTag, title: "TIMELESS DESIGN", desc: "Classic silhouettes. Modern edge." },
//       { Icon: IconTarget, title: "CRAFTED TO ENDURE", desc: "Built with intention. Made for generations." },
//     ],
//   },
//   {
//     num: "02",
//     name: "ATELION",
//     category: "FASHION HOUSE",
//     tagline: ["Contemporary fashion.", "Tailored with precision.", "Defined by elegance."],
//     swatch: "jacket", // Will trigger the G_cloth 3D model
//     bar: GOLD_ANTIQUE,
//     // Note: No imageSrc defined, it will use the 3D model
//     features: [
//       { Icon: IconRuler, title: "MODERN TAILORING", desc: "Precision cuts. Flawless fit." },
//       { Icon: IconMaterial, title: "LUXURY MATERIALS", desc: "The finest fibers. Impeccable feel." },
//       { Icon: IconStatement, title: "STATEMENT PIECES", desc: "Designed to be seen. Made to be remembered." },
//     ],
//   },
//   {
//     num: "03",
//     name: "LURÈ",
//     category: "BEAUTY HOUSE",
//     tagline: ["Scents that evoke.", "Skincare that nurtures.", "Beauty that empowers."],
//     swatch: "bottle", // Will trigger the Perfumee 3D model
//     bar: GOLD_DARK,
//     // Note: No imageSrc defined, it will use the 3D model
//     features: [
//       { Icon: IconBottle, title: "FINE FRAGRANCES", desc: "Curated with rare and refined notes." },
//       { Icon: IconDrop, title: "SKINCARE RITUALS", desc: "Nourishing formulas. Rooted in nature." },
//       { Icon: IconSparkle, title: "SENSORIAL EXPERIENCES", desc: "Luxury for the senses. Beyond the surface." },
//     ],
//   },
//   {
//     num: "04",
//     name: "MAIVON",
//     category: "HOME HOUSE",
//     tagline: ["Spaces that inspire.", "Objects that last.", "Living with meaning."],
//     swatch: "vase",
//     bar: GOLD_BORDER,
//     imageSrc: "/imgs/house.png", // Uses Image fallback
//     features: [
//       { Icon: IconDiamond, title: "CURATED OBJECTS", desc: "Handpicked. Timeless. Made with soul." },
//       { Icon: IconHand, title: "ARTISAN CRAFT", desc: "Skilled hands. Honest materials." },
//       { Icon: IconCup, title: "ELEVATED LIVING", desc: "Designed to transform everyday life." },
//     ],
//   },
// ]

// /* ------------------------------------------------------------------ */
// /* House-card imagery — using 3D models for ATELION & LURÈ           */
// /* ------------------------------------------------------------------ */

// function ModelVisual({ kind, bar }: { kind: House["swatch"]; bar: string }) {
//   // Determine which model to render based on the house
//   let ModelComponent = null
//   if (kind === "jacket") ModelComponent = G_cloth // ATELION
//   else if (kind === "bottle") ModelComponent = Perfumee // LURÈ

//   // If it's not ATELION or LURÈ, render the image fallback (for SELVÉ and MAIVON)
//   if (!ModelComponent) {
//     const houseData = HOUSES.find(h => h.swatch === kind)
//     const imageSrc = houseData?.imageSrc || ""

//     return (
//       <div
//         className="relative h-full w-full overflow-hidden"
//         style={{
//           background: `radial-gradient(120% 100% at 30% 0%, ${BRONZE} 0%, ${BG_DEEP} 55%, ${CARD} 100%)`,
//         }}
//       >
//         <div className="absolute inset-0" style={{ background: `radial-gradient(60% 55% at 50% 40%, ${bar}22, transparent 70%)` }} />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Image src={imageSrc} alt={`${kind} product image`} fill className="object-contain p-4 drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]" priority />
//         </div>
//       </div>
//     )
//   }

//   // Render the 3D Model for ATELION and LURÈ
//   return (
//     <div
//       className="relative h-full w-full overflow-hidden"
//       style={{
//         background: `radial-gradient(120% 100% at 30% 0%, ${BRONZE} 0%, ${BG_DEEP} 55%, ${CARD} 100%)`,
//       }}
//     >
//       <div className="absolute inset-0" style={{ background: `radial-gradient(60% 55% at 50% 40%, ${bar}22, transparent 70%)` }} />

//       <div className="absolute inset-0 z-10 pointer-events-none">
//         <Canvas
//           camera={{ position: [0, 0, 2.5], fov: 45 }}
//           gl={{ antialias: true, alpha: true }}
//           className="w-full h-full"
//         >
//           <Suspense fallback={null}>
//             <ambientLight intensity={0.8} />
//             <spotLight position={[3, 5, 3]} intensity={1.1} angle={0.5} penumbra={0.6} />
//             <Environment preset="city" />

//             <Bounds fit clip observe margin={1.3}>
//               <Center>
//                 <ModelComponent />
//               </Center>
//             </Bounds>

//             <OrbitControls
//               enableZoom={false}
//               enablePan={false}
//               autoRotate
//               autoRotateSpeed={7.5}
//               minPolarAngle={Math.PI / 2.5}
//               maxPolarAngle={Math.PI / 1.5}
//             />
//           </Suspense>
//         </Canvas>
//       </div>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* Hero copy (left column)                                            */
// /* ------------------------------------------------------------------ */
// function HeroCopy() {
//   return (
//     <div className="relative flex max-w-[280px] shrink-0 flex-col pt-2 xl:max-w-[300px]">
//       {/* decorative vertical stitch rail */}
//       <div className="pointer-events-none absolute -left-8 top-16 hidden h-[210px] w-px flex-col items-center xl:flex">
//         <span className="h-full w-px" style={{ background: `linear-gradient(180deg, ${GOLD}80, transparent)` }} />
//       </div>
//       <span className="pointer-events-none absolute -left-[35px] top-16 hidden h-1.5 w-1.5 rounded-full xl:block" style={{ background: GOLD }} />
//       <span className="pointer-events-none absolute -left-[35px] top-[130px] hidden h-1 w-1 rounded-full xl:block" style={{ background: `${GOLD}80` }} />
//       <span className="pointer-events-none absolute -left-[35px] top-[172px] hidden h-1 w-1 rounded-full xl:block" style={{ background: `${GOLD}50` }} />

//       <p className="mb-4 text-[10.5px] tracking-[0.3em]" style={{ color: GOLD }}>
//         FOUR DISTINCT EXPRESSIONS
//       </p>

//       <h2 className="font-display text-[2.5rem] leading-[1.1]" style={{ color: WHITE }}>
//         <span className="block">One house.</span>
//         <span className="block">Four worlds.</span>
//         <span className="block italic" style={{ color: GOLD }}>
//           Infinite
//         </span>
//         <span className="block">possibilities.</span>
//       </h2>

//       <div className="my-5 h-px w-10" style={{ background: `${GOLD}60` }} />

//       <p className="max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
//         Atelier Selvedge is expressed through four distinct houses — each with its own craft, purpose, and perspective on luxury.
//       </p>
//       <p className="mt-4 max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
//         Different expressions. One standard of excellence.
//       </p>

//       <button className="group mt-8 flex items-center gap-3 text-left">
//         <span
//           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
//           style={{ borderColor: `${GOLD}80`, color: GOLD }}
//         >
//           <IconPlay className="h-3 w-3" />
//         </span>
//         <span className="text-[11px] font-medium tracking-[0.2em]" style={{ color: GOLD }}>
//           EXPLORE OUR FOUR HOUSES
//         </span>
//       </button>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* House card                                                          */
// /* ------------------------------------------------------------------ */
// function HouseCard({ house }: { house: House }) {
//   return (
//     <div
//       className="flex flex-1 flex-col overflow-hidden rounded-[22px] border transition-transform duration-500 hover:-translate-y-1"
//       style={{
//         background: `linear-gradient(180deg, ${CARD_GLASS}, ${GLASS})`,
//         borderColor: `${GOLD}22`,
//         boxShadow: "0 24px 50px -28px rgba(0,0,0,0.7)",
//       }}
//     >
//       {/* image / product photography / 3D model area */}
//       <div className="relative h-[210px] shrink-0 xl:h-[230px]">
//         <ModelVisual kind={house.swatch} bar={house.bar} />
//         <div
//           className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
//           style={{ background: `linear-gradient(180deg, transparent, ${CARD})` }}
//         />
//       </div>

//       {/* body */}
//       <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
//         <span className="font-display italic text-[19px] leading-none" style={{ color: GOLD }}>
//           {house.num}
//         </span>

//         <h3 className="font-display mt-1 text-[27px] leading-none tracking-tight" style={{ color: WHITE }}>
//           {house.name}
//         </h3>
//         <p className="mt-1.5 text-[10px] font-medium tracking-[0.22em]" style={{ color: GOLD }}>
//           {house.category}
//         </p>

//         <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: SECONDARY }}>
//           {house.tagline.map((line, i) => (
//             <React.Fragment key={i}>
//               {line}
//               {i < house.tagline.length - 1 && <br />}
//             </React.Fragment>
//           ))}
//         </p>

//         <div className="my-4 h-px w-full" style={{ background: DIVIDER }} />

//         <div className="flex flex-col gap-3.5">
//           {house.features.map((f) => (
//             <div key={f.title} className="flex items-start gap-3">
//               <span
//                 className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
//                 style={{ borderColor: `${GOLD}45`, color: GOLD }}
//               >
//                 <f.Icon className="h-3.5 w-3.5" />
//               </span>
//               <div className="pt-0.5">
//                 <p className="text-[10.5px] font-semibold tracking-[0.12em]" style={{ color: GOLD_BRIGHT }}>
//                   {f.title}
//                 </p>
//                 <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: MUTED }}>
//                   {f.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* Feature strip                                                       */
// /* ------------------------------------------------------------------ */
// function FeatureStrip() {
//   return (
//     <div
//       className="flex flex-col gap-6 rounded-[22px] border px-6 py-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8"
//       style={{ background: `linear-gradient(180deg, ${CARD_GLASS}, ${GLASS})`, borderColor: `${GOLD}18` }}
//     >
//       {STRIP_ITEMS.map((item, i) => (
//         <div key={item.title} className="flex items-center gap-4">
//           <span
//             className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
//             style={{ borderColor: `${GOLD}55`, color: GOLD }}
//           >
//             <item.Icon className="h-5 w-5" />
//           </span>
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.16em]" style={{ color: WHITE }}>
//               {item.title}
//             </p>
//             <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: MUTED }}>
//               {item.copy[0]}
//               <br />
//               {item.copy[1]}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* Stitched quote bar                                                 */
// /* ------------------------------------------------------------------ */
// function StitchBar() {
//   return (
//     <div className="relative flex items-center gap-6 px-2 py-4">
//       <IconNeedle className="hidden h-6 w-[200px] shrink-0 md:block" style={{ color: `${GOLD}70` }} />

//       <p className="font-display flex-1 text-center text-[15px] italic leading-relaxed" style={{ color: SECONDARY }}>
//         <span style={{ color: GOLD }}>&ldquo;</span>Four expressions. One house.
//         <br className="hidden sm:block" /> Different paths. Same pursuit of excellence.
//         <span style={{ color: GOLD }}>&rdquo;</span>
//       </p>

//       {/* thread spool */}
//       <div className="relative hidden h-14 w-14 shrink-0 items-center justify-center md:flex">
//         <svg viewBox="0 0 100 100" className="h-full w-full">
//           <rect x="10" y="18" width="80" height="64" rx="6" fill={SHADOW} stroke={GOLD_DARK} strokeWidth="1.5" />
//           <ellipse cx="50" cy="50" rx="40" ry="30" fill={BRONZE} stroke={GOLD} strokeWidth="1.4" />
//           {Array.from({ length: 8 }).map((_, i) => (
//             <path
//               key={i}
//               d={`M${14 + i * 9} 22 Q50 ${18 + (i % 2) * 6} ${86 - i * 9} 78`}
//               stroke={GOLD}
//               strokeOpacity={0.55}
//               strokeWidth="1"
//               fill="none"
//             />
//           ))}
//         </svg>
//       </div>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* Root component                                                      */
// /* ------------------------------------------------------------------ */
// export default function FourHouses() {
//   const atelionCardRef = useRef<HTMLDivElement>(null)

//   // Mark component as ready
//   useEffect(() => {
//     markFourHousesReady()
//   }, [])

//   return (
//     <section
//       className={`${display.variable} ${sans.variable} relative w-full px-5 py-8 md:px-8 lg:px-10`}
//       style={
//         {
//           background: BG,
//           fontFamily: "var(--font-sans-ui)",
//         } as React.CSSProperties
//       }
//     >
//       <div className="mx-auto flex max-w-[1500px] flex-col gap-8">
//         <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-8">
//           <div className="xl:pl-6">
//             <HeroCopy />
//           </div>

//           <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {HOUSES.map((house, i) => {
//               const isAtelion = house.name === "ATELION"
//               return (
//                 <div
//                   key={house.num}
//                   ref={isAtelion ? atelionCardRef : null}
//                   data-atelion-card={isAtelion ? "true" : undefined}
//                   className="relative"
//                 >
//                   <HouseCard house={house} />
//                   {isAtelion && (
//                     <div className="absolute inset-0 pointer-events-none" />
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         <FeatureStrip />
//         <StitchBar />
//       </div>
//     </section>
//   )
// }


"use client"

/**
 * FourHouses — Atelier Selvedge
 * ------------------------------------------------------------------
 * Self-contained section: floating pill navbar + "Four Houses" intro
 * copy + four house cards + a feature strip + a stitched quote bar.
 *
 * Usage:
 *   import FourHouses from "@/Components/Selvé/FourHouses"
 *   <FourHouses />
 *
 * Drop straight into a Next.js (app router) + Tailwind project. Uses
 * next/font/google for Playfair Display (serif/display) + Inter (ui).
 * ------------------------------------------------------------------
 */

import React, { Suspense } from "react"
import { Playfair_Display, Inter } from "next/font/google"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Environment, Bounds, Center, OrbitControls } from "@react-three/drei"

// Import the specific 3D models
import { Perfumee } from "@/Components/Hero/SmallerModels"
import ClothAnchor from "@/Components/Scene/ClothAnchor"

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-ui",
})

/* ------------------------------------------------------------------ */
/* Tokens — exact palette                                             */
/* ------------------------------------------------------------------ */
const BG = "#08080B"
const BG_DEEP = "#111113"
const CARD = "#171717"
const ELEVATED = "#1F1F1F"
const BRONZE = "#2A221B"
const SHADOW = "#34281F"
const GOLD = "#D9B67A"
const GOLD_BRIGHT = "#E7C58A"
const GOLD_ANTIQUE = "#C89A55"
const GOLD_DARK = "#A97A42"
const GOLD_BORDER = "#B98A4E"
const WHITE = "#F5F3EE"
const SECONDARY = "#D7D2CA"
const MUTED = "#A29D95"
const DIVIDER = "#323232"
const GLASS = "rgba(8,8,11,0.55)"
const CARD_GLASS = "rgba(17,17,19,0.72)"

/* ------------------------------------------------------------------ */
/* Icons — inline, stroke-based, consistent weight (no icon deps)     */
/* ------------------------------------------------------------------ */
type IconProps = React.SVGProps<SVGSVGElement>

const IconSearch = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.3" />
    <path d="M15.3 15.3L21 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const IconCoatButton = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
    <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
  </svg>
)

const IconPlay = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M9 7.2v9.6l8-4.8-8-4.8z" fill="currentColor" />
  </svg>
)

/* House card feature icons */
const IconFabric = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 4 0M4 14c2-2 4-2 6 0s4 2 6 0 4-2 4 0"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)
const IconTag = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M11 4.5H6.5A2 2 0 004.5 6.5V11a2 2 0 00.6 1.4l7 7a2 2 0 002.8 0l4.6-4.6a2 2 0 000-2.8l-7-7A2 2 0 0011 4.5z"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    <circle cx="8.75" cy="8.75" r="1.1" fill="currentColor" />
  </svg>
)
const IconTarget = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" />
  </svg>
)
const IconRuler = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M3.5 16.5l4-4M16.5 3.5l4 4L7 21l-4-4L16.5 3.5z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path d="M14 6l2 2M11 9l2 2M8 12l2 2" stroke="currentColor" strokeWidth="1" />
  </svg>
)
const IconMaterial = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M4 14l4.5-4.5L12 13l3-3 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
)
const IconStatement = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 2.5l2.4 6.8 7.1.2-5.7 4.3 2.1 6.9L12 16.6l-6 4.1 2.1-6.9-5.7-4.3 7.1-.2L12 2.5z" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" />
  </svg>
)
const IconBottle = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="9.5" y="3.5" width="5" height="3.2" rx="0.7" stroke="currentColor" strokeWidth="1.05" />
    <path d="M9.8 6.7h4.4l1.4 2.6v11a1.3 1.3 0 01-1.3 1.3H9.7a1.3 1.3 0 01-1.3-1.3v-11l1.4-2.6z" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)
const IconDrop = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 3.5c2.4 3.2 6 7.6 6 11.3a6 6 0 11-12 0c0-3.7 3.6-8.1 6-11.3z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
  </svg>
)
const IconSparkle = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
  </svg>
)
const IconDiamond = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 9l4.5-5.5h9L21 9l-9 11.5L3 9z" stroke="currentColor" strokeWidth="1.05" />
    <path d="M3 9h18M9 3.5L7 9l5 11.5L17 9l-2-5.5" stroke="currentColor" strokeWidth="1.05" />
  </svg>
)
const IconHand = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M7.5 11V6a1.5 1.5 0 013 0v4M10.5 10V4.5a1.5 1.5 0 013 0V10M13.5 10.3V6a1.5 1.5 0 013 0v6.5M16.5 11.5V9a1.5 1.5 0 013 0v6c0 3.6-2.4 6-6 6h-2c-2.2 0-3.4-.7-4.6-2.2L4 14.8c-.6-.8-.4-1.8.4-2.3.7-.4 1.6-.2 2.1.4L7.5 14"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const IconCup = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M7 4h10v6a5 5 0 01-10 0V4z" stroke="currentColor" strokeWidth="1.1" />
    <path d="M7 5.5H4a1 1 0 00-1 1V8a3 3 0 003 3M17 5.5h3a1 1 0 011 1V8a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.05" />
    <path d="M12 15v3.5M9 20.5h6" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" />
  </svg>
)

/* Feature-strip icons */
const IconAfrica = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M11.2 3.2c1 .3 1.6 1.1 2.4 1.1.9 0 1.3-.7 2.1-.5.9.2 1 1.3.6 2-.5.8-1.5 1-1.5 2 0 .9 1.1 1.1 1.5 2 .6 1.3-.2 2.4-.9 3.4-.6.9-.4 1.9-1 2.8-.5.8-1.5.9-1.9 1.8-.3.7.1 1.6-.5 2.1-.6.5-1.4.1-2-.2-.7-.4-1-1.3-1.8-1.5-.9-.2-1.6.5-2.5.4-1-.1-1.4-1.1-1.3-2 .1-.8.9-1.2.9-2 0-.9-1-1.1-1.2-2-.2-.9.5-1.6.5-2.5 0-1-1-1.4-1-2.4 0-1.1 1.1-2 2.2-2.5z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
)
const IconShield = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 3.2l7 2.6v5.6c0 4.6-3 8-7 9.4-4-1.4-7-4.8-7-9.4V5.8l7-2.6z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M9 12l2.2 2.2L15.5 9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconCompassTool = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="7" cy="18" r="1.4" stroke="currentColor" strokeWidth="1.05" />
    <path d="M12 4l7 15h-4L12 9.5 9 15.5" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" />
    <path d="M12 4v3" stroke="currentColor" strokeWidth="1.05" />
  </svg>
)
const IconFlower = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="6.3" r="2.1" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="17.7" r="2.1" stroke="currentColor" strokeWidth="1" />
    <circle cx="6.3" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
    <circle cx="17.7" cy="12" r="2.1" stroke="currentColor" strokeWidth="1" />
  </svg>
)

/* Bottom bar decorative icons */
const IconNeedle = (p: IconProps) => (
  <svg viewBox="0 0 240 40" fill="none" {...p}>
    <ellipse cx="16" cy="20" rx="7" ry="5.5" stroke="currentColor" strokeWidth="1.3" />
    <ellipse cx="16" cy="20" rx="2.6" ry="2" stroke="currentColor" strokeWidth="1" />
    <path d="M23 20h205" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M215 14l13 6-13 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ------------------------------------------------------------------ */
/* Feature-strip data                                                 */
/* ------------------------------------------------------------------ */
const STRIP_ITEMS = [
  { Icon: IconAfrica, title: "PAN-AFRICAN ROOTS", copy: ["Inspired by heritage.", "Created for the world."] },
  { Icon: IconShield, title: "UNCOMPROMISING QUALITY", copy: ["The finest materials.", "The highest standards."] },
  { Icon: IconCompassTool, title: "INTENTIONAL DESIGN", copy: ["Every detail matters.", "Beauty with purpose."] },
  { Icon: IconFlower, title: "CULTURE INNOVATION", copy: ["Honoring tradition.", "Shaping the future."] },
]

/* ------------------------------------------------------------------ */
/* House card data                                                    */
/* ------------------------------------------------------------------ */
type Feature = { Icon: React.ComponentType<IconProps>; title: string; desc: string }
type House = {
  num: string
  name: string
  category: string
  tagline: string[]
  swatch: "denim" | "jacket" | "bottle" | "vase"
  bar: string
  features: Feature[]
  imageSrc?: string // Optional, only for image-based houses
}

const HOUSES: House[] = [
  {
    num: "01",
    name: "SELVÉ",
    category: "DENIM HOUSE",
    tagline: ["The art of denim.", "Reimagined through", "heritage and innovation."],
    swatch: "denim",
    bar: GOLD,
    imageSrc: "/imgs/mat.png", // Uses Image fallback
    features: [
      { Icon: IconFabric, title: "PREMIUM FABRICS", desc: "Sourced globally. Woven to last." },
      { Icon: IconTag, title: "TIMELESS DESIGN", desc: "Classic silhouettes. Modern edge." },
      { Icon: IconTarget, title: "CRAFTED TO ENDURE", desc: "Built with intention. Made for generations." },
    ],
  },
  {
    num: "02",
    name: "ATELION",
    category: "FASHION HOUSE",
    tagline: ["Contemporary fashion.", "Tailored with precision.", "Defined by elegance."],
    swatch: "jacket", // Docks the persistent, relayed G_cloth model
    bar: GOLD_ANTIQUE,
    features: [
      { Icon: IconRuler, title: "MODERN TAILORING", desc: "Precision cuts. Flawless fit." },
      { Icon: IconMaterial, title: "LUXURY MATERIALS", desc: "The finest fibers. Impeccable feel." },
      { Icon: IconStatement, title: "STATEMENT PIECES", desc: "Designed to be seen. Made to be remembered." },
    ],
  },
  {
    num: "03",
    name: "LURÈ",
    category: "BEAUTY HOUSE",
    tagline: ["Scents that evoke.", "Skincare that nurtures.", "Beauty that empowers."],
    swatch: "bottle", // Will trigger the Perfumee 3D model
    bar: GOLD_DARK,
    // Note: No imageSrc defined, it will use the 3D model
    features: [
      { Icon: IconBottle, title: "FINE FRAGRANCES", desc: "Curated with rare and refined notes." },
      { Icon: IconDrop, title: "SKINCARE RITUALS", desc: "Nourishing formulas. Rooted in nature." },
      { Icon: IconSparkle, title: "SENSORIAL EXPERIENCES", desc: "Luxury for the senses. Beyond the surface." },
    ],
  },
  {
    num: "04",
    name: "MAIVON",
    category: "HOME HOUSE",
    tagline: ["Spaces that inspire.", "Objects that last.", "Living with meaning."],
    swatch: "vase",
    bar: GOLD_BORDER,
    imageSrc: "/imgs/house.png", // Uses Image fallback
    features: [
      { Icon: IconDiamond, title: "CURATED OBJECTS", desc: "Handpicked. Timeless. Made with soul." },
      { Icon: IconHand, title: "ARTISAN CRAFT", desc: "Skilled hands. Honest materials." },
      { Icon: IconCup, title: "ELEVATED LIVING", desc: "Designed to transform everyday life." },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* House-card imagery                                                 */
/* ------------------------------------------------------------------ */
/**
 * ATELION ("jacket") no longer renders its own G_cloth Canvas — it's
 * the FourHouses-side dock for the single persistent cloth relayed
 * from Philosophy's "African Craft" pillar (see
 * Components/Scene/PersistentCloth.tsx). Its background glow is kept
 * identical so the card reads the same at rest; only the model itself
 * moved to the shared global canvas.
 *
 * LURÈ ("bottle") still renders its own small Perfumee model locally —
 * it isn't part of the relay.
 */
function ModelVisual({ kind, bar }: { kind: House["swatch"]; bar: string }) {
  const glowLayer = (
    <div className="absolute inset-0" style={{ background: `radial-gradient(60% 55% at 50% 40%, ${bar}22, transparent 70%)` }} />
  )
  const panelBg: React.CSSProperties = {
    background: `radial-gradient(120% 100% at 30% 0%, ${BRONZE} 0%, ${BG_DEEP} 55%, ${CARD} 100%)`,
  }

  if (kind === "jacket") {
    return (
      <ClothAnchor
        id="fourhouses-atelion"
        className="relative h-full w-full overflow-hidden"
        style={panelBg}
      />
    )
  }

  if (kind === "bottle") {
    return (
      <div className="relative h-full w-full overflow-hidden" style={panelBg}>
        {glowLayer}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} />
              <spotLight position={[3, 5, 3]} intensity={1.1} angle={0.5} penumbra={0.6} />
              <Environment preset="city" />

              <Bounds fit clip observe margin={1.3}>
                <Center>
                  <Perfumee />
                </Center>
              </Bounds>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={7.5}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    )
  }

  // Image-fallback houses (SELVÉ / MAIVON)
  const houseData = HOUSES.find((h) => h.swatch === kind)
  const imageSrc = houseData?.imageSrc || ""

  return (
    <div className="relative h-full w-full overflow-hidden" style={panelBg}>
      {glowLayer}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image src={imageSrc} alt={`${kind} product image`} fill className="object-contain p-4 drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]" priority />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero copy (left column)                                            */
/* ------------------------------------------------------------------ */
function HeroCopy() {
  return (
    <div className="relative flex max-w-[280px] shrink-0 flex-col pt-2 xl:max-w-[300px]">
      {/* decorative vertical stitch rail */}
      <div className="pointer-events-none absolute -left-8 top-16 hidden h-[210px] w-px flex-col items-center xl:flex">
        <span className="h-full w-px" style={{ background: `linear-gradient(180deg, ${GOLD}80, transparent)` }} />
      </div>
      <span className="pointer-events-none absolute -left-[35px] top-16 hidden h-1.5 w-1.5 rounded-full xl:block" style={{ background: GOLD }} />
      <span className="pointer-events-none absolute -left-[35px] top-[130px] hidden h-1 w-1 rounded-full xl:block" style={{ background: `${GOLD}80` }} />
      <span className="pointer-events-none absolute -left-[35px] top-[172px] hidden h-1 w-1 rounded-full xl:block" style={{ background: `${GOLD}50` }} />

      <p className="mb-4 text-[10.5px] tracking-[0.3em]" style={{ color: GOLD }}>
        FOUR DISTINCT EXPRESSIONS
      </p>

      <h2 className="font-display text-[2.5rem] leading-[1.1]" style={{ color: WHITE }}>
        <span className="block">One house.</span>
        <span className="block">Four worlds.</span>
        <span className="block italic" style={{ color: GOLD }}>
          Infinite
        </span>
        <span className="block">possibilities.</span>
      </h2>

      <div className="my-5 h-px w-10" style={{ background: `${GOLD}60` }} />

      <p className="max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
        Atelier Selvedge is expressed through four distinct houses — each with its own craft, purpose, and perspective on luxury.
      </p>
      <p className="mt-4 max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
        Different expressions. One standard of excellence.
      </p>

      <button className="group mt-8 flex items-center gap-3 text-left">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
          style={{ borderColor: `${GOLD}80`, color: GOLD }}
        >
          <IconPlay className="h-3 w-3" />
        </span>
        <span className="text-[11px] font-medium tracking-[0.2em]" style={{ color: GOLD }}>
          EXPLORE OUR FOUR HOUSES
        </span>
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* House card                                                          */
/* ------------------------------------------------------------------ */
function HouseCard({ house }: { house: House }) {
  return (
    <div
      className="flex flex-1 flex-col overflow-hidden rounded-[22px] border transition-transform duration-500 hover:-translate-y-1"
      style={{
        background: `linear-gradient(180deg, ${CARD_GLASS}, ${GLASS})`,
        borderColor: `${GOLD}22`,
        boxShadow: "0 24px 50px -28px rgba(0,0,0,0.7)",
      }}
    >
      {/* image / product photography / 3D model area */}
      <div className="relative h-[210px] shrink-0 xl:h-[230px]">
        <ModelVisual kind={house.swatch} bar={house.bar} />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
          style={{ background: `linear-gradient(180deg, transparent, ${CARD})` }}
        />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <span className="font-display italic text-[19px] leading-none" style={{ color: GOLD }}>
          {house.num}
        </span>

        <h3 className="font-display mt-1 text-[27px] leading-none tracking-tight" style={{ color: WHITE }}>
          {house.name}
        </h3>
        <p className="mt-1.5 text-[10px] font-medium tracking-[0.22em]" style={{ color: GOLD }}>
          {house.category}
        </p>

        <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: SECONDARY }}>
          {house.tagline.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < house.tagline.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        <div className="my-4 h-px w-full" style={{ background: DIVIDER }} />

        <div className="flex flex-col gap-3.5">
          {house.features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `${GOLD}45`, color: GOLD }}
              >
                <f.Icon className="h-3.5 w-3.5" />
              </span>
              <div className="pt-0.5">
                <p className="text-[10.5px] font-semibold tracking-[0.12em]" style={{ color: GOLD_BRIGHT }}>
                  {f.title}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: MUTED }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Feature strip                                                       */
/* ------------------------------------------------------------------ */
function FeatureStrip() {
  return (
    <div
      className="flex flex-col gap-6 rounded-[22px] border px-6 py-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8"
      style={{ background: `linear-gradient(180deg, ${CARD_GLASS}, ${GLASS})`, borderColor: `${GOLD}18` }}
    >
      {STRIP_ITEMS.map((item, i) => (
        <div key={item.title} className="flex items-center gap-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
            style={{ borderColor: `${GOLD}55`, color: GOLD }}
          >
            <item.Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em]" style={{ color: WHITE }}>
              {item.title}
            </p>
            <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: MUTED }}>
              {item.copy[0]}
              <br />
              {item.copy[1]}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stitched quote bar                                                 */
/* ------------------------------------------------------------------ */
function StitchBar() {
  return (
    <div className="relative flex items-center gap-6 px-2 py-4">
      <IconNeedle className="hidden h-6 w-[200px] shrink-0 md:block" style={{ color: `${GOLD}70` }} />

      <p className="font-display flex-1 text-center text-[15px] italic leading-relaxed" style={{ color: SECONDARY }}>
        <span style={{ color: GOLD }}>&ldquo;</span>Four expressions. One house.
        <br className="hidden sm:block" /> Different paths. Same pursuit of excellence.
        <span style={{ color: GOLD }}>&rdquo;</span>
      </p>

      {/* thread spool */}
      <div className="relative hidden h-14 w-14 shrink-0 items-center justify-center md:flex">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="10" y="18" width="80" height="64" rx="6" fill={SHADOW} stroke={GOLD_DARK} strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="40" ry="30" fill={BRONZE} stroke={GOLD} strokeWidth="1.4" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${14 + i * 9} 22 Q50 ${18 + (i % 2) * 6} ${86 - i * 9} 78`}
              stroke={GOLD}
              strokeOpacity={0.55}
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Root component                                                      */
/* ------------------------------------------------------------------ */
export default function FourHouses() {
  return (
    <section
      className={`${display.variable} ${sans.variable} relative w-full px-5 py-8 md:px-8 lg:px-10`}
      style={
        {
          background: BG,
          fontFamily: "var(--font-sans-ui)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-8">
          <div className="xl:pl-6">
            <HeroCopy />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {HOUSES.map((house) => (
              <HouseCard key={house.num} house={house} />
            ))}
          </div>
        </div>

        <FeatureStrip />
        <StitchBar />
      </div>
    </section>
  )
}