"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { Lock, ArrowRight, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          clearCart();
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clearCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
    style: {
        base: {
            color: '#303233',
            fontFamily: '"Inter", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '14px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-gh-silver/20 hover:border-gh-charcoal/20 transition-all">
         <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>

       <motion.button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full overflow-hidden bg-gh-charcoal py-6 rounded-[24px] text-white shadow-2xl shadow-gh-charcoal/20 group transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em]">
          {isLoading ? (
             <span className="flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin" />
                Validating Node...
             </span>
          ) : (
             <>
                <Lock className="h-4 w-4" />
                Initialize Transaction
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
             </>
          )}
        </span>
      </motion.button>
      
      <div className="flex flex-col items-center gap-4 opacity-40">
         <div className="flex items-center gap-3 px-4 py-2 bg-gh-charcoal/5 rounded-full border border-gh-charcoal/5">
            <ShieldCheck className="h-3 w-3 text-gh-charcoal" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal">Neural Secure Transmission</span>
         </div>
         <p className="text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/60">
            Secure checkout powered by Stripe
         </p>
      </div>

      {message && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            id="payment-message" 
            className="p-5 rounded-2xl bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-red-100 italic"
        >
           <AlertCircle className="h-4 w-4 shrink-0" />
           {message}
        </motion.div>
      )}
    </form>
  );
}
