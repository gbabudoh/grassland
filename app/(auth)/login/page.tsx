"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Cpu,
  Fingerprint
} from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", { email, password, redirect: false });

      if (res?.error) {
        setError("Incorrect email or password. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Registration success banner */}
      {justRegistered && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-[10px] font-bold uppercase tracking-widest"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Account created successfully. Please sign in.
        </motion.div>
      )}

      <div className="relative p-8 md:p-12 holographic-card rounded-[40px] overflow-hidden group">
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
           <div className="w-full h-[2px] bg-gh-charcoal animate-scan-line" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
             <div>
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-2">
                  Identity Auth
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40">
                  Node Sequence / 2026-GHF
                </p>
             </div>
             <div className="p-3 bg-gh-charcoal text-white rounded-2xl animate-pulse-glitch">
                <Fingerprint className="h-6 w-6" />
             </div>
          </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="group relative">
          <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gh-charcoal/40 group-focus-within:text-gh-charcoal transition-colors" />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
            className="w-full bg-gh-silver/10 border border-gh-silver/50 rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-gh-charcoal placeholder:text-gh-charcoal/30 focus:outline-none focus:border-gh-charcoal focus:bg-white transition-all"
          />
        </div>

        {/* Password */}
        <div className="space-y-3">
          <div className="group relative">
            <Lock className="absolute left-5 top-4 h-4 w-4 text-gh-charcoal/30 group-focus-within:text-gh-charcoal transition-colors" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="System Password"
              autoComplete="current-password"
              required
              className="w-full bg-white/50 border-2 border-gh-silver/5 focus:border-gh-charcoal rounded-2xl py-4 pl-12 pr-12 text-xs font-black uppercase tracking-widest text-gh-charcoal placeholder:text-gh-charcoal/20 focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
              className="absolute right-5 top-4 text-gh-charcoal/20 hover:text-gh-charcoal transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              href="/contact"
              className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/30 hover:text-gh-charcoal transition-colors"
            >
              Recover Access?
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full group flex items-center justify-center gap-4 bg-gh-charcoal text-white py-5 rounded-[20px] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xl shadow-gh-charcoal/20"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sync Node
              <Cpu className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />
            </>
          )}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-gh-charcoal/5 text-center">
        <p className="text-[10px] text-gh-charcoal/40 uppercase tracking-widest font-black">
          New Explorer?{" "}
          <Link
            href="/register"
            className="text-gh-charcoal hover:opacity-70 transition-opacity ml-1"
          >
            Create Credentials
          </Link>
        </p>
      </div>
    </div>
  </div>
</motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
