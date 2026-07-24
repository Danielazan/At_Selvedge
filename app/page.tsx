// import LandModel from "@/Components/Hero/LandModel";
// import Image from "next/image";
// import Intro from "@/Components/Selvé/Intro";
// import DeHouse from "@/Components/Selvé/DeHouse";
// import Philosophy from "@/Components/Selvé/Philosophy";
// import Navbar from "@/Components/Navbar/Navbar";
// import FourHouses from "@/Components/Selvé/FourHouses";


// export default function Home() {
//   return (
//     <main className="w-full m-0 p-0 overflow-x-hidden">
//       <Navbar />
//       <LandModel />
//       <Philosophy/>
//       <FourHouses/>
//     </main>
//   )
// }


import LandModel from "@/Components/Hero/LandModel";
import Philosophy from "@/Components/Selvé/Philosophy";
import Navbar from "@/Components/Navbar/Navbar";
import FourHouses from "@/Components/Selvé/FourHouses";
import PersistentClothCanvas from "@/Components/Scene/PersistentCloth";
import Houseshowcase from "@/Components/Selvé/Houseshowcase";
import AutumnWinter from "@/Components/Editorial/AutumnWinter"

export default function Home() {
  return (
    <main className="w-full m-0 p-0 overflow-x-hidden relative">
      <Navbar />
      <LandModel />
      <Philosophy />

      {/*
        Scroll "track" for the Philosophy → FourHouses handoff. No pin —
        PersistentCloth.tsx scrubs its ScrollTrigger against this element's
        own scroll range, so the cloth breaks free of the "African Craft"
        pillar, becomes the hero of the viewport, then eases into the
        ATELION card as this track passes underneath. Tune the height to
        taste — taller gives the hero moment more room to breathe.
      */}
      <div id="philosophy-fourhouses-bridge" className="relative h-[70vh] md:h-[85vh]" aria-hidden />

      <FourHouses />

      {/* One persistent Canvas + one persistent <G_cloth/> instance, shared
          by Philosophy's "African Craft" pillar and FourHouses' "ATELION"
          card. Mounted once, for the lifetime of the page. */}
      <PersistentClothCanvas />

      <Houseshowcase/>

      <AutumnWinter/>
    </main>
  )
}