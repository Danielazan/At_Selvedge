"use client"

/**
 * Lets Intro wait for LandModel's ScrollHandoff pin to exist before it
 * creates its own ScrollTrigger. Creating a pinned trigger before an
 * earlier section's pin/spacer is in the DOM locks in stale start/end
 * offsets — a later refresh() then has to reconcile that mid-scroll,
 * which is what produced the phantom shrunken-Suit frame after Intro.
 */
type Listener = () => void

let handoffReady = false
const listeners = new Set<Listener>()

export function markScrollHandoffReady() {
  if (handoffReady) return
  handoffReady = true
  listeners.forEach((cb) => cb())
  listeners.clear()
}

export function onScrollHandoffReady(cb: Listener) {
  if (handoffReady) {
    cb()
    return () => {}
  }
  listeners.add(cb)
  return () => listeners.delete(cb)
}