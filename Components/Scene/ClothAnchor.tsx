"use client"

/**
 * ClothAnchor
 * ------------------------------------------------------------------
 * Invisible-to-3D, visible-in-DOM placeholder. Sections drop this in
 * exactly where the shared G_cloth model should visually "dock" — its
 * on-screen rect (position + width) is read every frame by
 * PersistentCloth.tsx to place/scale the one persistent model.
 *
 * Give it the same box styling (background glow, border, radius) the
 * old per-section mini-canvas card used, so the layout looks identical
 * at rest — the only thing that moved to the global canvas is the
 * G_cloth mesh itself.
 * ------------------------------------------------------------------ */

import { useEffect, useRef } from "react"
import { registerClothAnchor, type ClothAnchorId } from "./PersistentCloth"

export default function ClothAnchor({
  id,
  className,
  style,
}: {
  id: ClothAnchorId
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerClothAnchor(id, ref.current)
    return () => registerClothAnchor(id, null)
  }, [id])

  return <div ref={ref} className={className} style={style} />
}