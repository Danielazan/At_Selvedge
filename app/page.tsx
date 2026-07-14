import LandModel from "@/Components/Hero/LandModel";
import Image from "next/image";
import Intro from "@/Components/Selvé/Intro";
import DeHouse from "@/Components/Selvé/DeHouse";
import Philosophy from "@/Components/Selvé/Philosophy";

// export default function Home() {
//   return (
//     <div className="w-screen h-screen m-0 p-0 overflow-hidden">
//       <LandModel/>
//     </div>
//   );
// }

export default function Home() {
  return (
    <main className="w-full m-0 p-0 overflow-x-hidden">
      <LandModel />
      <Intro/>
      {/* <DeHouse/> */}
      <Philosophy/>
    </main>
  )
}