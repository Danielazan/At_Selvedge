"use client"

/**
 * Navbar — Atelier Selvedge
 * ------------------------------------------------------------------
 * Self-contained navigation component. Ships two mobile presentations:
 *   - "compact"  → icon rail (AS badge, 5 icon buttons, button toggle)
 *   - "centered" → hamburger, centered wordmark, button toggle
 * Desktop is a single floating pill with default / hover / active /
 * scrolled / disabled states baked in via CSS + React state.
 *
 * Usage:
 *   import Navbar from "@/Components/Navbar/Navbar"
 *   <Navbar />                       // compact mobile (default)
 *   <Navbar mobileVariant="centered" // alternate mobile style
 *   <Navbar disabled />               // fully inert / muted
 * ------------------------------------------------------------------
 */

import React, { useCallback, useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from "next/font/google"

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-nav-display",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nav-sans",
})

/* ------------------------------------------------------------------ */
/* Tokens — exact palette                                              */
/* ------------------------------------------------------------------ */

const GOLD = "#D9B67A"
const CREAM = "#F5F3EE"
const INK = "#111113"
const VOID = "#08080D"

/* ------------------------------------------------------------------ */
/* Icons — inline, stroke-based, consistent weight (no icon deps)      */
/* ------------------------------------------------------------------ */

type IconProps = React.SVGProps<SVGSVGElement>

const IconSearch = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.3" />
    <path d="M15.3 15.3L21 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const IconClose = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconHamburger = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

/** 4-hole coat button — doubles as the "menu" toggle to echo the denim theme */
const IconCoatButton = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
    <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
  </svg>
)

/** Dress form / mannequin bust — "The House" */
const IconBust = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="5.2" r="2.2" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M6 20.5c0-4.2 1.2-7 3-8.4M18 20.5c0-4.2-1.2-7-3-8.4M9 12.1c.8-.5 1.9-.8 3-.8s2.2.3 3 .8M8 15.5h8"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

/** Hanger — "Four Houses" */
const IconHanger = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="5" r="1.4" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="M12 6.4v2M12 8.4L4 14.2c-1 .7-.6 2.3.6 2.3h14.8c1.2 0 1.6-1.6.6-2.3L12 8.4zM6 18.5h12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/** Open book — "Journal" */
const IconBook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 6.2c-1.6-1.2-3.6-1.7-5.8-1.7-.6 0-1.2.05-1.2.6v11.4c0 .5.5.6 1 .6 2.2 0 4.3.5 6 1.9 1.7-1.4 3.8-1.9 6-1.9.5 0 1-.1 1-.6V5.1c0-.55-.6-.6-1.2-.6-2.2 0-4.2.5-5.8 1.7z"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    <path d="M12 6.2v12.4" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)

/** Person — "About" */
const IconPerson = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="7.3" r="3" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5 19c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

/** Phone — "Contact" */
const IconPhone = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M6 3.5h3l1.4 3.6-2 1.6a11.5 11.5 0 006 6l1.6-2 3.6 1.4v3c0 .9-.8 1.6-1.7 1.5-8-1-13.4-6.4-14.4-14.4-.1-.9.6-1.7 1.5-1.7z"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </svg>
)

/* ------------------------------------------------------------------ */
/* Nav data                                                             */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { label: "The House", icon: IconBust },
  { label: "Four Houses", icon: IconHanger },
  { label: "Journal", icon: IconBook },
  { label: "About", icon: IconPerson },
  { label: "Contact", icon: IconPhone },
] as const

/* ------------------------------------------------------------------ */
/* Decorative selvedge stitch — the dashed gold seam tracing the pill  */
/* ------------------------------------------------------------------ */

function SelvedgeStitch() {
  return (
    <svg
      className="pointer-events-none absolute -right-1 -top-1 h-[46px] w-[70px] opacity-70"
      viewBox="0 0 70 46"
      fill="none"
    >
      <path
        d="M4 40C4 20 20 4 60 4"
        stroke={GOLD}
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="2 4"
        strokeLinecap="round"
      />
      <circle cx="60" cy="4" r="1.6" fill={GOLD} fillOpacity="0.8" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Root component                                                       */
/* ------------------------------------------------------------------ */

export interface NavbarProps {
  /** Which mobile presentation to render below the `lg` breakpoint. */
  mobileVariant?: "compact" | "centered"
  /** Fully mutes the navbar — greyed labels, no hover/active response. */
  disabled?: boolean
  /** Called with the index of the clicked nav item. */
  onNavigate?: (index: number) => void
}

export default function Navbar({
  mobileVariant = "compact",
  disabled = false,
  onNavigate,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // close the mobile dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [menuOpen])

  const selectItem = useCallback(
    (i: number) => {
      if (disabled) return
      setActiveIndex(i)
      setMenuOpen(false)
      onNavigate?.(i)
    },
    [disabled, onNavigate]
  )

  const pillBg = scrolled
    ? `linear-gradient(180deg, rgba(17,17,19,0.97), rgba(8,8,13,0.99))`
    : `linear-gradient(180deg, rgba(17,17,19,0.82), rgba(8,8,13,0.88))`

  return (
    <div
      className={`${display.variable} ${sans.variable}`}
      style={{ fontFamily: "var(--font-nav-sans)" }}
    >
      {/* ============================== DESKTOP ============================== */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 hidden justify-center px-6 pt-5 lg:flex ${
          disabled ? "pointer-events-none" : ""
        }`}
      >
        <div
          className="relative flex w-full max-w-[1180px] items-center justify-between rounded-full border px-7 py-3.5 backdrop-blur-xl transition-[background,box-shadow] duration-500"
          style={{
            background: pillBg,
            borderColor: disabled ? "rgba(255,255,255,0.06)" : "rgba(217,182,122,0.16)",
            boxShadow: scrolled ? "0 12px 40px -18px rgba(0,0,0,0.7)" : "none",
          }}
        >
          {!disabled && <SelvedgeStitch />}

          {/* Logo lockup */}
          <div className="flex shrink-0 items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full border"
              style={{ borderColor: `${GOLD}66` }}
            >
              <span
                className="text-[15px] tracking-[0.06em]"
                style={{ fontFamily: "var(--font-nav-display)" }}
              >
                <span style={{ color: disabled ? "rgba(255,255,255,0.35)" : CREAM }}>A</span>
                <span style={{ color: disabled ? "rgba(255,255,255,0.25)" : GOLD }}>S</span>
              </span>
            </div>
            <div className="leading-tight">
              <p
                className="text-[13px] tracking-[0.16em]"
                style={{
                  fontFamily: "var(--font-nav-display)",
                  color: disabled ? "rgba(245,243,238,0.35)" : CREAM,
                }}
              >
                ATELIER SELVEDGE
              </p>
              <p
                className="mt-0.5 text-[9px] tracking-[0.28em]"
                style={{ color: disabled ? "rgba(217,182,122,0.3)" : GOLD }}
              >
                A PAN-AFRICAN LUXURY HOUSE
              </p>
            </div>
          </div>

          {/* Center links */}
          <div className="flex items-center gap-9">
            {NAV_ITEMS.map((item, i) => {
              const isActive = i === activeIndex
              const isHover = i === hoverIndex
              const lit = !disabled && (isActive || isHover)
              return (
                <button
                  key={item.label}
                  disabled={disabled}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => selectItem(i)}
                  className="relative py-1 text-[11px] font-medium tracking-[0.18em] transition-colors duration-200"
                  style={{
                    color: disabled
                      ? "rgba(255,255,255,0.22)"
                      : lit
                      ? CREAM
                      : "rgba(255,255,255,0.55)",
                  }}
                >
                  {item.label.toUpperCase()}
                  {isActive && !disabled && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 h-px w-full -translate-x-1/2"
                      style={{ background: `${GOLD}99` }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ background: GOLD }}
                      />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-5">
            <button
              disabled={disabled}
              className="flex items-center gap-2 text-[11px] tracking-[0.18em] transition-colors"
              style={{ color: disabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)" }}
            >
              SEARCH
              <IconSearch className="h-3.5 w-3.5" />
            </button>

            <span
              className="h-4 w-px"
              style={{ background: disabled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)" }}
            />

            <button
              disabled={disabled}
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 text-[11px] tracking-[0.18em] transition-colors"
              style={{ color: disabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)" }}
            >
              MENU
            </button>

            <button
              disabled={disabled}
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{
                background: disabled
                  ? "rgba(255,255,255,0.06)"
                  : `radial-gradient(circle at 35% 30%, ${GOLD}, #B08A4C)`,
                color: disabled ? "rgba(255,255,255,0.3)" : INK,
              }}
            >
              <IconCoatButton className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ============================== MOBILE ============================== */}
      <div className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:hidden ${disabled ? "pointer-events-none" : ""}`}>
        <div ref={menuRef} className="mx-auto max-w-md">
          {mobileVariant === "compact" ? (
            <div
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-2 backdrop-blur-xl"
              style={{ background: pillBg, borderColor: disabled ? "rgba(255,255,255,0.06)" : `${GOLD}29` }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `${GOLD}66` }}
              >
                <span className="text-[12px]" style={{ fontFamily: "var(--font-nav-display)" }}>
                  <span style={{ color: disabled ? "rgba(255,255,255,0.35)" : CREAM }}>A</span>
                  <span style={{ color: disabled ? "rgba(255,255,255,0.25)" : GOLD }}>S</span>
                </span>
              </div>

              {NAV_ITEMS.map((item, i) => {
                const isActive = i === activeIndex
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    disabled={disabled}
                    onClick={() => selectItem(i)}
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                    style={{
                      background: isActive && !disabled ? GOLD : "transparent",
                      color: disabled
                        ? "rgba(255,255,255,0.25)"
                        : isActive
                        ? INK
                        : "rgba(255,255,255,0.6)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {isActive && !disabled && (
                      <span
                        className="absolute -bottom-1.5 h-1 w-1 rounded-full"
                        style={{ background: GOLD }}
                      />
                    )}
                  </button>
                )
              })}

              <button
                disabled={disabled}
                onClick={() => setMenuOpen((o) => !o)}
                className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95"
                style={{
                  background: disabled
                    ? "rgba(255,255,255,0.06)"
                    : `radial-gradient(circle at 35% 30%, ${GOLD}, #B08A4C)`,
                  color: disabled ? "rgba(255,255,255,0.3)" : INK,
                }}
              >
                {menuOpen ? <IconClose className="h-4 w-4" /> : <IconCoatButton className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <div
              className="flex items-center gap-3 rounded-full border px-3 py-2 backdrop-blur-xl"
              style={{ background: pillBg, borderColor: disabled ? "rgba(255,255,255,0.06)" : `${GOLD}29` }}
            >
              <button
                disabled={disabled}
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ color: disabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.75)" }}
              >
                <IconHamburger className="h-4.5 w-4.5" />
              </button>

              <div className="flex flex-1 items-center justify-center gap-2">
                <span
                  className="text-[12px]"
                  style={{ fontFamily: "var(--font-nav-display)", color: disabled ? "rgba(255,255,255,0.35)" : CREAM }}
                >
                  AS
                </span>
                <span
                  className="text-[12px] tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-nav-display)", color: disabled ? "rgba(255,255,255,0.35)" : CREAM }}
                >
                  ATELIER SELVEDGE
                </span>
              </div>

              <button
                disabled={disabled}
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95"
                style={{
                  background: disabled
                    ? "rgba(255,255,255,0.06)"
                    : `radial-gradient(circle at 35% 30%, ${GOLD}, #B08A4C)`,
                  color: disabled ? "rgba(255,255,255,0.3)" : INK,
                }}
              >
                {menuOpen ? <IconClose className="h-4 w-4" /> : <IconCoatButton className="h-4 w-4" />}
              </button>
            </div>
          )}

          {/* Dropdown — shared by both mobile variants */}
          {menuOpen && !disabled && (
            <div
              className="mt-2 overflow-hidden rounded-2xl border"
              style={{ background: pillBg, borderColor: `${GOLD}29` }}
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = i === activeIndex
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => selectItem(i)}
                    className="flex w-full items-center gap-3 px-5 py-3.5 text-[12px] tracking-[0.14em] transition-colors"
                    style={{
                      background: isActive ? `${GOLD}E6` : "transparent",
                      color: isActive ? INK : "rgba(255,255,255,0.8)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label.toUpperCase()}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: INK }} />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}