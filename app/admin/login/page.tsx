"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call for now - will connect to real endpoint in Phase 2
    try {
      // In a real app, this would be a POST to /api/admin/auth
      if (email === "admin@grass-land.net" && password === "admin1234X") {
        // Success
        localStorage.setItem("admin_session", "true");
        router.push("/admin");
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch {
      setError("Connection to server lost.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gh-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-6">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">
            Grassland Admin
          </h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
            Authentication Required — Archive Access
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3 ml-1">
                Identity Mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 transition-colors group-focus-within:text-white" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@grassland.com"
                  required
                  className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white text-sm font-medium rounded-xl focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3 ml-1">
                Grassland Key
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 transition-colors group-focus-within:text-white" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white text-sm font-medium rounded-xl focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest text-center rounded-xl animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group flex items-center justify-center gap-3 bg-white py-4 rounded-xl text-gh-charcoal text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Engage Sync
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white/60 transition-colors">
            ← Return to Interface
          </Link>
        </div>
      </div>
    </div>
  );
}

