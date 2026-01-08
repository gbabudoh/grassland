"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  BookOpen
} from "lucide-react";
import Image from "next/image";

// Placeholder data for initial UI build
const DUMMY_POSTS = [
  {
    id: "1",
    title: "The Future of Sustainable Footwear: Beyond the Grassland",
    slug: "future-sustainable-footwear",
    author: "Dr. Godwin",
    status: "Published",
    date: "2025-10-15",
    views: 1240,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Neural Aesthetics: Designing the Invisible",
    slug: "neural-aesthetics-designing-invisible",
    author: "System Admin",
    status: "Draft",
    date: "2025-11-02",
    views: 0,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "G-Club Elite: Why Membership Matters",
    slug: "g-club-elite-membership",
    author: "Marketing Team",
    status: "Published",
    date: "2025-09-20",
    views: 8500,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2525&auto=format&fit=crop"
  }
];

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts] = useState(DUMMY_POSTS);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Neural Journal</span>
           <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
             Broadcast <br /> Control
           </h1>
        </div>
        <Link 
          href="/admin/blog/new"
          className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-xl shadow-gh-charcoal/20"
        >
           <Plus className="h-4 w-4" />
           New Transmission
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-8 rounded-3xl border border-gh-silver/20 shadow-sm">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-4 flex items-center gap-2">
               <BookOpen className="h-4 w-4" /> Total Articles
            </h3>
            <span className="text-4xl font-black text-gh-charcoal tracking-tighter">128</span>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-gh-silver/20 shadow-sm">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-4 flex items-center gap-2">
               <Eye className="h-4 w-4" /> Total Reads
            </h3>
            <span className="text-4xl font-black text-gh-charcoal tracking-tighter">48.2K</span>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-gh-silver/20 shadow-sm">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-4 flex items-center gap-2">
               <Calendar className="h-4 w-4" /> Scheduled
            </h3>
            <span className="text-4xl font-black text-gh-charcoal tracking-tighter">3</span>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[40px] border border-gh-silver/20 overflow-hidden shadow-sm">
         {/* Toolbar */}
         <div className="p-8 border-b border-gh-silver/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-96 group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/30 group-focus-within:text-gh-charcoal transition-colors" />
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH ARCHIVES..."
                  className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 pl-14 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal/30 transition-all placeholder:text-gh-charcoal/30"
               />
            </div>
            <div className="flex gap-3">
               <button className="px-6 py-3 rounded-xl border border-gh-silver/20 text-[9px] font-black uppercase tracking-widest text-gh-charcoal hover:bg-gh-silver/10 transition-colors">
                  Filter: All
               </button>
               <button className="px-6 py-3 rounded-xl border border-gh-silver/20 text-[9px] font-black uppercase tracking-widest text-gh-charcoal hover:bg-gh-silver/10 transition-colors">
                  Sort: Newest
               </button>
            </div>
         </div>

         {/* List */}
         <div className="divide-y divide-gh-silver/10">
            {filteredPosts.map((post) => (
               <div key={post.id} className="group p-8 flex items-center gap-6 hover:bg-gh-silver/5 transition-colors">
                  {/* Thumbnail */}
                  <div className="relative h-24 w-32 shrink-0 rounded-xl overflow-hidden bg-gh-silver/20">
                     <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                           post.status === "Published" 
                           ? "bg-green-500/10 text-green-600 border-green-500/20" 
                           : "bg-orange-500/10 text-orange-600 border-orange-500/20"
                        }`}>
                           {post.status}
                        </span>
                        <span className="text-[9px] font-bold text-gh-charcoal/40 uppercase tracking-wider flex items-center gap-1">
                           <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                     </div>
                     <h3 className="text-lg font-black uppercase tracking-tight text-gh-charcoal mb-1 truncate pr-8">
                        {post.title}
                     </h3>
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-gh-charcoal/50 uppercase tracking-widest flex items-center gap-1.5">
                           <User className="h-3 w-3" /> {post.author}
                        </span>
                        <span className="text-[10px] font-bold text-gh-charcoal/50 uppercase tracking-widest flex items-center gap-1.5">
                           <Eye className="h-3 w-3" /> {post.views} Reads
                        </span>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                     <Link 
                        href={`/blog/${post.slug}`} 
                        target="_blank"
                        className="h-10 w-10 rounded-xl bg-white border border-gh-silver/20 flex items-center justify-center text-gh-charcoal/60 hover:text-gh-charcoal hover:border-gh-charcoal/40 transition-all hover:scale-110"
                     >
                        <Eye className="h-4 w-4" />
                     </Link>
                     <Link 
                        href={`/admin/blog/${post.id}`}
                        className="h-10 w-10 rounded-xl bg-gh-charcoal text-white flex items-center justify-center hover:bg-black transition-all hover:scale-110 shadow-lg"
                     >
                        <Edit className="h-4 w-4" />
                     </Link>
                     <button className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110">
                        <Trash2 className="h-4 w-4" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
         
         {/* Footer */}
         <div className="p-8 border-t border-gh-silver/10 bg-gh-silver/5">
            <p className="text-center text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">
               Showing {filteredPosts.length} Transmission(s)
            </p>
         </div>
      </div>
    </div>
  );
}
