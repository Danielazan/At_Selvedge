"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Font configuration
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});
const signatureFont = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
});

// Constant for the theme gold color
const GOLD = "#D9B67A";

export default function AutumnWinter() {
  const swiperRef = useRef(null);

  // Data for "The Looks" section
  const looksData = [
    {
      id: "01",
      title: "THE CITY ARCHITECT",
      image: "/imgs/Aut-city.png",
    },
    {
      id: "02",
      title: "THE EXECUTIVE",
      image: "/imgs/Aut-Exe.png",
    },
    {
      id: "03",
      title: "WEEKEND ESCAPE",
      image: "/imgs/Aut-weekend.png",
    },
  ];

  // Data for "Featured Pieces" section
  const productsData = [
    {
      name: "Selvé Raw Selvedge Denim",
      price: "$290",
      image: "/imgs/Aut-190.png",
    },
    {
      name: "Selvé Denim Jacket",
      price: "$220",
      image: "/imgs/Aut-220.png",
    },
    {
      name: "Atelion Signature Blazer",
      price: "$320",
      image: "/imgs/Aut-420.png",
    },
    {
      name: "Atelion Leather Weekender",
      price: "$495",
      image: "/imgs/Aut-495.png",
    },
    {
      name: "Maivon Leather Boots",
      price: "$318",
      image: "/imgs/Aut-315.png",
    },
  ];

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0a0a0a] text-white ${playfair.variable} ${inter.variable} ${signatureFont.variable}`}
    >
      {/* ================= NAVIGATION =================
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/60 backdrop-blur-sm">
        <div className="flex flex-col leading-none">
          <span className="font-serif text-sm tracking-widest text-[#F5F3EE]">
            ATELIER
          </span>
          <span className="font-serif text-sm tracking-widest text-[#F5F3EE]">
            SELVEDGE
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.15em] font-sans text-white/70">
          {["HOUSES", "COLLECTION", "JOURNAL", "ABOUT", "EXPERIENCE"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="relative hover:text-white transition-colors duration-200"
              >
                {item}
                {item === "COLLECTION" && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D9B67A]" />
                )}
              </a>
            )
          )}
        </div>

        <div className="flex items-center space-x-4 text-white/70">
          {/* Search Icon */}
          <button className="hover:text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5L21 21" strokeLinecap="round" />
            </svg>
          </button>
          {/* User Icon */}
          <button className="hover:text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="7.5" r="4" />
              <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
            </svg>
          </button>
          {/* Cart Icon */}
          <button className="relative hover:text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 6l1.5 11.5h9L18 6H6z" />
              <path d="M8 6V5a4 4 0 018 0v1" />
            </svg>
            <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-transparent border border-white/40 rounded-full">
              (0)
            </span>
          </button>
        </div>
      </nav> */}

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen w-full pt-24 flex flex-col justify-end md:justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/imgs/Aut-hero_background.png')`,
            backgroundSize: "cover",
            filter: "brightness(0.7) contrast(1.2)",
          }}
        />

        {/* Model Overlay Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-full max-w-6xl h-[80vh] md:h-[90vh] pointer-events-none">
          <Image
            src="/imgs/Aut-hero.png"
            alt="Model"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Left Vertical Indicator */}
        <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4 text-[12px] font-sans tracking-[0.2em] text-[#D9B67A]">
          <span className="font-bold text-lg">05</span>
          <span className="h-16 w-px bg-[#D9B67A] opacity-50" />
          <span className="rotate-[-90deg] origin-center whitespace-nowrap uppercase text-white/50">
            Editorial Campaign
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl px-6 md:px-12 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pointer-events-none">
          {/* Left Column: Title */}
          <div className="md:col-span-7 flex flex-col justify-end md:justify-center pointer-events-auto">
            <p className="text-[#D9B67A] text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-sans mb-2">
              The Editorial Issue
            </p>
            <h1 className="font-serif text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.95] text-[#D9B67A] tracking-tight">
              AUTUMN
              <br />
              /WINTER
              <br />
              2026
            </h1>
            <div className="flex flex-col gap-1 mt-6">
              <p className="font-sans text-sm md:text-base text-white/80 uppercase tracking-[0.1em]">
                Crafted in Africa.
              </p>
              <p className="font-sans text-sm md:text-base text-white/80 uppercase tracking-[0.1em]">
                Worn Everywhere.
              </p>
            </div>
            <div className="mt-4 w-12 h-px bg-[#D9B67A] opacity-60" />
          </div>

          {/* Right Column: Editor's Note */}
          <div className="md:col-span-5 flex flex-col justify-end md:justify-center items-start md:items-end pointer-events-auto mt-8 md:mt-0">
            <div className="max-w-sm text-left">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#D9B67A] mb-3">
                Editor's Note
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-white/70 font-light tracking-wide">
                This season explores the quiet confidence of modern African
                luxury. Each silhouette balances precision tailoring with
                everyday ease, creating garments designed to move seamlessly
                between work, travel, and celebration.
              </p>
              <div
                className={`mt-6 text-[2rem] leading-none text-[#D9B67A] ${signatureFont.variable} font-signature`}
              >
                Signature
              </div>
              <p className="font-sans text-[11px] tracking-widest text-white/50 mt-1">
                — Atelier Selvedge Studio
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Right Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 pointer-events-auto cursor-pointer group">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
            Scroll to discover
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D9B67A] transition-colors">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white/60 group-hover:text-[#D9B67A] transition-colors"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ================= THE LOOKS SECTION ================= */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="flex items-center justify-center gap-6 mb-12">
          <span className="h-px w-12 bg-[#D9B67A] opacity-30" />
          <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/80">
            The Looks
          </h2>
          <span className="h-px w-12 bg-[#D9B67A] opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {looksData.map((look) => (
            <div
              key={look.id}
              className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group cursor-pointer"
            >
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start">
                <span className="font-serif text-6xl italic text-[#D9B67A] opacity-80 leading-none">
                  {look.id}
                </span>
                <h3 className="font-serif text-2xl text-white mt-1 tracking-tight">
                  {look.title}
                </h3>
                <button className="mt-3 flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.15em] text-[#D9B67A] group-hover:translate-x-1 transition-transform">
                  Discover Look
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PIECES SECTION ================= */}
      <section className="relative w-full py-16 md:py-24 px-4 md:px-12 bg-[#0a0a0a]">
        <div className="flex items-center justify-center gap-6 mb-12">
          <span className="h-px w-12 bg-[#D9B67A] opacity-30" />
          <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/80">
            Featured Pieces
          </h2>
          <span className="h-px w-12 bg-[#D9B67A] opacity-30" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Custom Navigation Buttons */}
          <button className="custom-prev absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-[#D9B67A] hover:text-[#D9B67A] transition-all duration-300">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="custom-next absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-[#D9B67A] hover:text-[#D9B67A] transition-all duration-300">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 32 },
              1280: { slidesPerView: 5, spaceBetween: 32 },
            }}
            className="w-full"
          >
            {productsData.map((product, idx) => (
              <SwiperSlide key={idx} className="group">
                <div className="flex flex-col items-center w-full">
                  {/* Product Image Wrapper */}
                  <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-[#111111] rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="w-full mt-4 flex flex-col items-center text-center">
                    <h4 className="font-serif text-[15px] text-[#F5F3EE] tracking-tight">
                      {product.name}
                    </h4>
                    <p className="font-sans text-[13px] text-white/60 mt-1">
                      {product.price}
                    </p>
                    <button className="mt-3 flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.15em] text-[#D9B67A] hover:gap-2 transition-all">
                      View Product
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= FOOTER / CTA SECTION ================= */}
      <section
        className="relative w-full py-20 md:py-28 flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url('/imgs/Aut-footer.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#D9B67A] leading-[1.1] tracking-tight">
            LUXURY ISN'T SEASONAL.
            <br />
            IT EVOLVES.
          </h2>
          <button className="mt-8 px-8 py-3 border border-[#D9B67A] text-[#D9B67A] text-[11px] font-sans uppercase tracking-[0.2em] hover:bg-[#D9B67A] hover:text-black transition-all duration-300">
            Explore the Collection
            <span className="ml-2">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}