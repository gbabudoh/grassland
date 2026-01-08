export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">FAQ</h1>
           <p className="text-xl text-neutral-500">Frequently Asked Questions</p>
        </div>

        <div className="space-y-8">
           <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-black uppercase italic mb-3">How do I verify product authenticity?</h3>
              <p className="text-neutral-600 leading-relaxed">
                 Every Grassland product comes with a unique neural NFC tag. Scan it with our app or enter the serial number in your dashboard to verify its origin and view its digital twin.
              </p>
           </div>
           <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-black uppercase italic mb-3">What is the G-Club?</h3>
              <p className="text-neutral-600 leading-relaxed">
                 The G-Club is our exclusive membership program. Members get early access to drops, invites to innovation lab events, and specialized pricing on limited editions.
              </p>
           </div>
           <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-black uppercase italic mb-3">Do you ship internationally?</h3>
              <p className="text-neutral-600 leading-relaxed">
                 Yes, we ship to over 80 countries worldwide via our global logistics partners. Shipping times vary by region.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
