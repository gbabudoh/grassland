"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ShippingForm, { ShippingData } from "@/components/fame/ShippingForm";
import ReviewModal from "@/components/fame/ReviewModal";
import ConstellationBackground from "@/components/fame/ConstellationBackground";
import HallOfFameCertificate from "@/components/fame/HallOfFameCertificate";
import { submitShippingInfo } from "@/lib/fame/actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function ClaimKitPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<ShippingData | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // In a real app, you'd fetch the user's rank from the DB here or via session
  // For this demo, we assume the user reached here because they are a Legend
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleFormSubmit = (data: ShippingData) => {
    setFormData(data);
    setShowReview(true);
  };

  const handleFinalConfirm = async () => {
    if (!session?.user?.id || !formData) return;

    const result = await submitShippingInfo(session.user.id, formData);
    
    if (result.success) {
      setIsSuccess(true);
      setShowReview(false);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#ffffff']
      });
    } else {
      toast.error(result.error || "Failed to submit request");
    }
  };

  if (status === "loading") return null;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black flex items-center justify-center p-8 overflow-hidden">
      <ConstellationBackground />

      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              <div className="text-center">
                <motion.div 
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="inline-block p-6 rounded-full bg-yellow-500 text-black mb-8 shadow-[0_0_60px_rgba(234,179,8,0.4)]"
                >
                    <Crown size={48} />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
                    Claim Your <br /> <span className="text-yellow-500">Legend Status</span>
                </h1>
                <p className="max-w-md mx-auto text-white/40 text-sm leading-relaxed mb-12">
                    As a Hall of Fame member, you are eligible for the Founding Member Kit. 
                    Provide your neural coordinates below to initialize the dispatch.
                </p>
              </div>

              <ShippingForm onSubmit={handleFormSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white/5 backdrop-blur-3xl p-16 rounded-[4rem] border border-yellow-500/30 shadow-[0_0_100px_rgba(234,179,8,0.1)]"
            >
              <div className="w-24 h-24 rounded-full bg-green-500 mx-auto flex items-center justify-center text-black mb-10 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    <Crown size={40} />
                </motion.div>
              </div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Transmission Locked</h2>
              <p className="text-white/40 text-lg mb-12 max-w-sm mx-auto font-medium">
                Your Founding Member Kit is now in production. Expect delivery within 7-10 neural cycles.
              </p>
              
              <div className="mb-16">
                <HallOfFameCertificate 
                    user={{
                        name: session?.user?.name || "Legend",
                        fameCode: "HOF-SIGNAL", // Ideally pass the real code
                        joinedAt: new Date()
                    }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                    href="/fame-network"
                    className="px-10 py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all uppercase tracking-widest text-[10px] flex items-center gap-3 justify-center"
                >
                    Return to Hub <Home size={14} />
                </Link>
                <Link 
                    href={`/fame-network/${session?.user?.id ? 'PROFILE' : ''}`} // Logic to get user code needed
                    className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all uppercase tracking-widest text-[10px] flex items-center gap-3 justify-center"
                >
                    View My Wall <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showReview && formData && (
          <ReviewModal 
            data={formData} 
            onConfirm={handleFinalConfirm} 
            onEdit={() => setShowReview(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
