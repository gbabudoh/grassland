"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Play,
  Box,
  QrCode
} from "lucide-react";
import QRCode from "qrcode";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PRODUCTS } from "@/lib/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/useModalStore";

const ProductViewer = dynamic(() => import("@/components/3d/ProductViewer"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gh-silver/10" />
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { openCheckoutAI, openSizeAI } = useModalStore();

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  
  const [activeMedia, setActiveMedia] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (product?.signature) {
      QRCode.toDataURL(product.signature)
        .then((url: string) => setQrCodeUrl(url))
        .catch(console.error);
    }
  }, [product]);

  useEffect(() => {
    if (isMounted && !product) {
      router.push("/shop");
    }
  }, [product, router, isMounted]);

  if (!product) return null;

  const currentMedia = product.gallery[activeMedia];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 sm:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": [product.gallery[0]?.url],
            "description": product.insights || product.name,
            "sku": product.id,
            "brand": {
              "@type": "Brand",
              "name": "Grassland"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://grassland.com/shop/${product.id}`,
              "priceCurrency": "USD",
              "price": product.price,
              "availability": product.isPreOrder ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs & Back */}
        <Link 
          href="/shop" 
          className="group inline-flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 hover:text-gh-charcoal transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Archive
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Gallery Section */}
          <div className="flex-1 space-y-6">
            <div className="relative aspect-square bg-gh-silver/5 border-2 border-gh-silver/20 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeMedia}-${currentMedia.type}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-full w-full"
                >
                  {currentMedia.type === "image" && (
                    <Image 
                      src={currentMedia.url} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                  {currentMedia.type === "video" && (
                    <video 
                      key={currentMedia.url}
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="absolute inset-0 h-full w-full object-cover grayscale"
                    >
                      <source src={currentMedia.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {currentMedia.type === "3d" && (
                    <div className="h-full w-full bg-gh-charcoal/5">
                      <ProductViewer />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Holographic Overlays */}
              <div className="absolute top-6 left-6 z-10 pointer-events-none">
                 <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] border border-gh-charcoal/10">
                    {product.signature} {/* 00{activeMedia + 1} */}
                 </div>
              </div>

              {currentMedia.type === "3d" && (
                <div className="absolute bottom-6 left-6 z-10">
                   <div className="flex items-center gap-3 bg-gh-charcoal px-4 py-2 text-white text-[9px] font-black uppercase tracking-widest italic">
                      <Box className="h-3 w-3" /> 360° Inspection Active
                   </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {product.gallery.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`relative h-20 w-20 shrink-0 border-2 transition-all overflow-hidden ${
                    activeMedia === idx ? "border-gh-charcoal" : "border-gh-silver/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  {media.type === "image" && (
                    <Image 
                      src={media.url} 
                      alt="thumb" 
                      fill 
                      sizes="80px"
                      className="object-cover" 
                    />
                  )}
                  {media.type === "video" && (
                    <div className="h-full w-full bg-gh-charcoal relative">
                      <video 
                        src={media.url} 
                        muted 
                        loop 
                        autoPlay 
                        playsInline 
                        className="h-full w-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white shadow-xl" />
                      </div>
                    </div>
                  )}
                  {media.type === "3d" && (
                    <div className="h-full w-full bg-gh-silver/20 flex items-center justify-center">
                      <Box className="h-5 w-5 text-gh-charcoal" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full lg:w-[450px] space-y-12">
            <div>
              <div className="flex justify-between items-start mb-4">
                 <span className="text-[10px] font-black text-gh-charcoal/40 uppercase tracking-[0.3em]">{product.category} CLASS / DNA {product.id.split('-')[0]}</span>
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest italic animate-pulse">
                    AI {product.aiRating}% SYNC
                 </div>
              </div>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-4 leading-none">
                {product.name}
              </h1>
              <p className="text-3xl font-black italic text-gh-charcoal/80 mb-8">
                ${product.price}
              </p>
              <p className="text-xs font-bold text-gh-charcoal/60 leading-relaxed uppercase">
                {product.insights}
              </p>
            </div>

            {/* Selection Matrix */}
            <div className="space-y-10">
              {/* Color Selection */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 mb-6">Neural Tint</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-3 border-2 transition-all text-[10px] font-black uppercase tracking-widest rounded-sm ${
                        selectedColor === color 
                        ? "bg-gh-charcoal border-gh-charcoal text-white" 
                        : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40">Sizing Matrix</h4>
                  <button 
                    onClick={openSizeAI}
                    className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal flex items-center gap-2 hover:opacity-70"
                  >
                    <Cpu className="h-3 w-3" /> Run Sizing AI
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 border-2 transition-all text-[10px] font-black uppercase tracking-widest rounded-sm flex items-center justify-center ${
                        selectedSize === size 
                        ? "bg-gh-charcoal border-gh-charcoal text-white" 
                        : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={() => {
                    addItem({
                      ...product,
                      quantity: 1,
                      size: selectedSize || product.sizes[0],
                      isPreOrder: !!product.isPreOrder
                    });
                    openCheckoutAI();
                  }}
                  className="w-full flex items-center justify-center gap-4 bg-gh-charcoal py-6 text-white text-xs font-black uppercase tracking-[0.4em] hover:bg-black transition-all group"
                >
                  {product.isPreOrder ? "Initiate Pre-Order Request" : "Secure Neural Item"}
                  <Zap className="h-4 w-4 transition-transform group-hover:scale-125" />
                </button>
                {product.isPreOrder && (
                  <p className="text-[9px] font-black text-gh-charcoal/40 uppercase tracking-widest text-center">
                    Note: Deposit required for speculative manufacturing sequence.
                  </p>
                )}
              </div>
            </div>

            {/* Features / Analysis Section */}
            <div className="p-8 bg-gh-silver/10 border-2 border-gh-silver/30 rounded-sm">
               <div className="flex items-center gap-3 mb-6">
                  <Activity className="h-4 w-4 text-gh-charcoal" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">DNA Breakdown</h3>
               </div>
               <div className="space-y-6">
                  {product.technicalSpecs?.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-gh-silver/50 pb-2">
                       <span className="text-[9px] font-bold text-gh-charcoal/40 uppercase">{spec.label}</span>
                       <span className="text-xs font-black text-gh-charcoal uppercase">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-end border-b border-gh-silver/50 pb-2">
                      <span className="text-xs font-black text-gh-charcoal uppercase">{product.material}</span>
                  </div>
               </div>
            </div>

             {/* Authenticity Verification */}
             <div className="p-8 bg-gh-charcoal text-white rounded-sm mt-8 border border-white/10">
                <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-white" />
                      <div>
                         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Authenticity Verified</h3>
                         <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 block mt-1">100% Unique Serial Generation</span>
                      </div>
                   </div>
                   {qrCodeUrl && (
                      <div className="bg-white p-2 rounded-lg">
                         <Image src={qrCodeUrl} alt="Authenticity QR" width={48} height={48} className="w-12 h-12" />
                      </div>
                   )}
                </div>
                <div className="space-y-4">
                   <div className="p-4 bg-white/10 rounded border border-white/10 text-center">
                      <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Neural Signature ID</span>
                      <span className="block text-sm font-black uppercase tracking-[0.2em]">{product.signature || "UNASSIGNED"}</span>
                   </div>
                   <div className="flex items-center gap-2 justify-center text-[9px] font-bold uppercase tracking-widest text-white/40">
                      <QrCode className="h-3 w-3" />
                      Scannable Database Entry
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sentiment AI Detailed Section */}
        <section className="mt-32 pt-32 border-t-2 border-gh-charcoal/10 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="inline-flex items-center gap-3 px-4 py-2 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-[0.4em] mb-12 italic">
                    <ShieldCheck className="h-4 w-4" /> Sentimental AI Report
                 </div>
                 <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-12">
                    Predictive <br /> Performance <br /> Analysis
                 </h2>
                 <div className="space-y-8 max-w-lg">
                    <p className="text-sm font-bold text-gh-charcoal/60 leading-relaxed uppercase">
                       Our neural model indicates a high compatibility rating for your current athletic trajectory. The {product.material} integration facilitates 14% more energy return compared to legacy archives.
                    </p>
                    <div className="flex items-center gap-8">
                       <div className="flex flex-col">
                          <span className="text-4xl font-black italic">{product.aiRating}%</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">Efficiency Rating</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-4xl font-black italic">ULTRA</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">Strap Density</span>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative aspect-[4/5] bg-gh-silver/10 overflow-hidden">
                 <Image 
                   src={product.gallery[product.gallery.length - 1].url} // Usually lifestyle
                   alt="Lifestyle"
                   fill
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className="object-cover grayscale"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                 <div className="absolute bottom-12 left-12 right-12">
                     <div className="space-y-4">
                        <div className="h-1 w-full bg-gh-charcoal/10 relative">
                           <motion.div 
                             className="h-full bg-gh-charcoal"
                             initial={{ width: 0 }}
                             whileInView={{ width: "88%" }}
                             viewport={{ once: true }}
                           />
                        </div>
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                           <span>Field Sync</span>
                           <span>88% Active</span>
                        </div>
                     </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
