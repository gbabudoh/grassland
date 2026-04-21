"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Cpu,
  Activity,
  Play,
  Box,
  QrCode,
  Flame,
  Minus,
  Plus,
  AlertCircle,
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
  loading: () => <div className="h-full w-full animate-pulse bg-gh-silver/10" />,
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { openCheckoutAI, openSizeAI } = useModalStore();

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const relatedProducts = useMemo(
    () => PRODUCTS.filter(p => p.id !== id).slice(0, 3),
    [id],
  );

  const [activeMedia, setActiveMedia] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (product?.signature) {
      QRCode.toDataURL(product.signature)
        .then((url: string) => setQrCodeUrl(url))
        .catch(console.error);
    }
  }, [product]);

  useEffect(() => {
    if (isMounted && !product) router.push("/shop");
  }, [product, router, isMounted]);

  if (!product) return null;

  const currentMedia = product.gallery[activeMedia];
  const isLowStock = product.stock < 10;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem({
      ...product,
      quantity,
      size: selectedSize,
      isPreOrder: !!product.isPreOrder,
    });
    openCheckoutAI();
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 sm:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: [product.gallery[0]?.url],
            description: product.insights || product.name,
            sku: product.id,
            brand: { "@type": "Brand", name: "Grassland" },
            offers: {
              "@type": "Offer",
              url: `https://grassland.com/shop/${product.id}`,
              priceCurrency: "USD",
              price: product.price,
              availability: product.isPreOrder
                ? "https://schema.org/PreOrder"
                : "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 flex-wrap">
          <Link href="/" className="hover:text-gh-charcoal transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/shop" className="hover:text-gh-charcoal transition-colors flex items-center gap-2">
            <ChevronLeft className="h-3.5 w-3.5" />
            Shop
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-gh-charcoal truncate max-w-50">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Gallery */}
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
                    </video>
                  )}
                  {currentMedia.type === "3d" && (
                    <div className="h-full w-full bg-gh-charcoal/5">
                      <ProductViewer />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] border border-gh-charcoal/10">
                  {product.signature}
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
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.gallery.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`relative h-20 w-20 shrink-0 border-2 transition-all overflow-hidden ${
                    activeMedia === idx
                      ? "border-gh-charcoal"
                      : "border-gh-silver/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  {media.type === "image" && (
                    <Image src={media.url} alt="thumb" fill sizes="80px" className="object-cover" />
                  )}
                  {media.type === "video" && (
                    <div className="h-full w-full bg-gh-charcoal relative">
                      <video
                        src={media.url}
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
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

          {/* Info Panel */}
          <div className="w-full lg:w-112.5 space-y-10">
            <div>
              <div className="flex justify-between items-start mb-4 gap-3 flex-wrap">
                <span className="text-[10px] font-black text-gh-charcoal/40 uppercase tracking-[0.3em]">
                  {product.category} CLASS / DNA {product.id.split("-")[0]}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {isLowStock && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[9px] font-black uppercase tracking-widest">
                      <Flame className="h-3 w-3" /> Only {product.stock} left
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest italic">
                    AI {product.aiRating}% SYNC
                  </div>
                </div>
              </div>

              <h1 className="text-5xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-4 leading-none">
                {product.name}
              </h1>
              <p className="text-3xl font-black italic text-gh-charcoal/80 mb-6">
                ${product.price}
              </p>
              <p className="text-xs font-bold text-gh-charcoal/60 leading-relaxed uppercase">
                {product.insights}
              </p>
            </div>

            {/* Selectors */}
            <div className="space-y-8">
              {/* Color */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 mb-5">Color</h4>
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

              {/* Size */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40">Size</h4>
                  <button
                    onClick={openSizeAI}
                    className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal flex items-center gap-2 hover:opacity-70 transition-opacity"
                  >
                    <Cpu className="h-3 w-3" /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`py-4 border-2 transition-all text-[10px] font-black uppercase tracking-widest rounded-sm flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-gh-charcoal border-gh-charcoal text-white"
                          : sizeError
                          ? "border-red-300 text-gh-charcoal hover:border-red-400"
                          : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <div className="flex items-center gap-2 mt-3 text-red-500">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Please select a size before adding to cart.</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 mb-5">Quantity</h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="h-10 w-10 border-2 border-gh-silver/30 flex items-center justify-center text-gh-charcoal hover:border-gh-charcoal transition-colors rounded-sm"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-lg font-black w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="h-10 w-10 border-2 border-gh-silver/30 flex items-center justify-center text-gh-charcoal hover:border-gh-charcoal transition-colors rounded-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-4 bg-gh-charcoal py-6 text-white text-xs font-black uppercase tracking-[0.4em] hover:bg-black transition-all group"
                >
                  {product.isPreOrder ? "Pre-Order Now" : "Add to Cart"}
                  <Zap className="h-4 w-4 transition-transform group-hover:scale-125" />
                </button>
                {product.isPreOrder && (
                  <p className="text-[9px] font-black text-gh-charcoal/40 uppercase tracking-widest text-center">
                    A deposit is required. Estimated ship date: Q2 2026.
                  </p>
                )}
              </div>
            </div>

            {/* DNA Breakdown */}
            <div className="p-8 bg-gh-silver/10 border-2 border-gh-silver/30 rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-4 w-4 text-gh-charcoal" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Specifications</h3>
              </div>
              <div className="space-y-4">
                {product.technicalSpecs?.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-gh-silver/50 pb-3">
                    <span className="text-[9px] font-bold text-gh-charcoal/40 uppercase">{spec.label}</span>
                    <span className="text-xs font-black text-gh-charcoal uppercase">{spec.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-end border-b border-gh-silver/50 pb-3">
                  <span className="text-[9px] font-bold text-gh-charcoal/40 uppercase">Material</span>
                  <span className="text-xs font-black text-gh-charcoal uppercase">{product.material}</span>
                </div>
                <div className="flex justify-between items-end border-b border-gh-silver/50 pb-3">
                  <span className="text-[9px] font-bold text-gh-charcoal/40 uppercase">Type</span>
                  <span className="text-xs font-black text-gh-charcoal uppercase">{product.type}</span>
                </div>
              </div>
            </div>

            {/* Authenticity */}
            <div className="p-8 bg-gh-charcoal text-white rounded-sm border border-white/10">
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
                  <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Serial ID</span>
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

        {/* Sentiment AI Section */}
        <section className="mt-32 pt-32 border-t-2 border-gh-charcoal/10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-[0.4em] mb-12 italic">
                <ShieldCheck className="h-4 w-4" /> Sentiment AI Report
              </div>
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-12">
                Predictive <br /> Performance <br /> Analysis
              </h2>
              <div className="space-y-8 max-w-lg">
                <p className="text-sm font-bold text-gh-charcoal/60 leading-relaxed uppercase">
                  Our performance model rates this product highly for athletic use. The {product.material} construction delivers superior energy return compared to standard alternatives.
                </p>
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black italic">{product.aiRating}%</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">Efficiency Rating</span>
                  </div>
                  {product.technicalSpecs?.[0] && (
                    <div className="flex flex-col">
                      <span className="text-4xl font-black italic">{product.technicalSpecs[0].value}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">{product.technicalSpecs[0].label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative aspect-4/5 bg-gh-silver/10 overflow-hidden">
              <Image
                src={product.gallery[product.gallery.length - 1].url}
                alt="Product lifestyle"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="space-y-4">
                  <div className="h-1 w-full bg-gh-charcoal/10 relative">
                    <motion.div
                      className="h-full bg-gh-charcoal"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${product.aiRating}%` }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span>Performance Score</span>
                    <span>{product.aiRating}% Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32 pt-16 border-t-2 border-gh-charcoal/10">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gh-charcoal">
                You May Also Like
              </h2>
              <Link
                href="/shop"
                className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/40 hover:text-gh-charcoal transition-colors flex items-center gap-2"
              >
                View All <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(related => (
                <Link
                  key={related.id}
                  href={`/shop/${related.id}`}
                  className="group relative bg-white border-2 border-gh-silver/20 overflow-hidden hover:border-gh-charcoal/40 transition-all duration-500 block"
                >
                  <div className="relative aspect-square bg-gh-silver/5 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {related.stock < 10 && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-red-50 border border-red-100 text-red-600 text-[8px] font-black uppercase tracking-widest">
                        <Flame className="h-2.5 w-2.5" /> Low Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-[9px] font-black text-gh-charcoal/40 uppercase tracking-widest">{related.category}</span>
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-gh-charcoal mt-1 mb-3 group-hover:opacity-70 transition-opacity">
                      {related.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black italic text-gh-charcoal">${related.price}</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gh-charcoal text-white text-[8px] font-black uppercase tracking-widest italic">
                        AI {related.aiRating}%
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gh-charcoal/0 group-hover:border-gh-charcoal/20 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gh-charcoal/0 group-hover:border-gh-charcoal/20 transition-all duration-700" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
