// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Playfair_Display, Inter } from "next/font/google";
// import {
//   Bookmark,
//   ArrowRight,
//   Search,
//   Filter,
//   Plus,
//   Feather,
//   Globe,
//   Heart,
//   Mail,
// } from "lucide-react";
// import Navbar from "@/Components/Navbar/Navbar";

// // Local font scopes
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   style: ["normal", "italic"],
//   variable: "--font-journal-display",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-journal-sans",
// });

// // Constants
// const TABS = [
//   "ALL STORIES",
//   "STYLE",
//   "CARE",
//   "TRAVEL",
//   "FRAGRANCE",
//   "LIVING",
//   "COLLECTIONS",
// ];

// // Data for highlights & articles
// const HIGHLIGHTS = [
//   {
//     icon: <Feather className="w-4 h-4 text-[#D9B67A]" />,
//     title: "CRAFTSMANSHIP",
//     desc: "Behind the craft. The hands. The hours. The heritage.",
//   },
//   {
//     icon: <Globe className="w-4 h-4 text-[#D9B67A]" />,
//     title: "TRAVEL DIARIES",
//     desc: "Places that shape us. Stories from the road.",
//   },
//   {
//     icon: <Heart className="w-4 h-4 text-[#D9B67A]" />,
//     title: "ATELIER PEOPLE",
//     desc: "Conversations with creatives defining culture.",
//   },
//   {
//     icon: <Mail className="w-4 h-4 text-[#D9B67A]" />,
//     title: "CARE & GUIDES",
//     desc: "Expert advice to help your pieces last a lifetime.",
//   },
// ];

// const ALL_ARTICLES = [
//   {
//     id: 1,
//     category: "STYLE",
//     image: "/imgs/st-style.png",
//     title: "The Modern Gentleman",
//     readTime: "7 MIN READ",
//     date: "JUN 12, 2024",
//     tags: ["STYLE"],
//     shopLabel: "SHOP THE LOOK",
//     shopItems: [
//       { src: "/imgs/Aut-420.png", alt: "Blazer" },
//       { src: "/imgs/Aut-315.png", alt: "Boots" },
//       { src: "/imgs/watch.png", alt: "Watch" },
//     ],
//   },
//   {
//     id: 2,
//     category: "FRAGRANCE",
//     image: "/imgs/st-fragrance.png",
//     title: "The Art of Signature Fragrance",
//     readTime: "6 MIN READ",
//     date: "JUN 8, 2024",
//     tags: ["FRAGRANCE"],
//     shopLabel: "SHOP THE STORY",
//     shopItems: [
//       { src: "/imgs/st-story1.png", alt: "Perfume 1" },
//       { src: "/imgs/st-story2.png", alt: "Perfume 2" },
//       { src: "/imgs/st-story3.png", alt: "Perfume 3" },
//     ],
//   },
//   {
//     id: 3,
//     category: "LIVING",
//     image: "/imgs/st-living.png",
//     title: "Designing Spaces with Character",
//     readTime: "5 MIN READ",
//     date: "MAY 28, 2024",
//     tags: ["LIVING"],
//     shopLabel: "SHOP THE EDIT",
//     shopItems: [
//       { src: "/imgs/st-Edit1.png", alt: "Edit 1" },
//       { src: "/imgs/st-Edit2.png", alt: "Edit 2" },
//       { src: "/imgs/st-Edit3.png", alt: "Edit 3" },
//     ],
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /*  Sub-Components                                                             */
// /* -------------------------------------------------------------------------- */

// // Fixed: Larger product thumbnail containers and object-contain
// function ShopRow({
//   items,
//   label,
// }: {
//   items: { src: string; alt: string }[];
//   label: string;
// }) {
//   return (
//     <div className="w-full bg-[#121212] border-t border-white/10 px-5 py-4">
//       <div className="flex items-center justify-between mb-3">
//         <span className="text-[9px] font-semibold tracking-[0.2em] text-white/40 uppercase">
//           {label}
//         </span>
//       </div>
//       <div className="flex gap-3">
//         {items.slice(0, 3).map((item, idx) => (
//           <div
//             key={idx}
//             className="relative w-16 h-20 bg-black/40 rounded-sm border border-white/10 overflow-hidden"
//           >
//             <Image
//               src={item.src}
//               alt={item.alt}
//               fill
//               className="object-contain p-1"
//             />
//           </div>
//         ))}
//         <button className="flex items-center justify-center w-16 h-20 rounded-sm border border-dashed border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-400/5 text-amber-400/60 hover:text-amber-400 transition-colors">
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function ArticleCard({
//   article,
// }: {
//   article: (typeof ALL_ARTICLES)[number];
// }) {
//   return (
//     <div className="group relative flex flex-col h-full bg-[#151515] rounded-sm overflow-hidden border border-white/5 hover:border-[#D9B67A]/30 transition-colors duration-300">
//       {/* Image Area */}
//       <div className="relative w-full aspect-[4/3]">
//         <Image
//           src={article.image}
//           alt={article.title}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

//         {/* Top Category */}
//         <div className="absolute top-5 left-5 right-5 flex flex-col items-start">
//           <div className="flex items-center gap-1.5 mb-1">
//             <span className="w-4 h-px bg-[#D9B67A]/60" />
//             <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[#D9B67A]">
//               {article.category}
//             </span>
//           </div>
//           <h3 className="font-serif text-xl md:text-2xl leading-tight text-white mt-1 font-normal tracking-tight max-w-[90%]">
//             {article.title}
//           </h3>
//         </div>

//         {/* Bottom Meta */}
//         <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[9px] tracking-[0.15em] text-white/50">
//           <span>{article.readTime}</span>
//           <div className="flex items-center gap-2">
//             <span>{article.date}</span>
//             <ArrowRight className="w-3 h-3 text-[#D9B67A]" />
//           </div>
//         </div>
//       </div>

//       {/* Shop The Look Row - Separated for correct sizing */}
//       <ShopRow items={article.shopItems} label={article.shopLabel} />
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Main Component                                                             */
// /* -------------------------------------------------------------------------- */

// export default function Journal() {
//   const [activeTab, setActiveTab] = useState("ALL STORIES");

//   const filteredArticles =
//     activeTab === "ALL STORIES"
//       ? ALL_ARTICLES
//       : ALL_ARTICLES.filter((article) =>
//           article.tags.includes(activeTab)
//         );

//   return (
//     <section
//       className={`${playfair.variable} ${inter.variable} relative w-full bg-[#0a0a0a] text-[#F5F3EE] overflow-hidden`}
//       style={{ fontFamily: "var(--font-journal-sans)" }}
//     >
//       {/* Navbar with pointer-events wrapper to allow clicks */}
//       <div className="relative z-20 pointer-events-none">
//         <div className="pointer-events-auto">
//           <Navbar mobileVariant="centered" />
//         </div>
//       </div>

//       {/* ===================== HERO SECTION ===================== */}
//       {/* Added pt-24 to account for fixed Navbar height */}
//       <div className="relative w-full h-[85vh] min-h-[700px] flex items-center pt-24 md:pt-28 bg-black">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/imgs/st-hero.png"
//             alt="Journal Hero"
//             fill
//             priority
//             className="object-cover object-center brightness-[0.45]"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
//         </div>

//         {/* Container */}
//         <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
//           {/* Left Column: Vertical Rail & Main Copy */}
//           <div className="lg:col-span-8 flex flex-col justify-center relative h-full py-12">
//             {/* Vertical Rail - Always visible, positioned to the left edge */}
//             <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
//               <span className="font-serif text-[56px] text-[#D9B67A] tracking-tight font-normal opacity-90">
//                 08
//               </span>
//               <span className="w-px h-10 bg-white/20" />
//               <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 -rotate-90 origin-center mt-1">
//                 Journal
//               </span>
//               <span className="w-px h-8 bg-white/10 mt-2" />
//             </div>

//             {/* Content - shifted right to avoid rail overlap */}
//             <div className="flex flex-col pl-16 md:pl-20 lg:pl-24 max-w-2xl">
//               <div className="flex items-center gap-3 mb-5">
//                 <span className="w-8 h-px bg-[#D9B67A]" />
//                 <span className="text-[10px] tracking-[0.25em] uppercase text-[#D9B67A] font-medium">
//                   The Atelier Journal
//                 </span>
//               </div>
//               <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] text-white tracking-tight mb-5">
//                 Stories that inspire how you live.
//               </h1>
//               <p className="text-[15px] leading-relaxed text-white/60 max-w-md font-light mb-7">
//                 Insights on style, craftsmanship, culture and the art of living
//                 well. Curated for the contemporary African.
//               </p>
//               <button className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#D9B67A] hover:opacity-80 transition-opacity group w-fit">
//                 Explore All Articles
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Featured Story Overlay */}
//           <div className="lg:col-span-4 flex items-center lg:justify-end h-full pb-10 lg:pb-0">
//             <div className="w-full lg:max-w-sm bg-[#181818]/90 backdrop-blur-md border border-white/10 p-8 shadow-2xl rounded-sm">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <span className="w-3 h-px bg-[#D9B67A]" />
//                   <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[#D9B67A]">
//                     Featured Story
//                   </span>
//                 </div>
//                 <Bookmark className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
//               </div>
//               <h3 className="font-serif text-2xl md:text-3xl leading-tight text-white mb-3 font-normal">
//                 How to Build a <br /> Timeless Wardrobe <br /> with Selvé Denim
//               </h3>
//               <p className="text-[13px] leading-relaxed text-white/60 mb-6 font-light">
//                 Investment pieces. Quality fabrics. Fits that last. A guide to
//                 building your foundation with intention.
//               </p>
//               <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
//                 <button className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.2em] uppercase text-[#D9B67A] group">
//                   Read Story
//                   <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <span className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
//                   5 MIN READ
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===================== FILTER & TABS ===================== */}
//       <div className="w-full border-y border-white/10 bg-[#0a0a0a] sticky top-0 z-10 backdrop-blur-md">
//         <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center overflow-x-auto no-scrollbar">
//           <div className="flex items-center flex-1 gap-6 md:gap-8 py-3.5">
//             {TABS.map((tab) => {
//               const isActive = activeTab === tab;
//               return (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`relative py-0.5 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap
//                     ${isActive ? "text-[#D9B67A]" : "text-white/40 hover:text-white/60"}`}
//                 >
//                   {tab}
//                   {isActive && (
//                     <span className="absolute -bottom-[12px] left-0 right-0 h-px bg-[#D9B67A]" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//           <div className="pl-6 border-l border-white/10 ml-auto flex items-center gap-4 py-3.5">
//             <Search className="w-4 h-4 text-white/40 hover:text-white/60 cursor-pointer transition-colors" />
//             <button className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-white/40 hover:text-white/60 transition-colors">
//               Filter
//               <Filter className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ===================== ARTICLES GRID ===================== */}
//       <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//           {/* Filtered Articles */}
//           {filteredArticles.length > 0 ? (
//             filteredArticles.map((article) => (
//               <div key={article.id} className="col-span-1">
//                 <ArticleCard article={article} />
//               </div>
//             ))
//           ) : (
//             <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-12 text-white/30 text-sm uppercase tracking-widest">
//               No articles found for {activeTab}.
//             </div>
//           )}

//           {/* Sidebar - Always in the 4th column */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex">
//             <div className="flex flex-col w-full h-full bg-[#151515] border border-white/5 rounded-sm p-7 md:p-8 lg:h-auto">
//               {/* Highlights */}
//               <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="w-4 h-px bg-[#D9B67A]/50" />
//                   <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70">
//                     Journal Highlights
//                   </h4>
//                 </div>
//                 <div className="flex flex-col gap-5">
//                   {HIGHLIGHTS.map((item, idx) => (
//                     <div key={idx} className="flex gap-4 group cursor-pointer">
//                       <div className="shrink-0 mt-1 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-black/40 group-hover:border-[#D9B67A]/40 transition-colors">
//                         {item.icon}
//                       </div>
//                       <div>
//                         <h5 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/80 group-hover:text-[#D9B67A] transition-colors">
//                           {item.title}
//                         </h5>
//                         <p className="text-[11px] leading-relaxed text-white/40 mt-0.5 max-w-[160px]">
//                           {item.desc}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Newsletter */}
//               <div className="mt-auto pt-6 border-t border-white/5">
//                 <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70 mb-1">
//                   Stay Inspired
//                 </h4>
//                 <p className="text-[10px] text-white/40 leading-relaxed mb-3">
//                   Subscribe for exclusive stories, early access and style notes.
//                 </p>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     placeholder="Your email address"
//                     className="w-full bg-black/60 border border-white/10 rounded-sm px-3 py-2.5 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#D9B67A]/60 transition-colors"
//                   />
//                   <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-[#D9B67A] transition-colors">
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===================== FOOTER ===================== */}
//       <div className="w-full bg-[#0a0a0a] border-t border-white/5 py-20 md:py-24">
//         <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col items-center">
//           <div className="max-w-4xl text-center mb-16">
//             <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white/90 leading-snug tracking-tight italic font-normal">
//               <span className="text-[#D9B67A] not-italic">&ldquo;</span>
//               Good style is not about trends. It&rsquo;s about choices.
//               <span className="text-[#D9B67A] not-italic">&rdquo;</span>
//             </p>
//             <div className="flex items-center justify-center gap-3 mt-4">
//               <span className="w-6 h-px bg-[#D9B67A]" />
//               <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9B67A] font-medium">
//                 Atelier Selvedge
//               </p>
//             </div>
//           </div>

//           {/* 3 Pillars */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl pt-4">
//             <div className="flex flex-col items-center text-center px-4">
//               <div className="mb-3 p-3 rounded-full border border-white/10 bg-black/30 shadow-inner">
//                 <Feather className="w-5 h-5 text-[#D9B67A]" />
//               </div>
//               <h4 className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1.5">
//                 WRITTEN WITH INTENTION
//               </h4>
//               <p className="text-[11px] leading-relaxed text-white/40 max-w-[200px]">
//                 Thoughtful narratives that inform, inspire and elevate.
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-center px-4">
//               <div className="mb-3 p-3 rounded-full border border-white/10 bg-black/30 shadow-inner">
//                 <Globe className="w-5 h-5 text-[#D9B67A]" />
//               </div>
//               <h4 className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1.5">
//                 ROOTED IN CULTURE
//               </h4>
//               <p className="text-[11px] leading-relaxed text-white/40 max-w-[200px]">
//                 Celebrating African stories, heritage and originality.
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-center px-4">
//               <div className="mb-3 p-3 rounded-full border border-white/10 bg-black/30 shadow-inner">
//                 <Heart className="w-5 h-5 text-[#D9B67A]" />
//               </div>
//               <h4 className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1.5">
//                 CREATED TO ENDURE
//               </h4>
//               <p className="text-[11px] leading-relaxed text-white/40 max-w-[200px]">
//                 Timeless insights for a life well dressed and well lived.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .font-serif {
//           font-family: var(--font-journal-display), serif !important;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import {
  Bookmark,
  ArrowRight,
  Search,
  Filter,
  Plus,
  Feather,
  Globe,
  Heart,
  Mail,
} from "lucide-react";
import Navbar from "@/Components/Navbar/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-journal-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-journal-sans",
});

const TABS = [
  "ALL STORIES",
  "STYLE",
  "CARE",
  "TRAVEL",
  "FRAGRANCE",
  "LIVING",
  "COLLECTIONS",
];

const HIGHLIGHTS = [
  {
    icon: <Feather className="w-4 h-4 text-[#D9B67A]" />,
    title: "CRAFTSMANSHIP",
    desc: "Behind the craft. The hands. The hours. The heritage.",
  },
  {
    icon: <Globe className="w-4 h-4 text-[#D9B67A]" />,
    title: "TRAVEL DIARIES",
    desc: "Places that shape us. Stories from the road.",
  },
  {
    icon: <Heart className="w-4 h-4 text-[#D9B67A]" />,
    title: "ATELIER PEOPLE",
    desc: "Conversations with creatives defining culture.",
  },
  {
    icon: <Mail className="w-4 h-4 text-[#D9B67A]" />,
    title: "CARE & GUIDES",
    desc: "Expert advice to help your pieces last a lifetime.",
  },
];

// NOTE: added `desc` — the target design shows a 2–3 line summary
// under the title, inside the image overlay. This was missing before.
const ALL_ARTICLES = [
  {
    id: 1,
    category: "STYLE",
    image: "/imgs/st-style.png",
    title: "The Modern Gentleman",
    desc: "Tailoring that speaks heritage with a contemporary edge. The new rules of dressing well.",
    readTime: "7 MIN READ",
    date: "JUN 12, 2024",
    tags: ["STYLE"],
    shopLabel: "SHOP THE LOOK",
    shopItems: [
      { src: "/imgs/Aut-420.png", alt: "Blazer" },
      { src: "/imgs/Aut-315.png", alt: "Boots" },
      { src: "/imgs/watch.png", alt: "Watch" },
    ],
  },
  {
    id: 2,
    category: "FRAGRANCE",
    image: "/imgs/st-fragrance.png",
    title: "The Art of Signature Fragrance",
    desc: "Choosing a scent is more than preference — it's presence. Find yours.",
    readTime: "6 MIN READ",
    date: "JUN 8, 2024",
    tags: ["FRAGRANCE"],
    shopLabel: "SHOP THE STORY",
    shopItems: [
      { src: "/imgs/st-story1.png", alt: "Perfume 1" },
      { src: "/imgs/st-story2.png", alt: "Perfume 2" },
      { src: "/imgs/st-story3.png", alt: "Perfume 3" },
    ],
  },
  {
    id: 3,
    category: "LIVING",
    image: "/imgs/st-living.png",
    title: "Designing Spaces with Character",
    desc: "Pieces that bring soul to your home. Curated living with Maivon.",
    readTime: "5 MIN READ",
    date: "MAY 28, 2024",
    tags: ["LIVING"],
    shopLabel: "SHOP THE EDIT",
    shopItems: [
      { src: "/imgs/st-Edit1.png", alt: "Edit 1" },
      { src: "/imgs/st-Edit2.png", alt: "Edit 2" },
      { src: "/imgs/st-Edit3.png", alt: "Edit 3" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Sub-Components                                                             */
/* -------------------------------------------------------------------------- */

// FIXED: no more `flex-1` / forced stretch. This div now sizes itself
// to its own content (label + thumbnail row), so it can never create
// the empty gap that appeared when the grid stretched the parent card.
function ShopRow({
  items,
  label,
}: {
  items: { src: string; alt: string }[];
  label: string;
}) {
  return (
    <div className="bg-[#121212] border-t border-white/10 px-5 py-4">
      <span className="block text-[9px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">
        {label}
      </span>
      <div className="grid grid-cols-4 gap-2">
        {items.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="relative aspect-square w-full bg-black/50 rounded-sm border border-white/10 overflow-hidden"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain p-1"
            />
          </div>
        ))}
        <button className="aspect-square w-full rounded-sm border border-dashed border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-400/5 text-amber-400/60 hover:text-amber-400 transition-colors flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
}: {
  article: (typeof ALL_ARTICLES)[number];
}) {
  return (
    // FIXED: removed `h-full` — the card now sizes to its own content
    // instead of being stretched to match the sidebar's height.
    <div className="group relative flex flex-col bg-[#151515] rounded-sm overflow-hidden border border-white/5 hover:border-[#D9B67A]/30 transition-colors duration-300">
      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] shrink-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Taller gradient so the added description stays legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-4 h-px bg-[#D9B67A]/60" />
            <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[#D9B67A]">
              {article.category}
            </span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl leading-tight text-white mt-1 font-normal tracking-tight">
            {article.title}
          </h3>
          {/* NEW: description, matches target design */}
          <p className="text-[11px] leading-relaxed text-white/60 mt-2 max-w-[95%] line-clamp-2">
            {article.desc}
          </p>
        </div>
      </div>

      {/* Shop The Look Row */}
      <ShopRow items={article.shopItems} label={article.shopLabel} />

      {/* NEW: meta footer moved out of the image, sits below the shop row */}
      <div className="flex justify-between items-center text-[9px] tracking-[0.15em] text-white/50 px-5 py-3 border-t border-white/5">
        <span>{article.readTime}</span>
        <div className="flex items-center gap-2">
          <span>{article.date}</span>
          <ArrowRight className="w-3 h-3 text-[#D9B67A]" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function Journal() {
  const [activeTab, setActiveTab] = useState("ALL STORIES");

  const filteredArticles =
    activeTab === "ALL STORIES"
      ? ALL_ARTICLES
      : ALL_ARTICLES.filter((article) =>
          article.tags.includes(activeTab)
        );

  return (
    <section
      className={`${playfair.variable} ${inter.variable} relative w-full bg-[#0a0a0a] text-[#F5F3EE] overflow-hidden`}
      style={{ fontFamily: "var(--font-journal-sans)" }}
    >
      <div className="relative z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar mobileVariant="centered" />
        </div>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <div className="relative w-full h-[85vh] min-h-[700px] flex items-center pt-24 md:pt-28 bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/imgs/st-hero.png"
            alt="Journal Hero"
            fill
            priority
            className="object-cover object-center brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
          <div className="lg:col-span-8 flex flex-col justify-center relative h-full py-12">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <span className="font-serif text-[56px] text-[#D9B67A] tracking-tight font-normal opacity-90">
                08
              </span>
              <span className="w-px h-10 bg-white/20" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 -rotate-90 origin-center mt-1">
                Journal
              </span>
              <span className="w-px h-8 bg-white/10 mt-2" />
            </div>

            <div className="flex flex-col pl-16 md:pl-20 lg:pl-24 max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-[#D9B67A]" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D9B67A] font-medium">
                  The Atelier Journal
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] text-white tracking-tight mb-5">
                Stories that inspire how you live.
              </h1>
              <p className="text-[15px] leading-relaxed text-white/60 max-w-md font-light mb-7">
                Insights on style, craftsmanship, culture and the art of living
                well. Curated for the contemporary African.
              </p>
              <button className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#D9B67A] hover:opacity-80 transition-opacity group w-fit">
                Explore All Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center lg:justify-end h-full pb-10 lg:pb-0">
            <div className="w-full lg:max-w-sm bg-[#181818]/90 backdrop-blur-md border border-white/10 p-8 shadow-2xl rounded-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-px bg-[#D9B67A]" />
                  <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[#D9B67A]">
                    Featured Story
                  </span>
                </div>
                <Bookmark className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight text-white mb-3 font-normal">
                How to Build a <br /> Timeless Wardrobe <br /> with Selvé Denim
              </h3>
              <p className="text-[13px] leading-relaxed text-white/60 mb-6 font-light">
                Investment pieces. Quality fabrics. Fits that last. A guide to
                building your foundation with intention.
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <button className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.2em] uppercase text-[#D9B67A] group">
                  Read Story
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  5 MIN READ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FILTER & TABS ===================== */}
      <div className="w-full border-y border-white/10 bg-[#0a0a0a] sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center overflow-x-auto no-scrollbar">
          <div className="flex items-center flex-1 gap-6 md:gap-8 py-3.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-0.5 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap
                    ${isActive ? "text-[#D9B67A]" : "text-white/40 hover:text-white/60"}`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute -bottom-[12px] left-0 right-0 h-px bg-[#D9B67A]" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="pl-6 border-l border-white/10 ml-auto flex items-center gap-4 py-3.5">
            <Search className="w-4 h-4 text-white/40 hover:text-white/60 cursor-pointer transition-colors" />
            <button className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-white/40 hover:text-white/60 transition-colors">
              Filter
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================== ARTICLES GRID ===================== */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        {/*
          FIXED: added `items-start`. Without it, CSS Grid's default
          `align-items: stretch` forces every cell in a row to match the
          tallest cell (the sidebar). That stretch is what was creating
          the empty gap inside each ArticleCard.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} className="col-span-1">
                <ArticleCard article={article} />
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-12 text-white/30 text-sm uppercase tracking-widest">
              No articles found for {activeTab}.
            </div>
          )}

          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex">
            <div className="flex flex-col w-full bg-[#151515] border border-white/5 rounded-sm p-7 md:p-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-px bg-[#D9B67A]/50" />
                  <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70">
                    Journal Highlights
                  </h4>
                </div>
                <div className="flex flex-col gap-5">
                  {HIGHLIGHTS.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group cursor-pointer">
                      <div className="shrink-0 mt-1 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-black/40 group-hover:border-[#D9B67A]/40 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/80 group-hover:text-[#D9B67A] transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-[11px] leading-relaxed text-white/40 mt-0.5 max-w-[160px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70 mb-1">
                  Stay Inspired
                </h4>
                <p className="text-[10px] text-white/40 leading-relaxed mb-3">
                  Subscribe for exclusive stories, early access and style notes.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-black/60 border border-white/10 rounded-sm px-3 py-2.5 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#D9B67A]/60 transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-[#D9B67A] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER ===================== */}
      <div className="w-full bg-[#0a0a0a] border-t border-white/5 py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <div className="max-w-4xl text-center mb-16">
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white/90 leading-snug tracking-tight italic font-normal">
              <span className="text-[#D9B67A] not-italic">&ldquo;</span>
              Good style is not about trends. It&rsquo;s about choices.
              <span className="text-[#D9B67A] not-italic">&rdquo;</span>
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="w-6 h-px bg-[#D9B67A]" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9B67A] font-medium">
                Atelier Selvedge
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl pt-4">
            <div className="flex flex-col items-center text-center px-4">
              <div className="mb-3 p-3 rounded-full border border-white/10 bg-black/30 shadow-inner">
                <Feather className="w-5 h-5 text-[#D9B67A]" />
              </div>
              <h4 className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1.5">
                WRITTEN WITH INTENTION
              </h4>
              <p className="text-[11px] leading-relaxed text-white/40 max-w-[200px]">
                Thoughtful narratives that inform, inspire and elevate.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="mb-3 p-3 rounded-full border border-white/10 bg-black/30 shadow-inner">
                <Globe className="w-5 h-5 text-[#D9B67A]" />
              </div>
              <h4 className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1.5">
                ROOTED IN CULTURE
              </h4>
              <p className="text-[11px] leading-relaxed text-white/40 max-w-[200px]">
                Celebrating African stories, heritage and originality.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="mb-3 p-3 rounded-full border border-white/10 bg-black/30 shadow-inner">
                <Heart className="w-5 h-5 text-[#D9B67A]" />
              </div>
              <h4 className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1.5">
                CREATED TO ENDURE
              </h4>
              <p className="text-[11px] leading-relaxed text-white/40 max-w-[200px]">
                Timeless insights for a life well dressed and well lived.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .font-serif {
          font-family: var(--font-journal-display), serif !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}