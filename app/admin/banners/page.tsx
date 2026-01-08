"use client";

import { useState } from "react";
import { 
  Plus, 
  Layers, 
  Video, 
  Image as ImageIcon, 
  Eye, 
  Edit3, 
  Trash2,
  GripVertical,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
  id: number;
  type: "video" | "image";
  title: string;
  subtitle: string;
  mediaUrl: string;
  isActive: boolean;
  sortOrder: number;
}

const mockBanners: Banner[] = [
  { 
    id: 1, 
    type: "video", 
    title: "Velocity In Motion", 
    subtitle: "Aerodynamic Engineering", 
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    isActive: true,
    sortOrder: 0
  },
  { 
    id: 2, 
    type: "image", 
    title: "Next Gen Performance", 
    subtitle: "Precision Footwear", 
    mediaUrl: "/grassland_banner_1_1767749428961.png",
    isActive: true,
    sortOrder: 1
  },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBanner, setDeletingBanner] = useState<Banner | null>(null);

  const handleDelete = (banner: Banner) => {
    setDeletingBanner(banner);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingBanner) {
      setBanners(banners.filter(b => b.id !== deletingBanner.id));
      setShowDeleteModal(false);
      setDeletingBanner(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingBanner(null);
  };

  const toggleStatus = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    ));
  };

  return (
    <>
      <div className="space-y-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Display Orchestration</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
              Banner <br /> Management
            </h1>
          </div>
          <Link 
            href="/admin/banners/new"
            className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Initialize New Slide
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="px-6 py-4 bg-white border border-gh-silver/20 rounded-2xl">
            <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/70 block mb-1">Total Banners</span>
            <span className="text-2xl font-black text-gh-charcoal">{banners.length}</span>
          </div>
          <div className="px-6 py-4 bg-white border border-gh-silver/20 rounded-2xl">
            <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/70 block mb-1">Active</span>
            <span className="text-2xl font-black text-green-500">{banners.filter(b => b.isActive).length}</span>
          </div>
        </div>

        {/* Banner List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-2">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                <Layers className="h-4 w-4" /> Active Sequence
             </h3>
             <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">Drag to re-order priority</span>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {banners.map((banner, i) => (
                <motion.div 
                  key={banner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-3xl border border-gh-silver/20 flex flex-col md:flex-row items-center gap-8 group hover:border-gh-charcoal/10 hover:shadow-lg transition-all"
                >
                  {/* Drag Handle */}
                  <div className="hidden md:block text-gh-charcoal/10 cursor-grab active:cursor-grabbing hover:text-gh-charcoal/40 transition-colors">
                     <GripVertical className="h-6 w-6" />
                  </div>

                  {/* Preview Thumbnail */}
                  <div className="h-40 w-full md:w-72 bg-gh-charcoal rounded-2xl overflow-hidden relative border border-gh-silver/20 group-hover:scale-105 transition-transform">
                     {banner.type === "video" ? (
                       <video 
                         src={banner.mediaUrl} 
                         muted 
                         loop 
                         autoPlay 
                         playsInline 
                         className="h-full w-full object-cover opacity-60"
                       />
                     ) : (
                       <Image 
                         src={banner.mediaUrl} 
                         alt={banner.title} 
                         fill
                         className="object-cover"
                       />
                     )}
                     <div className="absolute inset-0 bg-black/20" />
                     <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        {banner.type === "video" ? <Video className="h-3 w-3 text-white" /> : <ImageIcon className="h-3 w-3 text-white" />}
                     </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-3 mb-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-gh-charcoal/60 bg-gh-silver/10 px-2 py-1 rounded">SEQUENCE 0{i + 1}</span>
                        <button
                          onClick={() => toggleStatus(banner.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                            banner.isActive 
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white" 
                              : "bg-gh-silver/20 text-gh-charcoal/40 hover:bg-gh-charcoal hover:text-white"
                          }`}
                          title={banner.isActive ? "Click to deactivate" : "Click to activate"}
                        >
                          <div className={`h-1.5 w-1.5 rounded-full ${banner.isActive ? "bg-current" : "bg-current"}`} />
                          {banner.isActive ? "Active" : "Inactive"}
                        </button>
                     </div>
                     <h2 className="text-2xl font-black uppercase tracking-tighter text-gh-charcoal leading-none mb-2">{banner.title}</h2>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/60 truncate">{banner.subtitle}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                     <Link 
                       href={`/admin/banners/${banner.id}`} 
                       className="h-12 w-12 rounded-2xl bg-gh-silver/10 flex items-center justify-center border border-transparent hover:border-gh-charcoal/20 hover:bg-white transition-all cursor-pointer"
                       title="Edit banner"
                     >
                        <Edit3 className="h-4 w-4 text-gh-charcoal" />
                     </Link>
                     <button 
                       onClick={() => handleDelete(banner)}
                       className="h-12 w-12 rounded-2xl bg-gh-silver/10 flex items-center justify-center border border-transparent hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-500 transition-all cursor-pointer"
                       title="Delete banner"
                     >
                        <Trash2 className="h-4 w-4" />
                     </button>
                     <Link
                       href={`/`}
                       target="_blank"
                       className="h-12 w-12 rounded-2xl bg-gh-charcoal text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer"
                       title="Preview banner on homepage"
                     >
                        <Eye className="h-4 w-4" />
                     </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats/Settings Quick View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-gh-silver/20">
           <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Interaction Report</h4>
              <div className="flex items-end gap-3 mb-6">
                 <span className="text-4xl font-black tracking-tighter text-gh-charcoal underline underline-offset-8 decoration-blue-500/20">3.8K</span>
                 <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60 mb-1">Click Throughs</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/60 leading-relaxed">
                 Banners with high-contrast video backgrounds are performing 24% better than static images.
              </p>
           </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && deletingBanner && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-[40px] border-2 border-red-500/20 shadow-2xl max-w-md w-full p-10 relative">
                {/* Close Button */}
                <button
                  onClick={cancelDelete}
                  className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all text-gh-charcoal/40 hover:text-red-500 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Warning Icon */}
                <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 mx-auto">
                  <Trash2 className="h-8 w-8 text-red-500" />
                </div>

                {/* Header */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-gh-charcoal mb-3">
                    Delete <br /> Banner?
                  </h2>
                  <p className="text-[11px] font-black uppercase tracking-wide text-gh-charcoal/60 mb-2">
                    {deletingBanner.title}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-red-500">
                    ⚠ This action cannot be undone
                  </p>
                </div>

                {/* Banner Info */}
                <div className="bg-red-500/5 rounded-2xl p-6 mb-8 border border-red-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                      Type
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/70">
                      {deletingBanner.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                      Status
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${deletingBanner.isActive ? "text-green-500" : "text-gh-charcoal/40"}`}>
                      {deletingBanner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={cancelDelete}
                    className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/60 hover:text-gh-charcoal transition-all border-2 border-gh-silver/20 hover:border-gh-charcoal/20 rounded-2xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all rounded-2xl shadow-lg cursor-pointer"
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
