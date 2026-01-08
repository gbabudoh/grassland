export default function InvestorsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
           <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Investor Relations</h1>
           <p className="text-xl text-neutral-500">
              Fueling the next generation of athletic performance.
           </p>
        </div>

        <div className="bg-neutral-900 text-white rounded-3xl p-12 text-center space-y-8">
           <h2 className="text-3xl font-black uppercase italic">FY2025 Q4 Report</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/20">
              <div>
                 <p className="text-4xl font-black text-green-400">+142%</p>
                 <p className="text-xs font-bold uppercase tracking-widest mt-2 text-white/50">YoY Growth</p>
              </div>
              <div>
                 <p className="text-4xl font-black text-blue-400">2.4M</p>
                 <p className="text-xs font-bold uppercase tracking-widest mt-2 text-white/50">Active Users</p>
              </div>
              <div>
                 <p className="text-4xl font-black text-purple-400">8</p>
                 <p className="text-xs font-bold uppercase tracking-widest mt-2 text-white/50">New Markets</p>
              </div>
           </div>
           <button className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors">
              Download Full Report
           </button>
        </div>
      </div>
    </div>
  );
}
