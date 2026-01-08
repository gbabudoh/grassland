"use client";

import { Play, Zap, Footprints } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import BannerSlider from "./BannerSlider";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/useModalStore";

const ProductViewer = dynamic(() => import("../3d/ProductViewer"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse bg-gh-silver/20" />
});

export default function Hero() {
  const { addItem } = useCartStore();
  const { openCheckoutAI } = useModalStore();

  const handleQuickAdd = () => {
    addItem({
      id: "g1-performance-matrix",
      name: "G1 Performance Matrix",
      price: 245,
      image: "/grassland_banner_2_1767749443673.png", // Using an existing high-quality asset
      quantity: 1,
      size: "10",
      category: "Men",
      isPreOrder: false
    });
    openCheckoutAI();
  };

  return (
    <div className="relative w-full">
      {/* Cinematic Banner Slider */}
      <section className="h-[75vh] w-full">
        <BannerSlider />
      </section>

      {/* Innovation Section with 3D Viewer */}
      <section className="bg-gh-white py-32 px-6 flex flex-col items-center">
        <div className="max-w-7xl w-full text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.5em] text-gh-charcoal/80">
            Cross-Breed Innovation
          </h2>
          <h3 className="mb-12 text-4xl font-black uppercase italic tracking-tighter sm:text-6xl text-gh-charcoal font-outfit">
            The G1 Performance Matrix
          </h3>
          
          {/* 3D Viewer Integration */}
          <div className="relative z-10 w-full mb-8">
            <ProductViewer />
          </div>

          <div className="mb-16 flex flex-col sm:flex-row justify-center gap-4 px-6 md:px-0">
            <button 
              onClick={handleQuickAdd}
              className="group flex flex-1 items-center justify-center gap-4 bg-gh-charcoal px-10 py-5 text-sm font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer max-w-sm"
            >
              <Footprints className="h-5 w-5" />
              <span>Secure Item — $245</span>
            </button>
            <Link 
              href="/shop"
              className="group flex flex-1 items-center justify-center gap-3 border-2 border-gh-charcoal px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-gh-charcoal transition-all hover:bg-gh-charcoal hover:text-white max-w-sm"
            >
              Explore Archive
              <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="p-8 border-l-2 border-gh-charcoal">
              <h4 className="text-xl font-black uppercase mb-4 italic">Next-Gen Materials</h4>
              <p className="text-sm text-gh-charcoal/70 font-medium">
                Combining aerospace-grade carbon fiber with recycled oceanic technical fabrics for ultimate performance.
              </p>
            </div>
            <div className="p-8 border-l-2 border-gh-charcoal">
              <h4 className="text-xl font-black uppercase mb-4 italic">Kinetic Energy Return</h4>
              <p className="text-sm text-gh-charcoal/70 font-medium">
                Precision-engineered sole architecture that captures and redirects impact energy into forward momentum.
              </p>
            </div>
            <div className="p-8 border-l-2 border-gh-charcoal">
              <h4 className="text-xl font-black uppercase mb-4 italic">Neural Fit Tech</h4>
              <p className="text-sm text-gh-charcoal/70 font-medium font-inter">
                A seamless upper that adapts to your foot&apos;s unique mechanics in real-time, providing locked-in comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Experience Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover grayscale brightness-75 transition-all duration-700 hover:grayscale-0"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-training-on-the-running-track-40019-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
           <div className="max-w-4xl">
              <h2 className="mb-6 text-5xl font-black uppercase italic leading-tight text-white sm:text-7xl md:text-8xl tracking-tighter">
                Engineering <br /> Pure Force
              </h2>
              <p className="mb-12 max-w-xl mx-auto text-lg font-medium text-white/80">
                Experience the science of motion. Our latest lab tests reveal how the G1 Matrix redirects 94% of impact force back into kinetic acceleration.
              </p>
              <button className="flex items-center gap-6 mx-auto group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white text-white transition-all group-hover:bg-white group-hover:text-gh-charcoal group-hover:scale-110">
                  <Play className="h-8 w-8 ml-1" fill="currentColor" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-black uppercase tracking-[0.2em] text-white/60">The Brand Film</span>
                  <span className="block text-xl font-black uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform italic">Watch Innovation In Motion</span>
                </div>
              </button>
           </div>
        </div>
      </section>

      {/* Shop Category Grid (Quick Preview) */}
      <section id="shop" className="bg-gh-white py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
              <div className="relative group overflow-hidden cursor-pointer">
                <Image 
                  src="/grassland_banner_1_1767749428961.png" 
                  alt="Men's" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-10 left-10">
                   <h3 className="text-4xl font-black text-white italic uppercase">Men&apos;s Collection</h3>
                   <span className="text-sm font-bold text-white/70 uppercase tracking-widest border-b border-white pb-1">Explore Innovation</span>
                </div>
             </div>
             <div className="grid grid-rows-2 gap-8">
                <div className="relative group overflow-hidden cursor-pointer">
                   <Image 
                     src="/grassland_banner_2_1767749443673.png" 
                     alt="Women's" 
                     fill 
                     sizes="(max-width: 768px) 100vw, 25vw"
                     className="object-cover transition-all duration-700 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-2xl font-black text-white italic uppercase">Women&apos;s Apparel</h3>
                   </div>
                </div>
                <div className="relative group overflow-hidden cursor-pointer">
                   <Image 
                     src="/grassland_banner_3_1767749460228.png" 
                     alt="Tech" 
                     fill 
                     sizes="(max-width: 768px) 100vw, 25vw"
                     className="object-cover transition-all duration-700 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-2xl font-black text-white italic uppercase">Sports Tech</h3>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute top-[calc(75vh-64px)] left-1/2 -translate-x-1/2 z-40">
        <div className="h-12 w-px animate-bounce bg-gh-charcoal" />
      </div>
    </div>
  );
}
