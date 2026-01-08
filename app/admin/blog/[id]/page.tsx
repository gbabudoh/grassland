"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Type, 
  Calendar, 
  User, 
  Globe, 
  Eye, 
  Loader2,
  Trash2,
  Upload
} from "lucide-react";

// Mock Data for "Edit" Mode
const MOCK_POST = {
  id: "1",
  title: "The Future of Sustainable Footwear: Beyond the Grassland",
  slug: "future-sustainable-footwear",
  content: `# THE NEXT EVOLUTION\n\nSustainability isn't just a buzzword; it's the core directive of the Grassland archive. Our engineers have spent cycles optimizing the bio-mesh integration...\n\n## Neural Feedback Loops\n\nWhen we analyze the footprint of traditional manufacturing...`,
  excerpt: "Exploring the bio-mesh integration in our specialized footwear units.",
  author: "Dr. Godwin",
  status: "Published",
  date: "2025-10-15",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
  tags: "Sustainability, Innovation, Neural"
};

export default function AdminBlogEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (!isNew && id === "1") {
       return MOCK_POST;
    }
    return {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "System Admin",
      status: "Draft",
      image: "",
      tags: ""
    };
  });

  // Load data if editing
  useEffect(() => {
     // Real API fetch would go here
  }, [id, isNew]);

  const generateSlug = () => {
     const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
  };

  const handleSave = async () => {
     setIsLoading(true);
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1500));
     setIsLoading(false);
     router.push("/admin/blog");
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link 
            href="/admin/blog"
            className="group inline-flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 hover:text-gh-charcoal transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Journal
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Content Matrix</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
            {isNew ? "New" : "Edit"} <br /> Transmission
          </h1>
        </div>
        <div className="flex gap-4">
           {!isNew && (
             <button className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-red-500/70 hover:text-red-500 transition-all border border-transparent hover:border-red-500/10 rounded-2xl flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete
             </button>
           )}
           <button 
             onClick={handleSave}
             disabled={isLoading}
             className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-xl shadow-gh-charcoal/20 disabled:opacity-50 disabled:hover:scale-100"
           >
             {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
             {isNew ? "Publish Signal" : "Update Signal"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Editor */}
         <div className="lg:col-span-2 space-y-10">
            {/* Title Section */}
            <div className="bg-white p-10 rounded-3xl border border-gh-silver/20 space-y-8">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3 mb-2">
                  <Type className="h-4 w-4" /> Signal Identity
               </h3>
               
               <div className="space-y-4">
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="ENTER ARTICLE TITLE..."
                    className="w-full bg-transparent text-4xl font-black uppercase tracking-tighter text-gh-charcoal placeholder:text-gh-charcoal/20 focus:outline-none"
                  />
                  <div className="flex items-center gap-4">
                     <div className="flex-1 bg-gh-silver/10 border border-gh-silver/20 rounded-xl px-4 py-3 flex items-center gap-2">
                        <Globe className="h-3 w-3 text-gh-charcoal/30" />
                        <span className="text-[10px] font-bold text-gh-charcoal/40">https://grassland.com/blog/</span>
                        <input 
                           type="text" 
                           value={formData.slug}
                           onChange={(e) => setFormData({...formData, slug: e.target.value})}
                           placeholder="post-url-slug"
                           className="flex-1 bg-transparent text-[10px] font-black uppercase tracking-widest text-gh-charcoal focus:outline-none"
                        />
                     </div>
                     <button 
                        onClick={generateSlug}
                        className="px-4 py-3 bg-gh-silver/20 hover:bg-gh-silver/30 rounded-xl text-[9px] font-black uppercase tracking-widest text-gh-charcoal transition-colors"
                     >
                        Auto-Generate
                     </button>
                  </div>
               </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white p-10 rounded-3xl border border-gh-silver/20 space-y-8 min-h-[500px] flex flex-col">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                     <Type className="h-4 w-4" /> Encryption / Content
                  </h3>
                  <div className="flex gap-2">
                     <button className="h-8px px-3 py-1.5 rounded-lg bg-gh-charcoal text-white text-[9px] font-black uppercase tracking-widest">Write</button>
                     <button className="h-8px px-3 py-1.5 rounded-lg bg-transparent hover:bg-gh-silver/10 text-gh-charcoal/50 text-[9px] font-black uppercase tracking-widest transition-colors">Preview</button>
                  </div>
               </div>
               <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="# Begin Transmission...\n\nWrite your content here in Markdown format."
                  className="flex-1 w-full resize-none bg-transparent text-sm font-medium leading-relaxed focus:outline-none placeholder:text-gh-charcoal/20 font-mono"
               />
            </div>
         </div>

         {/* Sidebar Metadata */}
         <div className="space-y-8">
            {/* Featured Image */}
            <div className="bg-white p-8 rounded-[40px] border border-gh-silver/20 space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                  <ImageIcon className="h-4 w-4" /> Visual Cortex
               </h3>
               
               <div className="aspect-video w-full rounded-2xl bg-gh-silver/10 border-2 border-dashed border-gh-silver/20 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-gh-charcoal/20 transition-all">
                  {formData.image ? (
                     <>
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="text-white text-[10px] font-black uppercase tracking-widest">Replace Image</span>
                        </div>
                     </>
                  ) : (
                     <div className="flex flex-col items-center gap-2 text-gh-charcoal/30">
                        <Upload className="h-6 w-6" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Upload Cover</span>
                     </div>
                  )}
                  <input 
                     type="text" 
                     value={formData.image}
                     onChange={(e) => setFormData({...formData, image: e.target.value})}
                     className="absolute inset-0 opacity-0 cursor-pointer"
                  />
               </div>
               
               <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/50">Image URL</label>
                  <input 
                     type="text" 
                     value={formData.image}
                     onChange={(e) => setFormData({...formData, image: e.target.value})}
                     placeholder="https://..."
                     className="w-full bg-gh-silver/10 border border-gh-silver/20 py-3 px-4 rounded-xl text-[10px] font-bold text-gh-charcoal focus:outline-none focus:border-gh-charcoal/30 transition-all"
                  />
               </div>
            </div>

            {/* Meta Data */}
            <div className="bg-white p-8 rounded-[40px] border border-gh-silver/20 space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                  <Calendar className="h-4 w-4" /> Dispatch Data
               </h3>

               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/50">Status</label>
                     <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gh-charcoal focus:outline-none focus:border-gh-charcoal/30 transition-all cursor-pointer"
                     >
                        <option value="Draft">Draft Mode</option>
                        <option value="Published">Live Broadcast</option>
                        <option value="Archived">Archived</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/50">Author</label>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/30" />
                        <input 
                           type="text" 
                           value={formData.author}
                           onChange={(e) => setFormData({...formData, author: e.target.value})}
                           className="w-full bg-gh-silver/10 border border-gh-silver/20 py-3 pl-10 pr-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gh-charcoal focus:outline-none focus:border-gh-charcoal/30 transition-all"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/50">Tags</label>
                     <input 
                        type="text" 
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="Tech, Design..."
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gh-charcoal focus:outline-none focus:border-gh-charcoal/30 transition-all"
                     />
                  </div>
               </div>
            </div>
            
            {/* Excerpt */}
            <div className="bg-white p-8 rounded-[40px] border border-gh-silver/20 space-y-4">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gh-charcoal flex items-center gap-3">
                  <Eye className="h-4 w-4" /> Briefing
               </h3>
               <textarea 
                  rows={4}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Short summary for the index..."
                  className="w-full bg-gh-silver/10 border border-gh-silver/20 py-3 px-4 rounded-xl text-[11px] font-bold leading-relaxed text-gh-charcoal focus:outline-none focus:border-gh-charcoal/30 transition-all resize-none placeholder:text-gh-charcoal/30"
               />
            </div>
         </div>
      </div>
    </div>
  );
}
