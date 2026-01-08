"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Type,
  Link as LinkIcon,
  Layout,
  Zap,
  Eye
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function AdminBannerEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    type: "video",
    title: "",
    subtitle: "",
    mediaUrl: "",
    ctaText: "Shop Collection",
    ctaLink: "/shop",
    layout: "center",
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API logic will go here
    router.push("/admin/banners");
  };

  return (
    <div className="space-y-12 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link 
            href="/admin/banners"
            className="group inline-flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 hover:text-gh-charcoal transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Archive
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 mb-3 block">Grassland Configuration</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
            {isNew ? "Initialize" : "Update"} <br /> Slide Data
          </h1>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => router.push("/admin/banners")}
             className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 hover:text-gh-charcoal transition-all border border-transparent hover:border-gh-charcoal/10 rounded-2xl"
           >
             Neutralize
           </button>
           <button 
             onClick={handleSubmit}
             className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-xl shadow-gh-charcoal/20"
           >
             <Save className="h-4 w-4" />
             Commit To Mainframe
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Editor Form */}
        <div className="lg:col-span-2 space-y-10">
           <form className="space-y-10 bg-white p-10 rounded-3xl border border-gh-silver/20">
              {/* Media Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                 <button 
                   type="button"
                   onClick={() => setFormData({...formData, type: "video"})}
                   className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${formData.type === "video" ? "border-gh-charcoal bg-gh-charcoal text-white" : "border-gh-silver/20 hover:border-gh-silver"}`}
                 >
                    <Video className="h-6 w-6" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-center">Cinematic Video</span>
                 </button>
                 <button 
                   type="button"
                   onClick={() => setFormData({...formData, type: "image"})}
                   className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${formData.type === "image" ? "border-gh-charcoal bg-gh-charcoal text-white" : "border-gh-silver/20 hover:border-gh-silver"}`}
                 >
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-center">Static Archive</span>
                 </button>
              </div>

              {/* Text Fields */}
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 ml-1">Primary Signature (Title)</label>
                       <div className="relative group">
                          <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal" />
                          <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="VELOCITY IN MOTION"
                            className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 pl-12 pr-4 rounded-xl text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                          />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 ml-1">Contextual Subtitle</label>
                       <div className="relative group">
                          <Zap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal" />
                          <input 
                            type="text" 
                            value={formData.subtitle}
                            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                            placeholder="Next Gen Engineering"
                            className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 pl-12 pr-4 rounded-xl text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 ml-1">Resource Blueprint (URL)</label>
                    <div className="relative group">
                       <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal" />
                       <input 
                         type="text" 
                         value={formData.mediaUrl}
                         onChange={(e) => setFormData({...formData, mediaUrl: e.target.value})}
                         placeholder="https://cloud.grassland.io/assets/v1.mp4"
                         className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 pl-12 pr-4 rounded-xl text-sm font-bold focus:outline-none focus:border-gh-charcoal transition-all"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 ml-1">Directives (CTA Text)</label>
                       <input 
                         type="text" 
                         value={formData.ctaText}
                         onChange={(e) => setFormData({...formData, ctaText: e.target.value})}
                         className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 ml-1">Target Logic (CTA Link)</label>
                       <div className="relative group">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal font-bold" />
                          <input 
                            type="text" 
                            value={formData.ctaLink}
                            onChange={(e) => setFormData({...formData, ctaLink: e.target.value})}
                            className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 pl-12 pr-4 rounded-xl text-xs font-bold focus:outline-none focus:border-gh-charcoal transition-all"
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Layout Logic */}
              <div className="space-y-6 pt-6 border-t border-gh-silver/20">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                    <Layout className="h-4 w-4" /> Aesthetic Configuration
                 </h4>
                 <div className="flex gap-4">
                    {["center", "corner"].map(mode => (
                      <button 
                        key={mode}
                        type="button"
                        onClick={() => setFormData({...formData, layout: mode})}
                        className={`px-6 py-3 rounded-xl border-2 text-[8px] font-black uppercase tracking-widest transition-all ${formData.layout === mode ? "bg-gh-charcoal text-white border-gh-charcoal" : "border-gh-silver/20 hover:border-gh-silver text-gh-charcoal"}`}
                      >
                         {mode} Layout
                      </button>
                    ))}
                 </div>
              </div>
           </form>
        </div>

        {/* Live Preview */}
        <div className="space-y-10">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
              <Eye className="h-4 w-4" /> Neural Preview
           </h3>
           <div className="relative aspect-[9/16] md:aspect-[4/5] bg-gh-charcoal rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-gh-silver/20">
              {/* Media layer */}
              <div className="absolute inset-0">
                 {formData.mediaUrl ? (
                    formData.type === "video" ? (
                       <video src={formData.mediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover grayscale opacity-60" />
                    ) : (
                       <Image
                         src={formData.mediaUrl}
                         alt={formData.title || "Banner Preview"}
                         fill
                         className="object-cover grayscale opacity-60"
                       />
                    )
                 ) : (
                    <div className="h-full w-full bg-white/5 flex items-center justify-center p-12 text-center">
                       <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">No Media Interface Engaged</span>
                    </div>
                 )}
                 <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content layer */}
              <div className={`absolute inset-0 p-8 flex flex-col pointer-events-none ${formData.layout === "corner" ? "justify-end text-left" : "justify-center text-center"}`}>
                 <div className="space-y-2">
                    <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/60">{formData.subtitle || "AESTHETIC CONTEXT"}</span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-[0.85]">{formData.title || "SIGNATURE IDENTIFIER"}</h2>
                 </div>
                 <div className={`mt-8 ${formData.layout === "corner" ? "hidden" : "block"}`}>
                    <div className="inline-block px-6 py-3 border border-white text-[8px] font-black uppercase tracking-widest text-white">
                       {formData.ctaText}
                    </div>
                 </div>
              </div>

              {/* Glossy Overlay */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20" />
           </div>

           <div className="p-8 bg-white border border-gh-silver/20 rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal mb-4">Sync Status</h4>
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-bold uppercase tracking-widest text-gh-charcoal/40">Active Interface</span>
                 <button 
                   onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                   className={`h-6 w-11 rounded-full p-1 transition-all flex items-center ${formData.isActive ? "bg-gh-charcoal justify-end" : "bg-gh-silver/30 justify-start"}`}
                 >
                    <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
