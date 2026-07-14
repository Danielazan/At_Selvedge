"use client"



import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { Playfair_Display, Inter } from "next/font/google"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

/* ------------------------------------------------------------------ */
/* Pillar visuals — unchanged.                                         */
/* ------------------------------------------------------------------ */

function PillarVisual({ kind, imageSrc }: { kind: Pillar["visual"]; imageSrc?: string }) {
  const gradId = `bronze-${kind}`
  return (
    <div className="relative h-[80px] w-[64px] shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-[#0b0b0d] md:h-[92px] md:w-[74px]">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80px 90px at 22% 18%, rgba(228,197,103,0.22), transparent 62%)" }}
      />
      {imageSrc ? (
        <Image src={imageSrc} alt="" fill sizes="96px" className="object-cover" />
      ) : (
        <svg viewBox="0 0 96 120" className="absolute inset-0 h-full w-full p-2.5">
          <defs>
            <linearGradient id={gradId} x1="0.15" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor={GOLD_SOFT} />
              <stop offset="55%" stopColor={GOLD} />
              <stop offset="100%" stopColor={GOLD_DEEP} />
            </linearGradient>
          </defs>

          {kind === "heritage" && (
            <g>
              <path d="M48 10c11 0 18 8 18 19 0 7-3 11-3 16 5 2 9 5 9 11v46H24V56c0-6 4-9 9-11-1-5-3-9-3-16 0-11 7-19 18-19z" fill={`url(#${gradId})`} />
              <path d="M24 44c-4 2-7 6-7 11" stroke={GOLD_SOFT} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <ellipse cx="48" cy="102" rx="27" ry="4.5" fill={GOLD_DEEP} opacity="0.5" />
            </g>
          )}
          {kind === "innovation" && (
            <g>
              <rect x="16" y="82" width="34" height="12" rx="3" fill={`url(#${gradId})`} />
              <rect x="30" y="58" width="8" height="26" rx="4" fill={`url(#${gradId})`} />
              <circle cx="34" cy="54" r="7" fill={`url(#${gradId})`} />
              <rect x="34" y="34" width="8" height="24" rx="4" fill={`url(#${gradId})`} transform="rotate(28 38 46)" />
              <circle cx="58" cy="34" r="6.5" fill={`url(#${gradId})`} />
              <rect x="58" y="16" width="7" height="20" rx="3.5" fill={`url(#${gradId})`} transform="rotate(-20 62 26)" />
              <circle cx="70" cy="14" r="5.5" fill={GOLD_SOFT} />
              <ellipse cx="48" cy="102" rx="27" ry="4.5" fill={GOLD_DEEP} opacity="0.5" />
            </g>
          )}
          {kind === "craft" && (
            <g>
              <rect x="26" y="10" width="10" height="82" rx="4" fill={`url(#${gradId})`} />
              <rect x="60" y="10" width="10" height="82" rx="4" fill={`url(#${gradId})`} />
              <rect x="28" y="34" width="40" height="34" rx="2" fill="#171008" />
              {[38, 44, 50, 56, 62].map((y) => (
                <path key={y} d={`M28 ${y}L68 ${y - 5}`} stroke={GOLD_SOFT} strokeWidth="2" opacity={0.9} strokeLinecap="round" />
              ))}
              <path d="M62 66c10 5 14 13 9 21" stroke={GOLD_SOFT} strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <ellipse cx="48" cy="102" rx="27" ry="4.5" fill={GOLD_DEEP} opacity="0.5" />
            </g>
          )}
          {kind === "luxury" && (
            <g>
              <circle cx="48" cy="52" r="34" fill={`url(#${gradId})`} />
              <circle cx="48" cy="52" r="34" fill="none" stroke="#171008" strokeOpacity="0.25" strokeWidth="1" />
              <circle cx="48" cy="52" r="25" fill="none" stroke="#171008" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="1.5 4.5" />
              <text x="48" y="61" textAnchor="middle" fontSize="22" fontFamily="var(--font-display)" fill="#171008" fillOpacity="0.75">AS</text>
              <ellipse cx="48" cy="102" rx="27" ry="4.5" fill={GOLD_DEEP} opacity="0.5" />
            </g>
          )}
        </svg>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stitch thread — pin01 → pin02 → pin03 → pin04 → source, drawn as a  */
/* single continuous, strictly-alternating sine wave. Every segment    */
/* uses the SAME formula (no more special-cased "final leg"), and no   */
/* segment can ever bow wider than WAVE_AMPLITUDE or overshoot past    */
/* its own destination point — which is what removes the giant-loop    */
/* bug entirely.                                                       */
/* ------------------------------------------------------------------ */

type Point = { x: number; y: number }

// Tune these two to taste once you see it live against your icon size.
const WAVE_AMPLITUDE = 34       // max horizontal bow, in px, per side
const WAVE_AMPLITUDE_FLOOR = 16 // min bow even on very short legs, so
                                 // it never goes flat/straight

function buildStitchPath(points: Point[]): string {
  if (points.length < 2) return ""

  const lastIdx = points.length - 1
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`

  for (let i = 0; i < lastIdx; i++) {
    const a = points[i]
    const b = points[i + 1]

    const gapX = b.x - a.x
    const gapY = b.y - a.y

    // Strict alternation — this is what makes it read as a true sine
    // wave instead of a one-sided curl: i=0 bows right, i=1 bows
    // left, i=2 bows right, and so on, crossing the pin column at
    // every single pin.
    const side = i % 2 === 0 ? 1 : -1

    // Bow amplitude scales gently with gap size but is HARD CAPPED —
    // this is what keeps the long pin04 -> spool leg well-behaved
    // instead of ballooning the way the old uncapped version did.
    const bow =
      side *
      Math.min(WAVE_AMPLITUDE, Math.max(WAVE_AMPLITUDE_FLOOR, Math.abs(gapY) * 0.4))

    // Classic symmetric S-curve. Control points live at the 1/3 and
    // 2/3 marks vertically — NEVER past b.y — and are nudged toward
    // each other along gapX so a leg with very different x endpoints
    // (the spool leg) still reads as one smooth diagonal wave rather
    // than a straight jump with a bulge stapled onto it.
    const c1 = { x: a.x + gapX * 0.25 + bow, y: a.y + gapY * 0.33 }
    const c2 = { x: b.x - gapX * 0.25 + bow, y: a.y + gapY * 0.67 }

    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }

  return d
}

function useStitchPath(
  pinRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [path, setPath] = useState("")
  const [dots, setDots] = useState<Point[]>([])

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()
      const pts = pinRefs.current
        .filter((el): el is HTMLDivElement => Boolean(el))
        .map((el) => {
          const r = el.getBoundingClientRect()
          return { x: r.left + r.width / 2 - cRect.left, y: r.top + r.height / 2 - cRect.top }
        })

      if (pts.length >= 2) {
        setPath(buildStitchPath(pts))
        // Ring markers on the 4 pillar pins only — the source point is
        // the real photographed spool, it doesn't need a synthetic ring.
        setDots(pts.slice(0, -1))
      }
    }

    measure()
    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts
    fonts?.ready?.then(measure)
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(measure))
    const timeout = setTimeout(measure, 400)

    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener("resize", measure)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
      cancelAnimationFrame(raf1)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { path, dots }
}

/* ------------------------------------------------------------------ */
/* One pillar row — pin anchored near the TOP of the icon, matching     */
/* the reference.                                                      */
/* ------------------------------------------------------------------ */

function PillarRow({ pillar, pinRef }: { pillar: Pillar; pinRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div
      data-anim="pillar-row"
      className="relative flex items-stretch gap-3 border-b border-white/[0.08] py-3.5 last:border-none md:gap-4 md:py-4"
    >
      <div className="relative w-7 shrink-0 pt-0.5 md:w-9">
        <span className="font-display block select-none text-[20px] italic leading-none text-white/[0.16] md:text-[24px]">
          {pillar.num}
        </span>
      </div>

      <div className="relative shrink-0">
        {/* Pin sits on the icon's left edge, near the TOP — roughly
            level with the numeral, not the icon's vertical center. */}
        <div ref={pinRef} className="absolute left-0 top-4 h-px w-px md:top-5" />
        <PillarVisual kind={pillar.visual} />
      </div>

      <div className="group min-w-0 flex-1 pr-16 pt-0.5 md:pr-20">
        <h3 className="text-[11px] font-semibold tracking-[0.18em] text-[color:var(--gold)] md:text-[12px]">
          {pillar.title.toUpperCase()}
        </h3>
        <div className="my-1.5 h-px w-6 bg-[color:var(--gold)]/40" />
        <p className="max-w-[280px] text-[12px] leading-relaxed text-white/60 md:max-w-[320px] md:text-[13px]">
          {pillar.copy}
        </p>

        <a
          href="#"
          className="absolute right-0 top-3.5 flex items-center gap-1.5 text-[9.5px] font-medium tracking-[0.14em] text-[color:var(--gold)] transition-colors hover:text-[color:var(--gold-soft)] md:top-4 md:text-[10px]"
        >
          EXPLORE
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Bottom pill bar — unchanged.                                        */
/* ------------------------------------------------------------------ */

function PlayBadge() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/50 text-[color:var(--gold)] transition-transform duration-300 group-hover:scale-110 group-hover:border-[color:var(--gold)] md:h-9 md:w-9">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}

function BottomBar() {
  return (
    <div
      data-anim="bottom-bar"
      className="relative flex flex-col items-stretch gap-4 rounded-[20px] border px-5 py-4 backdrop-blur-xl md:flex-row md:items-center md:gap-0 md:rounded-full md:px-7 md:py-3.5"
      style={{ background: "linear-gradient(180deg, rgba(17,17,19,0.94), rgba(7,7,10,0.98))", borderColor: "rgba(201,162,39,0.18)" }}
    >
      <a href="#" className="group flex flex-1 items-center gap-3">
        <PlayBadge />
        <div>
          <p className="text-[9.5px] font-semibold tracking-[0.18em] text-[color:var(--gold)]">OUR STORY</p>
          <p className="mt-0.5 max-w-[190px] text-[11px] leading-snug text-white/55">Discover the journey behind Atelier Selvedge.</p>
        </div>
      </a>

      <span className="mx-2 hidden h-7 w-px shrink-0 bg-white/10 md:block" />

      <div className="flex flex-1 items-center justify-center px-2 py-1 text-center md:px-5">
        <p className="font-display max-w-md text-[12.5px] italic leading-relaxed text-white/80 md:text-[13.5px]">
          <span className="text-[color:var(--gold)]">&ldquo;</span>
          We don&rsquo;t follow trends. We craft timeless expressions that transcend seasons, borders, and generations.
          <span className="text-[color:var(--gold)]">&rdquo;</span>
        </p>
      </div>

      <span className="mx-2 hidden h-7 w-px shrink-0 bg-white/10 md:block" />

      <a href="#" className="group flex flex-1 items-center justify-end gap-3 text-right">
        <div>
          <p className="text-[9.5px] font-semibold tracking-[0.18em] text-[color:var(--gold)]">THE MANIFESTO</p>
          <p className="mt-0.5 max-w-[190px] text-[11px] leading-snug text-white/55">Read our manifesto on craft, culture &amp; creation.</p>
        </div>
        <PlayBadge />
      </a>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Root component                                                       */
/* ------------------------------------------------------------------ */

export default function Philosophy() {
  const rootRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)       // wraps BOTH columns
  const sourcePinRef = useRef<HTMLDivElement>(null)   // anchored over the spool art
  const pinRefs = useRef<(HTMLDivElement | null)[]>([])

  // Ordered [pin01, pin02, pin03, pin04, spool] — the spool goes LAST,
  // since it's the thread's short/decorative end, not its start.
  const allPinRefs = useRef<(HTMLDivElement | null)[]>([])
  useLayoutEffect(() => {
    allPinRefs.current = [...pinRefs.current, sourcePinRef.current]
  })

  const { path, dots } = useStitchPath(allPinRefs, gridRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="eyebrow"], [data-anim="headline-line"], [data-anim="body-copy"]', {
        y: 20, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      })
      gsap.from('[data-anim="pillar-row"]', {
        y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      })
      gsap.from('[data-anim="bottom-bar"]', {
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 30%" },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className={`${display.variable} ${sans.variable} relative w-full overflow-hidden px-5 py-10 md:px-10 md:py-14 lg:px-12`}
      style={{ "--gold": GOLD, "--gold-soft": GOLD_SOFT, background: NAVY_DEEP, fontFamily: "var(--font-sans-ui)" } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(7,7,10,0.15) 0%, rgba(7,7,10,0.6) 38%, ${NAVY_DEEP} 68%), linear-gradient(0deg, rgba(7,7,10,0.1) 0%, rgba(7,7,10,0.75) 92%), url(${BACKGROUND_IMAGE_SRC})`,
          backgroundSize: "cover, cover, 38% auto",
          // y-position moved from 108% (bottom) to 20% (near top), so the
          // spool now sits close to the top-aligned text column instead
          // of trailing off the bottom of the section. Nudge this % to
          // taste once you see the live render.
          backgroundPosition: "center, center, -2% 20%",
          backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        }}
      />

      {/* Grid wraps BOTH columns and carries the thread overlay, so the
          line can physically reach from the spool (left column) to
          the numbered pins (right column). */}
      <div
        ref={gridRef}
        className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-y-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-x-8"
      >
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
          <defs>
            {/* Vertical gold gradient — soft gold catching light at the
                top of each loop, deepening to bronze in the shadowed
                dips, matching the lit rope in the reference photo
                rather than a flat single-tone line. */}
            <linearGradient id="threadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD_SOFT} />
              <stop offset="50%" stopColor={GOLD_DEEP} />
              <stop offset="100%" stopColor={GOLD_DEEP} />
            </linearGradient>
            <filter id="threadShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>

          {/* Soft shadow pass, offset slightly down-right and blurred —
              gives the thread a rope-like sense of depth instead of
              reading as a flat vector line. */}
          <path
            d={path}
            fill="none"
            stroke={NAVY_DEEP}
            strokeOpacity={0.55}
            strokeWidth={2.4}
            strokeLinecap="round"
            filter="url(#threadShadow)"
            transform="translate(1.2, 1.6)"
          />

          {/* Main gold thread — solid cord, no dashing. */}
          <path
            d={path}
            fill="none"
            stroke="url(#threadGradient)"
            strokeOpacity={0.95}
            strokeWidth={1.8}
            strokeLinecap="round"
          />

          {dots.map((d, i) => (
            <g key={i}>
              <circle cx={d.x} cy={d.y} r={3.4} fill={PANEL} stroke={GOLD} strokeWidth={1.1} />
              <circle cx={d.x} cy={d.y} r={1.2} fill={GOLD} />
            </g>
          ))}
        </svg>

        {/* Left — eyebrow, headline, intro copy, plus the spool anchor.
            Changed from `justify-center` to `justify-start` so this
            block top-aligns with pillar 01 in the right column,
            instead of sitting vertically centered (and therefore
            lower) against the taller 4-row pillar list. */}
        <div className="relative z-10 flex flex-col justify-start py-1 lg:py-2">
          <p data-anim="eyebrow" className="mb-3 text-[10px] tracking-[0.28em] text-[color:var(--gold)]">
            OUR PHILOSOPHY
          </p>

          <h2 className="font-display text-[1.9rem] leading-[1.08] text-[#F3EFE6] sm:text-[2.2rem] md:text-[2.5rem]">
            <span data-anim="headline-line" className="block">One house.</span>
            <span data-anim="headline-line" className="block">Four distinct</span>
            <span data-anim="headline-line" className="block italic text-[color:var(--gold)]">expressions.</span>
          </h2>

          <p data-anim="body-copy" className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
            Atelier Selvedge is built on the union of heritage and
            innovation, African craft and global luxury — woven together
            by intention, driven by excellence.
          </p>

          {/* Invisible anchor over the spool in the background photo.
              Re-anchored from `bottom-[3%]` to `top-[62%]` to track
              the spool's new position now that the background image
              sits near the top of the section (see backgroundPosition
              above) instead of the bottom. Nudge top/right % if it's
              not sitting exactly on the spool. */}
          <div
            ref={sourcePinRef}
            className="pointer-events-none absolute top-[62%] right-[6%] h-px w-px"
          />
        </div>

        {/* Right — pillar list (thread is drawn by the parent overlay above) */}
        <div className="relative z-10">
          {PILLARS.map((pillar, i) => (
            <PillarRow
              key={pillar.num}
              pillar={pillar}
              pinRef={(el) => {
                pinRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 w-full max-w-[1280px] md:mt-8">
        <BottomBar />
      </div>
    </section>
  )
}