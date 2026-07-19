"use client"

import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from "next/font/google"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Bounds, Center } from "@react-three/drei"
import {
  Global as GlobeModel,
  G_cloth as GoldDressModel,
  Inno as InnoModel,
} from "@/Components/Hero/SmallerModels"

gsap.registerPlugin(ScrollTrigger)

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-ui",
})

const GOLD = "#C9A227"
const GOLD_SOFT = "#D9B67A"
const GOLD_DEEP = "#A97A42"
const NAVY_DEEP = "#07070A"
const PANEL = "#0D0D10"

const BACKGROUND_IMAGE_SRC = "/imgs/back2.png"

type Pillar = {
  num: string
  title: string
  copy: string
  visual: "heritage" | "innovation" | "craft" | "luxury"
}

const PILLARS: Pillar[] = [
  { num: "01", title: "Heritage", copy: "Rooted in history. Inspired by tradition. Honoring the legacy that shapes who we are.", visual: "heritage" },
  { num: "02", title: "Innovation", copy: "Pushing boundaries with modern design, advanced techniques, and bold vision.", visual: "innovation" },
  { num: "03", title: "African Craft", copy: "Authentic craftsmanship. Skilled hands. Timeless techniques passed forward.", visual: "craft" },
  { num: "04", title: "Global Luxury", copy: "Designed for the world. Crafted with excellence. Defined by luxury.", visual: "luxury" },
]

const PILLAR_MODELS: Record<Pillar["visual"], React.ComponentType> = {
  heritage: GlobeModel,
  innovation: InnoModel,
  craft: GoldDressModel,
  luxury: GlobeModel,
}

/* ------------------------------------------------------------------ */
/* Pillar Visuals                                                      */
/* ------------------------------------------------------------------ */
function PillarVisual({ kind }: { kind: Pillar["visual"] }) {
  const Model = PILLAR_MODELS[kind]
  return (
    <div className="relative h-[80px] w-[64px] shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-[#0b0b0d] md:h-[92px] md:w-[74px]">
      <div
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(80px 90px at 22% 18%, rgba(228,197,103,0.22), transparent 62%)" }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ antialias: true, alpha: true }} className="absolute inset-0">
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <spotLight position={[3, 5, 3]} intensity={1.1} angle={0.5} penumbra={0.6} />
            <Environment preset="city" />
            <Bounds fit clip observe margin={1.3}>
              <Center><Model /></Center>
            </Bounds>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={7.5} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stitch thread path logic                                           */
/* ------------------------------------------------------------------ */
type Point = { x: number; y: number }
const WAVE_AMPLITUDE = 22
const WAVE_AMPLITUDE_FLOOR = 10

function buildStitchPath(points: Point[]): string {
  if (points.length < 2) return ""
  const lastIdx = points.length - 1
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < lastIdx; i++) {
    const a = points[i], b = points[i + 1], gapX = b.x - a.x, gapY = b.y - a.y
    const side = i % 2 === 0 ? 1 : -1
    const bow = side * Math.min(WAVE_AMPLITUDE, Math.max(WAVE_AMPLITUDE_FLOOR, Math.abs(gapY) * 0.30))
    const c1 = { x: a.x + gapX * 0.25 + bow, y: a.y + gapY * 0.33 }
    const c2 = { x: b.x - gapX * 0.25 + bow, y: a.y + gapY * 0.67 }
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }
  return d
}

function useStitchPath(pinRefs: React.MutableRefObject<(HTMLDivElement | null)[]>, containerRef: React.RefObject<HTMLDivElement | null>) {
  const [path, setPath] = useState("")
  const [dots, setDots] = useState<Point[]>([])
  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()
      const pts = pinRefs.current.filter((el): el is HTMLDivElement => Boolean(el)).map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 - cRect.left, y: r.top + r.height / 2 - cRect.top }
      })
      if (pts.length >= 2) { setPath(buildStitchPath(pts)); setDots(pts.slice(0, -1)) }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener("resize", measure)
    return () => { ro.disconnect(); window.removeEventListener("resize", measure) }
  }, [])
  return { path, dots }
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                     */
/* ------------------------------------------------------------------ */
function PillarRow({ pillar, pinRef }: { pillar: Pillar; pinRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="relative flex items-stretch gap-3 border-b border-white/[0.08] py-3.5 last:border-none md:gap-4 md:py-4">
      <div className="relative w-7 shrink-0 pt-0.5 md:w-9">
        <span className="font-display block select-none text-[20px] italic leading-none text-white/[0.16] md:text-[24px]">{pillar.num}</span>
      </div>
      <div className="relative shrink-0">
        <div ref={pinRef} className="absolute left-0 top-4 h-px w-px md:top-5" />
        <PillarVisual kind={pillar.visual} />
      </div>
      <div className="group min-w-0 flex-1 pr-16 pt-0.5 md:pr-20">
        <h3 className="text-[11px] font-semibold tracking-[0.18em] text-[color:var(--gold)] md:text-[12px]">{pillar.title.toUpperCase()}</h3>
        <div className="my-1.5 h-px w-6 bg-[color:var(--gold)]/40" />
        <p className="max-w-[280px] text-[12px] leading-relaxed text-white/60 md:max-w-[320px] md:text-[13px]">{pillar.copy}</p>
        <a href="#" className="absolute right-0 top-3.5 flex items-center gap-1.5 text-[9.5px] font-medium tracking-[0.14em] text-[color:var(--gold)] transition-colors hover:text-[color:var(--gold-soft)] md:top-4 md:text-[10px]">
          EXPLORE
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function PlayBadge() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/50 text-[color:var(--gold)] transition-transform duration-300 group-hover:scale-110 group-hover:border-[color:var(--gold)] md:h-9 md:w-9">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
    </span>
  )
}

// function BottomBar() {
//   return (
//     <div className="relative flex flex-col items-stretch gap-4 rounded-[20px] border px-5 py-4 backdrop-blur-xl md:flex-row md:items-center md:gap-0 md:rounded-full md:px-7 md:py-3.5" style={{ background: "linear-gradient(180deg, rgba(17,17,19,0.94), rgba(7,7,10,0.98))", borderColor: "rgba(201,162,39,0.18)" }}>
//       <a href="#" className="group flex flex-1 items-center gap-3">
//         <PlayBadge />
//         <div>
//           <p className="text-[9.5px] font-semibold tracking-[0.18em] text-[color:var(--gold)]">OUR STORY</p>
//           <p className="mt-0.5 max-w-[190px] text-[11px] leading-snug text-white/55">Discover the journey behind Atelier Selvedge.</p>
//         </div>
//       </a>
//       <span className="mx-2 hidden h-7 w-px shrink-0 bg-white/10 md:block" />
//       <div className="flex flex-1 items-center justify-center px-2 py-1 text-center md:px-5">
//         <p className="font-display max-w-md text-[12.5px] italic leading-relaxed text-white/80 md:text-[13.5px]">
//           <span className="text-[color:var(--gold)]">&ldquo;</span>We don&rsquo;t follow trends. We craft timeless expressions that transcend seasons, borders, and generations.<span className="text-[color:var(--gold)]">&rdquo;</span>
//         </p>
//       </div>
//       <span className="mx-2 hidden h-7 w-px shrink-0 bg-white/10 md:block" />
//       <a href="#" className="group flex flex-1 items-center justify-end gap-3 text-right">
//         <div>
//           <p className="text-[9.5px] font-semibold tracking-[0.18em] text-[color:var(--gold)]">THE MANIFESTO</p>
//           <p className="mt-0.5 max-w-[190px] text-[11px] leading-snug text-white/55">Read our manifesto on craft, culture &amp; creation.</p>
//         </div>
//         <PlayBadge />
//       </a>
//     </div>
//   )
// }

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */
export default function Philosophy() {
  const rootRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const sourcePinRef = useRef<HTMLDivElement>(null)
  const pinRefs = useRef<(HTMLDivElement | null)[]>([])

  const allPinRefs = useRef<(HTMLDivElement | null)[]>([])
  useLayoutEffect(() => {
    allPinRefs.current = [...pinRefs.current, sourcePinRef.current]
  }, [])

  const { path, dots } = useStitchPath(allPinRefs, gridRef)

  return (
    <section
      ref={rootRef}
      className={`${display.variable} ${sans.variable} relative w-full overflow-x-hidden px-5 py-10 md:px-10 md:py-14 lg:px-12 z-10`}
      style={{
        "--gold": GOLD,
        "--gold-soft": GOLD_SOFT,
        background: NAVY_DEEP,
        fontFamily: "var(--font-sans-ui)",
        width: "100%",
        maxWidth: "100%",
        paddingTop: "250px",
        paddingBottom: "40px",
        // Add margin-top to ensure proper spacing when scrolling
        marginTop: "100",
        /* marginTop removed - flows naturally after LandModel's spacer */
      } as React.CSSProperties}
    >
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `linear-gradient(100deg, rgba(7,7,10,0.15) 0%, rgba(7,7,10,0.6) 38%, ${NAVY_DEEP} 68%), linear-gradient(0deg, rgba(7,7,10,0.1) 0%, rgba(7,7,10,0.75) 92%), url(${BACKGROUND_IMAGE_SRC})`, backgroundSize: "cover, cover, 38% auto", backgroundPosition: "center, center, -2% 20%", backgroundRepeat: "no-repeat, no-repeat, no-repeat" }} />

      {/* Main Content - Rendered immediately with no opacity delays */}
      <div className="relative z-10 w-full h-full flex flex-col gap-8">
        <div ref={gridRef} className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-y-8 overflow-hidden lg:grid-cols-[0.78fr_1.22fr] lg:gap-x-8">
          
          {/* SVG Thread */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
            <defs>
              <linearGradient id="threadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD_SOFT} />
                <stop offset="50%" stopColor={GOLD_DEEP} />
                <stop offset="100%" stopColor={GOLD_DEEP} />
              </linearGradient>
              <filter id="threadShadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.4" /></filter>
            </defs>
            <path d={path} fill="none" stroke={NAVY_DEEP} strokeOpacity={0.55} strokeWidth={2.4} strokeLinecap="round" filter="url(#threadShadow)" transform="translate(1.2, 1.6)" />
            <path d={path} fill="none" stroke="url(#threadGradient)" strokeOpacity={0.95} strokeWidth={1.8} strokeLinecap="round" />
            {dots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r={3.4} fill={PANEL} stroke={GOLD} strokeWidth={1.1} />
                <circle cx={d.x} cy={d.y} r={1.2} fill={GOLD} />
              </g>
            ))}
          </svg>

          {/* Left Column - Text */}
          <div className="relative z-10 flex flex-col justify-start py-1 lg:py-2">
            <p className="mb-3 text-[10px] tracking-[0.28em] text-[color:var(--gold)]">OUR PHILOSOPHY</p>
            <h2 className="font-display text-[1.9rem] leading-[1.08] text-[#F3EFE6] sm:text-[2.2rem] md:text-[2.5rem]">
              <span className="block">One house.</span>
              <span className="block">Four distinct</span>
              <span className="block italic text-[color:var(--gold)]">expressions.</span>
            </h2>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
              Atelier Selvedge is built on the union of heritage and innovation, African craft and global luxury — woven together by intention, driven by excellence.
            </p>
            <div ref={sourcePinRef} className="pointer-events-none absolute top-[62%] right-[6%] h-px w-px" />
          </div>

          {/* Right Column - Pillars */}
          <div className="relative z-10">
            {PILLARS.map((pillar, i) => (
              <PillarRow key={pillar.num} pillar={pillar} pinRef={(el) => { pinRefs.current[i] = el }} />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="relative z-10 mx-auto mt-6 w-full max-w-[1280px] md:mt-8">
          <BottomBar />
        </div> */}
      </div>
    </section>
  )
}