import LandModel from "@/Components/Hero/LandModel";
import Image from "next/image";
import Intro from "@/Components/Selvé/Intro";
import DeHouse from "@/Components/Selvé/DeHouse";
import Philosophy from "@/Components/Selvé/Philosophy";
import Navbar from "@/Components/Navbar/Navbar";
import FourHouses from "@/Components/Selvé/FourHouses";


export default function Home() {
  return (
    <main className="w-full m-0 p-0 overflow-x-hidden">
      <Navbar />
      <LandModel />
      <Philosophy/>
      <FourHouses/>
    </main>
  )
}