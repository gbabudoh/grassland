export default function CareersPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
           <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Join the Revolution</h1>
           <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              We are looking for visionaries, engineers, and rebels. If you want to build the future of movement, you belong here.
           </p>
        </div>

        <div className="grid gap-6">
           <div className="p-8 border border-neutral-200 rounded-2xl hover:border-black transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer group">
              <div>
                 <h3 className="text-xl font-black uppercase italic mb-1">Senior Footwear Designer</h3>
                 <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Innovation Lab • Portland, OR</p>
              </div>
              <span className="px-6 py-3 bg-neutral-100 rounded-full text-xs font-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors">Apply Now</span>
           </div>
           <div className="p-8 border border-neutral-200 rounded-2xl hover:border-black transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer group">
              <div>
                 <h3 className="text-xl font-black uppercase italic mb-1">Materials Engineer</h3>
                 <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">R&D • London, UK</p>
              </div>
              <span className="px-6 py-3 bg-neutral-100 rounded-full text-xs font-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors">Apply Now</span>
           </div>
           <div className="p-8 border border-neutral-200 rounded-2xl hover:border-black transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer group">
              <div>
                 <h3 className="text-xl font-black uppercase italic mb-1">Brand Narrative Director</h3>
                 <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Marketing • Remote</p>
              </div>
              <span className="px-6 py-3 bg-neutral-100 rounded-full text-xs font-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors">Apply Now</span>
           </div>
        </div>
      </div>
    </div>
  );
}
