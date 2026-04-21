"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function FameSearch() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/fame-network/${code.toUpperCase().trim()}`);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSearch} 
      className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="ENTER G-FAME CODE (e.g. G-FAME-A1B2)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-yellow-500/50 outline-none transition-all backdrop-blur-xl font-black tracking-widest uppercase text-xs"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20">
          <Search size={20} />
        </div>
      </div>
      <button 
        type="submit"
        className="px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl transition-all uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(234,179,8,0.2)] active:scale-95"
      >
        Locate Member
      </button>
    </motion.form>
  );
}
