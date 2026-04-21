"use client";

import { motion } from "framer-motion";
import { ShippingData } from "./ShippingForm";
import { CheckCircle2, X } from "lucide-react";

export default function ReviewModal({ data, onConfirm, onEdit }: { 
  data: ShippingData, 
  onConfirm: () => void, 
  onEdit: () => void 
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-black border-2 border-yellow-500 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.2)]"
      >
        <div className="bg-yellow-500 p-8 text-black flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Confirm Manifest</h3>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Authentication Check</p>
          </div>
          <button onClick={onEdit} className="p-2 hover:bg-black/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Primary Recipient</p>
              <p className="text-xl font-black text-white uppercase italic">{data.fullName}</p>
            </div>
            
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Secure Destination</p>
              <p className="text-sm font-bold text-white/80 leading-relaxed uppercase">
                {data.addressLine1}<br />
                {data.addressLine2 && <>{data.addressLine2}<br /></>}
                {data.city}, {data.state} {data.postcode}<br />
                {data.country}
              </p>
            </div>

            <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Comm Channel</p>
                <p className="text-sm font-mono text-white/80">{data.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <button 
              onClick={onConfirm}
              className="w-full py-6 bg-white text-black font-black rounded-2xl hover:bg-yellow-500 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 shadow-xl"
            >
              <CheckCircle2 size={18} /> Confirm & Dispatch Kit
            </button>
            <button 
              onClick={onEdit}
              className="w-full py-2 text-white/40 hover:text-white text-[9px] font-black uppercase tracking-[0.4em] transition-all"
            >
              Modify Transmission
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
