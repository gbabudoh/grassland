"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Automatically sign in or redirect to login
      router.push("/login?registered=true");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-[#E0E0E0] p-8 rounded-2xl shadow-lg"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-[#2C2C2C] mb-2">
          Initialize
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
          Establish New Neural Identity
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="group relative">
            <User className="absolute left-4 top-3.5 h-4 w-4 text-[#6B6B6B] group-focus-within:text-[#2C2C2C] transition-colors" />
            <input
              name="name"
              type="text"
              placeholder="Neural Designation (Name)"
              required
              className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-[#2C2C2C] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#2C2C2C] focus:bg-white transition-all placeholder:uppercase placeholder:tracking-widest"
            />
          </div>
          <div className="group relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[#6B6B6B] group-focus-within:text-[#2C2C2C] transition-colors" />
            <input
              name="email"
              type="email"
              placeholder="Neural ID (Email)"
              required
              className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-[#2C2C2C] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#2C2C2C] focus:bg-white transition-all placeholder:uppercase placeholder:tracking-widest"
            />
          </div>
          <div className="group relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#6B6B6B] group-focus-within:text-[#2C2C2C] transition-colors" />
            <input
              name="password"
              type="password"
              placeholder="Security Passcode"
              required
              className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-[#2C2C2C] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#2C2C2C] focus:bg-white transition-all placeholder:uppercase placeholder:tracking-widest"
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full group relative overflow-hidden bg-[#2C2C2C] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Create Neural Link
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent" />
        <p className="text-[10px] text-[#6B6B6B] uppercase tracking-widest">
          Already identified?{" "}
          <Link href="/login" className="text-[#2C2C2C] hover:underline decoration-[#2C2C2C] underline-offset-4 font-bold">
            Access Session
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
