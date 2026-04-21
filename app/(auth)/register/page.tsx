"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

function getStrength(password: string): { score: number; label: string; color: string; textColor: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak",   color: "bg-red-500",   textColor: "text-red-500" };
  if (score <= 2) return { score, label: "Fair",   color: "bg-yellow-500", textColor: "text-yellow-600" };
  if (score <= 3) return { score, label: "Good",   color: "bg-blue-500",  textColor: "text-blue-600" };
  return             { score, label: "Strong", color: "bg-green-500", textColor: "text-green-600" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getStrength(password);
  const passwordsMatch = confirmPassword === "" || password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error(await res.text());

      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-2">
          Create Account
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/50">
          Create your Grassland account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="group relative">
          <User className="absolute left-4 top-3.5 h-4 w-4 text-gh-charcoal/40 group-focus-within:text-gh-charcoal transition-colors" />
          <input
            name="name"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            required
            className="w-full bg-gh-silver/10 border border-gh-silver/50 rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-gh-charcoal placeholder:text-gh-charcoal/30 focus:outline-none focus:border-gh-charcoal focus:bg-white transition-all"
          />
        </div>

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

        {/* Password + strength */}
        <div className="space-y-2">
          <div className="group relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gh-charcoal/40 group-focus-within:text-gh-charcoal transition-colors" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gh-silver/10 border border-gh-silver/50 rounded-xl py-3 pl-11 pr-11 text-xs font-medium text-gh-charcoal placeholder:text-gh-charcoal/30 focus:outline-none focus:border-gh-charcoal focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-3.5 text-gh-charcoal/30 hover:text-gh-charcoal transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength indicator */}
          {password.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5"
            >
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      strength.score >= level ? strength.color : "bg-gh-silver/30"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-[9px] font-black uppercase tracking-widest ${strength.textColor}`}>
                {strength.label} password
              </p>
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <div className="group relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gh-charcoal/40 group-focus-within:text-gh-charcoal transition-colors" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full bg-gh-silver/10 border rounded-xl py-3 pl-11 pr-11 text-xs font-medium text-gh-charcoal placeholder:text-gh-charcoal/30 focus:outline-none focus:bg-white transition-all ${
                !passwordsMatch
                  ? "border-red-300 focus:border-red-400"
                  : "border-gh-silver/50 focus:border-gh-charcoal"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(v => !v)}
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="absolute right-4 top-3.5 text-gh-charcoal/30 hover:text-gh-charcoal transition-colors"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {!passwordsMatch && confirmPassword.length > 0 && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              Passwords do not match.
            </p>
          )}
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
          disabled={isLoading || !passwordsMatch}
          className="w-full group flex items-center justify-center gap-2 bg-gh-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Terms */}
      <p className="mt-5 text-center text-[9px] text-gh-charcoal/40 leading-relaxed">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="text-gh-charcoal font-bold hover:underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-gh-charcoal font-bold hover:underline underline-offset-4">
          Privacy Policy
        </Link>.
      </p>

      <div className="mt-6 text-center space-y-4">
        <div className="h-px w-full bg-linear-to-r from-transparent via-gh-silver/50 to-transparent" />
        <p className="text-[10px] text-gh-charcoal/50 uppercase tracking-widest">
          Already have an account?{" "}
          <Link href="/login" className="text-gh-charcoal font-bold hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
