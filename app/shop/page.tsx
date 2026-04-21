"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  Zap,
  LayoutGrid,
  List,
  Flame,
  Layers,
  Archive,
  Footprints,
  Shirt,
  Package,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/useModalStore";
import { PRODUCTS, Product } from "@/lib/data/products";
import Link from "next/link";

const AURAS = ["Stealth", "Aggressive", "Fluid", "Rigid"];
const CATEGORIES = ["Velocity", "Terrain", "Hybrid"];
const COLORS = ["Charcoal", "Silver", "Phantom Black", "Earth Brown", "Slate", "Electric Blue", "White"];
const SIZES = ["7", "8", "9", "10", "11", "12", "13"];

const CATEGORY_URL_MAP: Record<string, string> = {
  men: "footwear",
  women: "apparel",
  tech: "accessory",
  kids: "footwear",
};

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

interface FilterSidebarProps {
  selectedAuras: string[];
  setSelectedAuras: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
}

function FilterSidebar({
  selectedAuras, setSelectedAuras,
  selectedCategories, setSelectedCategories,
  selectedColors, setSelectedColors,
  selectedSizes, setSelectedSizes,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  hasActiveFilters,
  clearAllFilters,
}: FilterSidebarProps) {
  const toggle = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    current: string[],
    value: string,
  ) => set(current.includes(value) ? current.filter(v => v !== value) : [...current, value]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-gh-silver/30 pb-4">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/40">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal hover:underline">
            Clear All
          </button>
        )}
      </div>

      {/* Style */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Zap className="h-4 w-4 text-gh-charcoal" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Style</h3>
        </div>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {AURAS.map(aura => (
            <button
              key={aura}
              onClick={() => toggle(setSelectedAuras, selectedAuras, aura)}
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

      {/* Category */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Layers className="h-4 w-4 text-gh-charcoal" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Category</h3>
        </div>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggle(setSelectedCategories, selectedCategories, cat)}
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

      {/* Price Range — dual min/max */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Archive className="h-4 w-4 text-gh-charcoal" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Price Range</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 mb-1 block">Min ($)</label>
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
              className="w-full border-2 border-gh-silver/30 bg-transparent px-3 py-2 text-xs font-black text-gh-charcoal outline-none focus:border-gh-charcoal transition-colors rounded-sm"
              placeholder="0"
            />
          </div>
          <span className="text-gh-charcoal/30 font-black mt-5">—</span>
          <div className="flex-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 mb-1 block">Max ($)</label>
            <input
              type="number"
              min={minPrice}
              max={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
              className="w-full border-2 border-gh-silver/30 bg-transparent px-3 py-2 text-xs font-black text-gh-charcoal outline-none focus:border-gh-charcoal transition-colors rounded-sm"
              placeholder="500"
            />
          </div>
        </div>
      </div>

      {/* Color */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Flame className="h-4 w-4 text-gh-charcoal" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Color</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => toggle(setSelectedColors, selectedColors, color)}
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

      {/* Size */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <List className="h-4 w-4 text-gh-charcoal" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Size</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map(size => (
            <button
              key={size}
              onClick={() => toggle(setSelectedSizes, selectedSizes, size)}
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
    </div>
  );
}

function ShopPageInner() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlQ = searchParams.get("q");

  const [search, setSearch] = useState("");
  const [selectedAuras, setSelectedAuras] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");

  const { addItem } = useCartStore();
  const { openCheckoutAI } = useModalStore();

  useEffect(() => {
    if (urlCategory && CATEGORY_URL_MAP[urlCategory]) {
      setTypeFilter(CATEGORY_URL_MAP[urlCategory]);
    }
    if (urlQ) {
      setSearch(urlQ);
    }
  }, [urlCategory, urlQ]);

  const filteredProducts = useMemo(() => {
    let results = PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesAura = selectedAuras.length === 0 || selectedAuras.includes(p.aura);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesColor = selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c));
      const matchesSize = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchesType = !typeFilter || p.type === typeFilter;
      return matchesSearch && matchesAura && matchesCategory && matchesColor && matchesSize && matchesPrice && matchesType;
    });

    switch (sortBy) {
      case "price-asc": return [...results].sort((a, b) => a.price - b.price);
      case "price-desc": return [...results].sort((a, b) => b.price - a.price);
      case "rating": return [...results].sort((a, b) => b.aiRating - a.aiRating);
      case "name": return [...results].sort((a, b) => a.name.localeCompare(b.name));
      default: return results;
    }
  }, [search, selectedAuras, selectedCategories, selectedColors, selectedSizes, minPrice, maxPrice, sortBy, typeFilter]);

  const hasActiveFilters =
    selectedAuras.length > 0 ||
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    search !== "" ||
    maxPrice < 500 ||
    minPrice > 0 ||
    typeFilter !== "";

  const activeChipCount =
    [selectedAuras, selectedCategories, selectedColors, selectedSizes].reduce((acc, arr) => acc + arr.length, 0) +
    (typeFilter ? 1 : 0) +
    (minPrice > 0 || maxPrice < 500 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedAuras([]);
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(500);
    setSearch("");
    setTypeFilter("");
  };

  const sidebarProps: FilterSidebarProps = {
    selectedAuras, setSelectedAuras,
    selectedCategories, setSelectedCategories,
    selectedColors, setSelectedColors,
    selectedSizes, setSelectedSizes,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    hasActiveFilters,
    clearAllFilters,
  };

  return (
    <div className="min-h-screen bg-gh-white pt-32 pb-20 px-6 sm:px-12">
      {/* Header */}
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
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <FilterSidebar {...sidebarProps} />
        </aside>

        {/* Product Area */}
        <main className="flex-1">
          {/* Toolbar: count + sort + mobile filter toggle */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <p className="text-xs font-black uppercase tracking-widest text-gh-charcoal/50">
              <span className="text-gh-charcoal text-sm">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"} Found
            </p>
            <div className="flex items-center gap-3 ml-auto">
              {/* Sort */}
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gh-charcoal/40 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-9 pr-8 py-2.5 bg-gh-silver/10 border-2 border-gh-silver/40 focus:border-gh-charcoal outline-none text-[10px] font-black uppercase tracking-widest text-gh-charcoal appearance-none cursor-pointer rounded-sm"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gh-charcoal/40 pointer-events-none" />
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-2 border-gh-charcoal text-[10px] font-black uppercase tracking-widest text-gh-charcoal rounded-sm"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeChipCount > 0 && (
                  <span className="h-4 w-4 rounded-full bg-gh-charcoal text-white text-[8px] flex items-center justify-center">
                    {activeChipCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {typeFilter && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                  {typeFilter}
                  <button onClick={() => setTypeFilter("")}><X className="h-2.5 w-2.5" /></button>
                </span>
              )}
              {selectedAuras.map(v => (
                <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                  {v}
                  <button onClick={() => setSelectedAuras(prev => prev.filter(x => x !== v))}><X className="h-2.5 w-2.5" /></button>
                </span>
              ))}
              {selectedCategories.map(v => (
                <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                  {v}
                  <button onClick={() => setSelectedCategories(prev => prev.filter(x => x !== v))}><X className="h-2.5 w-2.5" /></button>
                </span>
              ))}
              {selectedColors.map(v => (
                <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                  {v}
                  <button onClick={() => setSelectedColors(prev => prev.filter(x => x !== v))}><X className="h-2.5 w-2.5" /></button>
                </span>
              ))}
              {selectedSizes.map(v => (
                <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                  Size {v}
                  <button onClick={() => setSelectedSizes(prev => prev.filter(x => x !== v))}><X className="h-2.5 w-2.5" /></button>
                </span>
              ))}
              {(minPrice > 0 || maxPrice < 500) && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                  ${minPrice}–${maxPrice}
                  <button onClick={() => { setMinPrice(0); setMaxPrice(500); }}><X className="h-2.5 w-2.5" /></button>
                </span>
              )}
            </div>
          )}

          {/* Empty state */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <Archive className="h-16 w-16 text-gh-charcoal/10 mb-6" />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-3">No Gear Found</h2>
              <p className="text-sm text-gh-charcoal/50 font-medium mb-8 max-w-sm">
                No products match your current filters. Try adjusting your search or clearing some filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-8 py-4 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
              >
                {filteredProducts.map((product: Product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group relative bg-white border-2 border-gh-silver/20 overflow-hidden hover:border-gh-charcoal/40 transition-all duration-500 ${viewMode === "list" ? "flex flex-col sm:flex-row h-auto sm:h-64" : ""}`}
                  >
                    {/* Image */}
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
                      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        <div className="w-full h-[2px] bg-gh-charcoal/20 absolute top-0 animate-scan-line" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <span className="text-[9px] font-black text-gh-charcoal/40 uppercase tracking-[0.2em]">{product.category} Class</span>
                          <div className="flex items-center gap-2 flex-wrap justify-end">
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

                      <div className="flex items-center justify-between mt-auto gap-4 flex-wrap">
                        <span className="text-2xl font-black italic text-gh-charcoal">${product.price}</span>
                        <Link
                          href={`/shop/${product.id}`}
                          className="flex items-center gap-3 px-6 py-3 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                        >
                          View &amp; Select Size
                          {product.type === "footwear" && <Footprints className="h-3.5 w-3.5" />}
                          {product.type === "apparel" && <Shirt className="h-3.5 w-3.5" />}
                          {product.type === "accessory" && <Package className="h-3.5 w-3.5" />}
                          {!["footwear", "apparel", "accessory"].includes(product.type || "") && <Zap className="h-3 w-3" />}
                        </Link>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gh-charcoal/0 group-hover:border-gh-charcoal/20 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gh-charcoal/0 group-hover:border-gh-charcoal/20 transition-all duration-700" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed inset-y-0 left-0 w-80 bg-gh-white z-50 lg:hidden overflow-y-auto p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase tracking-widest">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gh-charcoal/50 hover:text-gh-charcoal transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterSidebar {...sidebarProps} />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-full mt-10 py-4 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
              >
                Show {filteredProducts.length} {filteredProducts.length === 1 ? "Result" : "Results"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] border-[50px] border-gh-charcoal rounded-full rotate-45" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] border-[30px] border-gh-charcoal rounded-full -rotate-12" />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageInner />
    </Suspense>
  );
}
