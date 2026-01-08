"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, Clock } from "lucide-react";
import { useRef } from "react";

// Mock Data for the single post view
const POST = {
  id: "1",
  slug: "future-sustainable-footwear",
  title: "The Future of Sustainable Footwear: Beyond the Grassland",
  excerpt: "Exploring the bio-mesh integration in our specialized footwear units. How we are redefining the carbon footprint of high-performance gear.",
  author: "Dr. Godwin",
  role: "Chief Architect",
  date: "OCT 15, 2025",
  readTime: "5 MIN READ",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
  category: "Innovation",
  content: `
    <p class="lead">Sustainability isn't just a buzzword; it's the core directive of the Grassland archive. Our engineers have spent cycles optimizing the bio-mesh integration to ensure maximal performance with minimal ecological drag.</p>
    
    <h2>The Next Evolution</h2>
    <p>We are standing at the precipice of a material revolution. The synthetic fibers of the past are giving way to advanced, lab-grown organic compounds that mimic the strength of spider silk while maintaining the breathability of cotton. This isn't just about saving the planet—it's about enhancing the human machine.</p>
    
    <p>Our flagship <strong>G1 Pro</strong> utilizes a proprietary mycelium-based leather alternative. It grows in 14 days, requires zero tanning chemicals, and offers a tensile strength 30% higher than traditional bovine leather. This is the future we are building.</p>

    <h2>Neural Feedback Loops</h2>
    <p>When we analyze the footprint of traditional manufacturing, the data is staggering. The water consumption, the chemical runoff, the logistical inefficiency. Grassland's "Local-Grow" initiative aims to decentralize production, 3D printing sole units on-demand in regional hubs.</p>
    
    <blockquote>"The goal is not to preserve the status quo, but to engineer a better one. We don't just walk on the earth; we should tread lightly while moving fast."</blockquote>

    <p>This philosophy extends to our packaging, our logistics, and our digital infrastructure. Every transaction on the Grassland network is carbon-offset in real-time. This is what it means to be truly modern.</p>
  `
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Use params for data fetching (mock for now)
  const slug = params.slug;
  console.log("Viewing post:", slug);

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gh-white">
      {/* progress bar */}
      <div className="fixed top-0 left-0 h-1 z-50 bg-gh-charcoal/10 w-full">
         <motion.div style={{ width }} className="h-full bg-gh-charcoal" />
      </div>

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image 
           src={POST.image} 
           alt={POST.title} 
           fill 
           className="object-cover"
           priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gh-charcoal via-gh-charcoal/40 to-transparent opacity-90" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <div className="flex items-center gap-4 mb-6">
                 <Link href="/blog" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Journal
                 </Link>
                 <span className="w-1 h-1 rounded-full bg-white/40" />
                 <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/20">
                    {POST.category}
                 </span>
              </div>
              
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8 max-w-5xl">
                 {POST.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/10 pt-8">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                       <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                       <span className="block text-white text-[10px] font-black uppercase tracking-widest">{POST.author}</span>
                       <span className="block text-white/40 text-[9px] font-bold uppercase tracking-widest">{POST.role}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                       <span className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1 flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Published</span>
                       <span className="text-white text-[10px] font-bold uppercase tracking-widest">{POST.date}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1 flex items-center gap-1.5"><Clock className="h-3 w-3" /> Time</span>
                       <span className="text-white text-[10px] font-bold uppercase tracking-widest">{POST.readTime}</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
         {/* Lead Paragraph */}
         <div 
            className="prose prose-lg md:prose-xl prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-gh-charcoal prose-p:text-gh-charcoal/80 prose-p:font-medium prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-gh-charcoal prose-blockquote:pl-6 prose-blockquote:italic prose-strong:text-gh-charcoal prose-strong:font-black"
            dangerouslySetInnerHTML={{ __html: POST.content }}
         />

         {/* Tags & Share */}
         <div className="mt-20 pt-10 border-t border-gh-silver/20 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-wrap gap-2">
               {["Sustainability", "Design", "Future", "Tech"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-gh-silver/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60">
                     #{tag}
                  </span>
               ))}
            </div>
            <button className="flex items-center gap-3 px-6 py-3 bg-gh-charcoal text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-lg">
               <Share2 className="h-4 w-4" /> Share Transmission
            </button>
         </div>
      </div>
    </div>
  );
}
