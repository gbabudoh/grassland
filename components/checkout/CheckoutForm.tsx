"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart, getTotalPrice } = useCartStore();

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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full overflow-hidden bg-gh-charcoal py-5 text-xs font-black uppercase tracking-[0.4em] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl shadow-xl group"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
             <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                Processing Securely
             </span>
          ) : (
             <>
                <Lock className="h-3 w-3 mb-0.5" />
                Pay ${getTotalPrice().toLocaleString()}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
             </>
          )}
        </span>
      </motion.button>
      
      {/* Security Badge */}
      <div className="flex justify-center items-center gap-2 opacity-40">
         <ShieldCheck className="h-3 w-3 text-gh-charcoal" />
         <span className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal">Bank-Level Encryption Active</span>
      </div>

      {message && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            id="payment-message" 
            className="p-4 rounded-xl bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-red-100"
        >
           <AlertCircle className="h-4 w-4 shrink-0" />
           {message}
        </motion.div>
      )}
    </form>
  );
}
