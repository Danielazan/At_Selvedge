// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, DoorOpen, Shirt, Box, ShoppingBag } from "lucide-react";

// interface House {
//   number: string;
//   name: string;
//   eyebrow: string;
//   titleLines: string[];
//   description: string;
//   tags?: string;
//   cta: string;
//   href: string;
//   image: string;
//   imagePosition: string;
//   seal?: boolean;
// }

// const houses: House[] = [
//   {
//     number: "01",
//     name: "SELVÉ",
//     eyebrow: "01",
//     titleLines: ["Modern", "Heritage"],
//     description:
//       "Built for people who move between cities, ideas and cultures. Selvé transforms timeless denim into an everyday signature.",
//     tags: "Authentic. Contemporary. Confident.",
//     cta: "DISCOVER SELVÉ",
//     href: "/four-houses/selve",
//     image: "/imgs/Lv-Seleve.png",
//     imagePosition: "center 30%",
//     seal: true,
//   },
//   {
//     number: "02",
//     name: "ATELION",
//     eyebrow: "02",
//     titleLines: ["Tailored", "Confidence"],
//     description:
//       "For moments where presence speaks before words. Refined tailoring designed to accompany ambition.",
//     cta: "ENTER ATELION",
//     href: "/four-houses/atelion",
//     image: "/imgs/Lv-Atelion.png",
//     imagePosition: "center 20%",
//   },
//   {
//     number: "03",
//     name: "LURÉ",
//     eyebrow: "03",
//     titleLines: ["The Art of", "Presence"],
//     description:
//       "Fragrance. Wellness. Self-care. A ritual designed to elevate every ordinary moment.",
//     cta: "DISCOVER LURÉ",
//     href: "/four-houses/lure",
//     image: "/imgs/Lv-Lure.png",
//     imagePosition: "center 40%",
//   },
//   {
//     number: "04",
//     name: "MAIVON",
//     eyebrow: "04",
//     titleLines: ["Spaces Worth", "Living In"],
//     description:
//       "Objects chosen with intention. Designed to transform a house into a home.",
//     cta: "ENTER MAIVON",
//     href: "/four-houses/maivon",
//     image: "/imgs/Lv-Maivon.png",
//     imagePosition: "center 20%",
//   },
// ];

// const journeySteps = [
//   { Icon: DoorOpen, title: "Choose Your House", description: "Find the world that reflects you." },
//   { Icon: Shirt, title: "Explore Collections", description: "Discover pieces crafted for your life." },
//   { Icon: Box, title: "Curate Your Lifestyle", description: "Mix, match and make it yours." },
//   { Icon: ShoppingBag, title: "Own The Experience", description: "Timeless pieces. Lasting impact." },
// ];

// function HouseCard({ house, isWide }: { house: House; isWide?: boolean }) {
//   return (
//     <div
//       className={`group relative flex-1 min-h-[420px] md:min-h-[480px] overflow-hidden ${
//         isWide ? "lg:min-h-[550px]" : ""
//       }`}
//     >
//       <Image
//         src={house.image}
//         alt={`${house.name} — ${house.titleLines.join(" ")}`}
//         fill
//         sizes="(min-width: 1024px) 33vw, 100vw"
//         className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//         style={{ objectPosition: house.imagePosition }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
//       <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 md:p-10">
//         <div className="flex flex-col gap-1">
//           <span className="text-xs font-medium tracking-[0.3em] text-amber-400/80">
//             {house.eyebrow}
//           </span>
//           <p className="text-sm font-semibold tracking-[0.25em] text-white/80 mt-1">
//             {house.name}
//           </p>
//         </div>

//         <div className="max-w-[240px] mb-12 md:mb-16">
//           <h3 className="font-serif text-3xl leading-[1.1] text-white sm:text-4xl md:text-5xl tracking-tight mb-3">
//             {house.titleLines.map((line, i) => (
//               <span key={i} className="block">
//                 {line}
//               </span>
//             ))}
//           </h3>
//           <div className="w-8 h-px bg-amber-400/70 mb-3" />
//           <p className="text-[15px] leading-relaxed text-white/90 font-light tracking-wide">
//             {house.description}
//           </p>
//           {house.tags && (
//             <p className="mt-3 text-sm text-white/70 italic">{house.tags}</p>
//           )}
//         </div>

//         <Link
//           href={house.href}
//           className="absolute bottom-6 right-6 md:bottom-8 md:right-8 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-amber-400 transition-all hover:text-amber-300 hover:gap-3"
//         >
//           {house.cta}
//           <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default function HouseShowcase() {
//   return (
//     <section className="bg-black w-full relative flex flex-col pt-8 lg:pt-10">
//       {/* Background Layer */}
//       <div className="absolute inset-0 bg-[url('/imgs/back.png')] bg-cover bg-[center_30%] opacity-60 mix-blend-overlay" />
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/60" />
//       <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

//       {/* Decorative horizontal divider */}
//       <div className="absolute left-0 right-0 top-[60%] h-px z-20 hidden lg:block bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
//       <div className="absolute left-[10%] right-[10%] top-[60%] h-[1px] z-20 hidden lg:block bg-amber-400/10 blur-[1px]" />

//       {/* Top Row: Hero + 2 Houses — the gold line + seal belong ONLY here */}
//       <div className="relative z-10 flex flex-col lg:flex-row w-full border-b border-white/10 lg:h-[600px]">
//         {/* Left Hero Panel — 30% */}
//         <div className="w-full lg:w-[30%] flex flex-col justify-center gap-4 lg:gap-6 px-6 py-12 sm:px-10 lg:px-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/40">
//           <div>
//             <p className="text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase">
//               LIVE THE HOUSE
//             </p>
//             <div className="w-8 h-px bg-amber-400/50 mt-2 mb-4" />
//           </div>
//           <h2 className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem] tracking-tight">
//             Luxury
//             <br />
//             is not purchased.
//             <br />
//             <span className="italic text-amber-400 font-normal">It is lived.</span>
//           </h2>
//           <div className="max-w-sm space-y-4 mt-2">
//             <p className="text-[15px] leading-relaxed text-white/70 font-light">
//               Every house represents more than products. Each one is a
//               different way of living — crafted for people who express
//               themselves through style, beauty, and meaningful spaces.
//             </p>
//             <p className="text-[15px] leading-relaxed text-white/70 font-light">
//               Choose the world that reflects yours.
//             </p>
//           </div>
//           <Link
//             href="/four-houses"
//             className="mt-4 inline-flex w-fit items-center gap-3 border border-amber-400/80 px-6 py-3 text-[11px] font-semibold tracking-[0.15em] text-amber-400 transition-all hover:bg-amber-400/10 hover:border-amber-300"
//           >
//             EXPLORE EVERY HOUSE
//             <ArrowRight className="h-4 w-4" aria-hidden="true" />
//           </Link>
//         </div>

//         {/* Houses 01 (Selvé) — 34% (occupies 30% → 64%) */}
//         <div className="w-full lg:w-[34%] relative border-b lg:border-b-0 lg:border-r border-white/10">
//           <HouseCard house={houses[0]} />
//         </div>

//         {/*
//           Vertical Divider Line & "AS" Sunburst Seal.
//           FIX: this belongs to the TOP ROW ONLY — the reference shows
//           no vertical line running through the Luré/Maivon row at all.
//           It's now a child of this row div again (not a full-height
//           overlay on a shared wrapper), so it stops exactly where the
//           top row ends and never touches the bottom row's images.
//         */}
//         <div className="absolute top-0 bottom-0 left-[64%] z-20 hidden lg:flex flex-col items-center justify-center pointer-events-none">
//           <div className="w-[3px] h-full bg-[#D9B67A] shadow-[0_0_12px_rgba(217,182,122,0.8)]" />
//           <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[8px] bg-[#D9B67A]/30 blur-[4px]" />

//           <div className="absolute top-[42%] -translate-y-1/2 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center">
//             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(217,182,122,0.3)]">
//               <circle cx="50" cy="50" r="46" fill="none" stroke="#D9B67A" strokeWidth="2.5" opacity="0.95" />
//               <g stroke="#D9B67A" strokeWidth="1.8" opacity="0.9">
//                 {[...Array(24)].map((_, i) => (
//                   <line key={i} x1="50" y1="4" x2="50" y2="12" transform={`rotate(${i * 15}, 50, 50)`} />
//                 ))}
//               </g>
//               <circle cx="50" cy="50" r="24" fill="none" stroke="#D9B67A" strokeWidth="3" opacity="1" />
//               <text
//                 x="50"
//                 y="54"
//                 textAnchor="middle"
//                 fill="#D9B67A"
//                 fontSize="22"
//                 fontFamily="serif"
//                 fontWeight="700"
//                 letterSpacing="1.5"
//               >
//                 AS
//               </text>
//             </svg>
//           </div>
//         </div>

//         {/* Houses 02 (Atelion) — 36% (occupies 64% → 100%) */}
//         <div className="w-full lg:w-[36%] relative">
//           <HouseCard house={houses[1]} />
//         </div>
//       </div>

//       {/* Bottom Row: House 03 (Lure) + House 04 (Maivon) — NO vertical line here */}
//       <div className="relative z-10 flex flex-col lg:flex-row w-full">
//         <div className="w-full lg:w-[55%] relative border-b lg:border-b-0 lg:border-r border-white/10">
//           <HouseCard house={houses[2]} isWide />
//         </div>
//         <div className="w-full lg:w-[45%] relative">
//           <HouseCard house={houses[3]} />
//         </div>
//       </div>

//       {/* Bottom info strip */}
//       <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
//         <div className="flex flex-col lg:flex-row w-full">
//           <div className="flex justify-center lg:justify-start pl-6 lg:pl-10 pr-6 py-6 border-b lg:border-b-0 lg:border-r border-white/10 w-full lg:w-[18%] shrink-0 bg-black/40">
//             <p className="text-[12px] font-bold tracking-[0.2em] text-white uppercase leading-tight text-center lg:text-left">
//               YOUR JOURNEY
//               <br />
//               BEGINS HERE
//             </p>
//           </div>

//           <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-1">
//             {journeySteps.map((step, i) => (
//               <div
//                 key={step.title}
//                 className="relative flex-1 flex items-center gap-4 px-4 py-6 border-b lg:border-b-0 lg:border-r border-white/10 last:border-r-0"
//               >
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-black/40">
//                   <step.Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
//                 </div>
//                 <div>
//                   <p className="text-[11px] font-semibold tracking-[0.15em] text-white uppercase">
//                     {step.title}
//                   </p>
//                   <p className="mt-1 text-xs leading-relaxed text-white/60">
//                     {step.description}
//                   </p>
//                 </div>
//                 {i < journeySteps.length - 1 && (
//                   <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block h-4 w-4 text-amber-400/50" />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="w-full lg:w-[22%] flex justify-center lg:justify-end items-center px-6 py-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40">
//             <blockquote className="font-serif text-lg italic leading-snug text-amber-400/90 text-right max-w-[180px]">
//               <span>&ldquo;Luxury is remembered</span>
//               <br />
//               <span>long after</span>
//               <br />
//               <span>it is purchased.&rdquo;</span>
//             </blockquote>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DoorOpen, Shirt, Box, ShoppingBag } from "lucide-react";

interface House {
  eyebrow: string;
  name: string;
  titleLines: string[];
  paragraphs: string[];
  cta: string;
  href: string;
  image: string;
  imagePosition: string;
  seal?: boolean;
}

const houses: House[] = [
  {
    eyebrow: "01",
    name: "SELVÉ",
    titleLines: ["Modern", "Heritage"],
    paragraphs: [
      "Built for people who move between cities, ideas and cultures.",
      "Selvé transforms timeless denim into an everyday signature.",
      "Authentic. Contemporary. Confident.",
    ],
    cta: "DISCOVER SELVÉ",
    href: "/four-houses/selve",
    image: "/imgs/Lv-Seleve.png",
    imagePosition: "center 30%",
    seal: true,
  },
  {
    eyebrow: "02",
    name: "ATELION",
    titleLines: ["Tailored", "Confidence"],
    paragraphs: [
      "For moments where presence speaks before words.",
      "Refined tailoring designed to accompany ambition.",
    ],
    cta: "ENTER ATELION",
    href: "/four-houses/atelion",
    image: "/imgs/Lv-Atelion.png",
    imagePosition: "center 20%",
  },
  {
    eyebrow: "03",
    name: "LURÉ",
    titleLines: ["The Art of", "Presence"],
    paragraphs: [
      "Fragrance. Wellness. Self-care.",
      "A ritual designed to elevate every ordinary moment.",
    ],
    cta: "DISCOVER LURÉ",
    href: "/four-houses/lure",
    image: "/imgs/Lv-Lure.png",
    imagePosition: "center 40%",
  },
  {
    eyebrow: "04",
    name: "MAIVON",
    titleLines: ["Spaces Worth", "Living In"],
    paragraphs: [
      "Objects chosen with intention.",
      "Designed to transform a house into a home.",
    ],
    cta: "ENTER MAIVON",
    href: "/four-houses/maivon",
    image: "/imgs/Lv-Maivon.png",
    imagePosition: "center 20%",
  },
];

const journeySteps = [
  { Icon: DoorOpen, title: "Choose Your House", description: "Find the world that reflects you." },
  { Icon: Shirt, title: "Explore Collections", description: "Discover pieces crafted for your life." },
  { Icon: Box, title: "Curate Your Lifestyle", description: "Mix, match and make it yours." },
  { Icon: ShoppingBag, title: "Own The Experience", description: "Timeless pieces. Lasting impact." },
];

function SealEmblem() {
  const rays = Array.from({ length: 24 });
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center md:h-20 md:w-20"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {rays.map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="4"
            x2="50"
            y2="15"
            stroke="currentColor"
            strokeWidth="1"
            className="text-amber-400/60"
            transform={`rotate(${(i * 360) / rays.length} 50 50)`}
          />
        ))}
        <circle
          cx="50"
          cy="50"
          r="27"
          className="fill-black/70 text-amber-400/60"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="relative font-serif text-lg tracking-widest text-amber-400">
        AS
      </span>
    </div>
  );
}

function HouseCard({ house }: { house: House }) {
  return (
    <div className="group relative flex-1 min-h-[420px] overflow-hidden md:min-h-[480px]">
      <Image
        src={house.image}
        alt={`${house.name} — ${house.titleLines.join(" ")}`}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ objectPosition: house.imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/85" />

      <div className="relative flex h-full flex-col p-6 sm:p-8 md:p-10">
        {/* Eyebrow + name */}
        <div className="flex flex-col gap-1.5">
          <span className="font-serif text-base italic tracking-wide text-amber-400/90">
            {house.eyebrow}
          </span>
          <p className="text-xs font-semibold tracking-[0.3em] text-white/75">
            {house.name}
          </p>
        </div>

        {/* Title + copy, anchored just below the eyebrow (not spread to bottom) */}
        <div className="mt-6 max-w-xs md:mt-8">
          <h3 className="font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            {house.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h3>

          <div className="mb-4 mt-3 h-px w-8 bg-amber-400/70" />

          <div className="space-y-2.5">
            {house.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[14px] font-light leading-relaxed tracking-wide text-white/85"
              >
                {p}
              </p>
            ))}
          </div>

          <Link
            href={house.href}
            className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-amber-400 transition-all hover:gap-3 hover:text-amber-300"
          >
            {house.cta}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HouseShowcase() {
  return (
    <section className="relative flex w-full flex-col bg-black">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/imgs/Lv-back.png')] bg-cover bg-center opacity-35 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* Rows 1 + 2 share one relative wrapper so the gold divider + seal can span both */}
      <div className="relative z-10">
        {/* Continuous artistic divider line running through rows 1 & 2 */}
        <div className="pointer-events-none absolute inset-y-0 left-[60%] z-20 hidden w-px bg-gradient-to-b from-amber-100/0 via-amber-100/35 to-amber-100/0 lg:block" />
        {/* Seal medallion sitting on the divider, at the row 1 / row 2 seam */}
        <div className="absolute left-[60%] top-[54%] z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
          <SealEmblem />
        </div>

        {/* Row 1: Hero + House 01 + House 02 */}
        <div className="flex w-full flex-col border-b border-white/10 lg:h-[600px] lg:flex-row">
          <div className="flex w-full flex-col justify-center gap-4 border-b border-white/10 bg-black/40 px-6 py-12 sm:px-10 lg:w-[22%] lg:border-b-0 lg:border-r lg:px-8 lg:gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Live The House
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Luxury
              <br />
              is not purchased.
              <br />
              <span className="font-normal italic text-amber-400">It is lived.</span>
            </h2>
            <div className="mt-2 max-w-sm space-y-4">
              <p className="text-[15px] font-light leading-relaxed text-white/70">
                Every house represents more than products. Each one is a
                different way of living — crafted for people who express
                themselves through style, beauty, and meaningful spaces.
              </p>
              <p className="text-[15px] font-light leading-relaxed text-white/70">
                Choose the world that reflects yours.
              </p>
            </div>
            <Link
              href="/four-houses"
              className="mt-4 inline-flex w-fit items-center gap-3 border border-amber-400/80 px-6 py-3 text-[11px] font-semibold tracking-[0.15em] text-amber-400 transition-all hover:border-amber-300 hover:bg-amber-400/10"
            >
              EXPLORE EVERY HOUSE
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative w-full border-b border-white/10 lg:w-[38%] lg:border-b-0 lg:border-r">
            <HouseCard house={houses[0]} />
          </div>

          <div className="relative w-full lg:w-[40%]">
            <HouseCard house={houses[1]} />
          </div>
        </div>

        {/* Row 2: House 03 (wide) + House 04 */}
        <div className="flex w-full flex-col lg:flex-row">
          <div className="relative w-full border-b border-white/10 lg:w-[60%] lg:border-b-0 lg:border-r">
            <HouseCard house={houses[2]} />
          </div>
          <div className="relative w-full lg:w-[40%]">
            <HouseCard house={houses[3]} />
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row">
          <div className="flex items-center border-b border-white/10 px-6 py-6 lg:w-[14%] lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-amber-400/90">
              Your Journey
              <br />
              Begins Here
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex items-start gap-4 border-white/10 px-6 py-8 border-b border-r last:border-r-0 lg:border-b-0 lg:last:border-r-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-black/40">
                  <step.Icon className="h-4.5 w-4.5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
                {i < journeySteps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-2 top-9 hidden h-4 w-4 -translate-y-1/2 text-amber-400/50 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 px-6 py-8 lg:w-[20%] lg:border-t-0 lg:border-l">
            <span
              className="font-serif text-4xl leading-none text-amber-400/60"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="font-serif text-base italic leading-snug text-amber-400/90">
              Luxury is remembered long after it is purchased.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}