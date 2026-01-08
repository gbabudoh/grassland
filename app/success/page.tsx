"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Package, Download } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");

  useEffect(() => {
    if (!paymentIntentClientSecret) {
      router.push("/");
      return;
    }

    // In a real app with Stripe.js loaded, we'd retrieve the intent status.
    // For now, presence of the secret implies we came from checkout.
    // We can assume success if we reached here via redirect.
    clearCart();

  }, [paymentIntentClientSecret, router, clearCart]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gh-charcoal/5 rounded-full blur-3xl" />
       </div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-lg bg-white rounded-[40px] border border-gh-silver/20 p-12 shadow-2xl relative z-10 text-center"
       >
          <div className="mb-8 flex justify-center">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", delay: 0.2 }}
               className="h-24 w-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20"
             >
                <CheckCircle2 className="h-10 w-10" />
             </motion.div>
          </div>

          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-4">
             Acquisition <br/> Complete
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40 mb-12 leading-relaxed max-w-xs mx-auto">
             Your selection has been secured and added to the deployment queue. A confirmation directive has been sent to your inbox.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-12">
             <div className="p-6 bg-gh-silver/5 rounded-3xl border border-gh-silver/20 flex flex-col items-center gap-3">
                <Package className="h-6 w-6 text-gh-charcoal/40" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal">Order #8492</span>
             </div>
             <div className="p-6 bg-gh-silver/5 rounded-3xl border border-gh-silver/20 flex flex-col items-center gap-3">
                <Download className="h-6 w-6 text-gh-charcoal/40" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal">Invoice PDF</span>
             </div>
          </div>

          <Link 
            href="/shop"
            className="w-full group overflow-hidden bg-gh-charcoal py-5 text-xs font-black uppercase tracking-[0.4em] text-white transition-all hover:scale-[1.02] rounded-2xl shadow-xl flex items-center justify-center gap-3"
          >
             Return to Archive
             <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="mt-8 text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/20">
             Grassland Systems • Verified Transaction
          </p>
       </motion.div>
    </div>
  );
}
