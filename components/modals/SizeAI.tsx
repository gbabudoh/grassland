"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check, Cpu, RefreshCw, Baby, User, UserPlus } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";

const MENS_SIZES = Array.from({ length: 15 }, (_, i) => (i + 5).toString());
const KIDS_SIZES = Array.from({ length: 13 }, (_, i) => (i + 1).toString()).map(s => s + "Y");

type Category = "Men" | "Women" | "Kids";

interface SavedFootprint {
  category: Category;
  originalSize: string;
  recommendedSize: string;
}

export default function SizeAI() {
  const { isSizeAIOpen, closeSizeAI } = useModalStore();
  const [step, setStep] = useState(0); // Step 0: Check for saved data
  const [category, setCategory] = useState<Category>("Men");
  const [selectedSize, setSelectedSize] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [savedFootprint, setSavedFootprint] = useState<SavedFootprint | null>(null);

  // Helper function for recommendation logic
  const calculateRecommendation = useCallback((size: string, cat: Category) => {
    if (!size) return "";
    if (cat === "Kids") {
      const num = parseInt(size);
      return (Number.isNaN(num) ? "1" : (num + 1).toString()) + "Y";
    }
    const num = parseFloat(size);
    return (Number.isNaN(num) ? "8" : (num + 0.5).toString());
  }, []);

  const saveFootprint = useCallback((footprint: SavedFootprint) => {
    localStorage.setItem("grassland_digital_footprint", JSON.stringify(footprint));
    setSavedFootprint(footprint);
    window.dispatchEvent(new Event("footprintUpdated"));
  }, []);

  const handleStartCalculation = useCallback(() => {
    setIsCalculating(true);
    // Simulate AI calculation
    setTimeout(() => {
      setIsCalculating(false);
      const recommendedSize = calculateRecommendation(selectedSize, category);
      setRecommendation(recommendedSize);
      setStep(4);
      
      const footprint: SavedFootprint = {
        category,
        originalSize: selectedSize,
        recommendedSize: recommendedSize
      };
      saveFootprint(footprint);
    }, 3000);
  }, [selectedSize, category, calculateRecommendation, saveFootprint]);

  // Check for saved data on mount or when modal opens
  useEffect(() => {
    if (isSizeAIOpen) {
      const timer = setTimeout(() => {
        try {
          const saved = localStorage.getItem("grassland_digital_footprint");
          if (saved) {
            const parsed = JSON.parse(saved) as SavedFootprint;
            setSavedFootprint(parsed);
            setCategory(parsed.category);
            setStep(0);
          } else {
            setStep(1);
          }
        } catch (e) {
          console.error("Failed to parse saved footprint", e);
          setStep(1);
        }
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isSizeAIOpen]);

  // Handle auto-start of calculation when entering step 3
  useEffect(() => {
    if (step === 3 && !isCalculating) {
      const timer = setTimeout(handleStartCalculation, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, isCalculating, handleStartCalculation]);

  const resetAndClose = () => {
    closeSizeAI();
  };

  const startNewCalculation = () => {
    setSavedFootprint(null);
    setStep(1);
    setRecommendation(null);
    setSelectedSize("");
  };

  const switchCategory = useCallback((newCat: Category) => {
    setCategory(newCat);
    if (savedFootprint) {
      let newRec = savedFootprint.recommendedSize;
      
      try {
        if (newCat === "Women" && savedFootprint.category === "Men") {
          newRec = (parseFloat(savedFootprint.recommendedSize) + 1.5).toString();
        } else if (newCat === "Men" && savedFootprint.category === "Women") {
          newRec = (parseFloat(savedFootprint.recommendedSize) - 1.5).toString();
        } else if (newCat === "Kids") {
          newRec = "4Y";
        }
      } catch {
        newRec = "8";
      }

      const updated = { ...savedFootprint, category: newCat, recommendedSize: newRec };
      saveFootprint(updated);
    }
  }, [savedFootprint, saveFootprint]);

  const categoryOptions = useMemo(() => [
    { id: "Men", icon: User },
    { id: "Women", icon: UserPlus },
    { id: "Kids", icon: Baby }
  ], []);

  return (
    <AnimatePresence mode="wait">
      {isSizeAIOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-gh-charcoal p-8 shadow-2xl"
          >
            {isCalculating && <div className="scan-line pointer-events-none" />}

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white">
                  <Cpu className="h-6 w-6 animate-pulse text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Sizing AI</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Neural Fit Engine v2.0</p>
                </div>
              </div>
              <button
                onClick={resetAndClose}
                className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step Content */}
            <div className="min-h-[350px]">
              {step === 0 && savedFootprint && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-8"
                >
                  <div className="text-center space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Your Digital Footprint</h4>
                    
                    {/* Category Switcher in Saved View */}
                    <div className="flex gap-2 mt-4 justify-center">
                      {(["Men", "Women", "Kids"] as Category[]).map(cat => (
                        <button
                          key={cat}
                          onClick={() => switchCategory(cat)}
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            category === cat 
                              ? "bg-white text-gh-charcoal" 
                              : "bg-white/5 text-white/40 hover:bg-white/10"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative group w-full max-w-[280px]">
                    <div className="absolute inset-0 blur-2xl bg-white/5 group-hover:bg-white/10 transition-all rounded-full" />
                    <div className="relative flex flex-col items-center justify-center border border-white/20 rounded-2xl p-10 bg-white/5 backdrop-blur-md">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Recommended</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-black italic text-white leading-none">
                          {savedFootprint.recommendedSize}
                        </span>
                      </div>
                      <div className="mt-6 flex flex-col items-center text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                          Mode: {category} Standards
                        </p>
                        <p className="text-[9px] text-white/30 uppercase mt-1 tracking-tighter">
                          Optimized for Innovation Lab G1 Series
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-3 pt-4">
                    <button
                      onClick={resetAndClose}
                      className="w-full rounded-none bg-white py-4 text-sm font-black uppercase tracking-widest text-gh-charcoal"
                    >
                      Store Profile
                    </button>
                    <p className="text-center text-[10px] uppercase tracking-widest text-white/30">Syncing with Digital Gear Vault</p>
                    <button
                      onClick={startNewCalculation}
                      className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Wipe Data & Reset AI
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black uppercase italic text-white leading-tight">Identify<br/>Profile Type</h4>
                    <p className="text-sm text-white/60">Choose the sizing standard for your neural profile.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {categoryOptions.map(({ id, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => {
                          setCategory(id as Category);
                          setStep(2);
                        }}
                        className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/40 hover:bg-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="h-6 w-6 text-white/40 group-hover:text-white transition-colors" />
                          <span className="text-xl font-black uppercase text-white">{id}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between group cursor-pointer" onClick={() => setStep(1)}>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black uppercase italic text-white leading-tight">Base Metric</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Category: {category}</p>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Change</button>
                  </div>
                  
                  <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-4 gap-2">
                      {(category === "Kids" ? KIDS_SIZES : MENS_SIZES).map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-lg border py-3 text-xs font-bold transition-all ${
                            selectedSize === size ? "border-white bg-white text-gh-charcoal" : "border-white/10 text-white/60 hover:border-white/30"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={!selectedSize}
                      onClick={() => setStep(3)}
                      className="w-full rounded-none bg-white py-4 text-sm font-black uppercase tracking-widest text-gh-charcoal disabled:opacity-30"
                    >
                      Initialize Analysis
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center space-y-8 py-12"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="h-24 w-24 relative">
                      <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-t-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      />
                      <Cpu className="absolute inset-0 m-auto h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.5em] text-white animate-pulse">Neural Mapping Active</p>
                      <p className="mt-2 text-[10px] text-white/40 uppercase tracking-widest">Scanning category: {category}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && recommendation && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex h-full flex-col items-center justify-center space-y-8 py-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gh-charcoal">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="text-center space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Results Ready</h4>
                    
                    {/* Switcher even in new results view */}
                    <div className="flex gap-2 justify-center">
                      {(["Men", "Women", "Kids"] as Category[]).map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setCategory(cat);
                            setRecommendation(calculateRecommendation(selectedSize, cat));
                          }}
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                            category === cat 
                              ? "bg-white text-gh-charcoal" 
                              : "bg-white/5 text-white/40 hover:bg-white/10"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <span className="text-8xl font-black italic text-white leading-none">{recommendation}</span>
                      {category !== "Kids" && <span className="text-2xl font-black text-white/20 uppercase">US</span>}
                    </div>
                  </div>
                  <div className="w-full space-y-3 pt-4">
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
