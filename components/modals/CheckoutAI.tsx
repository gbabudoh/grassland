"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, TrendingUp, ShieldCheck, ArrowRight, Cpu, Zap, Hash } from "lucide-react";
import Image from "next/image";
import { useModalStore } from "@/store/useModalStore";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutAI() {
  const { isCheckoutAIOpen, closeCheckoutAI } = useModalStore();
  const { items, getTotalPrice, removeItem, updateQuantity } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter(); // Import useRouter

  const totalPrice = getTotalPrice();
  
  const sentimentMessage = useMemo(() => {
    if (items.length === 0) return "Your archive is currently empty.";
    if (totalPrice > 1000) return "A monumental investment in neural excellence.";
    if (items.some(i => i.isPreOrder)) return "Patience is the ultimate luxury. Your future self thanks you.";
    return "Refined choices. This selection defines the next era.";
  }, [items, totalPrice]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    setIsProcessing(true);
    closeCheckoutAI();
    router.push("/checkout");
    setIsProcessing(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isCheckoutAIOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckoutAI}
            className="absolute inset-0 bg-white/60 backdrop-blur-xl"
          >
            {/* Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_70%)]" />
          </motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-gh-silver bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gh-charcoal/20 to-transparent animate-scan z-10 opacity-30" />

            <div className="flex h-[85vh] flex-col md:flex-row">
              {/* Left Side: Summary & Items */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar border-r border-gh-silver/50">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gh-off-white">
                      <ShoppingBag className="h-5 w-5 text-gh-charcoal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase italic tracking-tighter text-gh-charcoal">Neural Bag</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal">{items.length} Gear Item{items.length !== 1 ? 's' : ''} Collected</p>
                    </div>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center relative overflow-hidden">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 180, 270, 360],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 flex items-center justify-center -z-10"
                    >
                      <div className="h-64 w-64 rounded-full border border-gh-charcoal/[0.05] animate-pulse" />
                      <div className="absolute h-48 w-48 rounded-full border border-gh-charcoal/[0.02]" />
                    </motion.div>

                    <div className="relative">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-gh-off-white p-6 rounded-full mb-6 border border-gh-silver shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                      >
                        <Cpu className="h-10 w-10 text-gh-charcoal/40" />
                      </motion.div>
                    </div>

                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-gh-charcoal mb-2">Neural Link Idle</h4>
                    <p className="max-w-[240px] text-[10px] font-bold uppercase tracking-widest text-gh-charcoal leading-relaxed mb-8">
                      Your selection archive is empty. Initiate a selection sequence to begin analysis.
                    </p>

                    <button 
                      onClick={() => {
                        closeCheckoutAI();
                        setTimeout(() => {
                          window.location.href = "/shop";
                        }, 500);
                      }}
                      className="group flex cursor-pointer items-center gap-3 rounded-full border border-gh-silver px-6 py-3 transition-all duration-500 hover:bg-gh-charcoal hover:text-white"
                    >
                      <Zap className="h-4 w-4 text-gh-charcoal transition-colors group-hover:text-white" />
                      <span className="pt-0.5 text-[10px] font-black uppercase leading-none tracking-widest">Browse Archive</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div 
                        layout
                        key={`${item.id}-${item.size}`}
                        className="flex gap-4 group relative"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gh-off-white border border-gh-silver/50 relative">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            className="object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500" 
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="text-xs font-black uppercase text-gh-charcoal tracking-widest">{item.name}</h4>
                                <div className="flex items-center gap-2 opacity-30">
                                  <Hash className="h-2 w-2 text-gh-charcoal" />
                                  <span className="text-[8px] font-mono text-gh-charcoal uppercase tracking-widest">
                                    NRL-{item.id.substring(0, 6).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeItem(item.id, item.size)}
                                className="text-gh-charcoal/40 hover:text-gh-charcoal transition-colors p-1 hover:bg-gh-off-white rounded"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex gap-4 mt-3 text-[9px] items-center">
                              <span className="text-gh-charcoal uppercase tracking-[0.2em]">{item.category} / US {item.size}</span>
                              {item.isPreOrder && (
                                <span className="text-[8px] text-gh-charcoal px-2 py-0.5 bg-gh-off-white rounded-full font-black tracking-widest border border-gh-silver">PRE-ORDER</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3 border border-gh-silver rounded-full px-2 py-1">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                  className="text-gh-charcoal hover:opacity-70"
                                >-</button>
                                <span className="text-[10px] font-black text-gh-charcoal">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                  className="text-gh-charcoal hover:opacity-70"
                                >+</button>
                             </div>
                             <span className="text-xs font-black text-gh-charcoal">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side: AI Sentiment & Checkout */}
              <div className="w-full md:w-[320px] bg-gh-off-white/30 p-8 flex flex-col justify-between border-l border-gh-silver/50 relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-gh-charcoal/[0.02] blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                   <div className="mb-10 space-y-3">
                    <div className="flex items-center gap-2">
                       <span className="h-1.5 w-1.5 rounded-full bg-gh-charcoal animate-pulse" />
                       <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal">AI Analysis</h4>
                    </div>
                    <motion.p 
                      key={sentimentMessage}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-bold text-gh-charcoal italic leading-relaxed group selection:bg-gh-charcoal selection:text-white"
                    >
                      &ldquo;{sentimentMessage}&rdquo;
                    </motion.p>
                  </div>

                  <div className="space-y-5 pt-8 border-t border-gh-silver/50">
                    <div className="flex items-center justify-between group cursor-help">
                      <div className="flex items-center gap-3 text-gh-charcoal group-hover:opacity-80 transition-colors">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Market Value</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gh-charcoal opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gh-charcoal"></span>
                        </span>
                        <span className="text-[8px] font-black text-gh-charcoal uppercase tracking-widest bg-gh-off-white px-2 py-0.5 rounded leading-none">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between group cursor-help">
                      <div className="flex items-center gap-3 text-gh-charcoal group-hover:opacity-80 transition-colors">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Neural Encryption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-gh-charcoal/40" />
                        <span className="text-[8px] font-black text-gh-charcoal uppercase tracking-widest bg-gh-off-white px-2 py-0.5 rounded leading-none">On</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gh-charcoal">
                      <span>Neural Inventory</span>
                      <span className="text-gh-charcoal">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gh-charcoal">
                      <span>Secure Transmission</span>
                      <span className="text-gh-charcoal">SECURED</span>
                    </div>
                    <div className="flex justify-between border-t border-gh-silver pt-6">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gh-charcoal mb-1">Total Gear</span>
                         <span className="text-2xl font-black italic text-gh-charcoal tracking-tighter leading-none">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      disabled={items.length === 0 || isProcessing}
                      onClick={handleCheckout}
                      className="relative w-full group overflow-hidden bg-[#706d6d] py-5 text-xs font-black uppercase tracking-[0.4em] text-white transition-all hover:bg-black disabled:grayscale cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 pt-0.5">
                        {isProcessing ? "Initializing..." : "Initiate Checkout"}
                        {!isProcessing && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                      </span>
                    </button>

                    <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-gh-charcoal">
                       Encrypted Transaction via Stripe Protocol 2.0
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button overlay for mobile/small screens */}
            <button
              onClick={closeCheckoutAI}
              className="absolute top-4 right-4 md:hidden rounded-full p-2 text-gh-charcoal transition-colors hover:bg-gh-off-white"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
