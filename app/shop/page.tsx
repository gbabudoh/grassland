"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search,
  ChevronRight, 
  Activity, 
  Zap,
  LayoutGrid,
  List,
  Flame,
  Layers,
  Archive,
  Footprints,
  Shirt,
  Package
} from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/useModalStore";
import { PRODUCTS } from "@/lib/data/products";
import Link from "next/link";

// Mock Data - Expanding on the Neural Archive theme
const AURAS = ["Stealth", "Aggressive", "Fluid", "Rigid"];
const CATEGORIES = ["Velocity", "Terrain", "Hybrid"];
const COLORS = ["Charcoal", "Silver", "Phantom Black", "Earth Brown", "Slate", "Electric Blue", "White"];
const SIZES = ["7", "8", "9", "10", "11", "12", "13"];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [selectedAuras, setSelectedAuras] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { addItem } = useCartStore();
  const { openCheckoutAI } = useModalStore();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesAura = selectedAuras.length === 0 || selectedAuras.includes(p.aura);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesColor = selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c));
      const matchesSize = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      return matchesSearch && matchesAura && matchesCategory && matchesColor && matchesSize && matchesPrice;
    });
  }, [search, selectedAuras, selectedCategories, selectedColors, selectedSizes, priceRange]);

  const toggleFilter = (set: React.Dispatch<React.SetStateAction<string[]>>, current: string[], value: string) => {
    if (current.includes(value)) {
      set(current.filter(v => v !== value));
    } else {
      set([...current, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gh-white pt-32 pb-20 px-6 sm:px-12">
      {/* Neural Archive Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b-2 border-gh-charcoal pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Archive className="h-5 w-5 text-gh-charcoal" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/60">System Archive / Gear</span>
            </div>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter text-gh-charcoal">
              Neural Archive
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/40 group-focus-within:text-gh-charcoal transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search Gear..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-12 pr-6 py-4 bg-gh-silver/20 border-2 border-gh-silver/50 focus:border-gh-charcoal outline-none text-gh-charcoal text-xs font-bold uppercase tracking-widest transition-all w-full sm:w-80 rounded-sm"
               />
            </div>
            <div className="flex bg-gh-silver/20 p-1 rounded-sm border-2 border-gh-silver/50">
               <button 
                 onClick={() => setViewMode("grid")}
                 className={`p-2 rounded-sm transition-all ${viewMode === "grid" ? "bg-gh-charcoal text-white" : "text-gh-charcoal/40"}`}
               >
                 <LayoutGrid className="h-4 w-4" />
               </button>
               <button 
                 onClick={() => setViewMode("list")}
                 className={`p-2 rounded-sm transition-all ${viewMode === "list" ? "bg-gh-charcoal text-white" : "text-gh-charcoal/40"}`}
               >
                 <List className="h-4 w-4" />
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* AI Signature Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-12">
            <div className="flex items-center justify-between border-b border-gh-silver/30 pb-4">
               <h2 className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/40">Filters</h2>
               {(selectedAuras.length > 0 || selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || search !== "" || priceRange[1] < 500) && (
                 <button 
                   onClick={() => {
                     setSelectedAuras([]);
                     setSelectedCategories([]);
                     setSelectedColors([]);
                     setSelectedSizes([]);
                     setPriceRange([0, 500]);
                     setSearch("");
                   }}
                   className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal hover:underline"
                 >
                   Clear All
                 </button>
               )}
            </div>

            {/* Aura Filter */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Zap className="h-4 w-4 text-gh-charcoal" />
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Neural Aura</h3>
               </div>
               <div className="flex flex-wrap lg:flex-col gap-2">
                 {AURAS.map(aura => (
                   <button
                     key={aura}
                     onClick={() => toggleFilter(setSelectedAuras, selectedAuras, aura)}
                     className={`flex items-center justify-between px-4 py-3 border-2 transition-all uppercase text-[10px] font-black tracking-widest rounded-sm ${
                       selectedAuras.includes(aura) 
                       ? "bg-gh-charcoal border-gh-charcoal text-white" 
                       : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                     }`}
                   >
                     <span>{aura}</span>
                     <div className={`h-1.5 w-1.5 rounded-full ${selectedAuras.includes(aura) ? "bg-white animate-pulse" : "bg-gh-silver"}`} />
                   </button>
                 ))}
               </div>
            </div>

            {/* Category Filter */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Layers className="h-4 w-4 text-gh-charcoal" />
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Class Tier</h3>
               </div>
               <div className="flex flex-wrap lg:flex-col gap-2">
                 {CATEGORIES.map(cat => (
                   <button
                     key={cat}
                     onClick={() => toggleFilter(setSelectedCategories, selectedCategories, cat)}
                     className={`flex items-center justify-between px-4 py-3 border-2 transition-all uppercase text-[10px] font-black tracking-widest rounded-sm ${
                       selectedCategories.includes(cat) 
                       ? "bg-gh-charcoal border-gh-charcoal text-white" 
                       : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                     }`}
                   >
                     <span>{cat}</span>
                     <ChevronRight className={`h-3 w-3 ${selectedCategories.includes(cat) ? "text-white" : "text-gh-silver"}`} />
                   </button>
                 ))}
               </div>
            </div>

            {/* Price Range */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Archive className="h-4 w-4 text-gh-charcoal" />
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Price Range</h3>
               </div>
               <div className="px-2">
                 <input 
                   type="range" 
                   min="0" 
                   max="500" 
                   value={priceRange[1]}
                   onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                   className="w-full accent-gh-charcoal h-1 bg-gh-silver/30 rounded-lg appearance-none cursor-pointer"
                 />
                 <div className="flex justify-between mt-4">
                    <span className="text-[10px] font-black tracking-widest text-gh-charcoal/50">$0</span>
                    <span className="text-[10px] font-black tracking-widest text-gh-charcoal bg-gh-silver/20 px-2 py-1">UP TO ${priceRange[1]}</span>
                 </div>
               </div>
            </div>

            {/* Color Filter */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Flame className="h-4 w-4 text-gh-charcoal" />
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Neural Tint</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                 {COLORS.map(color => (
                   <button
                     key={color}
                     onClick={() => toggleFilter(setSelectedColors, selectedColors, color)}
                     className={`px-3 py-2 border-2 transition-all uppercase text-[9px] font-black tracking-widest rounded-sm ${
                       selectedColors.includes(color) 
                       ? "bg-gh-charcoal border-gh-charcoal text-white" 
                       : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                     }`}
                   >
                     {color}
                   </button>
                 ))}
               </div>
            </div>

            {/* Size Filter */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <List className="h-4 w-4 text-gh-charcoal" />
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Sizing Matrix</h3>
               </div>
               <div className="grid grid-cols-4 gap-2">
                 {SIZES.map(size => (
                   <button
                     key={size}
                     onClick={() => toggleFilter(setSelectedSizes, selectedSizes, size)}
                     className={`py-3 border-2 transition-all uppercase text-[10px] font-black tracking-widest rounded-sm flex items-center justify-center ${
                       selectedSizes.includes(size) 
                       ? "bg-gh-charcoal border-gh-charcoal text-white" 
                       : "bg-transparent border-gh-silver/30 text-gh-charcoal hover:border-gh-silver"
                     }`}
                   >
                     {size}
                   </button>
                 ))}
               </div>
            </div>

           {/* Stats / AI Summary */}
           <div className="p-6 bg-gh-silver/10 border-2 border-gh-silver/30 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                 <Activity className="h-4 w-4 text-gh-charcoal" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest">System Health</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[9px] font-bold text-gh-charcoal/50 uppercase">Available Gear</span>
                    <span className="text-lg font-black italic">{filteredProducts.length}</span>
                 </div>
                 <div className="w-full h-1 bg-gh-silver/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gh-charcoal"
                      initial={{ width: 0 }}
                      animate={{ width: `${(filteredProducts.length / PRODUCTS.length) * 100}%` }}
                    />
                 </div>
                 <p className="text-[9px] font-bold text-gh-charcoal/40 leading-relaxed uppercase">
                    Neural link processing filtered metadata. System stable at 98.4%.
                 </p>
              </div>
           </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
           <AnimatePresence mode="popLayout">
           <motion.div 
             layout
             className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
           >
             {filteredProducts.map(product => (
               <motion.div
                 layout
                 key={product.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className={`group relative bg-white border-2 border-gh-silver/20 overflow-hidden hover:border-gh-charcoal/40 transition-all duration-500 ${viewMode === "list" ? "flex flex-col sm:flex-row h-auto sm:h-64" : ""}`}
               >
                 {/* Image Section */}
                  <Link 
                    href={`/shop/${product.id}`}
                    className={`relative bg-gh-silver/5 cursor-pointer block ${viewMode === "grid" ? "aspect-square" : "w-full sm:w-64 h-64 sm:h-full shrink-0"}`}
                  >
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10">
                       <div className="bg-white/80 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest border border-gh-charcoal/10">
                          {product.signature}
                       </div>
                    </div>
                    {/* Scanning Line Effect */}
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                       <div className="w-full h-[2px] bg-gh-charcoal/20 absolute top-0 animate-scan-line" />
                    </div>
                  </Link>

                 {/* Content Section */}
                 <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black text-gh-charcoal/40 uppercase tracking-[0.2em]">{product.category} Class</span>
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gh-charcoal text-white text-[8px] font-black uppercase tracking-widest italic">
                             AI {product.aiRating}%
                           </div>
                           {product.stock < 10 && (
                             <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-600 text-[8px] font-black uppercase tracking-widest border border-red-100 italic">
                               <Flame className="h-2.5 w-2.5" /> Low Stock
                             </span>
                           )}
                           <span className="text-[9px] font-black text-gh-charcoal/40 uppercase tracking-[0.2em]">{product.aura} Aura</span>
                        </div>
                      </div>
                      <Link href={`/shop/${product.id}`}>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-4 hover:opacity-70 transition-opacity">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-[10px] font-bold text-gh-charcoal/60 leading-relaxed uppercase mb-6 line-clamp-2">
                        {product.insights}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {product.tags.map(tag => (
                          <span key={tag} className="text-[8px] font-black tracking-widest uppercase px-2 py-1 bg-gh-silver/20 text-gh-charcoal/60">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-2xl font-black italic text-gh-charcoal">${product.price}</span>
                        <button 
                          onClick={() => {
                            addItem({
                              ...product,
                              quantity: 1,
                              size: product.sizes[0] || "10",
                              isPreOrder: false
                            });
                            openCheckoutAI();
                          }}
                          className="flex items-center gap-3 px-6 py-3 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all cursor-pointer"
                        >
                          Secure Item
                          {product.type === "footwear" && <Footprints className="h-3.5 w-3.5" />}
                          {product.type === "apparel" && <Shirt className="h-3.5 w-3.5" />}
                          {product.type === "accessory" && <Package className="h-3.5 w-3.5" />}
                          {!["footwear", "apparel", "accessory"].includes(product.type || "") && <Zap className="h-3 w-3" />}
                        </button>
                    </div>
                 </div>

                 {/* Corners Decoration */}
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gh-charcoal/0 group-hover:border-gh-charcoal/20 transition-all duration-700" />
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gh-charcoal/0 group-hover:border-gh-charcoal/20 transition-all duration-700" />
               </motion.div>
             ))}
           </motion.div>
           </AnimatePresence>
        </main>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03] overflow-hidden">
         <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] border-[50px] border-gh-charcoal rounded-full rotate-45" />
         <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] border-[30px] border-gh-charcoal rounded-full -rotate-12" />
      </div>
    </div>
  );
}
