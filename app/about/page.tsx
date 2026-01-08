

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
           <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Our Story</h1>
           <p className="text-2xl text-neutral-500 font-light leading-relaxed">
              Grassland was born from a singular obsession: the fusion of organic movement and synthetic precision.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="relative h-[600px] w-full bg-neutral-100 rounded-3xl overflow-hidden">
               {/* Placeholder for brand image */}
               <div className="absolute inset-0 flex items-center justify-center text-neutral-300 font-black uppercase tracking-widest text-4xl">
                  Original
               </div>
           </div>
           <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase italic">The Cross-Breed Era</h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                 We don&apos;t just make shoes; we engineer kinetic platforms. Our journey began in a bio-mechanics lab, not a fashion studio. By analyzing the neural feedback loops of elite athletes, we developed the Grassland One (G1) – the world&apos;s first footwear with responsive neural-cushioning.
              </p>
              <p className="text-neutral-600 leading-relaxed text-lg">
                 Today, we stand at the intersection of biology and technology. Every stitch, every compound, every contour is calculated for maximum velocity and minimal drag.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
