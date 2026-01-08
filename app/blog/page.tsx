"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

const BLOG_POSTS = [
  {
    id: "1",
    slug: "future-sustainable-footwear",
    title: "The Future of Sustainable Footwear: Beyond the Grassland",
    excerpt: "Exploring the bio-mesh integration in our specialized footwear units. How we are redefining the carbon footprint of high-performance gear.",
    author: "Dr. Godwin",
    date: "OCT 15, 2025",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
    category: "Innovation"
  },
  {
    id: "2",
    slug: "neural-aesthetics-designing-invisible",
    title: "Neural Aesthetics: Designing the Invisible",
    excerpt: "A deep dive into the design philosophy connecting human neural pathways with garment functionality.",
    author: "System Admin",
    date: "NOV 02, 2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    category: "Design"
  },
  {
    id: "3",
    slug: "g-club-elite-membership",
    title: "G-Club Elite: Why Membership Matters",
    excerpt: "Unlock the vault. Early access, exclusive drops, and the community that drives the Grassland ecosystem.",
    author: "Marketing Team",
    date: "SEP 20, 2025",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2525&auto=format&fit=crop",
    category: "Community"
  },
   {
    id: "4",
    slug: "urban-terrain-mastery",
    title: "Urban Terrain Mastery: The G1 Review",
    excerpt: "Field testing the G1 Performance Matrix in the harshest urban environments. From concrete jungles to actual jungles.",
    author: "Field Ops",
    date: "AUG 14, 2025",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2670&auto=format&fit=crop",
    category: "Performance"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gh-white pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 mb-4 block">Archive Logs</span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.85] mb-8">
            Neural <br /> Journal
          </h1>
          <p className="max-w-xl text-[11px] md:text-xs font-bold uppercase tracking-widest text-gh-charcoal/60 leading-relaxed border-l-2 border-gh-charcoal/20 pl-6">
            Documenting the evolution of Grassland technology, culture, and design. Access the thought matrix behind the products.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] mb-8 bg-gh-silver/10">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 left-6">
                   <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-gh-charcoal">
                      {post.category}
                   </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 pr-0 md:pr-12">
                 <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-gh-charcoal/40">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gh-charcoal/20" />
                    <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {post.author}</span>
                 </div>
                 
                 <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gh-charcoal leading-none group-hover:text-gh-brand-orange/80 transition-colors">
                    {post.title}
                 </h2>
                 
                 <p className="text-xs font-medium text-gh-charcoal/60 leading-relaxed line-clamp-2">
                    {post.excerpt}
                 </p>
                 
                 <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal group-hover:translate-x-2 transition-transform duration-300">
                       Read Transmission <ArrowRight className="h-4 w-4" />
                    </span>
                 </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
