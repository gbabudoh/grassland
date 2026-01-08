"use client";

import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Zap,
  Globe,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const stats = [
  { name: "Total Revenue", value: "$42,850", change: "+12.5%", trend: "up", icon: CreditCard },
  { name: "Active Orders", value: "84", change: "+6.2%", trend: "up", icon: ShoppingBag },
  { name: "Total Users", value: "1,240", change: "+18.4%", trend: "up", icon: Users },
  { name: "Sync Efficiency", value: "98.2%", change: "-0.4%", trend: "down", icon: Zap },
];

export default function AdminDashboardPage() {
  const [timeFilter, setTimeFilter] = useState("1M");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-12 max-w-7xl">
      {/* Header Info */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 mb-3 block">Grassland Control Center</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
            Interface <br /> Overview
          </h1>
        </div>
        <div className="flex gap-4">
           <div className="p-6 bg-gh-charcoal text-white rounded-3xl min-w-[200px]">
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">System Uptime</span>
              <div className="flex items-end gap-3">
                 <span className="text-4xl font-black tracking-tighter leading-none">99.9%</span>
                 <Activity className="h-5 w-5 mb-1" />
              </div>
           </div>
           <div className="p-6 bg-white border border-gh-silver/20 rounded-3xl min-w-[200px]">
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-4">Field Syncs</span>
              <div className="flex items-end gap-3">
                 <span className="text-4xl font-black tracking-tighter leading-none text-gh-charcoal">14K</span>
                 <Globe className="h-5 w-5 mb-1 text-gh-charcoal/20" />
              </div>
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-gh-silver/20 hover:border-gh-charcoal/10 transition-colors shadow-sm group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gh-silver/10 flex items-center justify-center group-hover:bg-gh-charcoal group-hover:text-white transition-all duration-500">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
                {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              </div>
            </div>
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-2">
              {stat.name}
            </span>
            <span className="text-4xl font-black tracking-tighter text-gh-charcoal">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Analytics */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                 <TrendingUp className="h-4 w-4" /> Trajectory Matrix
              </h3>
              <div className="flex gap-2">
                  {["1W", "1M", "ALL"].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setTimeFilter(t)}
                      className={`px-3 py-1 text-[8px] font-black transition-all ${timeFilter === t ? "text-gh-charcoal border border-gh-charcoal" : "text-gh-charcoal/40 border border-transparent hover:text-gh-charcoal hover:border-gh-charcoal"}`}
                    >
                      {t}
                    </button>
                  ))}
               </div>
           </div>
           
           <div className="h-[400px] w-full bg-white border border-gh-silver/20 rounded-3xl p-8 relative overflow-hidden">
             {isLoading ? (
               <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                  <Activity className="h-8 w-8 text-gh-charcoal/10" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/30">Analytics Engine Initializing</span>
                  <div className="h-1 w-32 bg-gh-charcoal/5 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-gh-charcoal" 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                     />
                  </div>
               </div>
             ) : (
               <div className="h-full flex flex-col">
                  <div className="flex justify-between items-end mb-8">
                     <div>
                       <span className="text-[32px] font-black tracking-tighter text-gh-charcoal block leading-none">84.2K</span>
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40">Total Session Volume</span>
                     </div>
                     <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-gh-charcoal" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal">Real-time Traffic</span>
                     </div>
                  </div>
                  
                  {/* Simple CSS/Motion Bar Chart */}
                  <div className="flex-1 flex items-end justify-between gap-2 px-2">
                     {[35, 45, 30, 60, 75, 50, 65, 80, 55, 45, 60, 70, 85, 90, 65].map((h, i) => (
                       <motion.div
                         key={i}
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ duration: 0.5, delay: i * 0.05 }}
                         className="w-full bg-gh-charcoal/5 hover:bg-gh-charcoal transition-colors rounded-t-sm relative group"
                       >
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold">
                           {h}%
                         </div>
                       </motion.div>
                     ))}
                  </div>
                  
                  <div className="flex justify-between mt-4 border-t border-gh-silver/10 pt-4">
                     <span className="text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/30">00:00</span>
                     <span className="text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/30">12:00</span>
                     <span className="text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/30">24:00</span>
                  </div>
               </div>
             )}
           </div>
        </div>

        {/* Action Center */}
        <div className="space-y-8">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal">Quick Directives</h3>
           <div className="space-y-4">
              <Link
                href="/admin/products/new"
                className="w-full group p-6 rounded-3xl border border-gh-silver/20 flex items-center justify-between hover:scale-[1.02] transition-all bg-gh-charcoal text-white cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">New Item Entry</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest opacity-40">Upload to Archive</span>
                </div>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/admin/banners"
                className="w-full group p-6 rounded-3xl border border-gh-silver/20 flex items-center justify-between hover:scale-[1.02] transition-all bg-gh-white text-gh-charcoal cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">Review Banners</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest opacity-40">Manage Visibility</span>
                </div>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 opacity-20" />
              </Link>
              <Link
                href="/admin/products"
                className="w-full group p-6 rounded-3xl border border-gh-silver/20 flex items-center justify-between hover:scale-[1.02] transition-all bg-gh-white text-gh-charcoal cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">Stock Sync</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest opacity-40">Global Inventory</span>
                </div>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 opacity-20" />
              </Link>
              <Link
                href="/admin/orders"
                className="w-full group p-6 rounded-3xl border border-gh-silver/20 flex items-center justify-between hover:scale-[1.02] transition-all bg-gh-white text-gh-charcoal cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">Dispatch Orders</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest opacity-40">8 Pending Sequence</span>
                </div>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 opacity-20" />
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

