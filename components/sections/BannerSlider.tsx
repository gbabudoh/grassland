"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    type: "video",
    video: "https://assets.mixkit.co/videos/preview/mixkit-athlete-training-on-the-running-track-40019-large.mp4",
    title: "Velocity In Motion",
    subtitle: "Aerodynamic Cross-Breed Engineering"
  },
  {
    type: "image",
    image: "/grassland_banner_1_1767749428961.png",
    overlayVideo: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-running-in-the-city-32830-large.mp4",
    title: "Next Gen Performance",
    subtitle: "Precision Engineered Footwear"
  },
  {
    type: "video",
    video: "https://assets.mixkit.co/videos/preview/mixkit-sprinter-crossing-the-finish-line-of-a-race-track-32829-large.mp4",
    title: "Pure Kinetic Force",
    subtitle: "Reimagining Human Potential"
  },
  {
    type: "video",
    video: "https://assets.mixkit.co/videos/preview/mixkit-athlete-running-on-the-beach-at-sunset-1217-large.mp4",
    title: "The G1 Bio-Tech",
    subtitle: "Natural Motion Re-Engineered",
    layout: "corner"
  }
];

export default function BannerSlider() {
  return (
    <div className="relative h-[75vh] w-full overflow-hidden bg-gh-charcoal">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full bg-black">
            {slide.type === "video" ? (
              /* Full Video Slide */
              <div className="absolute inset-0 h-full w-full overflow-hidden">
                <video
                  key={`${index}-main-video`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`h-full w-full object-cover ${slide.layout === "corner" ? "opacity-100 brightness-100" : "opacity-60 brightness-110"}`}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
            ) : (
              /* Image Slide with Video Overlay */
              <div className="absolute inset-0 h-full w-full overflow-hidden">
                <Image
                  src={slide.image!}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover brightness-90 transition-transform duration-[8000ms] scale-100 group-hover:scale-110"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Techy Video Overlay - Lower opacity, better blend */}
                <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-black/10">
                  <video
                    key={`${index}-overlay-video`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover mix-blend-overlay"
                  >
                    <source src={slide.overlayVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}

            {/* Shared Content Overlay */}
            <div className={`absolute inset-0 z-30 flex px-12 pb-24 ${slide.layout === "corner" ? "items-end justify-start text-left" : "items-center justify-center text-center px-6"}`}>
              {slide.layout === "corner" ? (
                /* Corner Minimal Layout */
                <div className="max-w-xl animate-fade-in">
                  <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.5em] text-white/70">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white drop-shadow-xl">
                    {slide.title}
                  </h1>
                </div>
              ) : (
                /* Standard Centered Layout */
                <div className="backdrop-blur-sm bg-black/10 p-12 rounded-lg border border-white/10">
                  <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.8em] text-white/90">
                    {slide.subtitle}
                  </h2>
                  <h1 className="mb-8 max-w-4xl text-5xl font-black uppercase italic leading-none tracking-tighter sm:text-7xl md:text-8xl text-white drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <Link 
                      href="/shop"
                      className="h-14 w-64 border-2 border-white flex items-center justify-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-gh-charcoal cursor-pointer"
                    >
                      Shop Collection
                    </Link>
                    <button className="h-14 w-64 bg-white/20 backdrop-blur-lg border border-white/30 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/40">
                      Explore Tech
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Gradient overlay */}
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gh-white to-transparent z-20" />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Grain Overlay - Removing broken external link */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}
