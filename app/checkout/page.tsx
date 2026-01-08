"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCartStore } from "@/store/useCartStore";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { items, getTotalPrice } = useCartStore();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (items.length > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, userId: "guest" }), // Add auth logic later
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
      colorPrimary: '#0f0f0f',
      colorBackground: '#ffffff',
      colorText: '#303233',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!items.length) {
     return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
           <div className="text-center space-y-4">
              <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gh-charcoal">Cart Empty</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40">Initialize selection sequence first.</p>
              <Link href="/shop" className="inline-block mt-8 px-8 py-3 bg-gh-charcoal text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                 Return to Archive
              </Link>
           </div>
        </div>
     )
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans selection:bg-gh-charcoal selection:text-white">
      {/* Checkout Navbar */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-gh-silver/20 z-50 h-16 flex items-center justify-between px-6 md:px-12">
         <Link href="/shop" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60 hover:text-gh-charcoal transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Shop
         </Link>
         <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gh-charcoal" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal">Secure Checkout</span>
         </div>
      </nav>

      <main className="pt-24 pb-12 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Order Summary */}
        <div className="space-y-8 lg:order-2">
           <div className="bg-white rounded-3xl p-8 border border-gh-silver/20 space-y-8 sticky top-28 shadow-sm">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 border-b border-gh-silver/10 pb-4">Order Manifest</h2>
              
              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                 {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                       <div className="relative h-16 w-16 bg-gh-silver/10 rounded-xl overflow-hidden shrink-0 border border-gh-silver/20">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                             <h3 className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal">{item.name}</h3>
                             <span className="text-[10px] font-bold text-gh-charcoal">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                          <p className="text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/40">
                             Size: {item.size} / Qty: {item.quantity}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="border-t border-gh-silver/10 pt-6 space-y-3">
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-gh-charcoal/60">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-gh-charcoal/60">
                    <span>Shipping</span>
                    <span>Free</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-gh-charcoal/60">
                    <span>Taxes</span>
                    <span>Calculated at next step</span>
                 </div>
                 <div className="flex justify-between text-xl font-black italic tracking-tighter text-gh-charcoal pt-4 border-t border-gh-silver/10 mt-4">
                    <span>Total</span>
                    <span>${getTotalPrice().toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Payment Form */}
        <div className="lg:order-1 space-y-8">
           <div className="text-left mb-8">
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gh-charcoal leading-none mb-4">
                 Finalize <br/> Acquisition
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40 max-w-md">
                 Secure your selection from the Grassland Neural Archive. Encrypted transaction initialized.
              </p>
           </div>
           
           {clientSecret && stripePromise ? (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
           ) : (
              <div className="h-64 flex flex-col items-center justify-center gap-4 bg-white/50 rounded-3xl border border-gh-silver/20 px-8 text-center">
                 {!stripePromise || errorMessage ? (
                   <>
                     <ShieldCheck className="h-8 w-8 text-red-400" />
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/60">Gateway Configuration Error</span>
                     <p className="text-[10px] text-gh-charcoal/40 max-w-xs">{errorMessage || "Missing Stripe Public Key."}</p>
                   </>
                 ) : (
                   <>
                     <Loader2 className="h-8 w-8 animate-spin text-gh-charcoal/20" />
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40">Initializing Gateway...</span>
                   </>
                 )}
              </div>
           )}
        </div>
      </main>
    </div>
  );
}
