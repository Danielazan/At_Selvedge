"use client"
import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     smoothWheel: true,
  //   })

  //   lenis.on("scroll", ScrollTrigger.update)

  //   // Whenever ScrollTrigger recalculates pin/trigger positions
  //   // (new sections mounting, images/models loading, resize, etc.),
  //   // tell Lenis to recompute its scroll limit to match.
  //   const onRefresh = () => lenis.resize()
  //   ScrollTrigger.addEventListener("refresh", onRefresh)

  //   const raf = (time: number) => {
  //     lenis.raf(time * 1000)
  //   }
  //   gsap.ticker.add(raf)
  //   gsap.ticker.lagSmoothing(0)

  //   // Run one refresh after everything has had a chance to mount,
  //   // so the very first pin spacer heights are captured correctly.
  //   ScrollTrigger.refresh()

  //   return () => {
  //     gsap.ticker.remove(raf)
  //     ScrollTrigger.removeEventListener("refresh", onRefresh)
  //     lenis.destroy()
  //   }
  // }, [])

  useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on("scroll", ScrollTrigger.update)

  const onRefresh = () => lenis.resize()
  ScrollTrigger.addEventListener("refresh", onRefresh)

  const raf = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // ❌ removed: ScrollTrigger.refresh() here fires too early —
  // LandModel's ScrollHandoff pin and Intro's SuitDirector pin
  // don't exist yet at this point, so their spacer heights get
  // computed wrong (or not at all) on the initial pass.

  return () => {
    gsap.ticker.remove(raf)
    ScrollTrigger.removeEventListener("refresh", onRefresh)
    lenis.destroy()
  }
}, [])

  return <>{children}</>
}

