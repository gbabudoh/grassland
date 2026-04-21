"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Truck, 
  Minus, 
  Plus,
  Trash2,
  Scan,
  CreditCard
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
import { useCartStore } from "@/store/useCartStore";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;

export default function CheckoutAI() {
  const { isCheckoutAIOpen, closeCheckoutAI } = useModalStore();
  const { items, getTotalPrice, removeItem, updateQuantity } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    // Add a small delay for "aesthetic" processing feel
    setTimeout(() => {
      closeCheckoutAI();
      router.push("/checkout");
      setIsProcessing(false);
    }, 800);
  };

  return (
    <AnimatePresence mode="wait">
      {isCheckoutAIOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          {/* Advanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckoutAI}
            className="absolute inset-0 bg-gh-charcoal/20 backdrop-blur-[12px]"
          />

          {/* Holographic Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/20 bg-white/80 shadow-[0_32px_120px_rgba(0,0,0,0.15)] md:h-[80vh] flex flex-col md:flex-row"
          >
            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
              <div className="w-full h-[2px] bg-gh-charcoal animate-scan-line" />
            </div>

            {/* Close button */}
            <button
              onClick={closeCheckoutAI}
              className="absolute top-6 right-6 z-50 rounded-2xl p-3 bg-gh-charcoal/5 hover:bg-gh-charcoal hover:text-white transition-all duration-300 cursor-pointer group"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>

            {/* Left: Cart items section */}
            <div className="flex-1 overflow-y-auto px-8 py-10 md:p-12">
              {/* Header */}
              <header className="mb-12 flex items-center gap-5">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] bg-gh-charcoal text-white shadow-xl shadow-gh-charcoal/20">
                  <ShoppingBag className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-white border-2 border-gh-charcoal rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-gh-charcoal">{items.length}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-gh-charcoal leading-none mb-2">My Cart</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40">
                    G1 Performance Archive
                  </p>
                </div>
              </header>

              {/* Items List */}
              <div className="space-y-8">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gh-charcoal/5 rounded-full scale-150 blur-2xl" />
                      <ShoppingBag className="relative h-16 w-16 text-gh-charcoal/20" />
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-widest text-gh-charcoal mb-3">Your cart is empty</h4>
                    <p className="max-w-[240px] text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/30 leading-relaxed mb-10">
                      Explore our latest innovations to begin your performance journey.
                    </p>
                    <button
                      onClick={() => {
                        closeCheckoutAI();
                        setTimeout(() => { window.location.href = "/shop"; }, 300);
                      }}
                      className="group flex cursor-pointer items-center gap-4 rounded-2xl bg-gh-charcoal px-10 py-5 text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gh-charcoal/20"
                    >
                      <Zap className="h-4 w-4" />
                      <span className="text-[11px] font-black uppercase tracking-widest">Browse Shop</span>
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        key={`${item.id}-${item.size}`}
                        className="flex gap-6 items-center p-4 rounded-3xl hover:bg-gh-charcoal/[0.02] transition-colors group relative"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-[24px] bg-gh-silver/20 border border-gh-silver/30 shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col h-full py-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-sm md:text-base font-black uppercase text-gh-charcoal tracking-tight leading-none mb-1 group-hover:italic transition-all">
                                {item.name}
                              </h4>
                              <p className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/40">
                                {item.category} / Size {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-gh-charcoal/20 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-xl cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            {/* Pro Quantity Selector */}
                            <div className="flex items-center p-1 bg-gh-silver/10 rounded-[18px] border border-gh-silver/30">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-gh-charcoal shadow-sm hover:bg-gh-charcoal hover:text-white transition-all cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-black text-gh-charcoal w-10 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-gh-charcoal shadow-sm hover:bg-gh-charcoal hover:text-white transition-all cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-black text-gh-charcoal italic tracking-tighter">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Continue Shopping Footer */}
              {items.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gh-charcoal/5">
                  <button
                    onClick={closeCheckoutAI}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 hover:text-gh-charcoal transition-all flex items-center gap-3 cursor-pointer group"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
                    Continue Curating Archive
                  </button>
                </div>
              )}
            </div>

            {/* Right: Premium Summary Section */}
            <div className="w-full md:w-[360px] bg-gh-charcoal p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
              {/* Decoration background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-3 opacity-30">
                  <Scan className="h-4 w-4 text-white" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                    Summary
                  </h4>
                </div>

                <div className="space-y-6">
                  {/* Costs */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
                      <span>Subtotal</span>
                      <span className="font-black text-white">${subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
                      <span className="flex items-center gap-2">
                        <Truck className="h-3 w-3" />
                        Shipping
                      </span>
                      {subtotal === 0 ? (
                        <span className="font-black text-white/20">—</span>
                      ) : shipping === 0 ? (
                        <span className="font-black text-green-400">Complimentary</span>
                      ) : (
                        <span className="font-black text-white">${SHIPPING_COST}</span>
                      )}
                    </div>
                  </div>

                  {/* Threshold Nudge */}
                  {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] leading-relaxed">
                        Add <span className="text-white">${FREE_SHIPPING_THRESHOLD - subtotal}</span> for Complimentary Express Shipping
                      </p>
                    </div>
                  )}

                  {/* Divider + Final Total */}
                  <div className="pt-8 border-t border-white/10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Final Total</span>
                      <span className="text-4xl font-black italic text-white tracking-tighter leading-none">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Authorized Transaction</p>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="relative z-10 space-y-5 mt-12">
                <button
                  disabled={items.length === 0 || isProcessing}
                  onClick={handleCheckout}
                  className="w-full group relative overflow-hidden flex items-center justify-center gap-4 bg-white text-gh-charcoal py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer shadow-2xl shadow-black/20"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 border-2 border-gh-charcoal/20 border-t-gh-charcoal rounded-full animate-spin" />
                      Initializing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Initialize Payment
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </>
                  )}
                </button>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                    <ShieldCheck className="h-3 w-3 text-green-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Secure Stripe Encryption</span>
                  </div>
                  
                  {items.length === 0 && (
                    <button
                      onClick={closeCheckoutAI}
                      className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors underline underline-offset-8"
                    >
                      Return to Archive
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
