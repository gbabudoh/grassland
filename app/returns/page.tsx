export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Returns & Exchanges</h1>
           <p className="text-xl text-neutral-500">30-Day Satisfaction Guarantee</p>
        </div>

        <div className="bg-neutral-50 p-10 rounded-3xl border border-neutral-200 space-y-6">
           <h3 className="text-2xl font-black uppercase italic">Our Policy</h3>
           <p className="text-neutral-600 leading-relaxed">
              If you are not completely satisfied with your purchase, you may return it within 30 days of the delivery date. Items must be unworn, in their original condition, and with all tags and neural authentication tags intact.
           </p>
           <div className="h-px bg-neutral-200 my-6" />
           <h4 className="font-bold uppercase tracking-widest text-xs">How to initiate a return:</h4>
           <ol className="list-decimal list-inside space-y-2 text-sm font-medium text-neutral-700">
              <li>Log in to your dashboard</li>
              <li>Navigate to Order History</li>
              <li>Select the order and click &quot;Return Item&quot;</li>
              <li>Print the prepaid shipping label</li>
           </ol>
        </div>
      </div>
    </div>
  );
}
