// "use client"

// /**
//  * Lets Intro wait for LandModel's ScrollHandoff pin to exist before it
//  * creates its own ScrollTrigger. Creating a pinned trigger before an
//  * earlier section's pin/spacer is in the DOM locks in stale start/end
//  * offsets — a later refresh() then has to reconcile that mid-scroll,
//  * which is what produced the phantom shrunken-Suit frame after Intro.
//  */
// type Listener = () => void

// let handoffReady = false
// const listeners = new Set<Listener>()

// export function markScrollHandoffReady() {
//   if (handoffReady) return
//   handoffReady = true
//   listeners.forEach((cb) => cb())
//   listeners.clear()
// }

// export function onScrollHandoffReady(cb: Listener) {
//   if (handoffReady) {
//     cb()
//     return () => {}
//   }
//   listeners.add(cb)
//   return () => listeners.delete(cb)
// }

"use client"

/**
 * Scroll Bus - Central coordination for scroll-driven animations
 * 
 * Manages handoff between:
 * 1. LandModel → Philosophy (existing)
 * 2. Philosophy → FourHouses (new transition)
 */

type Listener = () => void

/* ------------------------------------------------------------------ */
/* Handoff: LandModel → Philosophy                                    */
/* ------------------------------------------------------------------ */
let handoffReady = false
const handoffListeners = new Set<Listener>()

export function markScrollHandoffReady() {
  if (handoffReady) return
  handoffReady = true
  handoffListeners.forEach((cb) => cb())
  handoffListeners.clear()
}

export function onScrollHandoffReady(cb: Listener) {
  if (handoffReady) {
    cb()
    return () => {}
  }
  handoffListeners.add(cb)
  return () => handoffListeners.delete(cb)
}

/* ------------------------------------------------------------------ */
/* Transition: Philosophy → FourHouses                                */
/* ------------------------------------------------------------------ */
let philosophyReady = false
let fourHousesReady = false
const transitionListeners = new Set<Listener>()

export function markPhilosophyReady() {
  philosophyReady = true
  checkTransitionReady()
}

export function markFourHousesReady() {
  fourHousesReady = true
  checkTransitionReady()
}

function checkTransitionReady() {
  if (philosophyReady && fourHousesReady) {
    transitionListeners.forEach((cb) => cb())
    transitionListeners.clear()
  }
}

export function onTransitionReady(cb: Listener) {
  if (philosophyReady && fourHousesReady) {
    cb()
    return () => {}
  }
  transitionListeners.add(cb)
  return () => transitionListeners.delete(cb)
}

/* ------------------------------------------------------------------ */
/* Reset (for hot reload / development)                               */
/* ------------------------------------------------------------------ */
export function resetScrollBus() {
  handoffReady = false
  philosophyReady = false
  fourHousesReady = false
  handoffListeners.clear()
  transitionListeners.clear()
}