"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, Zap, ArrowRight, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useModalStore } from "@/store/useModalStore";
import { PRODUCTS } from "@/lib/data/products";

// Sub-component to handle state and logic
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Predictive Search Logic
  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.category.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).slice(0, 4); // Limit to top 4 results
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      // Redirect to shop with search query (future implementation: /shop?q=)
      router.push("/shop"); 
    }
  };

  const handleProductClick = (productId: string) => {
    onClose();
    router.push(`/shop/${productId}`);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[150] bg-white/80 backdrop-blur-xl transition-all"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-x-0 top-0 z-[160] w-full p-6 md:p-12"
      >
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header / Close */}
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gh-charcoal/40 hover:text-gh-charcoal transition-colors"
            >
              Close System
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gh-charcoal/20 group-hover:border-gh-charcoal group-hover:bg-gh-charcoal group-hover:text-white transition-all">
                <X className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Search Iput */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-gh-charcoal/40" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH NEURAL ARCHIVE..."
              className="w-full bg-transparent border-b-2 border-gh-charcoal/10 py-6 pl-16 pr-6 text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-gh-charcoal placeholder:text-gh-charcoal/20 focus:border-gh-charcoal focus:outline-none transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gh-charcoal text-white hover:scale-105 transition-transform">
                <ArrowRight className="h-5 w-5" />
              </div>
            </button>
          </form>

          {/* Results Area */}
          <div className="min-h-[300px]">
            {!query ? (
              // Empty State: Trending / Suggestions
              <div className="space-y-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40 flex items-center gap-2">
                    <TrendingUp className="h-3 w-3" /> Trending Searches
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {["Stealth Runner", "G1 Pro", "Carbon", "Titanium", "Neural Interface"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-6 py-3 border border-gh-charcoal/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gh-charcoal hover:text-white hover:border-gh-charcoal transition-all"
                        >
                          {term}
                        </button>
                    ))}
                  </div>
              </div>
            ) : (
              // Search Results
              <div className="space-y-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40 flex items-center gap-2">
                    <Zap className="h-3 w-3" /> System Results ({results.length})
                  </span>
                  
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((product) => (
                          <div 
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                              className="group flex gap-4 p-4 rounded-xl border border-gh-charcoal/5 hover:border-gh-charcoal/20 hover:bg-gh-silver/10 cursor-pointer transition-all"
                          >
                              <div className="relative h-20 w-20 shrink-0 bg-white rounded-lg overflow-hidden border border-gh-charcoal/5">
                                <Image 
                                    src={product.image} 
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 mb-1">{product.category}</span>
                                <h4 className="text-sm font-black uppercase italic tracking-tight text-gh-charcoal mb-1">{product.name}</h4>
                                <span className="text-xs font-bold text-gh-charcoal/60">${product.price}</span>
                              </div>
                              <ChevronRight className="ml-auto my-auto h-5 w-5 text-gh-charcoal/20 group-hover:text-gh-charcoal transition-colors" />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center border border-dashed border-gh-charcoal/20 rounded-2xl">
                        <p className="text-sm font-bold uppercase tracking-widest text-gh-charcoal/40">No matching signals found in archive.</p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function SearchModal() {
  const { isSearchAIOpen, closeSearchAI } = useModalStore();

  return (
    <AnimatePresence>
      {isSearchAIOpen && <SearchOverlay onClose={closeSearchAI} />}
    </AnimatePresence>
  );
}
