"use client";

import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Palette, 
  Globe, 
  Save, 
  Zap,
  Layout,
  Cpu,
  RefreshCw,
  CheckCircle2,
  Lock,
  Bell
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // General Settings
  const [generalConfig, setGeneralConfig] = useState({
    siteName: "GRASSLAND ARCHIVE",
    signatureCode: "GH-LABS-X1",
    notification: "SYSTEM UPDATE: NEW V2 ARCHIVE RELEASING SOON. STAY SYNCED."
  });

  // Toggles
  const [aiEnabled, setAiEnabled] = useState(true);
  const [securityLock, setSecurityLock] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-12 max-w-7xl relative">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 right-8 z-50 bg-gh-charcoal text-white px-8 py-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em]">DIRECTIVES SYNCED</span>
              <span className="block text-[9px] font-black uppercase tracking-widest opacity-60">Configuration updated successfully</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Archive Master Control</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
            Global <br /> Directives
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Syncing..." : "Propagate Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-4 border-b border-gh-silver/20 no-scrollbar">
         {[
           { id: "general", label: "Grassland Interface", icon: Settings },
           { id: "branding", label: "Aesthetic Core", icon: Palette },
           { id: "seo", label: "Field Indexing", icon: Globe },
           { id: "security", label: "Protocol & Security", icon: Shield },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
               activeTab === tab.id 
                 ? "bg-gh-charcoal text-white shadow-lg" 
                 : "text-gh-charcoal/40 hover:text-gh-charcoal hover:bg-gh-silver/10"
             }`}
           >
             <tab.icon className="h-4 w-4" />
             {tab.label}
           </button>
         ))}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Config */}
         <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-8"
              >
                {/* AI Configuration Section */}
                <div className="bg-white p-10 rounded-[40px] border border-gh-silver/20 space-y-10 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center justify-between border-b border-gh-silver/10 pb-6">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-gh-silver/10 flex items-center justify-center">
                            <Cpu className="h-5 w-5 text-gh-charcoal" />
                         </div>
                         <div>
                            <span className="block text-[11px] font-black uppercase tracking-widest text-gh-charcoal">AI Sizing Engine</span>
                            <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/40">Managed Grassland Processing</span>
                         </div>
                      </div>
                      <button 
                        onClick={() => setAiEnabled(!aiEnabled)}
                        className={`h-6 w-11 rounded-full p-1 flex items-center transition-all cursor-pointer ${aiEnabled ? "bg-gh-charcoal justify-end" : "bg-gh-silver/20 justify-start"}`}
                      >
                         <motion.div 
                           layout 
                           className={`h-4 w-4 rounded-full shadow-sm ${aiEnabled ? "bg-white" : "bg-gh-charcoal/40"}`} 
                         />
                      </button>
                   </div>

                   <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/60 ml-1">Archive Site Name</label>
                            <input 
                              type="text" 
                              value={generalConfig.siteName}
                              onChange={(e) => setGeneralConfig({ ...generalConfig, siteName: e.target.value })}
                              className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all text-gh-charcoal" 
                            />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/60 ml-1">Neural Signature Code</label>
                            <input 
                              type="text" 
                              value={generalConfig.signatureCode}
                              onChange={(e) => setGeneralConfig({ ...generalConfig, signatureCode: e.target.value })}
                              className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all text-gh-charcoal" 
                            />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/60 ml-1">Global Site Alert Notification</label>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-gh-charcoal/40 flex items-center gap-1">
                               <Bell className="h-3 w-3" /> Push to all nodes
                            </span>
                         </div>
                         <textarea 
                           rows={3}
                           value={generalConfig.notification}
                           onChange={(e) => setGeneralConfig({ ...generalConfig, notification: e.target.value })}
                           className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all text-gh-charcoal resize-none" 
                         />
                      </div>
                   </div>
                </div>

                {/* Aesthetics & Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[40px] border border-gh-silver/20 space-y-6 shadow-sm hover:shadow-md transition-shadow">
                     <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                        <Layout className="h-4 w-4" /> Interface Aesthetics
                     </h3>
                     <div className="grid grid-cols-2 gap-4">
                        {["#111111", "#F5F5F5", "#8E8E8E", "#E5E5E5"].map(c => (
                          <button key={c} className="group p-4 rounded-3xl border border-gh-silver/20 flex flex-col items-center gap-3 hover:border-gh-charcoal/20 transition-all cursor-pointer bg-gh-silver/5 hover:bg-white">
                             <div className="h-10 w-10 rounded-full border border-gh-silver/20 shadow-sm" style={{ backgroundColor: c }} />
                             <span className="text-[8px] font-black uppercase tracking-widest text-gh-charcoal/40 group-hover:text-gh-charcoal transition-colors">{c}</span>
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white p-10 rounded-[40px] border border-gh-silver/20 space-y-6 shadow-sm hover:shadow-md transition-shadow">
                     <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                        <Shield className="h-4 w-4" /> Security Protocols
                     </h3>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gh-silver/5 rounded-2xl border border-transparent hover:border-gh-silver/20 transition-all">
                           <div className="flex items-center gap-3">
                              <Lock className="h-4 w-4 text-gh-charcoal/40" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">Admin Lockout</span>
                           </div>
                           <button 
                             onClick={() => setSecurityLock(!securityLock)}
                             className={`h-5 w-9 rounded-full p-1 flex items-center transition-all cursor-pointer ${securityLock ? "bg-green-500 justify-end" : "bg-gh-silver/20 justify-start"}`}
                           >
                              <motion.div layout className="h-3 w-3 rounded-full bg-white shadow-sm" />
                           </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gh-silver/5 rounded-2xl border border-transparent hover:border-gh-silver/20 transition-all">
                           <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4 text-gh-charcoal/40" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">Auto-Alerts</span>
                           </div>
                           <button 
                             onClick={() => setNotifications(!notifications)}
                             className={`h-5 w-9 rounded-full p-1 flex items-center transition-all cursor-pointer ${notifications ? "bg-gh-charcoal justify-end" : "bg-gh-silver/20 justify-start"}`}
                           >
                              <motion.div layout className="h-3 w-3 rounded-full bg-white shadow-sm" />
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
         </div>

         {/* Info Sidebar */}
         <div className="space-y-8 text-center px-6 sticky top-8">
            <div className="h-40 w-40 rounded-[40px] bg-gh-charcoal mx-auto flex items-center justify-center relative overflow-hidden group shadow-2xl transition-transform hover:scale-105 duration-500">
               <Image 
                 src="/logo1.png" 
                 width={96} 
                 height={96} 
                 className="invert relative z-10 transition-transform duration-700 group-hover:scale-110" 
                 alt="Grassland Logo" 
               />
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer">
                  <RefreshCw className="h-8 w-8 text-white transition-transform group-hover:rotate-180 duration-700" />
               </div>
            </div>
            <div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gh-charcoal mb-2">Interface Mastery</h4>
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gh-charcoal/40 leading-relaxed max-w-[200px] mx-auto">
                  Sync your global directives across all archive nodes instantly.
               </p>
            </div>
            <div className="pt-8">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-gh-silver/10 rounded-full border border-gh-silver/10">
                  <Zap className="h-3 w-3 text-gh-charcoal" />
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gh-charcoal">System Flux 98% Stable</span>
               </div>
            </div>
            
            <div className="pt-4 border-t border-gh-silver/10 mt-8">
               <p className="text-[8px] font-mono text-gh-charcoal/30 uppercase">
                  Build v2.4.1-RC<br/>
                  Server: US-EAST-1
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
