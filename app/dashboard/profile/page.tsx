"use client";

import { useState } from "react";
import { MapPin, User, Save, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  // In a real app, populate these from session/DB data
  // For now, it's a static form structure
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl pt-8">
      <div className="mb-8">
         <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-2">
            Spatial Coordinates
         </h1>
         <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40">
            Manage your physical delivery endpoints and identity data.
         </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
         {/* Identity Section */}
         <div className="bg-white border border-gh-silver/20 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2 border-b border-gh-silver/10 pb-4">
               <User className="h-4 w-4 text-gh-charcoal" />
               <h3 className="text-xs font-black uppercase tracking-widest text-gh-charcoal">Neural Identity</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">Designation</label>
                  <input defaultValue={session?.user?.name || ""} disabled className="w-full bg-gh-off-white border border-gh-silver/20 rounded-xl px-4 py-3 text-xs text-gh-charcoal/60 cursor-not-allowed" />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">Neural ID</label>
                  <input defaultValue={session?.user?.email || ""} disabled className="w-full bg-gh-off-white border border-gh-silver/20 rounded-xl px-4 py-3 text-xs text-gh-charcoal/60 cursor-not-allowed" />
               </div>
            </div>
         </div>

         {/* Location Section */}
         <div className="bg-white border border-gh-silver/20 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2 border-b border-gh-silver/10 pb-4">
               <MapPin className="h-4 w-4 text-gh-charcoal" />
               <h3 className="text-xs font-black uppercase tracking-widest text-gh-charcoal">Physical Location</h3>
            </div>
            
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">Address Line</label>
                  <input name="address" placeholder="Sector 7, Block B..." className="w-full bg-white border border-gh-silver/20 rounded-xl px-4 py-3 text-xs text-gh-charcoal focus:outline-none focus:border-gh-charcoal/40 transition-colors" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">City / Zone</label>
                     <input name="city" className="w-full bg-white border border-gh-silver/20 rounded-xl px-4 py-3 text-xs text-gh-charcoal focus:outline-none focus:border-gh-charcoal/40 transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">Postal Code</label>
                     <input name="postalCode" className="w-full bg-white border border-gh-silver/20 rounded-xl px-4 py-3 text-xs text-gh-charcoal focus:outline-none focus:border-gh-charcoal/40 transition-colors" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">Region / Country</label>
                  <input name="country" className="w-full bg-white border border-gh-silver/20 rounded-xl px-4 py-3 text-xs text-gh-charcoal focus:outline-none focus:border-gh-charcoal/40 transition-colors" />
               </div>
            </div>
         </div>

         <div className="flex justify-end">
            <button 
               type="submit" 
               disabled={isSaving}
               className="bg-gh-charcoal text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
            >
               {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
               Save Coordinates
            </button>
         </div>
      </form>
    </div>
  );
}
