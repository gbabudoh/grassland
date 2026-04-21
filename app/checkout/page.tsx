"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCartStore } from "@/store/useCartStore";
import { 
  Loader2, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Cpu, 
  Scan, 
  Activity,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [transactionId] = useState(() => 
    typeof window !== "undefined" ? Math.random().toString(36).substring(2, 11).toUpperCase() : ""
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { items, getTotalPrice } = useCartStore();

  useEffect(() => {
    // Defer state update to avoid cascading render warning in React 18
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, userId: "guest" }),
      })
        .then(async (res) => {
          if (!res.ok) {
             const errorData = await res.json().catch(() => ({ error: "Payment Initialization Failed" }));
             throw new Error(errorData.error || "Payment Error");
          }
          return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => {
           console.error("Payment Intent Error:", err);
           setErrorMessage(err.message);
        });
    }
  }, [items]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#706d6d',
      colorBackground: 'transparent',
      colorText: '#706d6d',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '16px',
    },
    rules: {
      '.Input': {
        border: '2px solid rgba(112, 109, 109, 0.05)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        transition: 'all 0.3s ease',
      },
      '.Input:focus': {
        border: '2px solid #706d6d',
        backgroundColor: '#ffffff',
      }
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!items.length) {
     return (
        <div className="min-h-screen bg-gh-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
           {/* Decoration */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gh-charcoal/5 rounded-full blur-[120px]" />
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center relative z-10"
           >
              <h1 className="text-6xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-4">Cart Empty</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 mb-10">Add items to your cart to initialize checkout.</p>
              <Link href="/shop" className="group inline-flex items-center gap-4 px-12 py-5 bg-gh-charcoal text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gh-charcoal/20">
                 <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />
                 Return to Shop
              </Link>
           </motion.div>
        </div>
     )
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-gh-charcoal selection:text-white relative overflow-hidden">
      {/* Immersive background decoration */}
      <div className="hidden lg:block absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-gh-charcoal/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden lg:block absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-gh-charcoal/[0.02] rounded-full blur-[80px] pointer-events-none" />

      {/* Checkout Navbar */}
      <nav className="fixed top-0 inset-x-0 bg-white/60 backdrop-blur-xl border-b border-gh-charcoal/5 z-50 h-20 flex items-center justify-between px-8 md:px-16">
         <Link href="/shop" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 hover:text-gh-charcoal transition-all group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" /> 
            <span className="hidden sm:inline">Return to Shop</span>
         </Link>
         
         <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gh-charcoal/5 rounded-full border border-gh-charcoal/5 text-gh-charcoal/40">
               <Globe className="h-3 w-3" />
               <span className="text-[8px] font-black uppercase tracking-widest">Global Secure Node</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal">Secure Checkout</span>
            </div>
         </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 relative z-10">
        {/* Left Section: Payment */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 space-y-12"
        >
           <div className="max-w-xl">
              <header className="mb-12">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest mb-6 italic">
                   <Lock className="h-3 w-3" /> Encryption Active
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-gh-charcoal leading-[0.9] mb-6">
                    Secure <br/> Checkout.
                 </h1>
                 <p className="text-xs font-bold uppercase tracking-widest text-gh-charcoal/40 max-w-md leading-relaxed">
                    Finalize your acquisition within our encrypted gateway. All transactions are processed via Stripe&apos;s tier-1 security infrastructure.
                 </p>
              </header>
              
              <div className="relative group">
                 {/* Decorative card background */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-gh-charcoal/5 to-transparent rounded-[40px] blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                 
                 <div className="relative bg-white/70 backdrop-blur-md rounded-[32px] border border-gh-charcoal/5 p-8 md:p-10 shadow-2xl shadow-gh-charcoal/5">
                    {/* Scan line overlay */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] rounded-[32px]">
                       <div className="w-full h-[2px] bg-gh-charcoal animate-scan-line" />
                    </div>

                    {clientSecret && stripePromise ? (
                       <Elements options={options} stripe={stripePromise}>
                         <CheckoutForm />
                       </Elements>
                    ) : (
                       <div className="h-64 flex flex-col items-center justify-center gap-6 text-center">
                          {!stripePromise || errorMessage ? (
                            <>
                              <div className="h-14 w-14 bg-red-50 rounded-2xl flex items-center justify-center">
                                 <ShieldCheck className="h-8 w-8 text-red-500" />
                              </div>
                              <div className="space-y-2">
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal">Gateway Error</span>
                                 <p className="text-[10px] text-gh-charcoal/40 max-w-xs leading-relaxed uppercase tracking-widest">
                                   {errorMessage || "Unable to initialize Stripe. Please verify your network connection."}
                                 </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="relative">
                                 <Loader2 className="h-10 w-10 animate-spin text-gh-charcoal/20" />
                                 <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/40" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 animate-pulse">Initializing Neural Link...</span>
                            </>
                          )}
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Right Section: Order Manifest */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5"
        >
           <div className="holographic-card rounded-[40px] p-10 border border-gh-charcoal/5 sticky top-32 shadow-2xl shadow-gh-charcoal/10">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-gh-charcoal/5">
                 <div className="flex items-center gap-3">
                    <Scan className="h-4 w-4 text-gh-charcoal/40" />
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gh-charcoal">Order Summary</h2>
                 </div>
                 <div className="px-3 py-1 bg-gh-charcoal/5 rounded-full text-[9px] font-black text-gh-charcoal/40 tracking-widest">
                    ID: {isMounted ? transactionId : "INITIALIZING..."}
                 </div>
              </div>
              
              <div className="space-y-8 max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar mb-10">
                 {items.map((item) => (
                    <motion.div 
                      key={`${item.id}-${item.size}`} 
                      className="flex gap-6 group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                       <div className="relative h-20 w-20 bg-gh-silver/10 rounded-2xl overflow-hidden shrink-0 border border-gh-charcoal/5 group-hover:scale-105 transition-transform">
                          <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                       </div>
                       <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-1">
                             <h3 className="text-xs font-black uppercase tracking-tight text-gh-charcoal leading-none">{item.name}</h3>
                             <span className="text-xs font-black text-gh-charcoal italic tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gh-charcoal/30">
                             <span>Size: {item.size}</span>
                             <span className="h-1 w-1 bg-gh-charcoal/20 rounded-full" />
                             <span>Qty: {item.quantity}</span>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40">
                       <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> Subtotal</span>
                       <span className="text-gh-charcoal/60">${getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40">
                       <span className="flex items-center gap-2"><Globe className="h-3 w-3" /> Shipping</span>
                       <span className="text-green-600 italic">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40">
                       <span>Tax (GST)</span>
                       <span>$0.00</span>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-gh-charcoal/5">
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gh-charcoal/40 leading-none">Total Value</span>
                          <p className="text-[8px] font-black uppercase tracking-widest text-gh-charcoal/20 leading-none">All nodes verified</p>
                       </div>
                       <span className="text-5xl font-black italic tracking-tighter text-gh-charcoal leading-none">
                          ${getTotalPrice().toLocaleString()}
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </main>
    </div>
  );
}
