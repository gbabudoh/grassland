"use client";

import { useForm } from "react-hook-form";
import { Truck, Phone } from "lucide-react";

export interface ShippingData {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export default function ShippingForm({ onSubmit }: { onSubmit: (data: ShippingData) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ShippingData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500 flex items-center justify-center text-black">
          <Truck size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">Legend Delivery</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Founding Member Kit Request</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 mb-2 block">Full Name</label>
          <input 
            {...register("fullName", { required: "Full name is required" })} 
            className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold`} 
          />
          {errors.fullName && <p className="text-red-500 text-[10px] mt-2 ml-1 font-bold uppercase">{errors.fullName.message}</p>}
        </div>

        {/* Address Line 1 */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 mb-2 block">Street Address</label>
          <input 
            {...register("addressLine1", { required: "Address is required" })} 
            placeholder="123 NEURAL WAY" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold placeholder:text-white/10" 
          />
        </div>

        {/* City & State */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 mb-2 block">City</label>
          <input {...register("city", { required: true })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold" />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 mb-2 block">State / Province</label>
          <input {...register("state", { required: true })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold" />
        </div>

        {/* Postcode & Phone */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 mb-2 block">Postcode</label>
          <input {...register("postcode", { required: true })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold" />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 mb-2 block flex items-center gap-2">
            <Phone size={10} /> Contact Number
          </label>
          <input {...register("phone", { required: true })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-500 transition-all font-bold" />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(234,179,8,0.2)] uppercase tracking-widest text-xs mt-4 active:scale-95 disabled:opacity-50"
      >
        {isSubmitting ? "Validating Signature..." : "Initialize Dispatch"}
      </button>
    </form>
  );
}
