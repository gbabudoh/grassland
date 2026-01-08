"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Zap, 
  Cpu, 
  ShieldCheck,
  Package,
  Activity,
  Trash2,
  Maximize2,
  X,
  Upload,
  Info,
  Eye,
  AlertTriangle
} from "lucide-react";
import QRCode from "qrcode";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to validate if a string is a valid URL
const isValidUrl = (urlString: string) => {
  if (!urlString) return false;
  try {
    new URL(urlString);
    return true;
  } catch {
    return urlString.startsWith('/') || urlString.startsWith('http');
  }
};
import { PRODUCTS } from "@/lib/data/products";

export default function AdminProductEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";
  
  const product = isNew ? null : PRODUCTS.find(p => p.id === id);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || "Footwear",
    signature: product?.signature || "",
    stock: product?.stock || 0,
    aiRating: product?.aiRating || 95,
    insights: product?.insights || "",
    material: product?.material || "",
    size: product?.sizes || "",
    isPreOrder: product?.isPreOrder || false,
    gallery: product?.gallery || [],
    technicalSpecs: product?.technicalSpecs || [
      { label: "Archive Build", value: "V2-Core" },
      { label: "Grassland Link", value: "Bio-Sync 4" }
    ]
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<"image" | "video">("image");
  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const [mediaToDeleteIndex, setMediaToDeleteIndex] = useState<number | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const generateSerial = async () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    const serial = `GSL-${timestamp}-${random}`;
    
    setFormData(prev => ({ ...prev, signature: serial }));
    try {
      const url = await QRCode.toDataURL(serial);
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
    }
  };
  
  // Generate QR for existing signature on load
  // Generate QR for existing signature on load
  useEffect(() => {
     if (formData.signature) {
       QRCode.toDataURL(formData.signature)
        .then((url: string) => setQrCodeUrl(url))
        .catch(console.error);
     }
  }, [formData.signature]);

  const handleAddMedia = () => {
    if (!newMediaUrl) return;
    setFormData({
      ...formData,
      gallery: [...formData.gallery, { type: newMediaType, url: newMediaUrl }]
    });
    setNewMediaUrl("");
    setShowUploadModal(false);
  };

  const handleRemoveMedia = (index: number) => {
    setMediaToDeleteIndex(index);
  };

  const confirmRemoveMedia = () => {
    if (mediaToDeleteIndex === null) return;
    const newGallery = [...formData.gallery];
    newGallery.splice(mediaToDeleteIndex, 1);
    setFormData({ ...formData, gallery: newGallery });
    setMediaToDeleteIndex(null);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/products");
  };

  return (
    <>
    <div className="space-y-12 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link 
            href="/admin/products"
            className="group inline-flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 hover:text-gh-charcoal transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Archive
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Grassland Catalog Mapping</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
            {isNew ? "Archive" : "Update"} <br /> Item Specs
          </h1>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => router.push("/admin/products")}
             className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/70 hover:text-gh-charcoal transition-all border border-transparent hover:border-gh-charcoal/10 rounded-2xl"
           >
             Neutralize
           </button>
           <button 
             onClick={handleSubmit}
             className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-xl shadow-gh-charcoal/20"
           >
             <Save className="h-4 w-4" />
             Save Item
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Editor Sections */}
        <div className="lg:col-span-2 space-y-10">
           {/* Section 1: Basic Bio-Data */}
           <div className="bg-white p-10 rounded-3xl border border-gh-silver/20 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3 mb-2">
                 <Package className="h-4 w-4" /> Core Item Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Item Scientific Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="G1 PERFORMANCE MATRIX"
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                    />
                 </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Archive ID & Signature</label>
                     <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                           <input 
                              type="text" 
                              value={formData.signature}
                              onChange={(e) => setFormData({...formData, signature: e.target.value})}
                              placeholder="Generate Secure Serial"
                              className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                           />
                           <button
                              type="button"
                              onClick={generateSerial}
                              className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60 hover:text-gh-charcoal flex items-center gap-2"
                           >
                              <Zap className="h-3 w-3" /> Generate Unique Serial
                           </button>
                        </div>
                        {qrCodeUrl && (
                           <div className="h-20 w-20 bg-white border border-gh-silver/20 rounded-xl p-2 flex items-center justify-center shrink-0">
                              <Image src={qrCodeUrl} alt="QR" width={64} height={64} className="w-full h-full" />
                           </div>
                        )}
                     </div>
                  </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Unit Currency Valuation</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black opacity-30">$</span>
                       <input 
                         type="number" 
                         value={formData.price}
                         onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                         className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 pl-10 pr-6 rounded-xl text-sm font-black focus:outline-none focus:border-gh-charcoal transition-all"
                       />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Grassland Category Class</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                    >
                       <option value="Velocity">Velocity Class</option>
                       <option value="Terrain">Terrain Class</option>
                       <option value="Hybrid">Hybrid Class</option>
                       <option value="Elite">Elite Class</option>
                       <option value="Footwear">Footwear</option>
                       <option value="Apparel">Apparel</option>
                       <option value="Size">Size</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Size</label>
                    {formData.category === "Footwear" ? (
                      <select
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                      >
                        <option value="">Select Size</option>
                        <option value="US 6">US 6</option>
                        <option value="US 6.5">US 6.5</option>
                        <option value="US 7">US 7</option>
                        <option value="US 7.5">US 7.5</option>
                        <option value="US 8">US 8</option>
                        <option value="US 8.5">US 8.5</option>
                        <option value="US 9">US 9</option>
                        <option value="US 9.5">US 9.5</option>
                        <option value="US 10">US 10</option>
                        <option value="US 10.5">US 10.5</option>
                        <option value="US 11">US 11</option>
                        <option value="US 11.5">US 11.5</option>
                        <option value="US 12">US 12</option>
                        <option value="US 13">US 13</option>
                        <option value="US 14">US 14</option>
                      </select>
                    ) : formData.category === "Apparel" ? (
                      <select
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                      >
                        <option value="">Select Size</option>
                        <option value="XS">XS - Extra Small</option>
                        <option value="S">S - Small</option>
                        <option value="M">M - Medium</option>
                        <option value="L">L - Large</option>
                        <option value="XL">XL - Extra Large</option>
                        <option value="XXL">XXL - Double XL</option>
                        <option value="XXXL">XXXL - Triple XL</option>
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        placeholder="Enter size or select Footwear/Apparel category"
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                      />
                    )}
                  </div>
               </div>
           </div>

           {/* Section 2: Media Gallery */}
           <div className="bg-white p-10 rounded-3xl border border-gh-silver/20 space-y-8">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                    <Maximize2 className="h-4 w-4" /> Grassland Gallery Matrix
                 </h3>
                 <button 
                    onClick={() => setShowUploadModal(true)}
                    className="text-[9px] font-black uppercase tracking-widest bg-gh-charcoal text-white px-4 py-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Initialize Upload
                 </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {formData.gallery.map((media, idx) => (
                   <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gh-silver/20">
                       {isValidUrl(media.url) ? (
                         media.type === "video" ? (
                           <video src={media.url} className="h-full w-full object-cover" />
                         ) : (
                           <Image 
                             src={media.url} 
                             alt={formData.name || "Product Media"} 
                             fill
                             className="object-cover" 
                           />
                         )
                       ) : (
                         <div className="h-full w-full bg-gh-silver/10 flex items-center justify-center">
                           <span className="text-[8px] font-black uppercase tracking-widest text-gh-charcoal/20">Invalid URL</span>
                         </div>
                       )}
                      <div className="absolute inset-0 bg-gh-charcoal/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                         <button 
                           type="button"
                           onClick={() => setPreviewMedia(media.url)}
                           className="h-8 w-8 rounded-lg bg-white text-gh-charcoal flex items-center justify-center hover:scale-110 transition-all"
                         >
                            <Eye className="h-3.5 w-3.5" />
                         </button>
                         <button 
                           type="button"
                           onClick={() => handleRemoveMedia(idx)}
                           className="h-8 w-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-all"
                         >
                            <Trash2 className="h-3.5 w-3.5" />
                         </button>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[7px] font-black text-white uppercase tracking-widest">
                         {media.type}
                      </div>
                   </div>
                 ))}
                 <button 
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="aspect-square rounded-2xl border-2 border-dashed border-gh-silver/30 flex flex-col items-center justify-center gap-2 text-gh-charcoal/20 hover:text-gh-charcoal/70 hover:border-gh-charcoal/20 transition-all group cursor-pointer"
                  >
                    <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Add Module</span>
                 </button>
              </div>
           </div>

           {/* Section 3: Technical Breakdown */}
           <div className="bg-white p-10 rounded-3xl border border-gh-silver/20 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3 mb-2">
                 <Activity className="h-4 w-4" /> Technical DNA Mapping
              </h3>
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">AI Sentiment Analysis Report</label>
                 <textarea 
                   rows={4}
                   value={formData.insights}
                   onChange={(e) => setFormData({...formData, insights: e.target.value})}
                   placeholder="DESCRIBE THE GRASSLAND PERFORMANCE CHARACTERISTICS..."
                   className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-[0.1em] leading-relaxed focus:outline-none focus:border-gh-charcoal transition-all placeholder:opacity-30"
                 />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Core Material Engineering</label>
                    <input 
                      type="text" 
                      value={formData.material}
                      onChange={(e) => setFormData({...formData, material: e.target.value})}
                      placeholder="FORGED CARBON"
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">AI Sync Potential (%)</label>
                    <div className="relative">
                       <input 
                         type="number" 
                         value={formData.aiRating}
                         onChange={(e) => setFormData({...formData, aiRating: Number(e.target.value)})}
                         className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black focus:outline-none focus:border-gh-charcoal transition-all"
                       />
                       <Zap className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Live Status Sidebar */}
        <div className="space-y-8">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" /> Integrity Status
           </h3>

           <div className="p-10 bg-white border border-gh-silver/20 rounded-[40px] space-y-10 shadow-sm">
              <div className="flex items-center justify-between">
                 <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/70 mb-1">Stock Sync</span>
                    <span className="text-3xl font-black tracking-tighter">{formData.stock} Units</span>
                 </div>
                 <input 
                    type="number" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                    className="w-20 bg-gh-silver/10 border border-gh-silver/20 py-2 px-3 rounded-lg text-xs font-black text-right"
                 />
              </div>

              <div className="flex flex-col gap-3 p-6 bg-gh-charcoal rounded-3xl text-white">
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Order Type</span>
                 <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, isPreOrder: false})}
                      className={`py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${!formData.isPreOrder ? "bg-white text-gh-charcoal border-white" : "bg-transparent text-white/40 border-white/10 hover:border-white/30"}`}
                    >
                       Normal Order
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, isPreOrder: true})}
                      className={`py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${formData.isPreOrder ? "bg-white text-gh-charcoal border-white" : "bg-transparent text-white/40 border-white/10 hover:border-white/30"}`}
                    >
                       PreOrder
                    </button>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-gh-silver/10 pb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/70">Status</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1.5">
                       <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Live in Archive
                    </span>
                 </div>
                 <div className="flex items-center justify-between border-b border-gh-silver/10 pb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/70">Visibility</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60">Searchable</span>
                 </div>
                  <div className="flex items-center justify-between border-b border-gh-silver/10 pb-4">
                     <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/70">Category</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60">{formData.category}</span>
                  </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/70">Grassland Sync</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60 font-black">Sync-Ready</span>
                 </div>
              </div>
           </div>

            <div className="p-10 bg-gh-silver/5 border border-dashed border-gh-silver/40 rounded-[40px] flex flex-col items-center justify-center text-center gap-4">
               <Cpu className="h-8 w-8 text-gh-charcoal/10" />
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gh-charcoal/60">Item Specs Ready for <br /> Predictive Deployment</span>
            </div>
        </div>
      </div>
    </div>
    
    {/* Upload Info Modal */}
    <AnimatePresence>
      {showUploadModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-[40px] border border-gh-silver/20 shadow-2xl max-w-md w-full p-10 relative">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-gh-silver/20 transition-all text-gh-charcoal/40 hover:text-gh-charcoal cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-16 w-16 rounded-2xl bg-gh-charcoal/5 flex items-center justify-center mb-6 mx-auto">
                <Upload className="h-8 w-8 text-gh-charcoal" />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gh-charcoal mb-3">
                  Upload <br /> Protocol
                </h2>
                <div className="flex items-center justify-center gap-2 text-gh-charcoal/60 mb-2">
                   <Info className="h-4 w-4" />
                   <p className="text-[11px] font-black uppercase tracking-wide">
                     System Notice
                   </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">Media Resource URL</label>
                    <input 
                      type="text" 
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black focus:outline-none focus:border-gh-charcoal transition-all"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setNewMediaType("image")}
                      className={`p-4 rounded-xl border border-gh-silver/20 flex flex-col items-center gap-2 transition-all ${newMediaType === "image" ? "bg-gh-charcoal text-white" : "hover:bg-gh-silver/5"}`}
                    >
                       <span className="text-[9px] font-black uppercase tracking-widest">Image</span>
                    </button>
                    <button 
                      onClick={() => setNewMediaType("video")}
                      className={`p-4 rounded-xl border border-gh-silver/20 flex flex-col items-center gap-2 transition-all ${newMediaType === "video" ? "bg-gh-charcoal text-white" : "hover:bg-gh-silver/5"}`}
                    >
                       <span className="text-[9px] font-black uppercase tracking-widest">Video</span>
                    </button>
                 </div>
              </div>

              <button
                onClick={handleAddMedia}
                className="w-full px-6 py-4 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all rounded-2xl shadow-lg cursor-pointer"
              >
                Add to Gallery
              </button>
            </div>
          </motion.div>
        </>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewMedia(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 pointer-events-none"
          >
             <div className="relative max-w-5xl w-full max-h-[80vh] aspect-video pointer-events-auto">
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2"
                >
                   <span className="text-[10px] font-black uppercase tracking-widest">Close Preview</span>
                   <X className="h-6 w-6" />
                </button>
                {previewMedia.endsWith('.mp4') || previewMedia.endsWith('.webm') ? (
                   <video src={previewMedia} controls autoPlay className="w-full h-full object-contain rounded-2xl shadow-2xl bg-black" />
                ) : (
                   <Image src={previewMedia} alt="Preview" fill className="object-contain rounded-2xl bg-black/20" />
                )}
             </div>
          </motion.div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {mediaToDeleteIndex !== null && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMediaToDeleteIndex(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-[40px] border-2 border-red-500/20 shadow-2xl max-w-sm w-full p-8 relative">
              <button
                onClick={() => setMediaToDeleteIndex(null)}
                className="absolute top-6 right-6 h-8 w-8 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all text-gh-charcoal/40 hover:text-red-500 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 mx-auto">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-gh-charcoal mb-2">
                  Delete Media?
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/60">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMediaToDeleteIndex(null)}
                  className="flex-1 px-4 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/60 hover:text-gh-charcoal transition-all border-2 border-gh-silver/20 hover:border-gh-charcoal/20 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemoveMedia}
                  className="flex-1 px-4 py-3 bg-red-500 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all rounded-xl shadow-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
